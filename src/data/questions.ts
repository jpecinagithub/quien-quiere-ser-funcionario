export type Category = "Ciencia" | "Arte" | "Historia";

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  correct: number; // índice en `options` (0-3)
  explanation: string;
  image: string;
  emoji: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Ciencia",
    question:
      "¿Qué partícula elemental, predicha en 1964 y descubierta en el CERN en 2012, da masa a las demás partículas?",
    options: ["Bosón de Higgs", "Neutrino", "Quark top", "Fotón"],
    correct: 0,
    explanation:
      "El bosón de Higgs se detectó en el Gran Colisionador de Hadrones (LHC) del CERN en 2012.",
    image: "/images/q01.jpg",
    emoji: "⚛️",
  },
  {
    id: 2,
    category: "Arte",
    question:
      '¿Quién pintó "La persistencia de la memoria" (1931), el cuadro de los relojes blandos?',
    options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "René Magritte"],
    correct: 0,
    explanation:
      "Dalí lo pintó con 27 años; es la obra más famosa del surrealismo.",
    image: "/images/q02.jpg",
    emoji: "🎨",
  },
  {
    id: 3,
    category: "Historia",
    question:
      "¿En qué año se firmó el Tratado de Tordesillas, que repartió el mundo entre España y Portugal?",
    options: ["1494", "1500", "1482", "1519"],
    correct: 0,
    explanation:
      "Firmado el 7 de junio de 1494, dos años después del primer viaje de Colón.",
    image: "/images/q03.jpg",
    emoji: "📜",
  },
  {
    id: 4,
    category: "Ciencia",
    question: "¿Cuál es el único metal líquido a temperatura ambiente?",
    options: ["Mercurio", "Galio", "Plomo", "Sodio"],
    correct: 0,
    explanation:
      "El mercurio funde a -39 ºC; el galio funde a 30 ºC, muy cerca, pero es sólido a 20 ºC.",
    image: "/images/q04.jpg",
    emoji: "🧪",
  },
  {
    id: 5,
    category: "Arte",
    question: "¿Quién esculpió el David de mármol de Florencia (1501-1504)?",
    options: ["Miguel Ángel", "Donatello", "Bernini", "Rodin"],
    correct: 0,
    explanation:
      "Miguel Ángel lo talló en un solo bloque de mármol de Carrara con 26 años.",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Michelangelo%27s_David_-_right_view_2.jpg/640px-Michelangelo%27s_David_-_right_view_2.jpg",
    emoji: "🗿",
  },
  {
    id: 6,
    category: "Historia",
    question: "¿Qué civilización construyó Machu Picchu en el siglo XV?",
    options: ["Incas", "Aztecas", "Mayas", "Chimú"],
    correct: 0,
    explanation:
      "Fue mandada construir por el emperador inca Pachacútec hacia 1450.",
    image: "/images/q06.jpg",
    emoji: "🏔️",
  },
  {
    id: 7,
    category: "Ciencia",
    question:
      "¿Qué planeta gira en sentido retrógrado y tiene el día más largo del sistema solar?",
    options: ["Venus", "Marte", "Mercurio", "Neptuno"],
    correct: 0,
    explanation:
      "Un día en Venus dura 243 días terrestres y gira al revés que los demás planetas.",
    image: "/images/q07.jpg",
    emoji: "🪐",
  },
  {
    id: 8,
    category: "Arte",
    question: '¿Quién pintó "La noche estrellada" (1889)?',
    options: [
      "Vincent van Gogh",
      "Claude Monet",
      "Paul Cézanne",
      "Paul Gauguin",
    ],
    correct: 0,
    explanation:
      "Van Gogh la pintó desde el sanatorio de Saint-Rémy-de-Provence.",
    image: "/images/q08.jpg",
    emoji: "🌌",
  },
  {
    id: 9,
    category: "Historia",
    question: "¿En qué año llegó el Apolo 11 a la Luna?",
    options: ["1969", "1961", "1972", "1959"],
    correct: 0,
    explanation:
      "El 20 de julio de 1969 Armstrong y Aldrin pisaron la Luna.",
    image: "/images/q09.jpg",
    emoji: "🚀",
  },
  {
    id: 10,
    category: "Ciencia",
    question: "¿Quién descubrió la penicilina en 1928?",
    options: [
      "Alexander Fleming",
      "Louis Pasteur",
      "Marie Curie",
      "Robert Koch",
    ],
    correct: 0,
    explanation:
      "Fleming observó que un moho (Penicillium) mataba las bacterias de una placa olvidada.",
    image: "/images/q10.jpg",
    emoji: "💊",
  },
  {
    id: 11,
    category: "Historia",
    question:
      "¿Qué país fue el primero en conceder el voto femenino, en 1893?",
    options: ["Nueva Zelanda", "Reino Unido", "Estados Unidos", "Francia"],
    correct: 0,
    explanation:
      "Nueva Zelanda lo aprobó en 1893 gracias a la campaña de Kate Sheppard.",
    image: "/images/q11.jpg",
    emoji: "🗳️",
  },
  {
    id: 12,
    category: "Arte",
    question: '¿Quién pintó "Las meninas" (1656)?',
    options: [
      "Diego Velázquez",
      "Francisco de Goya",
      "El Greco",
      "Bartolomé Murillo",
    ],
    correct: 0,
    explanation:
      "Velázquez, pintor de cámara de Felipe IV, se autorretrató dentro del cuadro.",
    image: "/images/q12.jpg",
    emoji: "🖼️",
  },
  {
    id: 13,
    category: "Ciencia",
    question: "¿Cuál es el elemento químico más abundante en el universo?",
    options: ["Hidrógeno", "Oxígeno", "Carbono", "Helio"],
    correct: 0,
    explanation:
      "El hidrógeno representa cerca del 75 % de toda la materia normal del universo.",
    image: "/images/q13.jpg",
    emoji: "🌠",
  },
  {
    id: 14,
    category: "Historia",
    question: "¿En qué año cayó Constantinopla en manos de los otomanos?",
    options: ["1453", "1492", "1204", "1529"],
    correct: 0,
    explanation:
      "El 29 de mayo de 1453 cayó la capital bizantina; fecha que marca el fin de la Edad Media.",
    image: "/images/q14.jpg",
    emoji: "🏰",
  },
  {
    id: 15,
    category: "Arte",
    question: '¿Quién compuso "Las cuatro estaciones"?',
    options: [
      "Antonio Vivaldi",
      "Johann Sebastian Bach",
      "Wolfgang Amadeus Mozart",
      "Georg Friedrich Händel",
    ],
    correct: 0,
    explanation:
      "Vivaldi las compuso hacia 1725, dentro de su obra «Il cimento dell'armonia e dell'inventione».",
    image: "/images/q15.jpg",
    emoji: "🎻",
  },
  {
    id: 16,
    category: "Ciencia",
    question:
      "¿Quién propuso la teoría de la evolución por selección natural?",
    options: [
      "Charles Darwin",
      "Jean-Baptiste Lamarck",
      "Gregor Mendel",
      "Carl Linneo",
    ],
    correct: 0,
    explanation:
      "Darwin la publicó en «El origen de las especies» (1859), tras su viaje en el Beagle.",
    image: "/images/q16.jpg",
    emoji: "🐢",
  },
  {
    id: 17,
    category: "Historia",
    question:
      "¿Qué emperador romano ordenó construir el muro que lleva su nombre en Britania?",
    options: ["Adriano", "Trajano", "Augusto", "Nerón"],
    correct: 0,
    explanation:
      "Adriano ordenó su construcción en el año 122 d. C. para marcar la frontera norte del imperio.",
    image: "/images/q17.jpg",
    emoji: "🧱",
  },
  {
    id: 18,
    category: "Arte",
    question: "¿En qué ciudad-estado está la Capilla Sixtina?",
    options: ["Ciudad del Vaticano", "Florencia", "Venecia", "Nápoles"],
    correct: 0,
    explanation:
      "Está en el Palacio Apostólico del Vaticano; su techo lo pintó Miguel Ángel (1508-1512).",
    image: "/images/q18.jpg",
    emoji: "⛪",
  },
  {
    id: 19,
    category: "Ciencia",
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    options: ["206", "186", "226", "196"],
    correct: 0,
    explanation:
      "Los bebés nacen con unos 300 huesos, que se fusionan hasta quedar en 206 en el adulto.",
    image: "/images/q19.jpg",
    emoji: "🦴",
  },
  {
    id: 20,
    category: "Historia",
    question: '¿Quién escribió "Cien años de soledad" (1967)?',
    options: [
      "Gabriel García Márquez",
      "Julio Cortázar",
      "Mario Vargas Llosa",
      "Jorge Luis Borges",
    ],
    correct: 0,
    explanation:
      "García Márquez publicó la novela en 1967; ganó el Nobel de Literatura en 1982.",
    image: "/images/q20.jpg",
    emoji: "📚",
  },
];

/** Baraja una copia del array (Fisher-Yates). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Devuelve las 20 preguntas barajadas y con las opciones barajadas. */
export function buildDeck(): Question[] {
  return shuffle(QUESTIONS).map((q) => {
    const options = shuffle(q.options);
    return { ...q, options, correct: options.indexOf(q.options[q.correct]) };
  });
}
