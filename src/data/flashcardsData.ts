import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // Everyday / Travel
  {
    id: 'fc-1',
    trackId: 'travel',
    spanish: 'la cuenta',
    english: 'the check / bill',
    gender: 'la',
    partOfSpeech: 'noun',
    exampleSpanish: '¿Nos trae la cuenta, por favor?',
    exampleEnglish: 'Could you bring us the check, please?',
    culturalNote: 'In Spain and Mexico, waiters will rarely bring the check until you explicitly ask for it.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-2',
    trackId: 'travel',
    spanish: 'el pasaporte',
    english: 'the passport',
    gender: 'el',
    partOfSpeech: 'noun',
    exampleSpanish: 'Debe presentar el pasaporte en el mostrador.',
    exampleEnglish: 'You must present the passport at the counter.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-3',
    trackId: 'travel',
    spanish: 'disculpe',
    english: 'excuse me / pardon me (formal)',
    gender: 'n/a',
    partOfSpeech: 'phrase',
    exampleSpanish: 'Disculpe, ¿dónde queda el baño?',
    exampleEnglish: 'Excuse me, where is the restroom located?',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-4',
    trackId: 'travel',
    spanish: 'la propina',
    english: 'the tip / gratuity',
    gender: 'la',
    partOfSpeech: 'noun',
    exampleSpanish: 'Dejamos una buena propina por el excelente servicio.',
    exampleEnglish: 'We left a generous tip for the excellent service.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-5',
    trackId: 'travel',
    spanish: 'todo recto',
    english: 'straight ahead',
    gender: 'n/a',
    partOfSpeech: 'phrase',
    exampleSpanish: 'Camine dos cuadras todo recto.',
    exampleEnglish: 'Walk two blocks straight ahead.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },

  // Medical Spanish
  {
    id: 'fc-m1',
    trackId: 'medical',
    spanish: 'el dolor opresivo',
    english: 'crushing / pressure pain',
    gender: 'el',
    partOfSpeech: 'noun',
    exampleSpanish: '¿Siente un dolor opresivo en el pecho?',
    exampleEnglish: 'Do you feel a crushing pain in your chest?',
    culturalNote: 'Crucial clinical descriptor for ruling out acute myocardial infarction.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-m2',
    trackId: 'medical',
    spanish: 'la fiebre',
    english: 'the fever',
    gender: 'la',
    partOfSpeech: 'noun',
    exampleSpanish: 'Tiene fiebre alta de treinta y nueve grados.',
    exampleEnglish: 'He has a high fever of thirty-nine degrees (Celsius).',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-m3',
    trackId: 'medical',
    spanish: 'los antecedentes médicos',
    english: 'medical history / past medical history',
    gender: 'los',
    partOfSpeech: 'noun',
    exampleSpanish: 'Vamos a revisar sus antecedentes médicos familiares.',
    exampleEnglish: "Let's review your family medical history.",
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-m4',
    trackId: 'medical',
    spanish: 'la receta médica',
    english: 'the medical prescription',
    gender: 'la',
    partOfSpeech: 'noun',
    exampleSpanish: 'Lleve esta receta médica a la farmacia de guardia.',
    exampleEnglish: 'Take this prescription to the 24-hour on-duty pharmacy.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-m5',
    trackId: 'medical',
    spanish: 'mareado / mareada',
    english: 'dizzy / lightheaded',
    gender: 'n/a',
    partOfSpeech: 'adjective',
    exampleSpanish: 'Si se siente mareado, siéntese despacio.',
    exampleEnglish: 'If you feel dizzy, sit down slowly.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },

  // Business Spanish
  {
    id: 'fc-b1',
    trackId: 'business',
    spanish: 'la fecha límite',
    english: 'the deadline',
    gender: 'la',
    partOfSpeech: 'noun',
    exampleSpanish: 'La fecha límite para entregar el informe es este viernes.',
    exampleEnglish: 'The deadline to submit the report is this Friday.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-b2',
    trackId: 'business',
    spanish: 'el presupuesto',
    english: 'the budget',
    gender: 'el',
    partOfSpeech: 'noun',
    exampleSpanish: 'Aprobamos el nuevo presupuesto trimestral.',
    exampleEnglish: 'We approved the new quarterly budget.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-b3',
    trackId: 'business',
    spanish: 'el acuerdo mutuo',
    english: 'the mutual agreement',
    gender: 'el',
    partOfSpeech: 'noun',
    exampleSpanish: 'Llegamos a un acuerdo mutuo muy beneficioso.',
    exampleEnglish: 'We reached a very beneficial mutual agreement.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  },
  {
    id: 'fc-b4',
    trackId: 'business',
    spanish: 'los socios comerciales',
    english: 'business partners',
    gender: 'los',
    partOfSpeech: 'noun',
    exampleSpanish: 'Nuestros socios comerciales en Bogotá confirmaron la alianza.',
    exampleEnglish: 'Our business partners in Bogotá confirmed the alliance.',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5
  }
];
