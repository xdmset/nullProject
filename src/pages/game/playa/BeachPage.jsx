import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RewardModal from "../RewardModal";
import { getMundoData, getMundoProgreso } from "../../../services/apiService";
import Back from '../../../assets/icons/back.png';

const MUNDO_ID = 1; // ID del mundo 

export default function BeachPage() {
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
                console.error("Error al cargar datos del mundo Playa:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const nivelesCompletados = progreso ? progreso.niveles_completados : 0;
    const shouldAnimateCofre = nivelesCompletados >= (levels.length || 4);

    const handleLevelClick = (level) => {
        navigate(`/level/playa/${level.id}`);
    };

    const isUnlocked = (levelOrder) => {
        return levelOrder <= nivelesCompletados + 1;
    };

    const getFlagImage = (levelOrder) => {
        if (levelOrder <= nivelesCompletados) return "/src/assets/game/icons-playa/activo.png";
        if (isUnlocked(levelOrder)) return "/src/assets/game/icons-playa/desactivo.png";
        return "/src/assets/game/icons-playa/bloqueado.png";
    };

    const handleCofreClick = () => {
        if (shouldAnimateCofre) {
            setShowReward(true);
        }
    };

    const getCofreImage = () => {
        const cofreLevel = Math.min(nivelesCompletados + 1, 5);
        return `/src/assets/game/cofres/cofre${cofreLevel}.png`;
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">Cargando...</div>;
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
            style={{ backgroundImage: "url('/src/assets/game/icons-playa/playa.png')" }}
        >
            <div className="absolute bottom-10 w-full">
                <button
                onClick={() => navigate("/world")}
                className="fixed top-6 left-6 z-30 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md transition-transform active:scale-95"
                aria-label="Regresar al Mundo"
                >
                <img src={Back} alt="Volver" className="w-6 h-6" />
                </button>
                <div className="flex gap-32 flex-wrap justify-center items-end">
                    {levels.map((level, index) => {
                        const levelOrder = index + 1;
                        const unlocked = isUnlocked(levelOrder);
                        const bandera = getFlagImage(levelOrder);

                        let transformStyle = "";
                        if (index === 0) transformStyle = "translateY(-10px)";
                        if (index === 1) transformStyle = "translateY(-40px)";
                        if (index === 2) transformStyle = "translateY(-40px)";
                        if (index === 3) transformStyle = "translateY(-10px)";

                        return (
                            <div
                                key={level.id}
                                className={`cursor-pointer flex flex-col items-center transition-transform duration-300 relative ${unlocked ? "hover:scale-110" : "opacity-40 cursor-not-allowed"}`}
                                onClick={() => unlocked && handleLevelClick(level)}
                                onMouseEnter={() => unlocked && setHoveredLevel(level.id)}
                                onMouseLeave={() => unlocked && setHoveredLevel(null)}
                                style={{ transform: transformStyle }}
                            >
                                <img src={bandera} alt={level.nombre} className="w-40 h-40 object-contain drop-shadow-lg" />
                                <span className="font-bold mt-2 text-xl tracking-wide drop-shadow-sm">{level.nombre}</span>

                                {unlocked && hoveredLevel === level.id && (
                                    <div className="absolute bottom-full mb-4 w-72 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl p-5 shadow-2xl z-30">
                                        <h6 className="text-xl font-extrabold text-center drop-shadow-sm">¡Explora {level.nombre}!</h6>
                                    </div>
                                )}
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
            </div>
            {showReward && <RewardModal onClose={() => setShowReward(false)} />}
        </div>
    );
}