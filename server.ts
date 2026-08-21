import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Hablamos Spanish Learning API" });
  });

  // Stripe Billing & Checkout Configuration
  app.get("/api/checkout/config", (_req, res) => {
    const isConfigured = !!process.env.STRIPE_SECRET_KEY;
    res.json({
      isStripeConfigured: isConfigured,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
      pricing: {
        annual: {
          id: "annual",
          title: "Hablamos Pro Annual",
          priceCents: 6999,
          displayPrice: "$69.99/year ($5.83/mo)",
          period: "year",
          savings: "Save 42%"
        },
        monthly: {
          id: "monthly",
          title: "Hablamos Pro Monthly",
          priceCents: 999,
          displayPrice: "$9.99/month",
          period: "month",
          savings: null
        }
      }
    });
  });

  // Create Stripe Checkout Session
  app.post("/api/checkout/create-session", async (req, res) => {
    try {
      const { plan = "annual", customerEmail, originUrl } = req.body;
      const stripe = getStripeClient();

      // Base app URL for redirects
      const baseUrl = originUrl || process.env.APP_URL || "http://localhost:3000";
      const successUrl = `${baseUrl.replace(/\/$/, "")}?payment_success=true&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl.replace(/\/$/, "")}?payment_canceled=true`;

      // If Stripe secret key is NOT yet configured, return simulation response
      if (!stripe) {
        return res.json({
          status: "simulation",
          message: "Stripe keys are not yet configured in environment variables. Using instant test activation simulation.",
          simulatedUrl: `${baseUrl.replace(/\/$/, "")}?payment_success=true&plan=${plan}&simulated=true`,
          plan,
        });
      }

      // If Stripe is configured, determine line items
      const isAnnual = plan === "annual";
      const customPriceId = isAnnual
        ? process.env.STRIPE_ANNUAL_PRICE_ID
        : process.env.STRIPE_MONTHLY_PRICE_ID;

      let lineItems: any[];

      if (customPriceId) {
        lineItems = [
          {
            price: customPriceId,
            quantity: 1,
          },
        ];
      } else {
        // Dynamic zero-setup price line item
        lineItems = [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: isAnnual ? "Hablamos Spanish Pro (Annual Membership)" : "Hablamos Spanish Pro (Monthly Plan)",
                description: "Unlimited AI roleplay with Sofía, Medical & Business Spanish tracks, unlimited hearts, and ad-free experience.",
              },
              unit_amount: isAnnual ? 6999 : 999,
              recurring: {
                interval: isAnnual ? "year" : "month",
              },
            },
            quantity: 1,
          },
        ];
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: lineItems,
        customer_email: customerEmail || undefined,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          app: "hablamos-spanish",
          plan,
        },
      });

      res.json({
        status: "ready",
        url: session.url,
        sessionId: session.id,
      });
    } catch (error: any) {
      console.error("Stripe Checkout Session Error:", error);
      res.status(500).json({
        error: error.message || "Failed to create checkout session",
        fallbackSimulation: true,
      });
    }
  });

  // Stripe Customer Portal Session (to manage/cancel subscriptions)
  app.post("/api/checkout/customer-portal", async (req, res) => {
    try {
      const { customerId, originUrl } = req.body;
      const stripe = getStripeClient();
      const baseUrl = originUrl || process.env.APP_URL || "http://localhost:3000";

      if (!stripe || !customerId) {
        return res.json({
          status: "simulation",
          message: "In simulation mode, you can manage subscription status directly from the Pro modal toggle.",
        });
      }

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: baseUrl,
      });

      res.json({ url: portalSession.url });
    } catch (error: any) {
      console.error("Stripe Customer Portal Error:", error);
      res.status(500).json({ error: error.message || "Failed to open billing portal" });
    }
  });

  // AI Roleplay Conversation endpoint
  app.post("/api/ai/roleplay", async (req, res) => {
    try {
      const { scenario, history, userMessage, userLevel = "intermediate" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback simulated intelligent response if key is not yet set
        return res.json({
          replySpanish: "¡Hola! Entiendo perfectamente. ¿Podrías darme un poco más de detalle?",
          replyEnglish: "Hello! I understand completely. Could you give me a bit more detail?",
          correction: userMessage.includes("yo soy") && userMessage.includes("bien") 
            ? "Tip: Use 'estoy bien' (temporary state) instead of 'soy bien'." 
            : null,
          grammarTip: "Remember to match adjective gender with the noun.",
          nextPromptHint: "Try responding using 'Me gustaría...' (I would like...)",
        });
      }

      const prompt = `You are a friendly, encouraging native Spanish conversation partner & tutor named 'Sofía' in an interactive language learning app called Hablamos.
Current Scenario: ${scenario.title} (${scenario.description})
Role for AI: ${scenario.aiRole}
Role for User: ${scenario.userRole}
User's Spanish Level: ${userLevel}

Conversation History:
${(history || [])
  .map((m: { sender: string; text: string }) => `${m.sender === "user" ? "Learner" : "Tutor"}: ${m.text}`)
  .join("\n")}

Learner's latest message in Spanish: "${userMessage}"

Respond in JSON with the following structure:
{
  "replySpanish": "Your in-character response in natural, authentic Spanish suited for ${userLevel} level (1-3 sentences)",
  "replyEnglish": "English translation of your reply",
  "correction": "Constructive feedback if the learner made any grammatical, gender, or vocabulary mistakes (or null if their message was great)",
  "grammarTip": "A concise, actionable grammar or vocabulary tip relevant to what they said or how to reply",
  "nextPromptHint": "A suggested phrase or sentence starter the learner can try next in Spanish (e.g. 'Try saying: Quisiera la cuenta, por favor')"
}

Ensure your response is valid JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("AI Roleplay Error:", error);
      res.status(500).json({
        error: "Failed to generate AI response",
        fallback: {
          replySpanish: "¡Muy bien dicho! Continuemos con nuestra conversación.",
          replyEnglish: "Very well said! Let's continue our conversation.",
          correction: null,
          grammarTip: "Practice speaking aloud for authentic pronunciation.",
          nextPromptHint: "¿Qué opinas tú?",
        },
      });
    }
  });

  // AI Grammar & Vocabulary Explainer
  app.post("/api/ai/explain", async (req, res) => {
    try {
      const { query, contextSentence } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          explanation: `In Spanish, "${query}" is commonly used in everyday conversations. Pay attention to subject-verb agreement and whether the context calls for the subjunctive or indicative mood.`,
          breakdown: [
            { term: query, translation: "Example translation", note: "Common usage in standard Spanish." }
          ],
          examples: [
            { spanish: `${query} con gusto.`, english: "With pleasure." }
          ]
        });
      }

      const prompt = `You are an expert Spanish linguistic teacher.
Explain the word, phrase, or grammatical query: "${query}"
${contextSentence ? `Context in which it appeared: "${contextSentence}"` : ""}

Respond in JSON with:
{
  "explanation": "Clear, engaging, easy-to-understand explanation (2-3 sentences max) highlighting rules, false cognates, or cultural nuance",
  "breakdown": [
    { "term": "part of phrase or root verb", "translation": "English meaning", "note": "grammatical breakdown (e.g. 1st person preterite irregular)" }
  ],
  "examples": [
    { "spanish": "Example sentence in Spanish", "english": "English translation" },
    { "spanish": "Another example sentence in Spanish", "english": "English translation" }
  ],
  "proTip": "A memorable mnemonic or rule of thumb"
}
Ensure output is valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const text = response.text || "{}";
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("AI Explain Error:", error);
      res.status(500).json({ error: "Failed to generate explanation" });
    }
  });

  // AI Sentence Generator / Practice Quiz Customizer
  app.post("/api/ai/generate-drill", async (req, res) => {
    try {
      const { topic, difficulty = "beginner" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          questions: [
            {
              type: "multiple-choice",
              prompt: "¿Cómo se dice 'Where is the hospital?' en español?",
              options: [
                "¿Dónde está el hospital?",
                "¿Cuándo es el hospital?",
                "¿Por qué está el hospital?",
                "¿Cómo es el hospital?"
              ],
              correctAnswer: "¿Dónde está el hospital?",
              explanation: "'Dónde' means 'where', and 'está' (from estar) is used for physical location."
            }
          ]
        });
      }

      const prompt = `Generate 3 interactive Spanish quiz questions for a learner studying topic: "${topic}" at difficulty level: "${difficulty}".
Format JSON:
{
  "questions": [
    {
      "type": "multiple-choice",
      "prompt": "Question prompt in English or Spanish",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation why this is correct"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("AI Drill Error:", error);
      res.status(500).json({ error: "Failed to generate drill" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hablamos Spanish Server running on http://localhost:${PORT}`);
  });
}

startServer();
