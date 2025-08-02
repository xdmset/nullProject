import LetraA from "../../../assets/game/icons-playa/abecedario/LetraA.png";
import LetraB from "../../../assets/game/icons-playa/abecedario/B.png";
import LetraC from "../../../assets/game/icons-playa/abecedario/C.png";
import LetraD from "../../../assets/game/icons-playa/abecedario/Letra4Abecedario.png";
import LetraR from "../../../assets/game/icons-playa/abecedario/LetraR.png";
import LetraK from "../../../assets/game/icons-playa/abecedario/K.png";
import LetraW from "../../../assets/game/icons-playa/abecedario/W.png";
import LetraE from "../../../assets/game/icons-playa/abecedario/E.png";
import LetraM from "../../../assets/game/icons-playa/abecedario/M.png"; //Pendiente
import LetraL from "../../../assets/game/icons-playa/abecedario/L.png"; //Pendiente
import LetraF from "../../../assets/game/icons-playa/abecedario/F.png";
import LetraG from "../../../assets/game/icons-playa/abecedario/G.png";
import LetraH from "../../../assets/game/icons-playa/abecedario/H.png";
import LetraI from "../../../assets/game/icons-playa/abecedario/I.png";
import Hello from "../../../assets/game/icons-playa/saludos/SaludoHello.gif";
import GoodMorning from "../../../assets/game/icons-playa/saludos/GoodMorning.gif";
import GoodAfternoon from "../../../assets/game/icons-playa/saludos/GoodAfternoon.gif";
import GoodNight from "../../../assets/game/icons-playa/saludos/GoodNight.gif";
import Goodbye from "../../../assets/game/icons-playa/saludos/Goodbye.png";
import ThankYou from "../../../assets/game/icons-playa/saludos/ThankYou.png";
import LotsOfLove from "../../../assets/game/icons-playa/saludos/MuchoGusto.png";
import SeeYouTomorrow from "../../../assets/game/icons-playa/saludos/SeeYouTomorrow.png";
import HowAreYa from "../../../assets/game/icons-playa/saludos/HowAreYa.gif";
import SeeYa from "../../../assets/game/icons-playa/saludos/NosVemos.png";
import YoureWelcome from "../../../assets/game/icons-playa/saludos/DeNada.png";


