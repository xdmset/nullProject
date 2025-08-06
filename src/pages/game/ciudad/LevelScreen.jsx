import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { exercises } from "../../../components/game/ciudad/Exercises";
import ExerciseCard from "../../../components/game/ciudad/ExerciseCard";
import FeedbackMessage from "../../../components/game/FeedbackMessage";
import LoseOverlay from "../../../components/game/Loseoverlay";
import Header from "../../../components/game/Header";
import ExerciseCardSingleImage from "../../../components/game/ciudad/ExerciseCardSingleImage";
import ExerciseCardDualChoice from "../../../components/game/ciudad/ExerciseCardDualChoice";
import LevelComplete from '../../../components/game/levelComplete';
import { useRandomExercises } from "../../../hooks/useRandomExercises";
import { updateProgreso } from "../../../services/apiService";

const MUNDO_ID = 2; // ID del mundo "Ciudad"

export default function LevelScreen() {
    const { id: levelId } = useParams(); // levelId es el ID real de la BD, ej: "5", "6"
    const navigate = useNavigate();
    const location = useLocation();

    // --- CORRECCIÓN AQUÍ ---
    // Mapa que traduce el ID de la base de datos a la clave del archivo de ejercicios
    const levelIdToKeyMap = {
        '5': 'pantalla1', // Nivel con ID 5 en la BD usa los ejercicios de 'pantalla1'
        '6': 'pantalla2', // Nivel con ID 6 en la BD usa los ejercicios de 'pantalla2'
        '7': 'pantalla3', // Nivel con ID 7 en la BD usa los ejercicios de 'pantalla3'
        '8': 'pantalla4', // Nivel con ID 8 en la BD usa los ejercicios de 'pantalla4'
    };
    const levelKey = levelIdToKeyMap[levelId];

    // Esta lógica debería venir de la API en el futuro
    let numExercises = 6;
    if (levelId === "6" || levelId === "7") numExercises = 7;
    else if (levelId === "8") numExercises = 9;

    const exercisesForLevel = useMemo(() => {
        return exercises[levelKey] || [];
    }, [levelKey]);

    const [levelExercises, generateRandomExercises] = useRandomExercises(numExercises, exercisesForLevel);

    const [current, setCurrent] = useState(0);
    const [lives, setLives] = useState(3);
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const [selectedOption, setSelectedOption] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [showLevelComplete, setShowLevelComplete] = useState(false);

    const currentExercise = levelExercises[current];

    useEffect(() => {
        if (!exercisesForLevel.length) {
            console.error(`No se encontraron ejercicios para levelKey: ${levelKey} (correspondiente al levelId: ${levelId})`);
            navigate("/ciudad");
            return;
        }
        generateRandomExercises();
        setCurrent(0);
        setLives(3);
        setFeedback({ message: "", type: "" });
        setSelectedOption(null);
        setShowLevelComplete(false);
    }, [levelId, generateRandomExercises, navigate, exercisesForLevel, levelKey]);

    useEffect(() => {
        if (location.state?.reset) {
            restartLevel();
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);

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

    const handleAnswer = (option) => {
        if (!currentExercise || lives <= 0) return;
        const isCorrect = option.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
        isCorrect ? handleCorrectAnswer() : handleWrongAnswer();
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
                setSelectedOption("");
                setFeedback({ message: "", type: "" });
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

    const markLevelAsCompleted = async () => {
        try {
            await updateProgreso(MUNDO_ID);
            console.log("Progreso guardado en la base de datos.");
        } catch (error) {
            console.error("Error al guardar el progreso:", error);
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

    const checkAnswer = () => {
        if (!selectedOption || lives <= 0 || isChecking) return;
        handleAnswer(selectedOption);
    };


    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/src/assets/game/icons-ciudad/City2.png')" }}
        >
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header progress={(current + 1) / levelExercises.length} lives={lives} />
            </div>
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
                <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
                    {currentExercise?.type === "text" && (
                        <ExerciseCard
                            exercise={currentExercise}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            isImageOptions={levelId === "6"}
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
                                isCorrect ? handleCorrectAnswer() : handleWrongAnswer();
                            }}
                            lives={lives}
                        />
                    )}
                </div>
                {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} />}
                {lives > 0 && currentExercise?.type === "text" && (
                    <button
                        onClick={checkAnswer}
                        disabled={!selectedOption || isChecking}
                        className={`fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg transition ${
                            selectedOption && !isChecking ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Comprobar
                    </button>
                )}
                {lives === 0 && <LoseOverlay onRetry={restartLevel} onExit={() => navigate("/ciudad")} />}
                {showLevelComplete && <LevelComplete livesRemaining={lives} onClose={() => navigate('/ciudad')} />}
            </div>
        </div>
    );
}