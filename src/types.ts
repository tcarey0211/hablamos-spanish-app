export type LearningTrack = 'travel' | 'medical' | 'business' | 'conversational' | 'grammar';

export type UserLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type SpanishAccent = 'es-ES' | 'es-MX' | 'es-AR';

export type ExerciseType = 
  | 'multiple-choice' 
  | 'sentence-builder' 
  | 'fill-in-the-blank' 
  | 'listening' 
  | 'match-pairs'
  | 'conjugation';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  question?: string;
  spanishText?: string;
  englishTranslation?: string;
  options?: string[];
  correctAnswer: string;
  sentenceTokens?: string[]; // for sentence-builder tile ordering
  pairs?: { spanish: string; english: string }[]; // for match-pairs
  audioText?: string;
  hint?: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  trackId: LearningTrack;
  unit: number;
  unitTitle: string;
  title: string;
  description: string;
  level: UserLevel;
  iconName: string;
  estimatedMinutes: number;
  xpReward: number;
  exercises: Exercise[];
  keyVocabulary: { spanish: string; english: string; audio?: string }[];
  grammarNotes?: string;
}

export interface RoleplayScenario {
  id: string;
  trackId: LearningTrack;
  title: string;
  tag: string;
  description: string;
  level: UserLevel;
  location: string;
  avatar: string;
  aiRole: string;
  userRole: string;
  starterMessage: string;
  starterTranslation: string;
  starterPromptHint: string;
  promptSuggestions: string[];
  culturalNote?: string;
}

export interface StoryWord {
  word: string;
  translation: string;
  partOfSpeech?: string;
  grammarNote?: string;
}

export interface StoryParagraph {
  speaker?: string;
  words: StoryWord[];
  fullSpanish: string;
  fullEnglish: string;
}

export interface Story {
  id: string;
  trackId: LearningTrack;
  title: string;
  titleTranslation: string;
  level: UserLevel;
  category: string;
  coverGradient: string;
  durationMinutes: number;
  synopsis: string;
  paragraphs: StoryParagraph[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Flashcard {
  id: string;
  trackId: LearningTrack;
  spanish: string;
  english: string;
  gender?: 'el' | 'la' | 'los' | 'las' | 'n/a';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'adverb';
  exampleSpanish: string;
  exampleEnglish: string;
  culturalNote?: string;
  repetitions: number;
  interval: number;
  easeFactor: number;
  lastReviewed?: number;
}

export interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  headline: string;
  accent: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  specialties: string[];
  bio: string;
  platform: 'iTalki' | 'Preply' | 'Verbling';
  affiliateUrl: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastActiveDate: string;
  gems: number;
  hearts: number;
  maxHearts: number;
  completedLessons: string[]; // lesson ids
  completedStories: string[]; // story ids
  completedRoleplays: string[]; // scenario ids
  flashcardsLearned: string[];
  isPro: boolean;
  accent: SpanishAccent;
  speechRate: number;
  soundEffects: boolean;
  showAds: boolean;
  activeTrack: LearningTrack;
  dailyGoalXp: number;
  todayXp: number;
}