export const exercises = {
  pantalla1: [
    {
      id: 1,
      type: "image-to-text",
      prompt: "Selecciona la letra que representa esta seña",
      image: LetraA,
      correctAnswer: "A",
      options: ["A", "B", "C", "D"]
    },
    {
      id: 2,
      type: "image-to-text",
      prompt: "Selecciona la letra que representa esta seña",
      image: LetraD,
      correctAnswer: "D",
      options: ["F", "R", "G", "D"]
    },
    {
      id: 3,
      type: "image-to-text",
      prompt: "Identifica la letra en seña",
      image: LetraR,
      correctAnswer: "R",
      options: ["Z", "R", "W", "F"]
    },
    {
      id: 4,
      type: "image-to-text",
      prompt: "Elige la letra en seña para la imagen mostrada",
      image: LetraK,
      correctAnswer: "K",
      options: ["G", "H", "K", "Z"]
    },
    {
      id: 5,
      type: "order",
      prompt: "Ordena las señas de las letras por Orden Alfabético",
      images: [LetraC, LetraA, LetraB],
      letters: ["C", "A", "B"],
      correctOrder: ["A", "B", "C"]
    },
    {
      id: 6,
      type: "match",
      prompt: "Relaciona cada imagen con la letra correcta en lengua de señas (¡cuidado, están desordenadas!)",
      pairs: [
        { id: "imgA", image: LetraA, letter: "A" },
        { id: "imgW", image: LetraW, letter: "W" },
        { id: "imgD", image: LetraD, letter: "D" }
      ]
    }
  ],
  pantalla2: [
    {
      id: 7,
      type: "line-match",
      prompt: "Une la seña con su letra correspondiente",
      pairs: [
        { id: "imgE", image: LetraE, letter: "E" },
        { id: "imgF", image: LetraF, letter: "F" },
        { id: "imgG", image: LetraG, letter: "G" },
        { id: "imgH", image: LetraH, letter: "H" }
      ]
    },
    {
      id: 8,
      type: "image-to-text",
      prompt: "Selecciona la letra correcta",
      image: LetraF,
      correctAnswer: "F",
      options: ["H", "F", "G", "J"]
    },
    {
      id: 9,
      type: "image-to-text",
      prompt: "¿Qué letra en seña corresponde a la imagen?",
      image: LetraG,
      correctAnswer: "G",
      options: ["S", "K", "P", "G"]
    },
    {
      id: 10,
      type: "image-to-text",
      prompt: "Elige la letra en seña mostrada",
      image: LetraH,
      correctAnswer: "H",
      options: ["H", "Q", "R", "S"]
    },
    {
      id: 11,
      type: "order",
      prompt: "Ordena estas letras según su orden alfabético",
      images: [LetraH, LetraI, LetraG],
      letters: ["H", "I", "G"],
      correctOrder: ["G", "H", "I"]
    },
    {
      id: 12,
      type: "match",
      prompt: "Relaciona cada imagen de seña con la letra correcta",
      pairs: [
        { id: "imgH", image: LetraH, letter: "H" },
        { id: "imgE", image: LetraE, letter: "E" },
        { id: "imgF", image: LetraF, letter: "F" }
      ]
    },
    {
      id: 13,
      prompt: "Selecciona la letra representada",
      type: "image-to-text",
      image: LetraI,
      correctAnswer: "I",
      options: ["J", "L", "I", "X"]
    }
  ],
  pantalla3: [
    {
      id: 14,
      type: "input",
      image: Hello,
      correctAnswer: "Hola",
      question: "¿Qué saludo representa esta seña?"
    },
    {
      id: 15,
      type: "input",
      image: GoodMorning,
      correctAnswer: "Buenos dias",
      question: "¿Qué saludo representa esta seña?"
    },
    {
      id: 16,
      type: "input",
      image: GoodAfternoon,
      correctAnswer: "Buenas tardes",
      question: "¿Qué saludo representa esta seña?"
    },
    {
      id: 17,
      type: "input",
      image: GoodNight,
      correctAnswer: "Buenas noches",
      question: "¿Qué saludo representa esta seña?"
    },
    {
      id: 18,
      type: "image-to-text",
      image: Goodbye,
      correctAnswer: "Adiós",
      question: "¿Qué despedida representa esta seña?",
      options: ["Hasta luego", "Gracias", "Adiós", "Buenos días"]
    },
    {
      id: 19,
      type: "image-to-text",
      image: SeeYouTomorrow,
      correctAnswer: "Hasta mañana",
      question: "¿Qué despedida representa esta seña?",
      options: ["¿Qué pasa?", "Buenas noches", "Hasta mañana", "Hola"]
    },
    {
      id: 20,
      type: "image-to-text",
      image: ThankYou,
      correctAnswer: "Gracias",
      question: "¿Qué palabra representa esta seña?",
      options: ["Gracias", "Perdón", "Buenas tardes", "Adiós"]
    }
  ],
  pantalla4: [
    {
      id: 21,
      type: "match",
      prompt: "Relaciona cada seña con la letra correcta",
      pairs: [
        { id: "imgL", image: LetraL, letter: "L" },
        { id: "imgM", image: LetraM, letter: "M" },
        { id: "imgK", image: LetraK, letter: "K" },
        { id: "imgW", image: LetraW, letter: "W" }
      ]
    },
    {
      id: 22,
      type: "line-match",
      prompt: "Une la seña con su significado",
      pairs: [
        { id: "imgGoodbye", image: Goodbye, letter: "Adiós" },
        { id: "imgThankYou", image: ThankYou, letter: "Gracias" },
        { id: "imgSeeYouTomorrow", image: SeeYouTomorrow, letter: "Hasta mañana" },
        { id: "imgHowAreYa", image: HowAreYa, letter: "¿Cómo estás?" }
      ]
    },
    {
      id: 23,
      type: "memory",
      question: "Relaciona cada seña con su letra correspondiente",
      mode: "image-text",
      pairs: [
        { image: LetraA, text: "A" },
        { image: LetraB, text: "B" },
        { image: LetraC, text: "C" },
        { image: LetraD, text: "D" }
      ]
    },
    {
      id: 24,
      type: "input",
      image: SeeYa,
      correctAnswer: "Nos Vemos",
      question: "¿Qué palabra representa esta seña?"
    },
    {
      id: 25,
      type: "image-to-text",
      image: LotsOfLove,
      correctAnswer: "Mucho Gusto",
      question: "¿Qué saludo representa esta seña?",
      options: ["Que tal", "Hola", "Hasta mañana", "Mucho Gusto"]
    },
    {
      id: 26,
      type: "image-to-text",
      image: YoureWelcome,
      correctAnswer: "De Nada",
      question: "¿Qué representa esta seña?",
      options: ["Buenas noches", "Hasta mañana", "De Nada", "Hola"]
    },
    {
      id: 27,
      type: "match",
      prompt: "Relaciona cada letra con su seña correspondiente",
      pairs: [
        { id: "imgR", image: LetraR, letter: "R" },
        { id: "imgI", image: LetraI, letter: "I" },
        { id: "imgL", image: LetraL, letter: "L" },
        { id: "imgM", image: LetraM, letter: "M" }
      ]
    },
    {
      id: 28,
      type: "input",
      image: HowAreYa,
      question: "¿Qué frase representa esta seña?",
      correctAnswer: "como estas"
    },
    {
      id: 29,
      type: "order",
      prompt: "Ordena estas letras según el alfabeto",
      images: [LetraM, LetraK, LetraL],
      letters: ["M", "K", "L"],
      correctOrder: ["K", "L", "M"]
    }
  ]
  ,

};
