import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  HelpCircle, 
  Send, 
  Volume2, 
  BookOpen, 
  Lightbulb, 
  ArrowRight 
} from 'lucide-react';
import { SpanishAccent } from '../types';
import { speakSpanish, playSoundEffect } from '../utils/speech';

interface GrammarExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  accent: SpanishAccent;
}

interface GrammarResult {
  explanation: string;
  breakdown?: { term: string; translation: string; note: string }[];
  examples?: { spanish: string; english: string }[];
  proTip?: string;
}

export const GrammarExplainerModal: React.FC<GrammarExplainerModalProps> = ({
  isOpen,
  onClose,
  accent,
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GrammarResult | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Por vs. Para differences & rules',
    'When to use Subjunctive mood (WEIRDO)',
    'Preterite vs. Imperfect with "Conocer"',
    'Direct vs. Indirect Object Pronouns (Se lo)',
    'Medical Spanish: "Doler" vs "Lastimar"',
  ];

  const handleSearch = async (textToSearch?: string) => {
    const q = (textToSearch || query).trim();
    if (!q || isLoading) return;

    playSoundEffect('pop');
    setQuery(q);
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      setResult(data);
      playSoundEffect('complete');
    } catch (err) {
      console.error('AI Explain error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl flex flex-col gap-6 text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-stone-100">Ask Sofía (AI Spanish Tutor)</h2>
            <p className="text-xs text-stone-400 mt-0.5">Instant breakdown of any grammar rule, verb tense, or confusing phrase.</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            aria-label="Spanish grammar topic or question"
            placeholder="e.g. Por vs Para, or Haber conjugation..."
            className="flex-1 px-4 py-3 rounded-2xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-500 transition"
          />
          <button
            onClick={() => handleSearch()}
            disabled={!query.trim() || isLoading}
            aria-label="Search grammar explanation"
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-sm transition flex items-center gap-1.5 shadow cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!result && !isLoading && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-stone-400">Popular Queries:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(p)}
                  className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs border border-stone-800 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-stone-400 text-xs">
            <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
            <span>Analyzing Spanish linguistic structure with Gemini...</span>
          </div>
        )}

        {/* Results Container */}
        {result && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            {/* Core Explanation */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-1">Explanation</h3>
              <p className="text-sm text-stone-200 leading-relaxed">{result.explanation}</p>
            </div>

            {/* Breakdown Table if available */}
            {result.breakdown && result.breakdown.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-2">Structure & Components</h3>
                <div className="space-y-2">
                  {result.breakdown.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-amber-300">{item.term}</span>
                        <span className="text-stone-400 ml-2">({item.translation})</span>
                      </div>
                      <span className="text-stone-400 text-[11px] italic">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples with Audio */}
            {result.examples && result.examples.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-2">Practical Examples</h3>
                <div className="space-y-2">
                  {result.examples.map((ex, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-stone-100">{ex.spanish}</div>
                        <div className="text-stone-400 mt-0.5">{ex.english}</div>
                      </div>
                      <button
                        onClick={() => speakSpanish(ex.spanish, accent)}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 transition shrink-0"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pro Mnemonic Tip */}
            {result.proTip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Rule of Thumb: </span>
                  <span>{result.proTip}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
