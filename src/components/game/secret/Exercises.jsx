import LetraA from "../../../assets/game/icons-secrets/abecedario/LetraA.png";
import LetraC from "../../../assets/game/icons-secrets/abecedario/C.png";
import LetraS from "../../../assets/game/icons-secrets/abecedario/S.png";
import LetraQ from "../../../assets/game/icons-secrets/abecedario/Q.png";
import LetraY from "../../../assets/game/icons-secrets/abecedario/Y.png";
import LetraÑ from "../../../assets/game/icons-secrets/abecedario/Ñ.png";
import LetraX from "../../../assets/game/icons-secrets/abecedario/X.png";
import Jirafa from "../../../assets/game/icons-secrets/animales/Jirafa.png";
import Tiburon from "../../../assets/game/icons-secrets/animales/Tiburon.png";
import Calamar from "../../../assets/game/icons-secrets/animales/OctopusesGarden.png";
import Delfin from "../../../assets/game/icons-secrets/animales/Delfin.png";
import Nervioso from "../../../assets/game/icons-secrets/emociones/Nervous.png";
import Why from "../../../assets/game/icons-secrets/preguntas/Por que.png";
import Cuñado from "../../../assets/game/icons-secrets/familia/Cuñado.png";
import YoureWelcome from "../../../assets/game/icons-secrets/saludos/DeNada.png";
import BuenasTardes from "../../../assets/game/icons-secrets/saludos/BuenasTardes.png";
import Morado from "../../../assets/game/icons-secrets/colores/Morado.png";
import Naranja from "../../../assets/game/icons-secrets/colores/Naranja.png";
import Rosa from "../../../assets/game/icons-secrets/colores/Rosa.png";
import FortySeven from "../../../assets/game/icons-secrets/numeros/47.png";
import ThirtyFive from "../../../assets/game/icons-secrets/numeros/35.png";
import TwentyThree from "../../../assets/game/icons-secrets/numeros/23.png";
import Eighteen from "../../../assets/game/icons-secrets/numeros/18.png";
import FortySix from "../../../assets/game/icons-secrets/numeros/46.png";
import TwentyOne from "../../../assets/game/icons-secrets/numeros/21.png";
import Forty from "../../../assets/game/icons-secrets/numeros/Forty.png";
import Suegra from "../../../assets/game/icons-secrets/familia/Suegra.png";
import Yerno from "../../../assets/game/icons-secrets/familia/Yerno.png";
import Nuera from "../../../assets/game/icons-secrets/familia/Nuera.png";
import Primo from "../../../assets/game/icons-secrets/familia/Primo.png";
import Nieto from "../../../assets/game/icons-secrets/familia/Nieto.png";
import Bebe from "../../../assets/game/icons-secrets/familia/Bebe.png";
import Sobrino from "../../../assets/game/icons-secrets/familia/Sobrino.png";
import Gracias from "../../../assets/game/icons-secrets/saludos/Gracias.png";
import PorFavor from "../../../assets/game/icons-secrets/saludos/PorFavor.png";
import LoSiento from "../../../assets/game/icons-secrets/saludos/LoSiento.png";
import Flamenco from "../../../assets/game/icons-secrets/animales/Flamenco.png";
import Arrepentido from "../../../assets/game/icons-secrets/emociones/Arrepentido.png";
import Triste from "../../../assets/game/icons-secrets/emociones/Tristeza.png";
import Enojado from "../../../assets/game/icons-secrets/emociones/Enojado.png";
import Consuegra from "../../../assets/game/icons-secrets/familia/Consuegra.png";


