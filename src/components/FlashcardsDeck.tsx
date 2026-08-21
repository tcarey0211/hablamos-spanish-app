import React, { useState } from 'react';
import { 
  Volume2, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { Flashcard, LearningTrack, UserStats } from '../types';
import { FLASHCARDS } from '../data/flashcardsData';
import { speakSpanish, playSoundEffect } from '../utils/speech';

interface FlashcardsDeckProps {
  activeTrack: LearningTrack;
  stats: UserStats;
  onUpdateStats: (partial: Partial<UserStats>) => void;
}

export const FlashcardsDeck: React.FC<FlashcardsDeckProps> = ({
  activeTrack,
  stats,
  onUpdateStats,
}) => {
  const filteredCards = FLASHCARDS.filter((c) => c.trackId === activeTrack);
  const deck = filteredCards.length > 0 ? filteredCards : FLASHCARDS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCardsCount, setReviewedCardsCount] = useState(0);

  const currentCard = deck[currentIndex] || deck[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playSoundEffect('pop');
  };

  const handleSRSResponse = (quality: 'again' | 'hard' | 'good' | 'easy') => {
    playSoundEffect('click');
    setReviewedCardsCount((prev) => prev + 1);
    setIsFlipped(false);

    // Reward XP
    onUpdateStats({
      xp: stats.xp + (quality === 'easy' ? 10 : 5),
      todayXp: stats.todayXp + (quality === 'easy' ? 10 : 5),
      flashcardsLearned: Array.from(new Set([...stats.flashcardsLearned, currentCard.id])),
    });

    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6 items-center animate-in fade-in duration-300">
      {/* Top Deck Info */}
      <div className="w-full flex items-center justify-between px-2 text-xs text-stone-400">
        <div className="flex items-center gap-1.5 font-semibold text-stone-300">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Card {currentIndex + 1} of {deck.length}</span>
        </div>
        <div>
          <span>{reviewedCardsCount} reviewed today</span>
        </div>
      </div>

      {/* 3D Flip Flashcard */}
      <div
        onClick={handleFlip}
        className="w-full h-80 sm:h-96 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer hover:border-amber-500/40 transition-all duration-300 relative group select-none"
      >
        {/* Top Tag */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-400 border border-stone-700 uppercase tracking-wider">
            {currentCard.gender ? `${currentCard.gender} • ` : ''}{currentCard.partOfSpeech}
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              speakSpanish(currentCard.spanish, stats.accent);
            }}
            className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition shadow"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Center Content: Front (Spanish) vs Back (English & Context) */}
        {!isFlipped ? (
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight">
              {currentCard.spanish}
            </h2>
            <p className="text-xs text-stone-500 mt-4 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tap to flip and reveal English meaning</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center my-auto animate-in zoom-in-95 duration-200">
            <div className="text-xs text-amber-400 uppercase font-bold tracking-wider">English Definition</div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">
              {currentCard.english}
            </h2>

            {/* Example sentence */}
            <div className="mt-4 p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-left w-full">
              <div className="font-semibold text-stone-200 flex items-center justify-between">
                <span>"{currentCard.exampleSpanish}"</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(currentCard.exampleSpanish, stats.accent);
                  }}
                  className="text-amber-400 hover:text-amber-300 p-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-stone-400 mt-0.5 italic">"{currentCard.exampleEnglish}"</div>
            </div>

            {currentCard.culturalNote && (
              <div className="text-[11px] text-amber-300/80 mt-2 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                💡 {currentCard.culturalNote}
              </div>
            )}
          </div>
        )}

        {/* Bottom indicator */}
        <div className="text-center text-[11px] text-stone-500">
          {isFlipped ? 'Rate your recall below' : 'Spaced Repetition Flashcard'}
        </div>
      </div>

      {/* SRS Recall Action Buttons */}
      {isFlipped ? (
        <div className="grid grid-cols-4 gap-2 w-full animate-in slide-in-from-bottom-2 duration-150">
          <button
            onClick={() => handleSRSResponse('again')}
            className="py-3 px-2 rounded-2xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs flex flex-col items-center gap-1 transition"
          >
            <span>Again</span>
            <span className="text-[10px] text-rose-400/70">&lt; 1 day</span>
          </button>

          <button
            onClick={() => handleSRSResponse('hard')}
            className="py-3 px-2 rounded-2xl bg-orange-950/60 hover:bg-orange-900 border border-orange-800 text-orange-300 font-bold text-xs flex flex-col items-center gap-1 transition"
          >
            <span>Hard</span>
            <span className="text-[10px] text-orange-400/70">3 days</span>
          </button>

          <button
            onClick={() => handleSRSResponse('good')}
            className="py-3 px-2 rounded-2xl bg-amber-950/60 hover:bg-amber-900 border border-amber-800 text-amber-300 font-bold text-xs flex flex-col items-center gap-1 transition"
          >
            <span>Good</span>
            <span className="text-[10px] text-amber-400/70">7 days</span>
          </button>

          <button
            onClick={() => handleSRSResponse('easy')}
            className="py-3 px-2 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-bold text-xs flex flex-col items-center gap-1 transition"
          >
            <span>Easy</span>
            <span className="text-[10px] text-emerald-400/70">14 days</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-300 text-xs font-semibold flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleFlip}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow"
          >
            Reveal Answer
          </button>

          <button
            onClick={() => {
              if (currentIndex + 1 < deck.length) setCurrentIndex(currentIndex + 1);
            }}
            disabled={currentIndex + 1 >= deck.length}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-300 text-xs font-semibold flex items-center gap-1 transition"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
