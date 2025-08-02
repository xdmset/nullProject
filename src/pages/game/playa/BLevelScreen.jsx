import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { exercises } from "../../../components/game/playa/Exercises";
import ExerciseCard from "../../../components/game/ciudad/ExerciseCard";
import FeedbackMessage from "../../../components/game/FeedbackMessage";
import LoseOverlay from "../../../components/game/Loseoverlay";
import Header from "../../../components/game/Header";
import ExerciseCardSingleImage from "../../../components/game/ciudad/ExerciseCardSingleImage";
import ExerciseCardDualChoice from "../../../components/game/ciudad/ExerciseCardDualChoice";
import LevelComplete from '../../../components/game/levelComplete';
import { useRandomExercises } from "../../../hooks/useRandomExercises";

import ExerciseCardOrder from "../../../components/game/playa/ExerciseCardOrder";
import ExerciseCardMatch from "../../../components/game/playa/ExerciseCardMatch";
import MemoryGame from "../../../components/game/playa/ExerciseMemoryGame";
import ExerciseCardLineMatch from "../../../components/game/playa/ExerciseCardLineMatch";

export default function BLevelScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Clave para obtener ejercicios
  const levelKey = `pantalla${id}`;

  // Definir cuántos ejercicios por nivel
  let numExercises = 6;
  if (id === "2" || id === "3") numExercises = 7;
  else if (id === "4") numExercises = 9;

  // Memoizar ejercicios para evitar referencia cambiante
  const exercisesForLevel = useMemo(() => {
    return exercises[levelKey] || [];
  }, [levelKey]);

  const [levelExercises, generateRandomExercises] = useRandomExercises(
    numExercises,
    exercisesForLevel
  );

  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

