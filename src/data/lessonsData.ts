import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ==========================================
  // TRACK 1: TRAVEL & EVERYDAY SPANISH
  // ==========================================
  {
    id: 'travel-1-greetings',
    trackId: 'travel',
    unit: 1,
    unitTitle: 'Essential Foundations',
    title: 'Warm Greetings & Polite Introductions',
    description: 'Master first impressions, asking names, and polite conversational phrases across Latin America & Spain.',
    level: 'A1',
    iconName: 'Sparkles',
    estimatedMinutes: 4,
    xpReward: 25,
    keyVocabulary: [
      { spanish: '¡Buenos días!', english: 'Good morning!' },
      { spanish: '¿Cómo te llamas?', english: 'What is your name?' },
      { spanish: 'Mucho gusto', english: 'Nice to meet you' },
      { spanish: 'Por favor / Gracias', english: 'Please / Thank you' },
      { spanish: '¿De dónde eres?', english: 'Where are you from?' }
    ],
    grammarNotes: 'In Spanish, inverted question (¿) and exclamation (¡) marks open every interrogative and exclamatory sentence.',
    exercises: [
      {
        id: 'tr1-e1',
        type: 'multiple-choice',
        prompt: 'Select the natural morning greeting in Spanish:',
        options: ['¡Buenos días!', '¡Buenas noches!', 'Hasta luego', 'Por favor'],
        correctAnswer: '¡Buenos días!',
        audioText: '¡Buenos días!',
        explanation: "'Buenos días' literally means 'good days' and is used until midday."
      },
      {
        id: 'tr1-e2',
        type: 'sentence-builder',
        prompt: 'Construct the sentence: "Nice to meet you, my name is Alex"',
        sentenceTokens: ['Mucho', 'gusto,', 'me', 'llamo', 'Alex', 'cómo', 'dónde'],
        correctAnswer: 'Mucho gusto, me llamo Alex',
        audioText: 'Mucho gusto, me llamo Alex',
        explanation: "'Me llamo' translates to 'I call myself' (My name is)."
      },
      {
        id: 'tr1-e3',
        type: 'fill-in-the-blank',
        prompt: 'Complete the question: "¿Cómo ___ llamas?" (What is your name?)',
        options: ['te', 'se', 'me', 'le'],
        correctAnswer: 'te',
        audioText: '¿Cómo te llamas?',
        explanation: "'Te' is the informal reflexive pronoun for 'tú' (you)."
      },
      {
        id: 'tr1-e4',
        type: 'listening',
        prompt: 'Listen to the audio and choose what was said:',
        audioText: 'Encantado de conocerte, ¿de dónde eres?',
        options: [
          'Encantado de conocerte, ¿de dónde eres?',
          'Buenos días a todos, ¿cómo estás?',
          'Muchas gracias por la comida de hoy',
          'Hasta mañana por la tarde, amigo'
        ],
        correctAnswer: 'Encantado de conocerte, ¿de dónde eres?',
        explanation: "'Encantado de conocerte' is an elegant way to say 'Delighted to meet you'."
      },
      {
        id: 'tr1-e5',
        type: 'match-pairs',
        prompt: 'Match the Spanish greetings to their English equivalents:',
        pairs: [
          { spanish: 'Hasta pronto', english: 'See you soon' },
          { spanish: 'Disculpe', english: 'Excuse me' },
          { spanish: 'De nada', english: "You're welcome" },
          { spanish: 'Buenas tardes', english: 'Good afternoon' }
        ],
        correctAnswer: 'all-matched',
        explanation: 'Excellent recall of courteous conversational expressions!'
      }
    ]
  },
  {
    id: 'travel-2-restaurant',
    trackId: 'travel',
    unit: 1,
    unitTitle: 'Essential Foundations',
    title: 'Ordering at Cafés & Tapas Bars',
    description: 'Learn how to order food, ask for recommendations, request the bill, and express dietary preferences.',
    level: 'A1',
    iconName: 'Utensils',
    estimatedMinutes: 5,
    xpReward: 30,
    keyVocabulary: [
      { spanish: 'Quisiera / Me gustaría', english: 'I would like...' },
      { spanish: 'La cuenta, por favor', english: 'The check/bill, please' },
      { spanish: 'Una mesa para dos', english: 'A table for two' },
      { spanish: '¿Qué recomienda?', english: 'What do you recommend?' },
      { spanish: 'Sin gluten / Vegetariano', english: 'Gluten-free / Vegetarian' }
    ],
    exercises: [
      {
        id: 'tr2-e1',
        type: 'multiple-choice',
        prompt: 'How do you politely ask for the check at the end of a meal?',
        options: ['La cuenta, por favor', 'Quiero pagar ya', '¿Cuánto dinero?', 'Dame la comida'],
        correctAnswer: 'La cuenta, por favor',
        audioText: 'La cuenta, por favor',
        explanation: "'La cuenta, por favor' is the universal polite standard across all Spanish-speaking countries."
      },
      {
        id: 'tr2-e2',
        type: 'sentence-builder',
        prompt: 'Assemble: "I would like a table for two people, please"',
        sentenceTokens: ['Quisiera', 'una', 'mesa', 'para', 'dos', 'personas,', 'por', 'favor', 'cuenta'],
        correctAnswer: 'Quisiera una mesa para dos personas, por favor',
        audioText: 'Quisiera una mesa para dos personas, por favor',
        explanation: "'Quisiera' is the polite imperfect subjunctive form of 'querer', meaning 'I would like'."
      },
      {
        id: 'tr2-e3',
        type: 'fill-in-the-blank',
        prompt: 'Fill in the missing word: "¿Tiene opciones para personas con alergia al ___?" (peanuts)',
        options: ['cacahuate / maní', 'agua', 'pan', 'vino'],
        correctAnswer: 'cacahuate / maní',
        audioText: '¿Tiene opciones para personas con alergia al maní?',
        explanation: "'Maní' (South America) and 'cacahuate' (Mexico) both mean peanut."
      }
    ]
  },
  {
    id: 'travel-3-directions',
    trackId: 'travel',
    unit: 2,
    unitTitle: 'City Navigation & Transport',
    title: 'Finding Your Way & Public Transit',
    description: 'Navigate metros, taxis, bus stations, and ask locals for directions with ease.',
    level: 'A2',
    iconName: 'Compass',
    estimatedMinutes: 5,
    xpReward: 30,
    keyVocabulary: [
      { spanish: 'A la derecha / A la izquierda', english: 'To the right / To the left' },
      { spanish: 'Todo recto', english: 'Straight ahead' },
      { spanish: '¿Dónde queda la estación?', english: 'Where is the station located?' },
      { spanish: 'Un boleto de ida y vuelta', english: 'A round-trip ticket' }
    ],
    exercises: [
      {
        id: 'tr3-e1',
        type: 'multiple-choice',
        prompt: 'If someone tells you "Gira a la izquierda y sigue todo recto", what should you do?',
        options: [
          'Turn left and continue straight ahead',
          'Turn right and stop immediately',
          'Go back two blocks',
          'Take the subway on the right'
        ],
        correctAnswer: 'Turn left and continue straight ahead',
        audioText: 'Gira a la izquierda y sigue todo recto',
        explanation: "'Izquierda' = Left, 'Derecha' = Right, 'Todo recto' = Straight ahead."
      },
      {
        id: 'tr3-e2',
        type: 'sentence-builder',
        prompt: 'Order the words: "¿Dónde está la parada de autobús más cercana?"',
        sentenceTokens: ['¿Dónde', 'está', 'la', 'parada', 'de', 'autobús', 'más', 'cercana?', 'ir'],
        correctAnswer: '¿Dónde está la parada de autobús más cercana?',
        audioText: '¿Dónde está la parada de autobús más cercana?',
        explanation: "'Más cercana' means 'closest / nearest'."
      }
    ]
  },

  // ==========================================
  // TRACK 2: MEDICAL SPANISH FOR HEALTHCARE
  // ==========================================
  {
    id: 'med-1-intake',
    trackId: 'medical',
    unit: 1,
    unitTitle: 'Clinical Triage & Patient Intake',
    title: 'Patient Intake & Pain Assessment',
    description: 'Learn vital questions for nurses, doctors, and EMS to assess pain location, severity scale (1-10), and medical history.',
    level: 'A2',
    iconName: 'Stethoscope',
    estimatedMinutes: 6,
    xpReward: 40,
    keyVocabulary: [
      { spanish: '¿Dónde le duele?', english: 'Where does it hurt?' },
      { spanish: 'En una escala del 1 al 10', english: 'On a scale from 1 to 10' },
      { spanish: 'Dolor punzante / agudo', english: 'Stabbing / sharp pain' },
      { spanish: 'Dolor opresivo / sordo', english: 'Crushing / dull ache' },
      { spanish: '¿Es alérgico a algún medicamento?', english: 'Are you allergic to any medication?' }
    ],
    grammarNotes: 'Notice the use of "Le" (formal third-person) when addressing adult patients respectfully in clinical encounters.',
    exercises: [
      {
        id: 'med1-e1',
        type: 'multiple-choice',
        prompt: 'How do you ask a patient: "Where does it hurt, and since when?"',
        options: [
          '¿Dónde le duele y desde cuándo?',
          '¿Por qué tiene dolor hoy?',
          '¿Quién tiene el dolor fuerte?',
          '¿Cómo se llama su dolor?'
        ],
        correctAnswer: '¿Dónde le duele y desde cuándo?',
        audioText: '¿Dónde le duele y desde cuándo?',
        explanation: "'Doler' works like 'gustar' (le duele = it causes pain to you)."
      },
      {
        id: 'med1-e2',
        type: 'sentence-builder',
        prompt: 'Assemble: "En una escala del uno al diez, ¿cuánto dolor tiene?"',
        sentenceTokens: ['En', 'una', 'escala', 'del', 'uno', 'al', 'diez,', '¿cuánto', 'dolor', 'tiene?', 'fuerte'],
        correctAnswer: 'En una escala del uno al diez, ¿cuánto dolor tiene?',
        audioText: 'En una escala del uno al diez, ¿cuánto dolor tiene?',
        explanation: "Standard pain scale assessment question used globally."
      },
      {
        id: 'med1-e3',
        type: 'multiple-choice',
        prompt: 'A patient says: "Siento una presión muy fuerte en el pecho y me cuesta respirar." What are they describing?',
        options: [
          'Chest pressure and difficulty breathing (potential cardiac red flag)',
          'A mild headache and sore throat',
          'Stomach cramps after eating dinner',
          'Sprained ankle after running'
        ],
        correctAnswer: 'Chest pressure and difficulty breathing (potential cardiac red flag)',
        audioText: 'Siento una presión muy fuerte en el pecho y me cuesta respirar.',
        explanation: "'Presión en el pecho' = Chest pressure, 'Me cuesta respirar' = I have difficulty breathing."
      },
      {
        id: 'med1-e4',
        type: 'fill-in-the-blank',
        prompt: 'Complete the vital triage check: "¿Toma usted algún ___ actualmente?" (medication)',
        options: ['medicamento', 'enfermedad', 'presión', 'inyección'],
        correctAnswer: 'medicamento',
        audioText: '¿Toma usted algún medicamento actualmente?',
        explanation: "'Medicamento' or 'medicina' both refer to prescription drugs."
      }
    ]
  },
  {
    id: 'med-2-exam',
    trackId: 'medical',
    unit: 1,
    unitTitle: 'Clinical Triage & Patient Intake',
    title: 'Physical Examination Commands & Instructions',
    description: 'Guide patients during physical exams: deep breaths, relaxing muscles, swallowing, and checking reflexes.',
    level: 'B1',
    iconName: 'Activity',
    estimatedMinutes: 5,
    xpReward: 40,
    keyVocabulary: [
      { spanish: 'Respire profundo y mantenga el aire', english: 'Breathe deeply and hold your breath' },
      { spanish: 'Abra la boca y diga "Ah"', english: 'Open your mouth and say "Ah"' },
      { spanish: 'Trague saliva, por favor', english: 'Swallow, please' },
      { spanish: 'Dígame si siente dolor cuando presiono aquí', english: 'Tell me if you feel pain when I press here' }
    ],
    exercises: [
      {
        id: 'med2-e1',
        type: 'multiple-choice',
        prompt: 'What command tells a patient to take a deep breath through their mouth?',
        options: [
          'Respire profundo por la boca',
          'Cierre los ojos rápidamente',
          'Tome agua despacio',
          'Levántese de la camilla'
        ],
        correctAnswer: 'Respire profundo por la boca',
        audioText: 'Respire profundo por la boca',
        explanation: "'Respire' is the formal imperative (command) of 'respirar'."
      },
      {
        id: 'med2-e2',
        type: 'sentence-builder',
        prompt: 'Form the sentence: "Por favor, túmbese boca arriba en la camilla"',
        sentenceTokens: ['Por', 'favor,', 'túmbese', 'boca', 'arriba', 'en', 'la', 'camilla', 'sentado'],
        correctAnswer: 'Por favor, túmbese boca arriba en la camilla',
        audioText: 'Por favor, túmbese boca arriba en la camilla',
        explanation: "'Boca arriba' = Face up (supine position), 'Camilla' = Examination table / gurney."
      }
    ]
  },

  // ==========================================
  // TRACK 3: BUSINESS & WORKPLACE SPANISH
  // ==========================================
  {
    id: 'biz-1-meetings',
    trackId: 'business',
    unit: 1,
    unitTitle: 'Professional Communication',
    title: 'Leading Meetings & Pitching Proposals',
    description: 'Professional terminology for setting agendas, discussing deliverables, deadlines, and project milestones.',
    level: 'B1',
    iconName: 'Briefcase',
    estimatedMinutes: 5,
    xpReward: 35,
    keyVocabulary: [
      { spanish: 'El objetivo de la reunión', english: 'The goal of the meeting' },
      { spanish: 'La fecha límite de entrega', english: 'The delivery deadline' },
      { spanish: 'Alinear prioridades', english: 'Align priorities' },
      { spanish: 'Presupuesto y rentabilidad', english: 'Budget and profitability' },
      { spanish: 'Propuesta de valor', english: 'Value proposition' }
    ],
    exercises: [
      {
        id: 'biz1-e1',
        type: 'multiple-choice',
        prompt: 'Select the professional phrase for: "Let\'s schedule a follow-up meeting for next Tuesday":',
        options: [
          'Programemos una reunión de seguimiento para el próximo martes.',
          'Hablemos rápido el martes.',
          'Quiero verte el martes.',
          'El martes hacemos una llamada corta.'
        ],
        correctAnswer: 'Programemos una reunión de seguimiento para el próximo martes.',
        audioText: 'Programemos una reunión de seguimiento para el próximo martes.',
        explanation: "'Reunión de seguimiento' is the standard corporate term for 'follow-up meeting'."
      },
      {
        id: 'biz1-e2',
        type: 'sentence-builder',
        prompt: 'Build the phrase: "Debemos revisar el presupuesto antes de la fecha límite"',
        sentenceTokens: ['Debemos', 'revisar', 'el', 'presupuesto', 'antes', 'de', 'la', 'fecha', 'límite', 'ahora'],
        correctAnswer: 'Debemos revisar el presupuesto antes de la fecha límite',
        audioText: 'Debemos revisar el presupuesto antes de la fecha límite',
        explanation: "'Presupuesto' = Budget, 'Fecha límite' = Deadline."
      }
    ]
  },
  {
    id: 'biz-2-negotiation',
    trackId: 'business',
    unit: 1,
    unitTitle: 'Professional Communication',
    title: 'Negotiation & Contract Agreements',
    description: 'Master tactful bargaining, payment terms, closing deals, and mutual partnerships.',
    level: 'B2',
    iconName: 'TrendingUp',
    estimatedMinutes: 6,
    xpReward: 40,
    keyVocabulary: [
      { spanish: 'Llegar a un acuerdo mutuo', english: 'Reach a mutual agreement' },
      { spanish: 'Términos y condiciones', english: 'Terms and conditions' },
      { spanish: 'Cláusula de rescisión', english: 'Termination clause' },
      { spanish: 'Margen de beneficio', english: 'Profit margin' }
    ],
    exercises: [
      {
        id: 'biz2-e1',
        type: 'multiple-choice',
        prompt: 'How do you state: "We are willing to offer a discount if you sign an annual contract"?',
        options: [
          'Estamos dispuestos a ofrecer un descuento si firman un contrato anual.',
          'Paguen menos si compran un año.',
          'El contrato es muy barato hoy.',
          'Hacemos ofertas a todos los clientes.'
        ],
        correctAnswer: 'Estamos dispuestos a ofrecer un descuento si firman un contrato anual.',
        audioText: 'Estamos dispuestos a ofrecer un descuento si firman un contrato anual.',
        explanation: "'Estar dispuesto a...' is the polished business formula for 'To be willing to...'"
      }
    ]
  },

  // ==========================================
  // TRACK 4: GRAMMAR & CONJUGATION MASTERY
  // ==========================================
  {
    id: 'gram-1-ser-estar',
    trackId: 'grammar',
    unit: 1,
    unitTitle: 'Verbs & Structural Logic',
    title: 'Ser vs. Estar (Permanent vs. State)',
    description: 'Master the fundamental difference between identity/essence (Ser) and condition/location/emotion (Estar).',
    level: 'A1',
    iconName: 'Layers',
    estimatedMinutes: 5,
    xpReward: 30,
    keyVocabulary: [
      { spanish: 'Soy de Madrid (Origen - Ser)', english: 'I am from Madrid' },
      { spanish: 'Estoy en Madrid (Ubicación - Estar)', english: 'I am in Madrid right now' },
      { spanish: 'Ella es lista (Inteligente - Ser)', english: 'She is clever/smart' },
      { spanish: 'Ella está lista (Preparada - Estar)', english: 'She is ready' }
    ],
    grammarNotes: 'Mnemonic DOCTOR (Description, Occupation, Characteristic, Time, Origin, Relationship) for SER vs PLACE (Position, Location, Action, Condition, Emotion) for ESTAR.',
    exercises: [
      {
        id: 'gram1-e1',
        type: 'multiple-choice',
        prompt: 'Choose the correct verb for: "Carlos ___ médico, pero hoy ___ cansado."',
        options: [
          'es / está',
          'está / es',
          'es / es',
          'está / está'
        ],
        correctAnswer: 'es / está',
        audioText: 'Carlos es médico, pero hoy está cansado.',
        explanation: "Occupation takes SER ('es médico'), while current physical state takes ESTAR ('está cansado')."
      },
      {
        id: 'gram1-e2',
        type: 'fill-in-the-blank',
        prompt: 'Select the right form: "La sopa ___ deliciosa hoy." (Condition right now)',
        options: ['está', 'es', 'son', 'están'],
        correctAnswer: 'está',
        audioText: 'La sopa está deliciosa hoy.',
        explanation: "When praising how food tastes at this moment, native speakers use 'está rica/deliciosa'."
      },
      {
        id: 'gram1-e3',
        type: 'conjugation',
        prompt: 'Match the pronouns with the correct form of ESTAR in the present tense:',
        pairs: [
          { spanish: 'Yo', english: 'estoy' },
          { spanish: 'Tú', english: 'estás' },
          { spanish: 'Él/Ella', english: 'está' },
          { spanish: 'Nosotros', english: 'estamos' }
        ],
        correctAnswer: 'all-matched',
        explanation: 'Present tense conjugation of ESTAR.'
      }
    ]
  },
  {
    id: 'gram-2-preterite-imperfect',
    trackId: 'grammar',
    unit: 1,
    unitTitle: 'Verbs & Structural Logic',
    title: 'Preterite vs. Imperfect Past Tenses',
    description: 'Understand when to use completed past events (Pretérito) vs ongoing background scenes & habits (Imperfecto).',
    level: 'B1',
    iconName: 'History',
    estimatedMinutes: 6,
    xpReward: 35,
    keyVocabulary: [
      { spanish: 'Ayer comí paella (Pretérito)', english: 'Yesterday I ate paella (single event)' },
      { spanish: 'Cuando era niño, jugaba fútbol (Imperfecto)', english: 'When I was a kid, I used to play soccer (habit)' }
    ],
    exercises: [
      {
        id: 'gram2-e1',
        type: 'multiple-choice',
        prompt: 'Complete: "Mientras yo ___ (leer), el teléfono ___ (sonar)."',
        options: [
          'leía / sonó',
          'leí / sonaba',
          'leí / sonó',
          'leía / sonaba'
        ],
        correctAnswer: 'leía / sonó',
        audioText: 'Mientras yo leía, el teléfono sonó.',
        explanation: "Background ongoing action uses imperfect ('leía'), interrupted by a sudden completed action in preterite ('sonó')."
      }
    ]
  }
];
