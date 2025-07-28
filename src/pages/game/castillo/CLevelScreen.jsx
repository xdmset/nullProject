import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { exercises } from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";
import FeedbackMessage from "../components/FeedbackMessage";
import LoseOverlay from "../components/Loseoverlay";
import Header from "../components/Header";
import ExerciseCardSingleImage from "../components/ExerciseCardSingleImage";
import ExerciseCardDualChoice from "../components/ExerciseCardDualChoice";
import { useRandomExercises } from "../hooks/useRandomExercises";


export default function LevelScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const levelKey = `pantalla${id}`;
  
  let numExercises = 6;

if (id === "2" || id === "3") {
  numExercises = 7;
} else if (id === "4") {
  numExercises = 9;
}

const [levelExercises] = useRandomExercises(numExercises, exercises[levelKey]);


  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [selectedOption, setSelectedOption] = useState(id === "3" ? "" : null);
  const [isChecking, setIsChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!levelExercises) {
      navigate("/");
    }
  }, [levelKey, levelExercises, navigate]);

  const currentExercise = levelExercises?.[current];

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

    if (id === "3") {
      const userAnswer = option.trim().toLowerCase();
      const correct = currentExercise.correctAnswer.toLowerCase();

      const equivalencias = {
        "cero": ["cero", "0"],
        "uno": ["uno", "1"],
        "dos": ["dos", "2"],
        "tres": ["tres", "3"],
        "cuatro": ["cuatro", "4"],
        "cinco": ["cinco", "5"],
        "seis": ["seis", "6"],
        "siete": ["siete", "7"],
        "ocho": ["ocho", "8"],
        "nueve": ["nueve", "9"],
        "diez": ["diez", "10"],
        "once": ["once", "11"],
        "doce": ["doce", "12"],
        "trece": ["trece", "13"],
        "catorce": ["catorce", "14"],
        "quince": ["quince", "15"]
      };

      const validAnswers = equivalencias[correct] || [correct];
      isCorrect = validAnswers.includes(userAnswer);

    } else if (id === "4") {
      return;
    } else {
      isCorrect = option.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
;
    }

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    const isLastExercise = current === levelExercises.length - 1;

    playCorrectSound();

    setFeedback({
      message: isLastExercise
        ? "¡Nivel completado!"
        : "Respuesta Correcta, ¡Sigue así!",
      type: "success"
    });

    if (isLastExercise) {
      markLevelAsCompleted();

      playCelebrationSound();

      setTimeout(() => {
        setShowModal(true);
      }, 500);
    } else {
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFeedback({ message: "", type: "" });
        if (id === "3") setSelectedOption("");
      }, 1000);
    }
  };

  const handleWrongAnswer = () => {
    playWrongSound();

    const remainingLives = lives - 1;

    if (remainingLives > 0) {
      setLives(remainingLives);
      setFeedback({
        message: "Respuesta incorrecta, inténtalo de nuevo",
        type: "error"
      });
      if (id === "4") {
        setSelectedOption(null);
      }

      setTimeout(() => setFeedback({ message: "", type: "" }), 1000);
    } else {
      setLives(0);
      setFeedback({ message: "¡Perdiste todas las vidas!", type: "error" });
    }
  };

  const markLevelAsCompleted = () => {
    const stored = JSON.parse(localStorage.getItem("completedLevels")) || [];
    const levelNumber = parseInt(id);
    if (!stored.includes(levelNumber)) {
      stored.push(levelNumber);
      localStorage.setItem("completedLevels", JSON.stringify(stored));
    }
  };

  const restartLevel = () => {
    setCurrent(0);
    setLives(3);
    setFeedback({ message: "", type: "" });
    if (id === "3") setSelectedOption("");
    else setSelectedOption(null);
    setShowModal(false);
  };

  if (!levelExercises) return null;

  return (
  <div
    className="relative min-h-screen bg-cover bg-center overflow-x-hidden"
    style={{
      backgroundImage: "url('/src/assets/City.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >

      <div className="fixed top-0 left-0 right-0 z-50">
        <Header
          progress={(current + 1) / levelExercises.length}
          lives={lives}
        />
      </div>

      <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
        <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
          {currentExercise?.type === "text" && (
            <ExerciseCard
              exercise={currentExercise}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isImageOptions={id === "2"}
              lives={lives}
              onCheckAnswer={checkAnswer}
            />
          )}

          {currentExercise?.type === "image" && (
            <ExerciseCardSingleImage
              exercise={currentExercise}
              answer={selectedOption}
              setAnswer={setSelectedOption}
              checkAnswer={checkAnswer}
              lives={lives}
            />
          )}

          {currentExercise?.type === "dual" && (
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
          )}

        </div>

        {feedback.message && (
          <FeedbackMessage message={feedback.message} type={feedback.type} />
        )}

        {id !== "3" && id !== "4" && lives > 0 && currentExercise?.type !== "image" && (
          <button
            onClick={checkAnswer}
            disabled={!selectedOption || lives <= 0}
            className={`fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300
                ${
                  selectedOption && lives > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }
              `}
          >
            Comprobar
          </button>
        )}
        {lives === 0 && (
          <LoseOverlay onRetry={restartLevel} onExit={() => navigate("/")} />
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">🎉 ¡Felicidades Campeón!</h2>
              <p className="text-gray-700 mb-6">Has completado el nivel con éxito. Sigue así 🤟</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                Volver al menú
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
