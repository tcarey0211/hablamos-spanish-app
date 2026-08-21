import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  X, 
  Award, 
  RotateCcw,
  Clock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Story, StoryWord, UserStats } from '../types';
import { STORIES } from '../data/storiesData';
import { speakSpanish, playSoundEffect } from '../utils/speech';

interface StoryReaderProps {
  stats: UserStats;
  onUpdateStats: (partial: Partial<UserStats>) => void;
  onOpenProModal: () => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  stats,
  onUpdateStats,
  onOpenProModal,
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedWord, setSelectedWord] = useState<StoryWord | null>(null);
  
  // Comprehension quiz state
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setSelectedWord(null);
    setQuizAnswers(new Array(story.quiz.length).fill(-1));
    setIsQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleWordClick = (wordObj: StoryWord) => {
    setSelectedWord(wordObj);
    speakSpanish(wordObj.word.replace(/[.,/#!$%^&*;:{}=\-_`~()—¿?¡!]/g, ''), stats.accent);
    playSoundEffect('pop');
  };

  const handleSelectQuizOption = (qIndex: number, optionIndex: number) => {
    if (isQuizSubmitted) return;
    playSoundEffect('click');
    setQuizAnswers((prev) => {
      const updated = [...prev];
      updated[qIndex] = optionIndex;
      return updated;
    });
  };

  const handleSubmitQuiz = () => {
    if (!selectedStory || isQuizSubmitted) return;
    let score = 0;
    selectedStory.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setIsQuizSubmitted(true);

    if (score === selectedStory.quiz.length) {
      playSoundEffect('complete');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onUpdateStats({
        xp: stats.xp + 40,
        todayXp: stats.todayXp + 40,
        completedStories: Array.from(new Set([...stats.completedStories, selectedStory.id])),
      });
    } else {
      playSoundEffect('incorrect');
    }
  };

  if (!selectedStory) {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/50 via-stone-900 to-stone-900 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <h1 className="text-2xl font-black text-stone-100 tracking-tight">Comprehensible Input Stories</h1>
            </div>
            <p className="text-stone-300 text-sm max-w-2xl mt-1 leading-relaxed">
              Accelerate your Spanish acquisition naturally through contextual storytelling. Tap any word to reveal its instant definition, root forms, and audio pronunciation.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold shrink-0">
            Interactive Dual-Reader
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STORIES.map((story) => {
            const isCompleted = stats.completedStories.includes(story.id);

            return (
              <div
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-stone-700 uppercase tracking-wide">
                      {story.category} • Level {story.level}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {story.durationMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-300 transition">
                    {story.title}
                  </h3>
                  <div className="text-xs text-amber-400/90 font-medium">{story.titleTranslation}</div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {story.synopsis}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-stone-800 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Read Again' : 'Start Reading'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="p-4 bg-stone-900 rounded-3xl border border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedStory(null)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            title="Back to story list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-bold text-base text-stone-100">{selectedStory.title}</h2>
            <p className="text-xs text-stone-400">{selectedStory.titleTranslation}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const allSpanish = selectedStory.paragraphs.map((p) => p.fullSpanish).join(' ');
            speakSpanish(allSpanish, stats.accent, 0.9);
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
          title="Listen to full story audio"
        >
          <Volume2 className="w-4 h-4" />
          <span>Read Aloud</span>
        </button>
      </div>

      {/* Story Text Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400">
          <span>💡 Tap on any word to hear pronunciation and see instant English meaning</span>
          <span className="font-mono text-[11px] bg-stone-800 px-2 py-0.5 rounded text-amber-300">Level {selectedStory.level}</span>
        </div>

        {/* Selected Word Popover Card */}
        {selectedWord && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-3 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <button
                onClick={() => speakSpanish(selectedWord.word, stats.accent)}
                className="p-2.5 rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 transition shadow"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div>
                <div className="font-black text-amber-300 text-base">{selectedWord.word}</div>
                <div className="text-xs text-stone-200 font-medium">English: {selectedWord.translation}</div>
                {selectedWord.grammarNote && (
                  <div className="text-[11px] text-amber-400/80 mt-0.5">{selectedWord.grammarNote}</div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedWord(null)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg leading-loose text-stone-200">
          {selectedStory.paragraphs.map((paragraph, pIdx) => (
            <div key={pIdx} className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {paragraph.speaker && (
                  <span className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wide">
                    {paragraph.speaker}
                  </span>
                )}
                <button
                  onClick={() => speakSpanish(paragraph.fullSpanish, stats.accent)}
                  className="p-1.5 text-stone-400 hover:text-amber-400 transition"
                  title="Listen to this paragraph"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Word by word interactive rendering */}
              <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                {paragraph.words.map((w, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => handleWordClick(w)}
                    className="cursor-pointer px-1 py-0.5 rounded hover:bg-amber-500/20 hover:text-amber-300 transition select-none"
                  >
                    {w.word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* End of Story Comprehension Quiz */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-stone-100">Comprehension Check Quiz</h3>
          </div>

          <div className="space-y-4">
            {selectedStory.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];

              return (
                <div key={qIdx} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col gap-3">
                  <div className="font-bold text-sm text-stone-200">
                    {qIdx + 1}. {q.question}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700';

                      if (isSelected) {
                        btnStyle = 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold';
                      }

                      if (isQuizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && optIdx !== q.correctIndex) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isQuizSubmitted && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Quiz Button */}
          {!isQuizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={quizAnswers.includes(-1)}
              className="w-full sm:w-auto self-end px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-black text-xs transition shadow"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-sm">Score: {quizScore} / {selectedStory.quiz.length} Correct</span>
                <p className="text-[11px] text-emerald-400/80 mt-0.5">+40 XP Added to your profile!</p>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
