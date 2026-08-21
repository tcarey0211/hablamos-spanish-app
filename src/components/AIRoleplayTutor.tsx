import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  MessageSquare,
  Globe
} from 'lucide-react';
import { RoleplayScenario, UserStats } from '../types';
import { ROLEPLAY_SCENARIOS } from '../data/roleplayData';
import { speakSpanish, playSoundEffect } from '../utils/speech';

interface AIRoleplayTutorProps {
  stats: UserStats;
  onUpdateStats: (partial: Partial<UserStats>) => void;
  onOpenProModal: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  translation?: string;
  correction?: string | null;
  grammarTip?: string;
  nextPromptHint?: string;
  timestamp: string;
}

export const AIRoleplayTutor: React.FC<AIRoleplayTutorProps> = ({
  stats,
  onUpdateStats,
  onOpenProModal,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Initialize scenario conversation
  const handleSelectScenario = (scenario: RoleplayScenario) => {
    setSelectedScenario(scenario);
    const starter: Message = {
      id: 'starter-1',
      sender: 'ai',
      text: scenario.starterMessage,
      translation: scenario.starterTranslation,
      grammarTip: scenario.starterPromptHint,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([starter]);
    speakSpanish(scenario.starterMessage, stats.accent);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Send message to Gemini server-side endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading || !selectedScenario) return;

    playSoundEffect('pop');
    setInputMessage('');

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: selectedScenario,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          userMessage: text,
          userLevel: 'intermediate',
        }),
      });

      const data = await res.json();
      const aiReply = data.replySpanish || data.fallback?.replySpanish || '¡Muy bien!';
      const aiTranslation = data.replyEnglish || data.fallback?.replyEnglish;
      const correction = data.correction;
      const grammarTip = data.grammarTip;
      const nextPromptHint = data.nextPromptHint;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        translation: aiTranslation,
        correction,
        grammarTip,
        nextPromptHint,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakSpanish(aiReply, stats.accent);
      playSoundEffect('pop');

      // Add XP for conversation practice
      onUpdateStats({ xp: stats.xp + 15, todayXp: stats.todayXp + 15 });
    } catch (err) {
      console.error('Roleplay error:', err);
      const fallbackMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: '¡Entendido! Cuéntame un poco más.',
        translation: 'Understood! Tell me a little bit more.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech Recognition (Mic Input)
  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type your Spanish response directly!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = stats.accent; // 'es-ES', 'es-MX', 'es-AR'
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/50 via-stone-900 to-stone-900 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h1 className="text-2xl font-black text-stone-100 tracking-tight">AI Conversational Roleplays</h1>
            </div>
            <p className="text-stone-300 text-sm max-w-2xl mt-1 leading-relaxed">
              Immerse yourself in real-life Spanish conversations powered by Gemini 3.7. Receive instant voice pronunciation, grammatical corrections, and native speaking suggestions.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive AI Partner</span>
          </div>
        </div>

        {/* Scenario Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLEPLAY_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-cyan-500/40 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-cyan-300 border border-stone-700 uppercase tracking-wide">
                    {scenario.tag} • Level {scenario.level}
                  </span>
                  <span className="text-2xl">{scenario.avatar}</span>
                </div>

                <h3 className="text-base font-bold text-stone-100 group-hover:text-cyan-300 transition">
                  {scenario.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {scenario.description}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center gap-1 text-[11px] text-stone-400">
                  <Globe className="w-3.5 h-3.5 text-stone-500" />
                  <span>{scenario.location}</span>
                </div>
              </div>

              <div className="w-full py-2.5 px-4 rounded-xl bg-stone-800 group-hover:bg-cyan-500 group-hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Conversation</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[75vh] bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
      {/* Top Scenario Bar */}
      <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedScenario(null)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            title="Back to scenarios"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedScenario.avatar}</span>
              <h2 className="font-bold text-sm text-stone-100">{selectedScenario.title}</h2>
            </div>
            <p className="text-[11px] text-stone-400">{selectedScenario.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              showTranslations
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}
          >
            {showTranslations ? 'Translations ON' : 'Translations OFF'}
          </button>

          <button
            onClick={() => handleSelectScenario(selectedScenario)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} animate-in fade-in duration-200`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl border text-sm leading-relaxed shadow-sm ${
                  isAI
                    ? 'bg-stone-950 border-stone-800 text-stone-100 rounded-tl-sm'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-medium border-amber-400 rounded-tr-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-bold text-sm">{msg.text}</div>
                  {isAI && (
                    <button
                      onClick={() => speakSpanish(msg.text, stats.accent)}
                      className="p-1 text-stone-400 hover:text-amber-400 transition shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* English Translation */}
                {isAI && showTranslations && msg.translation && (
                  <div className="text-xs text-stone-400 mt-2 pt-2 border-t border-stone-800 italic">
                    "{msg.translation}"
                  </div>
                )}

                {/* Grammatical Correction Note if any */}
                {msg.correction && (
                  <div className="mt-2.5 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                    <span>{msg.correction}</span>
                  </div>
                )}

                {/* Grammar Tip or Cultural Note */}
                {msg.grammarTip && (
                  <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span>{msg.grammarTip}</span>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-400 text-xs p-3 rounded-2xl bg-stone-950 border border-stone-800 w-fit">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Sofía is thinking in Spanish...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Starters */}
      {selectedScenario.promptSuggestions && selectedScenario.promptSuggestions.length > 0 && (
        <div className="px-4 py-2 bg-stone-950/60 border-t border-stone-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[11px] font-semibold text-stone-400 shrink-0">💡 Quick Response:</span>
          {selectedScenario.promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs whitespace-nowrap transition border border-stone-700"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
        {/* Mic Button */}
        <button
          onClick={handleToggleMic}
          aria-label={isListening ? 'Stop voice recording' : 'Speak your Spanish response with microphone'}
          className={`p-3 rounded-2xl border transition ${
            isListening
              ? 'bg-rose-500 text-stone-950 border-rose-400 animate-pulse'
              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800'
          }`}
          title={isListening ? 'Listening... click to stop' : 'Speak your response in Spanish'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          aria-label="Spanish response message"
          placeholder="Escribe tu respuesta en español..."
          className="flex-1 px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-500 transition"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isLoading}
          aria-label="Send Spanish message to Sofía"
          className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold transition shadow cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
