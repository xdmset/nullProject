import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { exercises } from '../../../components/game/jungla/Exercise';
import ExerciseCard from "../../../components/game/jungla/ExerciseCard";
import MemoryGame from "../../../components/game/jungla/MemoryGame";
import MatchingExercise from "../../../components/game/jungla/MatchingExercise"; // 1. Importar el componente
import LevelComplete from '../../../components/game/levelComplete';
import LoseOverlay from "../../../components/game/Loseoverlay";
import Header from "../../../components/game/Header";
import FeedbackMessage from "../../../components/game/FeedbackMessage";
import { useRandomExercises } from "../../../hooks/useRandomExercises";
import { updateProgreso } from "../../../services/apiService";

const MUNDO_ID = 3; // ID del mundo "Jungla"

export default function JLevelScreen() {
    const { id: levelId } = useParams();
    const navigate = useNavigate();

    const levelIdToKeyMap = {
        '13': 'pantalla1', '14': 'pantalla2',
        '15': 'pantalla3', '16': 'pantalla4',
    };
    const levelKey = levelIdToKeyMap[levelId];

    let numExercises = 6; // Lógica de ejemplo
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
        if (!exercisesForLevel.length) {
            navigate("/jungla");
            return;
        }
        restartLevel();
    }, [levelId]);
    
    const handleCorrectAnswer = () => {
        const isLast = current === levelExercises.length - 1;
        setFeedback({ message: isLast ? "¡Nivel completado!" : "¡Correcto!", type: "success" });

        if (isLast) {
            markLevelAsCompleted();
            setTimeout(() => setShowLevelComplete(true), 1500);
        } else {
            setTimeout(() => {
                setCurrent(prev => prev + 1);
                setSelectedOption(null);
                setFeedback({ message: "", type: "" });
                setIsChecking(false);
            }, 1500);
        }
    };

    const handleWrongAnswer = () => {
        const remaining = lives - 1;
        setLives(remaining);
        setFeedback({ message: "Incorrecto", type: "error" });
        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            if (remaining > 0) setIsChecking(false);
        }, 1500);
    };

    const markLevelAsCompleted = async () => {
        try {
            await updateProgreso(MUNDO_ID);
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

    const checkAnswer = () => {
        if (!selectedOption || isChecking) return;
        setIsChecking(true);
        if (selectedOption.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase()) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/src/assets/game/icons-jungla/jungleLevel.png')" }}
        >
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header progress={(current + 1) / (levelExercises.length || 1)} lives={lives} />
            </div>
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center pb-6 px-6">
                <div className="relative w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-xl p-6">
                    {currentExercise?.type === "choice" && (
                        <ExerciseCard
                            exercise={currentExercise}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            isChecking={isChecking}
                        />
                    )}
                    {currentExercise?.type === "memory" && (
                        <MemoryGame
                            exercise={currentExercise}
                            onComplete={(isCorrect) => isCorrect ? handleCorrectAnswer() : handleWrongAnswer()}
                        />
                    )}
                    {/* --- 2. LÍNEA AÑADIDA --- */}
                    {currentExercise?.type === "matching" && (
                        <MatchingExercise
                            exercise={currentExercise}
                            onComplete={(isCorrect) => isCorrect ? handleCorrectAnswer() : handleWrongAnswer()}
                        />
                    )}
                </div>
                {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} />}
                {lives > 0 && currentExercise?.type === "choice" && (
                    <button
                        onClick={checkAnswer}
                        disabled={!selectedOption || isChecking}
                        className="fixed bottom-6 right-6 font-bold py-2 px-6 rounded-lg shadow-lg"
                    >
                        Comprobar
                    </button>
                )}
                {lives <= 0 && <LoseOverlay onRetry={restartLevel} onExit={() => navigate("/jungla")} />}
                {showLevelComplete && <LevelComplete livesRemaining={lives} onClose={() => navigate('/jungla')} />}
            </div>
        </div>
    );
}