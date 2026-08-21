import { TutorProfile } from '../types';

export const TUTORS: TutorProfile[] = [
  {
    id: 'tutor-1',
    name: 'Valentina Morales',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    country: 'Spain',
    flag: '🇪🇸',
    headline: 'Certified DELE Examiner & Castilian Spanish Specialist',
    accent: 'Castilian (Madrid / Spain)',
    rating: 4.98,
    reviewsCount: 412,
    hourlyRate: 24,
    specialties: ['DELE Prep', 'Conversation Fluency', 'Castilian Pronunciation', 'Literature'],
    bio: 'Over 8 years helping adult professionals achieve effortless conversational fluency and pass DELE B2/C1 exams with distinction.',
    platform: 'iTalki',
    affiliateUrl: 'https://www.italki.com'
  },
  {
    id: 'tutor-2',
    name: 'Dr. Javier Cordero',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    country: 'Mexico',
    flag: '🇲🇽',
    headline: 'Bilingual Physician & Medical Spanish Instructor',
    accent: 'Neutral Latin American (Mexico City)',
    rating: 5.0,
    reviewsCount: 289,
    hourlyRate: 32,
    specialties: ['Medical Spanish', 'Clinical Triage', 'Nursing Communication', 'Hospital ER'],
    bio: 'Practicing physician in CDMX. I train US and international doctors, nurses, and EMTs in culturally-competent medical Spanish.',
    platform: 'Preply',
    affiliateUrl: 'https://preply.com'
  },
  {
    id: 'tutor-3',
    name: 'Camila Rossi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces',
    country: 'Argentina',
    flag: '🇦🇷',
    headline: 'Corporate Communications & Tech Business Spanish',
    accent: 'Rioplatense (Buenos Aires)',
    rating: 4.95,
    reviewsCount: 350,
    hourlyRate: 26,
    specialties: ['Business Spanish', 'Interview Coaching', 'Negotiation', 'Tech & Startups'],
    bio: 'Former McKinsey communications coach. I prepare executives and engineers for interviews and presentations across Latin America.',
    platform: 'iTalki',
    affiliateUrl: 'https://www.italki.com'
  }
];