const currentExercise = levelExercises[current];
  useEffect(() => {
    if (!exercisesForLevel.length) {
      navigate("/playa");
      return;
    }
    generateRandomExercises();
    setCurrent(0);
    setLives(3);
    setFeedback({ message: "", type: "" });
    setSelectedOption(null);
    setShowLevelComplete(false);
  }, [id, generateRandomExercises, navigate, exercisesForLevel]);

    // Reiniciar si viene reset en state de navegación
  useEffect(() => {
    if (location.state?.reset) {
      generateRandomExercises();
      setCurrent(0);
      setLives(3);
      setFeedback({ message: "", type: "" });
      setSelectedOption(null);
      setShowLevelComplete(false);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, generateRandomExercises, navigate, exercisesForLevel, location.pathname]);


    // Función para crear tonos de sonido
  const createTone = (frequency, duration, type = "sine") => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      console.warn("Sonido no disponible");
    }
  };

  const playCorrectSound = () => {
    createTone(523.25, 0.15);
    setTimeout(() => createTone(659.25, 0.15), 100);
    setTimeout(() => createTone(783.99, 0.2), 200);
  };

  const playWrongSound = () => {
    createTone(400, 0.2);
    setTimeout(() => createTone(300, 0.3), 150);
  };

  const playCelebrationSound = () => {
    const notes = [
      { freq: 523.25, duration: 0.2, delay: 0 },
      { freq: 659.25, duration: 0.2, delay: 150 },
      { freq: 783.99, duration: 0.2, delay: 300 },
      { freq: 1046.5, duration: 0.3, delay: 450 },
      { freq: 783.99, duration: 0.15, delay: 600 },
      { freq: 1046.5, duration: 0.15, delay: 700 },
      { freq: 1318.5, duration: 0.4, delay: 800 },
    ];
    notes.forEach(note => {
      setTimeout(() => {
        createTone(note.freq, note.duration, "triangle");
      }, note.delay);
    });
  };


  const checkAnswer = () => {
      if (selectedOption === null || lives <= 0) return;
      handleAnswer(selectedOption);
      if (id !== "3") setSelectedOption(null);
    };

    const handleAnswer = (option) => {
    if (!currentExercise || lives <= 0) return;

    let isCorrect = false;

    // Validación especial para ejercicios escritos (input) como en pantalla 3 y 4
    if (currentExercise.type === "input" || id === "3" || id === "4") {
      isCorrect = option.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase();
    } else {
      // Validación para opciones (letras o imágenes)
      isCorrect =
        option === currentExercise.correctAnswer ||
        option === currentExercise.correctLetter;
    }

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };


  const handleCorrectAnswer = () => {
    const isLast = current === levelExercises.length - 1;
    playCorrectSound();
    setFeedback({
      message: isLast ? "¡Nivel completado!" : "Respuesta Correcta, ¡Sigue así!",
      type: "success",
    });

    if (isLast) {
      markLevelAsCompleted();
      playCelebrationSound();
      setTimeout(() => setShowLevelComplete(true), 500);
    } else {
      setTimeout(() => {
        setCurrent(prev => prev + 1);
        setFeedback({ message: "", type: "" });
        if (id === "3") setSelectedOption(null);
      }, 1000);
    }
  };

  const handleWrongAnswer = () => {
    const remaining = lives - 1;
    playWrongSound();

    if (remaining > 0) {
      setLives(remaining);
      setFeedback({
        message: "Respuesta incorrecta, inténtalo de nuevo",
        type: "error",
      });
      setTimeout(() => setFeedback({ message: "", type: "" }), 1000);
    } else {
      setLives(0);
      setFeedback({ message: "¡Perdiste todas las vidas!", type: "error" });
    }
  };

    const markLevelAsCompleted = () => {
    const stored = JSON.parse(localStorage.getItem("completedLevels")) || [];
    const num = parseInt(id);
    if (!stored.includes(num)) {
      stored.push(num);
      localStorage.setItem("completedLevels", JSON.stringify(stored));
    }
  };

  const restartLevel = () => {
    generateRandomExercises();
    setCurrent(0);
    setLives(3);
    setFeedback({ message: "", type: "" });
    setSelectedOption(null);
    setShowLevelComplete(false);
  };

  if (!levelExercises.length) return null;

  const renderExerciseComponent = () => {
  if (!currentExercise) return null;

    switch (currentExercise.type) {
    case "single":
    case "input":
      return (
        <ExerciseCardSingleImage
          exercise={currentExercise}
          answer={selectedOption}
          setAnswer={setSelectedOption}
          checkAnswer={checkAnswer}
          lives={lives}
        />
      );
    
    case "select":
      return (
        <ExerciseCardDualChoice
          exercise={currentExercise}
          onCheckAnswer={(isCorrect) => {
            setIsChecking(true);
            if (isCorrect) {
              handleCorrectAnswer();
            } else {
              handleWrongAnswer();
            }
            setIsChecking(false);
          }}
          lives={lives}
          isChecking={isChecking}
          resetSelections={lives < 3}
        />
      );

    case "match":
      return (
        <ExerciseCardMatch
          exercise={currentExercise}
          onCheckAnswer={(isCorrect) => {
            if (isCorrect) handleCorrectAnswer();
            else handleWrongAnswer();
          }}
          lives={lives}
        />
      );

    case "line-match":
      return (
        <ExerciseCardLineMatch
          exercise={currentExercise}
          onCheckAnswer={(isCorrect) => {
            if (isCorrect) handleCorrectAnswer();
            else handleWrongAnswer();
          }}
          lives={lives}
        />
      );

    case "order":
      return (
        <ExerciseCardOrder
          exercise={currentExercise}
          onCheckAnswer={(isCorrect) => {
            if (isCorrect) handleCorrectAnswer();
            else handleWrongAnswer();
          }}
          lives={lives}
        />
      );

    case "image-to-text":
      return (
        <ExerciseCard
          exercise={currentExercise}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isImageOptions={false}
          lives={lives}
          onCheckAnswer={checkAnswer}
        />
      );

    case "text-to-image":
      return (
        <ExerciseCard
          exercise={currentExercise}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isImageOptions={true}
          lives={lives}
          onCheckAnswer={checkAnswer}
        />
      );

      case "memory":
      return (
        <MemoryGame
          exercise={currentExercise}
          onComplete={(isCorrect) => {
            if (isCorrect) handleCorrectAnswer();
            else handleWrongAnswer();
          }}
          lives={lives}
        />
      );

    default:
      return <div className="text-red-600">Ejercicio no reconocido</div>;
    }
  };




  return (
    <div className="relative min-h-screen bg-cover bg-center" 
    style={{
        backgroundImage: "url('/src/assets/game/icons-playa/playaNivel.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header progress={(current + 1) / levelExercises.length} lives={lives} />
      </div>

      <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
        <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
          {renderExerciseComponent()}
        </div>

        {feedback.message && (
          <FeedbackMessage message={feedback.message} type={feedback.type} />
        )}

        {id !== "3" && id !== "4" && lives > 0 && currentExercise?.type !== "image" && (
          <button
            onClick={checkAnswer}
            disabled={!selectedOption || lives <= 0}
            className={`fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ${
              selectedOption && lives > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Comprobar
          </button>
        )}

        {lives === 0 && (
          <LoseOverlay onRetry={restartLevel} onExit={() => navigate("/ciudad")} />
        )}

        {showLevelComplete && (
          <LevelComplete
            livesRemaining={lives}
            onClose={() => setShowLevelComplete(false)}
          />
        )}
      </div>
    </div>
  );
}
