import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonsList } from './components/LessonsList';
import { ExerciseSession } from './components/ExerciseSession';
import { AIRoleplayTutor } from './components/AIRoleplayTutor';
import { StoryReader } from './components/StoryReader';
import { FlashcardsDeck } from './components/FlashcardsDeck';
import { AdBanner } from './components/AdBanner';
import { ProSubscriptionModal } from './components/ProSubscriptionModal';
import { TutorHubModal } from './components/TutorHubModal';
import { GrammarExplainerModal } from './components/GrammarExplainerModal';
import { LearningTrack, Lesson, UserStats } from './types';
import { DEFAULT_USER_STATS, loadUserStats, saveUserStats } from './utils/storage';
import { Sparkles, DollarSign, Users, Award, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect } from './utils/speech';

export default function App() {
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  const [activeTab, setActiveTab] = useState<'lessons' | 'roleplay' | 'stories' | 'flashcards'>('lessons');
  const [activeTrack, setActiveTrack] = useState<LearningTrack>('travel');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Modals & Banners
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isTutorsModalOpen, setIsTutorsModalOpen] = useState(false);
  const [isGrammarModalOpen, setIsGrammarModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Load stats & process URL parameters (e.g. returning from Stripe Checkout)
  useEffect(() => {
    const loaded = loadUserStats();
    setStats(loaded);

    // Check URL query parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true') {
      const updated: UserStats = {
        ...loaded,
        isPro: true,
        showAds: false,
        hearts: 5,
      };
      saveUserStats(updated);
      setStats(updated);
      playSoundEffect('complete');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 } });
      setSuccessToast("🎉 Welcome to Hablamos Pro! Your subscription is now active. All features, tracks, and unlimited AI roleplays are unlocked.");

      // Clean up URL parameters without refreshing
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const handleUpdateStats = (partial: Partial<UserStats>) => {
    setStats((prev) => {
      const updated = { ...prev, ...partial };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleTogglePro = (active: boolean) => {
    handleUpdateStats({ isPro: active, showAds: !active, hearts: active ? 5 : 5 });
  };

  const handleDeductHeart = () => {
    if (stats.isPro) return;
    setStats((prev) => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      const updated = { ...prev, hearts: nextHearts };
      saveUserStats(updated);
      if (nextHearts === 0) {
        setIsProModalOpen(true);
      }
      return updated;
    });
  };

  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    setStats((prev) => {
      const completed = Array.from(new Set([...prev.completedLessons, lessonId]));
      const updated: UserStats = {
        ...prev,
        completedLessons: completed,
        xp: prev.xp + xpEarned,
        todayXp: prev.todayXp + xpEarned,
      };
      saveUserStats(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        stats={stats}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveLesson(null);
        }}
        activeTrack={activeTrack}
        onSelectTrack={(track) => {
          setActiveTrack(track);
          handleUpdateStats({ activeTrack: track });
          setActiveLesson(null);
        }}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenTutorsModal={() => setIsTutorsModalOpen(true)}
        onOpenGrammarModal={() => setIsGrammarModalOpen(true)}
        onUpdateStats={handleUpdateStats}
      />

      {/* Main Learning Hub */}
      <main className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-6 flex-1 flex flex-col justify-start gap-6">
        {/* Pro Activation Success Toast */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-500/15 to-emerald-500/20 border border-emerald-500/40 text-stone-100 flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 fill-stone-950" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-emerald-200">
                {successToast}
              </div>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-100 transition shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Native Ad Placement Header (Hidden when Pro is active) */}
        {!activeLesson && (
          <AdBanner
            isPro={stats.isPro}
            onUpgradePro={() => setIsProModalOpen(true)}
          />
        )}

        {/* Tab Content */}
        {activeLesson ? (
          /* Active Interactive Exercise Session */
          <ExerciseSession
            lesson={activeLesson}
            stats={stats}
            onComplete={handleCompleteLesson}
            onExit={() => setActiveLesson(null)}
            onDeductHeart={handleDeductHeart}
          />
        ) : activeTab === 'lessons' ? (
          /* Curriculum / Track Lessons */
          <LessonsList
            activeTrack={activeTrack}
            stats={stats}
            onStartLesson={(lesson) => setActiveLesson(lesson)}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        ) : activeTab === 'roleplay' ? (
          /* AI Conversational Roleplay with Gemini */
          <AIRoleplayTutor
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        ) : activeTab === 'stories' ? (
          /* Comprehensible Input Story Reader */
          <StoryReader
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        ) : (
          /* Spaced-Repetition Flashcards */
          <FlashcardsDeck
            activeTrack={activeTrack}
            stats={stats}
            onUpdateStats={handleUpdateStats}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-stone-900/60 border-t border-stone-900 py-6 px-4 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-300">Hablamos Spanish Platform</span>
            <span>•</span>
            <span>Comprehensive Language Acquisition</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsProModalOpen(true)}
              className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3" />
              <span>SaaS Subscription Model ($9.99/mo)</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsTutorsModalOpen(true)}
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Users className="w-3 h-3" />
              <span>Tutor Affiliate Network</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProSubscriptionModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        stats={stats}
        onTogglePro={handleTogglePro}
      />

      <TutorHubModal
        isOpen={isTutorsModalOpen}
        onClose={() => setIsTutorsModalOpen(false)}
      />

      <GrammarExplainerModal
        isOpen={isGrammarModalOpen}
        onClose={() => setIsGrammarModalOpen(false)}
        accent={stats.accent}
      />
    </div>
  );
}
