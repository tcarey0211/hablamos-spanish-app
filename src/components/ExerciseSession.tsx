import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Check, 
  X, 
  ArrowRight, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise, Lesson, UserStats } from '../types';
import { speakSpanish, playSoundEffect } from '../utils/speech';

interface ExerciseSessionProps {
  lesson: Lesson;
  stats: UserStats;
  onComplete: (lessonId: string, xpEarned: number) => void;
  onExit: () => void;
  onDeductHeart: () => void;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  lesson,
  stats,
  onComplete,
  onExit,
  onDeductHeart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Sentence builder state
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);

  // Match pairs state
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [selectedSpanishPair, setSelectedSpanishPair] = useState<string | null>(null);
  const [selectedEnglishPair, setSelectedEnglishPair] = useState<string | null>(null);

  // Status & Feedback
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [totalXpGained, setTotalXpGained] = useState(0);

  const currentExercise: Exercise = lesson.exercises[currentIndex];

  // Initialize tokens when exercise changes
  useEffect(() => {
    setIsAnswerChecked(false);
    setSelectedOption(null);
    setSelectedSpanishPair(null);
    setSelectedEnglishPair(null);
    setMatchedPairs(new Set());

    if (currentExercise.type === 'sentence-builder' && currentExercise.sentenceTokens) {
      // Shuffle tokens
      const shuffled = [...currentExercise.sentenceTokens].sort(() => Math.random() - 0.5);
      setAvailableTokens(shuffled);
      setSelectedTokens([]);
    }

    // Auto-play audio for listening or standard prompts
    if (currentExercise.type === 'listening' && currentExercise.audioText) {
      speakSpanish(currentExercise.audioText, stats.accent);
    }
  }, [currentIndex, currentExercise, stats.accent]);

  // Handle Token Click in Sentence Builder
  const handleSelectToken = (token: string, tokenIndex: number) => {
    if (isAnswerChecked) return;
    playSoundEffect('pop');
    setSelectedTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, idx) => idx !== tokenIndex));
  };

  const handleRemoveToken = (token: string, tokenIndex: number) => {
    if (isAnswerChecked) return;
    playSoundEffect('pop');
    setSelectedTokens((prev) => prev.filter((_, idx) => idx !== tokenIndex));
    setAvailableTokens((prev) => [...prev, token]);
  };

  // Handle Match Pairs Click
  const handleSpanishPairClick = (sp: string) => {
    if (matchedPairs.has(sp)) return;
    playSoundEffect('pop');
    setSelectedSpanishPair(sp);

    if (selectedEnglishPair) {
      checkPairMatch(sp, selectedEnglishPair);
    }
  };

  const handleEnglishPairClick = (en: string) => {
    if (Array.from(matchedPairs).some((sp) => currentExercise.pairs?.find((p) => p.spanish === sp)?.english === en)) return;
    playSoundEffect('pop');
    setSelectedEnglishPair(en);

    if (selectedSpanishPair) {
      checkPairMatch(selectedSpanishPair, en);
    }
  };

  const checkPairMatch = (sp: string, en: string) => {
    const pair = currentExercise.pairs?.find((p) => p.spanish === sp && p.english === en);
    if (pair) {
      playSoundEffect('correct');
      setMatchedPairs((prev) => new Set([...prev, sp]));
      setSelectedSpanishPair(null);
      setSelectedEnglishPair(null);
      speakSpanish(sp, stats.accent);

      // Check if all matched
      if (currentExercise.pairs && matchedPairs.size + 1 >= currentExercise.pairs.length) {
        setIsAnswerChecked(true);
        setIsCorrect(true);
      }
    } else {
      playSoundEffect('incorrect');
      setSelectedSpanishPair(null);
      setSelectedEnglishPair(null);
    }
  };

  // Check Answer Button
  const handleCheckAnswer = () => {
    if (isAnswerChecked) return;

    let correct = false;

    if (currentExercise.type === 'sentence-builder') {
      const userSentence = selectedTokens.join(' ').trim();
      correct = userSentence.toLowerCase() === currentExercise.correctAnswer.toLowerCase();
    } else if (currentExercise.type === 'match-pairs') {
      correct = currentExercise.pairs ? matchedPairs.size === currentExercise.pairs.length : true;
    } else {
      correct = selectedOption === currentExercise.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      playSoundEffect('correct');
      setTotalXpGained((prev) => prev + 10);
    } else {
      playSoundEffect('incorrect');
      if (!stats.isPro) {
        onDeductHeart();
      }
    }
  };

  // Move to next exercise
  const handleContinue = () => {
    if (currentIndex + 1 < lesson.exercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all exercises
      setSessionCompleted(true);
      playSoundEffect('complete');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onComplete(lesson.id, lesson.xpReward + totalXpGained);
    }
  };

  const progressPercent = Math.round(((currentIndex + (isAnswerChecked && isCorrect ? 1 : 0)) / lesson.exercises.length) * 100);

  if (sessionCompleted) {
    return (
      <div className="w-full max-w-lg mx-auto py-10 px-6 rounded-3xl bg-stone-900 border border-stone-800 text-center flex flex-col items-center gap-6 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Award className="w-10 h-10 text-stone-950" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-stone-100">¡Lección Completada!</h2>
          <p className="text-sm text-stone-400 mt-1">{lesson.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center">
            <span className="text-xs text-stone-400 font-semibold">Total XP Earned</span>
            <div className="flex items-center gap-1 text-xl font-extrabold text-amber-400 mt-1">
              <Zap className="w-5 h-5 fill-amber-400" />
              <span>+{lesson.xpReward + totalXpGained} XP</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center">
            <span className="text-xs text-stone-400 font-semibold">Accuracy</span>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">
              100%
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition shadow-lg flex items-center justify-center gap-2"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-200">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onExit}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          title="Exit lesson"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 rounded-full bg-stone-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-800 border border-stone-700 text-xs font-bold text-rose-400">
          <Heart className={`w-4 h-4 ${stats.isPro ? 'fill-amber-400 text-amber-400' : 'fill-rose-500 text-rose-500'}`} />
          <span>{stats.isPro ? '∞' : stats.hearts}</span>
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col gap-6">
        {/* Prompt Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
              {currentExercise.type.replace('-', ' ')}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 mt-1">
              {currentExercise.prompt}
            </h2>
          </div>

          {currentExercise.audioText && (
            <button
              onClick={() => speakSpanish(currentExercise.audioText || '', stats.accent)}
              className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition shadow"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* EXERCISE TYPE: MULTIPLE CHOICE or FILL-IN-THE-BLANK or LISTENING */}
        {(currentExercise.type === 'multiple-choice' ||
          currentExercise.type === 'fill-in-the-blank' ||
          currentExercise.type === 'listening') && (
          <div className="grid grid-cols-1 gap-2.5">
            {currentExercise.options?.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnStyle = 'bg-stone-950 border-stone-800 text-stone-200 hover:border-amber-500/50 hover:bg-stone-800/60';

              if (isSelected) {
                btnStyle = 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold';
              }

              if (isAnswerChecked) {
                if (option === currentExercise.correctAnswer) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnswerChecked) {
                      setSelectedOption(option);
                      playSoundEffect('click');
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-stone-800 flex items-center justify-center text-xs text-stone-400 font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {/* Audio button for option if listening */}
                  {currentExercise.type !== 'listening' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(option, stats.accent);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* EXERCISE TYPE: SENTENCE BUILDER */}
        {currentExercise.type === 'sentence-builder' && (
          <div className="flex flex-col gap-6">
            {/* Target Constructed Sentence Slot */}
            <div className="min-h-[70px] p-4 rounded-2xl bg-stone-950 border-2 border-dashed border-stone-800 flex flex-wrap items-center gap-2">
              {selectedTokens.length === 0 ? (
                <span className="text-xs text-stone-400 italic">Tap words below to assemble the Spanish sentence in order...</span>
              ) : (
                selectedTokens.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveToken(token, idx)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow animate-in zoom-in-75 duration-150 hover:bg-amber-400 transition"
                  >
                    {token}
                  </button>
                ))
              )}
            </div>

            {/* Available Word Tiles */}
            <div className="flex flex-wrap gap-2.5">
              {availableTokens.map((token, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectToken(token, idx)}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-sm font-semibold shadow-sm transition active:scale-95"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EXERCISE TYPE: MATCH PAIRS */}
        {currentExercise.type === 'match-pairs' && currentExercise.pairs && (
          <div className="grid grid-cols-2 gap-4">
            {/* Spanish Column */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-stone-400">Spanish</span>
              {currentExercise.pairs.map((p, idx) => {
                const isMatched = matchedPairs.has(p.spanish);
                const isSelected = selectedSpanishPair === p.spanish;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSpanishPairClick(p.spanish)}
                    disabled={isMatched}
                    className={`p-3.5 rounded-2xl border text-sm font-medium transition ${
                      isMatched
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 opacity-60'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {p.spanish}
                  </button>
                );
              })}
            </div>

            {/* English Column */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-stone-400">English</span>
              {currentExercise.pairs
                .map((p) => p.english)
                .sort(() => 0.5 - Math.random())
                .map((en, idx) => {
                  const isMatched = Array.from(matchedPairs).some(
                    (sp) => currentExercise.pairs?.find((p) => p.spanish === sp)?.english === en
                  );
                  const isSelected = selectedEnglishPair === en;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleEnglishPairClick(en)}
                      disabled={isMatched}
                      className={`p-3.5 rounded-2xl border text-sm font-medium transition ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 opacity-60'
                          : isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-stone-950 border-stone-800 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      {en}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Feedback Banner & Action Button */}
      {isAnswerChecked ? (
        <div
          className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-3 duration-200 ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isCorrect ? 'bg-emerald-500 text-stone-950' : 'bg-rose-500 text-stone-950'
              }`}
            >
              {isCorrect ? <Check className="w-5 h-5 stroke-[3]" /> : <X className="w-5 h-5 stroke-[3]" />}
            </div>
            <div>
              <div className="font-extrabold text-sm">
                {isCorrect ? '¡Excelente! Correcto' : 'Respuesta incorrecta'}
              </div>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                {currentExercise.explanation}
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs transition shadow-lg shrink-0 ${
              isCorrect
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                : 'bg-rose-500 hover:bg-rose-400 text-stone-950'
            }`}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <button
            onClick={handleCheckAnswer}
            disabled={
              currentExercise.type === 'sentence-builder'
                ? selectedTokens.length === 0
                : currentExercise.type === 'match-pairs'
                ? false
                : !selectedOption
            }
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-black text-sm transition shadow-lg"
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
};
