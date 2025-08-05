import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RewardModal from "../RewardModal";
import { getMundoData, getMundoProgreso } from "../../../services/apiService";

const MUNDO_ID = 5; // El ID para el mundo "Ciudad" en tu base de datos

export default function SecretPage() {
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
        navigate(`/level/secret/${level.id}`);
    };

    const isUnlocked = (levelOrder) => {
        return levelOrder <= nivelesCompletados + 1;
    };

    const getFlagImage = (levelOrder) => {
        if (levelOrder <= nivelesCompletados) return "/src/assets/game/icons-ciudad/activo.png";
        if (isUnlocked(levelOrder)) return "/src/assets/game/icons-ciudad/desactivo.png";
        return "/src/assets/game/icons-ciudad/bloqueado.png";
    };

    const handleCofreClick = () => {
        if (shouldAnimateCofre) {
            setShowReward(true);
        }
    };

    const renderDifficulty = (difficulty) => {
        return Array.from({ length: difficulty }).map((_, i) => (
            <img
                key={i}
                src="/src/assets/icons/banano.png"
                alt="banana"
                className="w-6 h-6 inline-block mx-0.5"
            />
        ));
    };

    const renderStars = (levelNumber) => {
        // Esta lógica necesitaría que la API devuelva las estrellas por nivel.
        // Por ahora, se asume 0.
        const stars = 0; 
        return (
            <div className="flex justify-center gap-1 mt-2">
                {[1, 2, 3].map((star, index) => (
                    <img
                        key={star}
                        src={star <= stars ? "/src/assets/icons/star.png" : "/src/assets/icons/star-null.png"}
                        alt={star <= stars ? "Estrella ganada" : "Estrella vacía"}
                        className={`w-5 h-5 transition-transform duration-300 ${star <= stars ? "animate-bounce-slow hover:scale-110" : "opacity-70"}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    />
                ))}
            </div>
        );
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
            style={{ backgroundImage: "url('/src/assets/game/icons-secrets/secretLevel.png')" }}
        >
            <div className="absolute bottom-10 w-full">
                <button
                    onClick={() => navigate("/world")}
                    className="absolute top-16 left-4 mt-4 ml-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md transition duration-300 z-20"
                >
                    ← Regresar al Mundo
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
                                <img
                                    src={bandera}
                                    alt={`Nivel ${level.nombre}`}
                                    className="transition-transform duration-300 w-full hover:scale-105 cursor-pointer"
                                />
                                <span className="font-bold mt-2 text-xl tracking-wide drop-shadow-sm">
                                    {level.nombre}
                                </span>

                                {unlocked && hoveredLevel === level.id && (
                                    <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-64 bg-white text-black text-center p-4 rounded-xl shadow-xl z-30 animate-open-map">
                                        <h6 className="text-xl font-extrabold text-center drop-shadow-sm">
                                            ¡Explora {level.nombre}!
                                        </h6>
                                        <div className="mt-3 text-center text-base text-purple-800 font-medium">
                                            <p className="mb-2">Ejercicios: <span className="font-bold">{level.cantidad_ejercicio}</span></p>
                                            {nivelesCompletados >= levelOrder && (
                                                <div>
                                                    <p className="mb-1">Tus Estrellas:</p>
                                                    <div className="flex justify-center">{renderStars(levelOrder)}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-100"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div
                        className={`flex flex-col items-center transition-transform ${shouldAnimateCofre ? "hover:scale-110 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                        style={{ transform: "translateY(20px)" }}
                        onClick={handleCofreClick}
                    >
                        <img
                            src={getCofreImage()}
                            alt="Cofre"
                            className={`w-40 h-40 object-contain ${shouldAnimateCofre ? "animate-wiggle" : ""}`}
                        />
                    </div>
                </div>
            </div>
            {showReward && <RewardModal onClose={() => setShowReward(false)} />}
        </div>
    );
};
