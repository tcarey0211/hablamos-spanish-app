import { RoleplayScenario } from '../types';

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'tapas-madrid',
    trackId: 'travel',
    title: 'Ordering Tapas in Madrid',
    tag: 'Dining & Food',
    description: 'You walk into a buzzing traditional tavern in the La Latina neighborhood of Madrid. Order tapas, ask for the wine of the house, and request the check.',
    level: 'A1',
    location: 'Taberna El Sur, Madrid, España',
    avatar: '🍷',
    aiRole: 'Mateo (A friendly, bustling Spanish waiter with authentic Madrileño expressions)',
    userRole: 'A traveler looking for an authentic Spanish dinner',
    starterMessage: '¡Hola, buenas noches! Bienvenidos a Taberna El Sur. ¿Tienen reserva o buscan una mesita para cenar?',
    starterTranslation: 'Hello, good evening! Welcome to Taberna El Sur. Do you have a reservation or are you looking for a little table for dinner?',
    starterPromptHint: 'Respond saying you are two people and would like a table inside or at the bar.',
    promptSuggestions: [
      'Buenas noches. Somos dos personas, ¿tiene una mesa disponible?',
      'Hola, ¿qué tapas típicas nos recomienda probar hoy?',
      'Quisiéramos una jarra de sangría y unas patatas bravas, por favor.'
    ],
    culturalNote: 'In Spain, it is common to share plates (raciones) in the center of the table rather than ordering separate main dishes.'
  },
  {
    id: 'medical-consult',
    trackId: 'medical',
    title: 'ER Triage & Clinical Intake',
    tag: 'Healthcare',
    description: 'A Spanish-speaking patient, Sra. Elena, has arrived at the emergency clinic complaining of severe abdominal pain and fever. Conduct a triage intake.',
    level: 'A2',
    location: 'Clínica San Lucas, Urgencias',
    avatar: '🩺',
    aiRole: 'Elena (A worried patient with acute abdominal pain seeking medical guidance)',
    userRole: 'Bilingual Nurse / Triage Clinician',
    starterMessage: 'Buenas tardes, doctora. Tengo un dolor muy fuerte en el estómago desde esta mañana y me siento con mucha fiebre y náuseas.',
    starterTranslation: 'Good afternoon, doctor. I have had very severe pain in my stomach since this morning and I feel like I have a high fever and nausea.',
    starterPromptHint: 'Ask where the pain is located (upper or lower right) and if she is allergic to any medications.',
    promptSuggestions: [
      'Buenas tardes, Sra. Elena. ¿En qué parte del abdomen siente el dolor exactamente?',
      'En una escala del 1 al 10, ¿qué tan intenso es el dolor en este momento?',
      '¿Tiene alguna alergia a medicamentos o toma alguna pastilla diaria?'
    ],
    culturalNote: 'Using formal address (Usted, Le duele, ¿Tiene usted...?) establishes immediate clinical trust and bedside respect.'
  },
  {
    id: 'hotel-barcelona',
    trackId: 'travel',
    title: 'Boutique Hotel Check-in',
    tag: 'Travel & Lodging',
    description: 'Check into your boutique hotel in the Gothic Quarter of Barcelona, request a quiet room with a balcony, and ask about breakfast hours.',
    level: 'A2',
    location: 'Hotel El Gòtic, Barcelona',
    avatar: '🛎️',
    aiRole: 'Carla (Receptionist at Hotel El Gòtic)',
    userRole: 'Hotel guest checking in after a flight',
    starterMessage: '¡Buenas tardes! Bienvenido/a al Hotel El Gòtic. ¿Me permite su pasaporte y el nombre de su reserva, por favor?',
    starterTranslation: 'Good afternoon! Welcome to Hotel El Gòtic. May I have your passport and the name on your reservation, please?',
    starterPromptHint: 'Give your name and ask if your room has a balcony with a city view.',
    promptSuggestions: [
      'Hola, tengo una reserva a nombre de Alex Smith por tres noches.',
      '¿A qué hora se sirve el desayuno por la mañana?',
      '¿Hay conexión WiFi en la habitación y cuál es la contraseña?'
    ]
  },
  {
    id: 'job-interview-bilingual',
    trackId: 'business',
    title: 'Bilingual Specialist Job Interview',
    tag: 'Career & Business',
    description: 'Interview with a multinational tech startup hiring a bilingual operations lead. Discuss your experience, strengths, and handling client challenges.',
    level: 'B1',
    location: 'Oficinas GlobalTech, Ciudad de México',
    avatar: '💼',
    aiRole: 'Licenciado Roberto Ramos (Director de Recursos Humanos)',
    userRole: 'Job Candidate applying for Senior Bilingual Specialist',
    starterMessage: 'Bienvenido Alex. Hemos revisado tu currículum con gran interés. Para comenzar, ¿podrías hablarnos de tu trayectoria profesional y tus mayores fortalezas?',
    starterTranslation: 'Welcome Alex. We have reviewed your resume with great interest. To begin, could you tell us about your professional background and greatest strengths?',
    starterPromptHint: 'Highlight your communication skills, dedication to problem solving, and ability to collaborate across teams.',
    promptSuggestions: [
      'Muchas gracias por la oportunidad. Tengo más de cuatro años de experiencia liderando proyectos con clientes internacionales.',
      'Mi mayor fortaleza es la comunicación asertiva y la resolución rápida de problemas.',
      'Me motiva mucho la visión de innovación y crecimiento que tiene esta empresa.'
    ]
  },
  {
    id: 'mexico-directions',
    trackId: 'travel',
    title: 'Navigating Coyoacán in Mexico City',
    tag: 'City Navigation',
    description: 'You are looking for the Frida Kahlo Museum (La Casa Azul) in Coyoacán. Stop a friendly local to ask for directions and transit tips.',
    level: 'A1',
    location: 'Coyoacán, Ciudad de México',
    avatar: '🗺️',
    aiRole: 'Don Rodrigo (A warm neighborhood artisan in Coyoacán)',
    userRole: 'Tourist asking for directions',
    starterMessage: '¡Buenas tardes, joven! ¿Busca algún lugar en el centro de Coyoacán? Con gusto le oriento.',
    starterTranslation: 'Good afternoon, young traveler! Are you looking for some place in central Coyoacán? I will gladly guide you.',
    starterPromptHint: 'Politely ask where the Frida Kahlo Museum is and how many blocks away it is.',
    promptSuggestions: [
      'Disculpe, ¿sabe por dónde queda el Museo Frida Kahlo?',
      '¿Está muy lejos para ir caminando o me conviene tomar un taxi?',
      'Muchas gracias por su ayuda Don Rodrigo, ¡que tenga un excelente día!'
    ]
  }
];
