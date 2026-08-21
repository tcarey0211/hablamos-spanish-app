import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Heart, 
  Volume2, 
  GraduationCap, 
  MessageSquare, 
  BookOpen, 
  Layers, 
  Users, 
  HelpCircle,
  Stethoscope,
  Briefcase,
  Compass,
  Zap
} from 'lucide-react';
import { LearningTrack, SpanishAccent, UserStats } from '../types';

interface NavbarProps {
  stats: UserStats;
  activeTab: 'lessons' | 'roleplay' | 'stories' | 'flashcards';
  onSelectTab: (tab: 'lessons' | 'roleplay' | 'stories' | 'flashcards') => void;
  activeTrack: LearningTrack;
  onSelectTrack: (track: LearningTrack) => void;
  onOpenProModal: () => void;
  onOpenTutorsModal: () => void;
  onOpenGrammarModal: () => void;
  onUpdateStats: (partial: Partial<UserStats>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  onSelectTab,
  activeTrack,
  onSelectTrack,
  onOpenProModal,
  onOpenTutorsModal,
  onOpenGrammarModal,
  onUpdateStats,
}) => {
  const tracks: { id: LearningTrack; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'travel', label: 'Travel & Everyday', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
    { id: 'medical', label: 'Medical Spanish', icon: <Stethoscope className="w-4 h-4 text-cyan-400" />, badge: 'High ROI' },
    { id: 'business', label: 'Business & Career', icon: <Briefcase className="w-4 h-4 text-amber-400" />, badge: 'Pro' },
    { id: 'grammar', label: 'Grammar Mastery', icon: <Zap className="w-4 h-4 text-purple-400" /> },
  ];

  return (
    <header className="w-full bg-stone-900/95 backdrop-blur border-b border-stone-800 sticky top-0 z-40">
      {/* Top Utility Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-red-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center font-bold text-amber-400 text-lg">
              ñ
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-100 text-base tracking-tight">Hablamos</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wide">
                Spanish AI
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">Conversational Fluency & Specialized Tracks</p>
          </div>
        </div>

        {/* User Stats & Badges */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-800/80 border border-stone-700 text-xs font-bold text-orange-400 shadow-sm" title="Daily Practice Streak">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{stats.streak}d</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-800/80 border border-stone-700 text-xs font-bold text-amber-400" title="Total XP Earned">
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{stats.xp} XP</span>
          </div>

          {/* Hearts / Energy */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-800/80 border border-stone-700 text-xs font-bold text-rose-400" title={stats.isPro ? 'Unlimited Hearts (Pro)' : `${stats.hearts} of 5 Hearts Remaining`}>
            <Heart className={`w-3.5 h-3.5 ${stats.isPro ? 'fill-amber-400 text-amber-400' : 'fill-rose-500 text-rose-500'}`} />
            <span>{stats.isPro ? '∞' : `${stats.hearts}/5`}</span>
          </div>

          {/* Accent Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-stone-800 rounded-xl p-0.5 border border-stone-700 text-xs">
            <span className="text-[11px] text-stone-400 px-2 flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> Accent:
            </span>
            {(['es-ES', 'es-MX', 'es-AR'] as SpanishAccent[]).map((acc) => (
              <button
                key={acc}
                onClick={() => onUpdateStats({ accent: acc })}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                  stats.accent === acc
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-300 hover:text-stone-100 hover:bg-stone-700/50'
                }`}
                title={`Accent: ${acc === 'es-ES' ? 'Spain (Castellano)' : acc === 'es-MX' ? 'Mexico (LatAm)' : 'Argentina (Rioplatense)'}`}
              >
                {acc === 'es-ES' ? '🇪🇸 Spain' : acc === 'es-MX' ? '🇲🇽 Mexico' : '🇦🇷 Argentina'}
              </button>
            ))}
          </div>

          {/* Ask AI Grammar Assistant */}
          <button
            onClick={onOpenGrammarModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask AI Tutor</span>
          </button>

          {/* 1-on-1 Tutors Button (Affiliate) */}
          <button
            onClick={onOpenTutorsModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
          >
            <Users className="w-3.5 h-3.5" />
            <span>1-on-1 Tutors</span>
          </button>

          {/* Pro / Subscription Button */}
          <button
            onClick={onOpenProModal}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow ${
              stats.isPro
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 hover:brightness-110'
                : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-stone-950 hover:shadow-amber-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{stats.isPro ? 'Pro Active' : 'Get Pro ($9.99/mo)'}</span>
          </button>
        </div>
      </div>

      {/* Main Track & Section Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-stone-800/60">
        {/* Track selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-stone-400 font-semibold mr-1 shrink-0">Track:</span>
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTrack(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTrack === t.id
                  ? 'bg-stone-100 text-stone-900 shadow-md font-bold'
                  : 'bg-stone-800/70 text-stone-300 hover:bg-stone-800 hover:text-stone-100 border border-stone-700/60'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badge && (
                <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-extrabold uppercase">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Feature Tabs */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 self-center md:self-auto">
          <button
            onClick={() => onSelectTab('lessons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'lessons'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => onSelectTab('roleplay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'roleplay'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Roleplay</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <button
            onClick={() => onSelectTab('stories')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'stories'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Stories</span>
          </button>

          <button
            onClick={() => onSelectTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'flashcards'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>
        </div>
      </div>
    </header>
  );
};
