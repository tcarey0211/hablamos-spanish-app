import { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'story-cafe-misterioso',
    trackId: 'travel',
    title: 'El Café de los Recuerdos',
    titleTranslation: 'The Café of Memories',
    level: 'A2',
    category: 'Mystery & Culture',
    coverGradient: 'from-amber-500 to-orange-600',
    durationMinutes: 4,
    synopsis: 'Lucía finds an antique journal left behind on an old mahogany table in an alley café in Granada, leading her to an unexpected family mystery.',
    paragraphs: [
      {
        speaker: 'Narrador',
        fullSpanish: 'Era una tarde lluviosa de otoño en Granada. Lucía entró a un pequeño café cerca de la Alhambra para tomar un chocolate caliente.',
        fullEnglish: 'It was a rainy autumn afternoon in Granada. Lucía entered a small café near the Alhambra to have a hot chocolate.',
        words: [
          { word: 'Era', translation: 'It was (imperfect of ser)' },
          { word: 'una', translation: 'a' },
          { word: 'tarde', translation: 'afternoon' },
          { word: 'lluviosa', translation: 'rainy' },
          { word: 'de', translation: 'of' },
          { word: 'otoño', translation: 'autumn / fall' },
          { word: 'en', translation: 'in' },
          { word: 'Granada.', translation: 'Granada (city in southern Spain).' },
          { word: 'Lucía', translation: 'Lucía' },
          { word: 'entró', translation: 'entered (preterite)' },
          { word: 'a', translation: 'to' },
          { word: 'un', translation: 'a' },
          { word: 'pequeño', translation: 'small' },
          { word: 'café', translation: 'coffee shop / café' },
          { word: 'cerca', translation: 'near' },
          { word: 'de', translation: 'of' },
          { word: 'la', translation: 'the' },
          { word: 'Alhambra', translation: 'Alhambra palace' },
          { word: 'para', translation: 'in order to' },
          { word: 'tomar', translation: 'to drink / have' },
          { word: 'un', translation: 'a' },
          { word: 'chocolate', translation: 'chocolate' },
          { word: 'caliente.', translation: 'hot.' }
        ]
      },
      {
        speaker: 'Narrador',
        fullSpanish: 'Sobre la mesa de madera oscura, vio un cuaderno de cuero antiguo con una flor seca en la portada.',
        fullEnglish: 'On the dark wooden table, she saw an antique leather notebook with a dried flower on the cover.',
        words: [
          { word: 'Sobre', translation: 'On / upon' },
          { word: 'la', translation: 'the' },
          { word: 'mesa', translation: 'table' },
          { word: 'de', translation: 'of' },
          { word: 'madera', translation: 'wood' },
          { word: 'oscura,', translation: 'dark,' },
          { word: 'vio', translation: 'she saw (preterite of ver)' },
          { word: 'un', translation: 'a' },
          { word: 'cuaderno', translation: 'notebook' },
          { word: 'de', translation: 'of' },
          { word: 'cuero', translation: 'leather' },
          { word: 'antiguo', translation: 'antique / old' },
          { word: 'con', translation: 'with' },
          { word: 'una', translation: 'a' },
          { word: 'flor', translation: 'flower' },
          { word: 'seca', translation: 'dried' },
          { word: 'en', translation: 'on' },
          { word: 'la', translation: 'the' },
          { word: 'portada.', translation: 'cover.' }
        ]
      },
      {
        speaker: 'Lucía',
        fullSpanish: '—¿De quién es esto? —preguntó Lucía al camarero. El camarero sonrió y dijo: —Un viejo pintor lo dejó aquí hace muchos años para quien ame las historias.',
        fullEnglish: '—"Whose is this?" Lucía asked the waiter. The waiter smiled and said: —"An old painter left it here many years ago for whoever loves stories."',
        words: [
          { word: '—¿De', translation: 'Whose (lit. of whom)' },
          { word: 'quién', translation: 'who' },
          { word: 'es', translation: 'is' },
          { word: 'esto?', translation: 'this?' },
          { word: '—preguntó', translation: 'asked (preterite)' },
          { word: 'Lucía', translation: 'Lucía' },
          { word: 'al', translation: 'to the (a + el)' },
          { word: 'camarero.', translation: 'waiter.' },
          { word: 'El', translation: 'The' },
          { word: 'camarero', translation: 'waiter' },
          { word: 'sonrió', translation: 'smiled' },
          { word: 'y', translation: 'and' },
          { word: 'dijo:', translation: 'said (preterite of decir):' },
          { word: '—Un', translation: 'An' },
          { word: 'viejo', translation: 'old' },
          { word: 'pintor', translation: 'painter' },
          { word: 'lo', translation: 'it' },
          { word: 'dejó', translation: 'left behind' },
          { word: 'aquí', translation: 'here' },
          { word: 'hace', translation: 'ago (makes time)' },
          { word: 'muchos', translation: 'many' },
          { word: 'años', translation: 'years' },
          { word: 'para', translation: 'for' },
          { word: 'quien', translation: 'whoever' },
          { word: 'ame', translation: 'loves (subjunctive of amar)' },
          { word: 'las', translation: 'the' },
          { word: 'historias.', translation: 'stories.' }
        ]
      }
    ],
    quiz: [
      {
        question: '¿Por qué entró Lucía al café en Granada?',
        options: [
          'Para tomar un chocolate caliente y protegerse de la lluvia',
          'Para buscar a su hermano',
          'Porque quería comprar un libro nuevo',
          'Para pintar un cuadro de la Alhambra'
        ],
        correctIndex: 0,
        explanation: 'Lucía entered because it was a rainy autumn afternoon and she wanted a hot chocolate.'
      },
      {
        question: '¿Quién dejó el cuaderno antiguo según el camarero?',
        options: [
          'Un viejo pintor hace muchos años',
          'El dueño del restaurante',
          'Un turista de Madrid ayer',
          'El abuelo de Lucía'
        ],
        correctIndex: 0,
        explanation: 'El camarero explicó que un viejo pintor lo dejó allí para quien ame las historias.'
      }
    ]
  },
  {
    id: 'story-guardia-medica',
    trackId: 'medical',
    title: 'Una Noche en Urgencias',
    titleTranslation: 'A Night in the Emergency Room',
    level: 'B1',
    category: 'Medical Drama',
    coverGradient: 'from-cyan-600 to-blue-700',
    durationMinutes: 5,
    synopsis: 'Dr. Martín faces a frantic emergency shift when a young athlete arrives with acute respiratory distress during a football tournament.',
    paragraphs: [
      {
        speaker: 'Narrador',
        fullSpanish: 'A las dos de la madrugada, las puertas de emergencias se abrieron con urgencia. Un joven futbolista no podía respirar adecuadamente.',
        fullEnglish: 'At two in the morning, the emergency doors opened urgently. A young soccer player could not breathe properly.',
        words: [
          { word: 'A', translation: 'At' },
          { word: 'las', translation: 'the' },
          { word: 'dos', translation: 'two' },
          { word: 'de', translation: 'of' },
          { word: 'la', translation: 'the' },
          { word: 'madrugada,', translation: 'early morning / dawn,' },
          { word: 'las', translation: 'the' },
          { word: 'puertas', translation: 'doors' },
          { word: 'de', translation: 'of' },
          { word: 'emergencias', translation: 'emergencies' },
          { word: 'se', translation: 'themselves' },
          { word: 'abrieron', translation: 'opened (preterite)' },
          { word: 'con', translation: 'with' },
          { word: 'urgencia.', translation: 'urgency.' },
          { word: 'Un', translation: 'A' },
          { word: 'joven', translation: 'young' },
          { word: 'futbolista', translation: 'soccer player' },
          { word: 'no', translation: 'not' },
          { word: 'podía', translation: 'could (imperfect)' },
          { word: 'respirar', translation: 'to breathe' },
          { word: 'adecuadamente.', translation: 'properly / adequately.' }
        ]
      },
      {
        speaker: 'Dr. Martín',
        fullSpanish: '—Tranquilo, muchacho. Colóquenle oxígeno inmediatamente y preparen una dosis de broncodilatador —indicó el doctor con calma profesional.',
        fullEnglish: '—"Stay calm, young man. Administer oxygen immediately and prepare a dose of bronchodilator," indicated the doctor with professional calm.',
        words: [
          { word: '—Tranquilo,', translation: 'Stay calm / easy,' },
          { word: 'muchacho.', translation: 'young man / boy.' },
          { word: 'Colóquenle', translation: 'Place on him (imperative)' },
          { word: 'oxígeno', translation: 'oxygen' },
          { word: 'inmediatamente', translation: 'immediately' },
          { word: 'y', translation: 'and' },
          { word: 'preparen', translation: 'prepare (formal plural)' },
          { word: 'una', translation: 'a' },
          { word: 'dosis', translation: 'dose' },
          { word: 'de', translation: 'of' },
          { word: 'broncodilatador', translation: 'bronchodilator' },
          { word: '—indicó', translation: 'indicated' },
          { word: 'el', translation: 'the' },
          { word: 'doctor', translation: 'doctor' },
          { word: 'con', translation: 'with' },
          { word: 'calma', translation: 'calm' },
          { word: 'profesional.', translation: 'professional.' }
        ]
      }
    ],
    quiz: [
      {
        question: '¿Cuál fue la primera indicación del Dr. Martín para el paciente?',
        options: [
          'Colocarle oxígeno y preparar un broncodilatador',
          'Hacerle una radiografía inmediatamente',
          'Darle agua fría',
          'Llamar a sus padres'
        ],
        correctIndex: 0,
        explanation: 'Dr. Martín ordered immediate oxygen and a bronchodilator to open the airways.'
      }
    ]
  }
];
