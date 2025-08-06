import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { exercises } from "../../../components/game/jungla/Exercise";
import { useRandomExercises } from "../../../hooks/useRandomExercises";
import { updateProgreso } from "../../../services/apiService";

import Header from "../../../components/game/Header";
import FeedbackMessage from "../../../components/game/FeedbackMessage";
import LoseOverlay from "../../../components/game/Loseoverlay";
import LevelComplete from "../../../components/game/levelComplete";

import ExerciseCard from "../../../components/game/jungla/ExerciseCard";
import MemoryGame from "../../../components/game/jungla/MemoryGame";
import MatchingExercise from "../../../components/game/jungla/MatchingExercise";
import ExerciseCardSingleImage from "../../../components/game/jungla/ExerciseCardSingleImage";
import ExerciseCardDualChoice from "../../../components/game/jungla/ExerciseCardDualChoice";

const MUNDO_ID = 3;

export default function JLevelScreen() {
  const { id: levelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const levelIdToKeyMap = {
    "14": "pantalla1",
    "15": "pantalla2",
    "16": "pantalla3",
    "17": "pantalla4",
  };

  const levelKey = levelIdToKeyMap[levelId];
  let numExercises = 6;
  if (levelKey === "pantalla2" || levelKey === "pantalla3") numExercises = 7;
  else if (levelKey === "pantalla4") numExercises = 9;

  const exercisesForLevel = useMemo(() => exercises[levelKey] || [], [levelKey]);
  const [levelExercises, generateRandomExercises] = useRandomExercises(numExercises, exercisesForLevel);

  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  const currentExercise = levelExercises[current];

  // Reinicio de estado general
  const resetState = () => {
    generateRandomExercises();
    setCurrent(0);
    setLives(3);
    setFeedback({ message: "", type: "" });
    setSelectedOption(null);
    setShowLevelComplete(false);
  };

  useEffect(() => {
    if (!exercisesForLevel.length) {
      navigate("/jungla");
      return;
    }
    resetState();
  }, [levelId, generateRandomExercises, navigate, exercisesForLevel]);

  useEffect(() => {
    if (location.state?.reset) {
      resetState();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, generateRandomExercises, navigate, location.pathname]);

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
    ];
    notes.forEach(note => {
      setTimeout(() => {
        createTone(note.freq, note.duration, "triangle");
      }, note.delay);
    });
  };

  const markLevelAsCompleted = async () => {
    try {
      await updateProgreso(MUNDO_ID);
      console.log("Progreso del mundo Jungla guardado.");
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
    }
  };

    const handleCorrectAnswer = () => {
        const isLast = current === levelExercises.length - 1;
        playCorrectSound();
        setFeedback({ message: isLast ? "¡Nivel completado!" : "Respuesta Correcta, ¡Sigue así!", type: "success" });

        if (isLast) {
            markLevelAsCompleted();
            playCelebrationSound();
            setTimeout(() => setShowLevelComplete(true), 500);
        } else {
            setTimeout(() => {
                setCurrent(prev => prev + 1);
                setFeedback({ message: "", type: "" });
                setSelectedOption(null);
            }, 1000);
        }
    };


    const handleWrongAnswer = () => {
        const remaining = lives - 1;
        playWrongSound();
        if (remaining > 0) {
            setLives(remaining);
            setFeedback({ message: "Respuesta incorrecta, inténtalo de nuevo", type: "error" });
            setTimeout(() => setFeedback({ message: "", type: "" }), 1000);
        } else {
            setLives(0);
            setFeedback({ message: "¡Perdiste todas las vidas!", type: "error" });
        }
    };

  const handleAnswer = (option) => {
    if (!currentExercise || lives <= 0) return;

    let isCorrect = false;
    if (currentExercise.type === "input") {
      isCorrect = option.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase();
    } else {
      isCorrect = option === currentExercise.correctAnswer;
    }

    isCorrect ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const checkAnswer = () => {
    if (selectedOption === null || lives <= 0) return;
    handleAnswer(selectedOption);
    setSelectedOption(null);
  };

  const renderExerciseComponent = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case "choice":
        return (
          <ExerciseCard
            exercise={currentExercise}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isChecking={isChecking}
          />
        );
      case "memory":
        return (
          <MemoryGame
            exercise={currentExercise}
            onComplete={(isCorrect) => isCorrect ? handleCorrectAnswer() : handleWrongAnswer()}
          />
        );
      case "matching":
        return (
          <MatchingExercise
            exercise={currentExercise}
            onComplete={(isCorrect) => isCorrect ? handleCorrectAnswer() : handleWrongAnswer()}
          />
        );
        case "dual":
        return (
        <ExerciseCardDualChoice
        exercise={currentExercise}
        onCheckAnswer={(isCorrect) => isCorrect ? handleCorrectAnswer() : handleWrongAnswer()}
        lives={lives}
        />
        );
      case "singleImage":
        return (
          <ExerciseCardSingleImage
          exercise={currentExercise}
          answer={selectedOption}
          setAnswer={setSelectedOption}
          checkAnswer={checkAnswer}
          lives={lives}
          />
        );
      default:
        return <div className="text-red-600">Ejercicio no reconocido</div>;
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/game/icons-jungla/jungleLevel.png')" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header progress={(current + 1) / (levelExercises.length || 1)} lives={lives} />
      </div>

      <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
        <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
          {renderExerciseComponent()}
        </div>

        {feedback.message && (
          <FeedbackMessage message={feedback.message} type={feedback.type} />
        )}

        {lives > 0 && currentExercise?.type === "choice" && (
          <button
            onClick={checkAnswer}
            disabled={!selectedOption}
            className="fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg bg-green-500 hover:bg-green-600 text-white transition-all"
          >
            Comprobar
          </button>
        )}

        {lives <= 0 && (
          <LoseOverlay onRetry={resetState} onExit={() => navigate("/jungla")} />
        )}

        {showLevelComplete && (
          <LevelComplete livesRemaining={lives} onClose={() => navigate("/jungla")} />
        )}
      </div>
    </div>
  );
}
