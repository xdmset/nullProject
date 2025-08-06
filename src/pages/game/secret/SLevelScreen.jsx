import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { exercises } from "../../../components/game/secret/Exercises";
import { useRandomExercises } from "../../../hooks/useRandomExercises";
import { updateProgreso } from "../../../services/apiService";
import FeedbackMessage from "../../../components/game/FeedbackMessage";
import LoseOverlay from "../../../components/game/Loseoverlay";
import Header from "../../../components/game/Header";
import LevelComplete from '../../../components/game/levelComplete';

// Tus componentes de ejercicio
import ExerciseCard from "../../../components/game/playa/ExerciseCard";
import ExerciseCardSingleImage from "../../../components/game/playa/ExerciseCardSingleImage";
import ExerciseCardDualChoice from "../../../components/game/playa/ExerciseCardDualChoice";
import ExerciseCardOrder from "../../../components/game/playa/ExerciseCardOrder";
import ExerciseCardMatch from "../../../components/game/playa/ExerciseCardMatch";
import MemoryGame from "../../../components/game/playa/ExerciseMemoryGame";
import ExerciseCardLineMatch from "../../../components/game/playa/ExerciseCardLineMatch";

const MUNDO_ID = 5; // ID del mundo "Secreto"

export default function SLevelScreen() {
    const { id: levelId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const levelIdToKeyMap = {
        '13': 'pantalla1', // Asumiendo que el ID del nivel secreto en la BD es 13
    };
    const levelKey = levelIdToKeyMap[levelId];

    let numExercises = 15;

    const exercisesForLevel = useMemo(() => exercises[levelKey] || [], [levelKey]);
    const [levelExercises, generateRandomExercises] = useRandomExercises(numExercises, exercisesForLevel);

    const [current, setCurrent] = useState(0);
    const [lives, setLives] = useState(3);
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const [selectedOption, setSelectedOption] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [showLevelComplete, setShowLevelComplete] = useState(false);

    const currentExercise = levelExercises[current];

    useEffect(() => {
        if (!levelKey) {
            navigate("/secret");
            return;
        }
        restartLevel();
    }, [levelId]);
    
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

    const checkAnswer = () => {
        if (selectedOption === null || lives <= 0) return;
        handleAnswer(selectedOption);
        if (levelId !== "3") setSelectedOption(null);
    };

    const handleAnswer = (option) => {
        if (!currentExercise || lives <= 0 || isChecking) return;
        setIsChecking(true);
        
        let isCorrect = false;
        if (currentExercise.type === "input" || levelId === "3" || levelId === "4") {
            isCorrect = option.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase();
        } else {
            isCorrect = option === currentExercise.correctAnswer || option === currentExercise.correctLetter;
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
        setFeedback({ message: isLast ? "¡Nivel completado!" : "Respuesta Correcta, ¡Sigue así!", type: "success" });

        if (isLast) {
            markLevelAsCompleted();
            playCelebrationSound();
            setTimeout(() => setShowLevelComplete(true), 1500);
        } else {
            setTimeout(() => {
                setCurrent(prev => prev + 1);
                setFeedback({ message: "", type: "" });
                setSelectedOption(null);
                setIsChecking(false);
            }, 1500);
        }
    };

    const handleWrongAnswer = () => {
        const remaining = lives - 1;
        playWrongSound();
        if (remaining > 0) {
            setLives(remaining);
            setFeedback({ message: "Respuesta incorrecta, inténtalo de nuevo", type: "error" });
            setTimeout(() => {
                setFeedback({ message: "", type: "" });
                setIsChecking(false);
            }, 1500);
        } else {
            setLives(0);
            setFeedback({ message: "¡Perdiste todas las vidas!", type: "error" });
        }
    };

    const markLevelAsCompleted = async () => {
        try {
            await updateProgreso(MUNDO_ID);
            console.log("Progreso del mundo Secreto guardado.");
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
        setIsChecking(false);
    };

    const renderExerciseComponent = () => {
        if (!currentExercise) return null;
        switch (currentExercise.type) {
            case "single":
            case "input":
                return <ExerciseCardSingleImage exercise={currentExercise} answer={selectedOption} setAnswer={setSelectedOption} checkAnswer={checkAnswer} lives={lives} />;
            case "select":
                return <ExerciseCardDualChoice exercise={currentExercise} onCheckAnswer={(isCorrect) => handleAnswer(isCorrect ? currentExercise.correctAnswer : '')} lives={lives} isChecking={isChecking} resetSelections={lives < 3} />;
            case "match":
                return <ExerciseCardMatch exercise={currentExercise} onCheckAnswer={(isCorrect) => handleAnswer(isCorrect ? currentExercise.correctAnswer : '')} lives={lives} />;
            case "line-match":
                return <ExerciseCardLineMatch exercise={currentExercise} onCheckAnswer={(isCorrect) => handleAnswer(isCorrect ? currentExercise.correctAnswer : '')} lives={lives} />;
            case "order":
                return <ExerciseCardOrder exercise={currentExercise} onCheckAnswer={(isCorrect) => handleAnswer(isCorrect ? currentExercise.correctAnswer : '')} lives={lives} />;
            case "image-to-text":
                return <ExerciseCard exercise={currentExercise} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isImageOptions={false} lives={lives} onCheckAnswer={checkAnswer} />;
            case "text-to-image":
                return <ExerciseCard exercise={currentExercise} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isImageOptions={true} lives={lives} onCheckAnswer={checkAnswer} />;
            case "memory":
                return <MemoryGame exercise={currentExercise} onComplete={(isCorrect) => handleAnswer(isCorrect ? currentExercise.correctAnswer : '')} lives={lives} />;
            default:
                return <div className="text-red-600">Ejercicio no reconocido: {currentExercise.type}</div>;
        }
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/game/icons-secrets/PlayaBackground.png')" }}>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header progress={(current + 1) / (levelExercises.length || 1)} lives={lives} />
            </div>
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
                <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
                    {renderExerciseComponent()}
                </div>
                {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} />}
                
                {currentExercise && !["memory", "match", "line-match", "order", "select"].includes(currentExercise.type) && (
                    <button
                        onClick={checkAnswer}
                        disabled={selectedOption === null || lives <= 0 || isChecking}
                        className={`fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ${
                            (selectedOption !== null && lives > 0 && !isChecking) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        Comprobar
                    </button>
                )}
                
                {lives <= 0 && <LoseOverlay onRetry={restartLevel} onExit={() => navigate("/secret")} />}
                {showLevelComplete && <LevelComplete livesRemaining={lives} onClose={() => navigate('/secret')} />}
            </div>
        </div>
    );
}