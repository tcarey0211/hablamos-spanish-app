import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  isPro: boolean;
  onUpgradePro: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ isPro, onUpgradePro }) => {
  if (isPro) {
    return (
      <div className="w-full max-w-4xl mx-auto my-2 px-4 py-2 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold">Hablamos Pro Active</span>
          <span className="text-emerald-400/80">• Ad-free experience enabled</span>
        </div>
        <span className="text-[11px] text-emerald-400/60 font-mono">Premium Tier</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-3 p-3 bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
      <div className="flex items-center gap-3">
        <div className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30">
          Sponsored
        </div>
        <div>
          <span className="font-semibold text-slate-200">Preply: 1-on-1 Native Spanish Tutors</span>
          <p className="text-slate-400 text-[11px] hidden sm:block">Book personalized 50-minute conversational sessions starting from $12/hr.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <a
          href="https://preply.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-medium transition flex items-center gap-1 text-[11px]"
        >
          <span>Find Tutor</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <button
          onClick={onUpgradePro}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold hover:brightness-110 transition text-[11px] shadow"
        >
          Remove Ads (Pro)
        </button>
      </div>
    </div>
  );
};
