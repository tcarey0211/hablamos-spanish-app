import { UserStats } from '../types';

const STORAGE_KEY = 'hablamos_user_stats_v1';

export const DEFAULT_USER_STATS: UserStats = {
  xp: 140,
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  gems: 350,
  hearts: 5,
  maxHearts: 5,
  completedLessons: ['travel-1-greetings'],
  completedStories: [],
  completedRoleplays: [],
  flashcardsLearned: ['fc-1', 'fc-2'],
  isPro: false,
  accent: 'es-ES',
  speechRate: 0.95,
  soundEffects: true,
  showAds: true,
  activeTrack: 'travel',
  dailyGoalXp: 50,
  todayXp: 25
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_STATS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER_STATS, ...parsed };
  } catch (err) {
    console.error('Failed to load user stats from localStorage', err);
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save user stats to localStorage', err);
  }
}