export const exercises = {
pantalla1: [
  {
    id: 1,
    type: "order",
    prompt: "Ordena estas letras para formar la palabra 'CASA'",
    images: [
      LetraS, 
      LetraC,  
      LetraA, 
      LetraA 
    ],
    letters: ["S", "C", "A", "A"],
    correctOrder: ["C", "A", "S", "A"]
  },
  {
    id: 2,
    type: "image-to-text",
    image: LetraQ, 
    correctAnswer: "Q",
    prompt: "¿Qué letra representa esta seña?",
    options: ["Q", "G", "O", "P"]
  },
  {
    id: 3,
    type: "input",
    image: BuenasTardes, 
    correctAnswer: "Buenas tardes",
    question: "¿Qué saludo específico representa esta seña?"
  },
  {
    id: 4,
    type: "match",
    prompt: "Relaciona cada letra con su seña",
    pairs: [
      {id:"imgY", image: LetraY, letter: "Y" },
      {id:"imgX", image: LetraX, letter: "X" },
      {id:"imgÑ", image: LetraÑ, letter: "Ñ" }
    ]
  },
  {
    id: 5,
    type: "memory",
    question: "Memoriza las señas de cortesía",
    mode: "image-text",
    pairs: [
      { image: PorFavor, text: "Por favor" },
      { image: Gracias, text: "Gracias" },
      { image: YoureWelcome, text: "De nada" },
      { image: LoSiento, text: "Lo siento" }
    ]
  },
  {
    id: 6,
    type: "input",
    image: Morado, 
    correctAnswer: "Morado",
    question: "¿Qué color representa esta seña?"
  },
  {
    id: 7,
    type: "image-to-text",
    image: FortySeven, // Número 47
    correctAnswer: "47",
    prompt: "¿Qué número representa esta seña compuesta?",
    options: ["74", "47", "37", "43"]
  },
  {
    id: 8,
    type: "order",
    prompt: "Ordena estos números de mayor a menor",
    images: [
      ThirtyFive, // 34
      TwentyThree, // 23
      Forty  // 40
    ],
    letters: ["23", "34", "40"],
    correctOrder: ["40", "34", "23"]
  },
  {
    id: 9,
    type: "text-to-image",
    question: "Selecciona la seña para el color 'Rosa'",
    options: [
      Rosa, // Rosa
      Morado, // Morado
      Naranja  // Naranja
    ],
    correctAnswer: Rosa
  },
  {
    id: 10,
    type: "line-match",
    prompt: "Relaciona cada número con su seña",
    pairs: [
      { id: "num21", image: TwentyOne, letter: "21" },
      { id: "num18", image: Eighteen, letter: "18" },
      { id: "num46", image: FortySix, letter: "46" }
    ]
  },
  {
    id: 11,
    type: "input",
    image: Jirafa,
    correctAnswer: "Jirafa",
    question: "¿Qué animal representa esta seña?"
  },
  {
    id: 12,
    type: "image-to-text",
    image: Nervioso, 
    correctAnswer: "Nervioso",
    prompt: "¿Qué emoción representa esta seña?",
    options: [ "Emocionado", "Confundido", "Nervioso","Preocupado"]
  },
  {
    id: 13,
    type: "match",
    prompt: "Relaciona animales marinos con sus señas",
    pairs: [
      { image: Tiburon, letter: "Tiburón" },
      { image: Calamar, letter: "Pulpo" },
      { image: Delfin, letter: "Delfín" }
    ]
  },
  {
    id: 14,
    type: "text-to-image",
    question: "Selecciona la seña para 'Arrepentido'",
    options: [
      Triste, 
      Arrepentido, 
      Enojado 
    ],
    correctAnswer: Arrepentido
  },
  {
    id: 15,
    type: "input",
    image: Flamenco, 
    correctAnswer: "Flamenco",
    question: "¿Qué Animal representa esta seña?"
  },
  {
    id: 16,
    type: "input",
    image: Cuñado, 
    correctAnswer: "Cuñado",
    question: "¿Qué parentesco familiar representa esta seña?"
  },
  {
    id: 17,
    type: "image-to-text",
    image: Why, 
    correctAnswer: "¿Por qué?",
    prompt: "¿Qué pregunta específica representa esta seña?",
    options: [ "¿Para qué?", "¿Cómo?", "¿Por qué?", "¿Cuál?"]
  },
  {
    id: 18,
    type: "match",
    prompt: "Relaciona parentescos políticos con sus señas",
    pairs: [
      {id: "imgSuegra", image: Suegra, letter: "Suegra" },
      {id: "imgYerno", image: Yerno, letter: "Yerno" },
      {id: "imgNuera", image: Nuera, letter: "Nuera" }
    ]
  },
  {
    id: 19,
    type: "input",
    image: Consuegra,
    correctAnswer: "Consuegra",
    question: "¿Qué Familiar representa esta seña?"
  },
  {
    id: 20,
    type: "memory",
    question: "Memoriza miembros de familia extendida",
    mode: "image-text",
    pairs: [
      { image: Primo, text: "Primo" },
      { image: Sobrino, text: "Sobrino" },
      { image: Bebe, text: "Bebe" },
      { image: Nieto, text: "Nieto" }
    ]
  }
]
};