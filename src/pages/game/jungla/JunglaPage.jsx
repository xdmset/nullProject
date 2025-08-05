import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RewardModal from "../RewardModal";
import { getMundoData, getMundoProgreso } from "../../../services/apiService";

const MUNDO_ID = 3; // El ID para el mundo "Jungla"

export default function JunglaPage() {
    const navigate = useNavigate();
    const [levels, setLevels] = useState([]);
    const [progreso, setProgreso] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [mundoResponse, progresoResponse] = await Promise.all([
                    getMundoData(MUNDO_ID),
                    getMundoProgreso(MUNDO_ID),
                ]);
                setLevels(mundoResponse.data.niveles || []);
                if (progresoResponse.data.length > 0) {
                    setProgreso(progresoResponse.data[0]);
                }
            } catch (error) {
                console.error("Error al cargar los datos del mundo:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const nivelesCompletados = progreso ? progreso.niveles_completados : 0;
    const shouldAnimateCofre = nivelesCompletados >= (levels.length || 4);

    const handleLevelClick = (level) => {
        navigate(`/level/jungla/${level.id}`);
    };

    const isUnlocked = (levelOrder) => {
        return levelOrder <= nivelesCompletados + 1;
    };

    const getFlagImage = (levelOrder) => {
        if (levelOrder <= nivelesCompletados) return "/src/assets/game/icons-jungla/jungla1.png";
        if (isUnlocked(levelOrder)) return "/src/assets/game/icons-jungla/jungla2.png";
        return "/src/assets/game/icons-jungla/jungla3.png";
    };
    
    const handleCofreClick = () => {
        if (shouldAnimateCofre) {
            setShowReward(true);
        }
    };

    const getCofreImage = () => {
        const highestCompleted = nivelesCompletados;
        const cofreLevel = Math.min(highestCompleted + 1, 5);
        return `/src/assets/game/cofres/cofre${cofreLevel}.png`;
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">Cargando...</div>;
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
            style={{ backgroundImage: "url('/src/assets/game/icons-jungla/jungle.png')" }}
        >
            <div className="absolute bottom-10 w-full">
                <button
                    onClick={() => navigate("/world")}
                    className="absolute top-16 left-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md z-20"
                >
                    ← Regresar al Mundo
                </button>

                {levels.length > 0 ? (
                    <div className="flex gap-32 flex-wrap justify-center items-end">
                        {levels.map((level, index) => {
                            const levelOrder = index + 1;
                            const unlocked = isUnlocked(levelOrder);
                            const bandera = getFlagImage(levelOrder);
                            return (
                                <div
                                    key={level.id}
                                    className={`cursor-pointer flex flex-col items-center transition-transform duration-300 relative ${unlocked ? "hover:scale-110" : "opacity-40 cursor-not-allowed"}`}
                                    onClick={() => unlocked && handleLevelClick(level)}
                                >
                                    <img src={bandera} alt={level.nombre} className="w-40 h-40 object-contain drop-shadow-lg" />
                                    <span className="text-yellow-300 font-bold mt-2 text-xl tracking-wide drop-shadow-sm">{level.nombre}</span>
                                </div>
                            );
                        })}
                        <div
                            className={`flex flex-col items-center transition-transform ${shouldAnimateCofre ? "hover:scale-110 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                            onClick={handleCofreClick}
                        >
                            <img src={getCofreImage()} alt="Cofre" className={`w-40 h-40 object-contain ${shouldAnimateCofre ? "animate-wiggle" : ""}`} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
                            Este mundo está en construcción. ¡Vuelve pronto!
                        </p>
                    </div>
                )}
            </div>
            {showReward && <RewardModal onClose={() => setShowReward(false)} />}
        </div>
    );
}