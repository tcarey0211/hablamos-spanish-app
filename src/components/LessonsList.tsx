import React from 'react';
import { 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Lock, 
  BookOpen, 
  Clock, 
  Zap, 
  ChevronRight,
  Volume2
} from 'lucide-react';
import { LearningTrack, Lesson, UserStats } from '../types';
import { LESSONS } from '../data/lessonsData';
import { speakSpanish } from '../utils/speech';

interface LessonsListProps {
  activeTrack: LearningTrack;
  stats: UserStats;
  onStartLesson: (lesson: Lesson) => void;
  onOpenProModal: () => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  activeTrack,
  stats,
  onStartLesson,
  onOpenProModal,
}) => {
  const filteredLessons = LESSONS.filter((l) => l.trackId === activeTrack);

  const trackInfo: Record<LearningTrack, { title: string; subtitle: string; icon: string; bgGradient: string }> = {
    travel: {
      title: 'Travel & Everyday Spanish',
      subtitle: 'Effortlessly order tapas, navigate airports, ask locals for recommendations, and handle emergencies abroad.',
      icon: '✈️',
      bgGradient: 'from-emerald-900/30 to-stone-900',
    },
    medical: {
      title: 'Medical Spanish for Healthcare',
      subtitle: 'High-value clinical communication: patient triage, symptom assessment, pain scales, examinations, and bedside rapport.',
      icon: '🩺',
      bgGradient: 'from-cyan-900/30 to-stone-900',
    },
    business: {
      title: 'Business & Professional Spanish',
      subtitle: 'Corporate vocabulary, high-stakes negotiations, cross-border client meetings, pitch decks, and tech interviews.',
      icon: '💼',
      bgGradient: 'from-amber-900/30 to-stone-900',
    },
    conversational: {
      title: 'Everyday Conversational Fluency',
      subtitle: 'Slang, colloquial expressions, humor, storytelling, and natural rhythm across Latin America and Spain.',
      icon: '💬',
      bgGradient: 'from-rose-900/30 to-stone-900',
    },
    grammar: {
      title: 'Grammar & Conjugation Mastery',
      subtitle: 'Crack the code of Ser vs. Estar, Por vs. Para, Preterite vs. Imperfect, and the Subjunctive mood once and for all.',
      icon: '⚡',
      bgGradient: 'from-purple-900/30 to-stone-900',
    },
  };

  const currentTrackMeta = trackInfo[activeTrack] || trackInfo.travel;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Track Header Card */}
      <div className={`p-6 rounded-3xl bg-gradient-to-br ${currentTrackMeta.bgGradient} border border-stone-800 relative overflow-hidden shadow-xl`}>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">{currentTrackMeta.icon}</span>
              <h1 className="text-2xl font-black text-stone-100 tracking-tight">{currentTrackMeta.title}</h1>
            </div>
            <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
              {currentTrackMeta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/60 backdrop-blur px-4 py-3 rounded-2xl border border-stone-800/80">
            <div className="text-right">
              <div className="text-xs text-stone-400 font-medium">Track Progress</div>
              <div className="text-base font-bold text-stone-200">
                {filteredLessons.filter((l) => stats.completedLessons.includes(l.id)).length} / {filteredLessons.length} Completed
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              {Math.round(
                (filteredLessons.filter((l) => stats.completedLessons.includes(l.id)).length / (filteredLessons.length || 1)) * 100
              )}%
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Units & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson, index) => {
          const isCompleted = stats.completedLessons.includes(lesson.id);
          // Unlock rule: first lesson is unlocked, or previous lesson is completed, or user is Pro
          const isUnlocked = index === 0 || stats.isPro || stats.completedLessons.includes(filteredLessons[index - 1]?.id);

          return (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 relative group ${
                isCompleted
                  ? 'bg-stone-900/90 border-emerald-500/30 shadow-sm hover:border-emerald-500/50'
                  : isUnlocked
                  ? 'bg-stone-900 border-stone-800 hover:border-amber-500/40 hover:shadow-lg'
                  : 'bg-stone-950/70 border-stone-800/50 opacity-70'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 uppercase tracking-wider">
                      Unit {lesson.unit} • {lesson.level}
                    </span>
                    {isCompleted && (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-stone-900" />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.estimatedMinutes}m
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-amber-400" />
                      +{lesson.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition">
                  {lesson.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Key Vocabulary Pills */}
                {lesson.keyVocabulary && lesson.keyVocabulary.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-800/70">
                    <div className="text-[11px] font-semibold text-stone-400 mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-400" />
                      <span>Key Vocabulary:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lesson.keyVocabulary.slice(0, 3).map((v, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(v.spanish, stats.accent);
                          }}
                          className="px-2 py-1 rounded-lg bg-stone-800/90 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 transition border border-stone-700/60"
                          title={`Listen to '${v.spanish}': ${v.english}`}
                        >
                          <Volume2 className="w-3 h-3 text-amber-400/80" />
                          <span className="font-medium text-stone-200">{v.spanish}</span>
                          <span className="text-stone-400 text-[10px]">({v.english})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between gap-3">
                {isUnlocked ? (
                  <button
                    onClick={() => onStartLesson(lesson)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow ${
                      isCompleted
                        ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompleted ? 'Practice Again' : 'Start Lesson'}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenProModal}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-stone-800/60 text-stone-400 border border-stone-800 hover:text-stone-200 transition"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock with Hablamos Pro</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
