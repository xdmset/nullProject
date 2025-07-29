import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RewardModal from "../RewardModal";

export default function CityScreen() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([]);
  const [levelStars, setLevelStars] = useState({});
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const shouldAnimateCofre = completedLevels.includes(4); 

  const levels = [
    { number: 1, exercises: 6, difficulty: 4 },
    { number: 2, exercises: 7, difficulty: 4 },
    { number: 3, exercises: 7, difficulty: 5 },
    { number: 4, exercises: 9, difficulty: 5 },
  ];

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("completedLevels")) || [];
  const storedStars = JSON.parse(localStorage.getItem("levelStars")) || {};
  setCompletedLevels(stored);
  setLevelStars(storedStars);
}, []);

  const handleLevelClick = (level) => {
    const index = level - 1;
    if (index === 0 || completedLevels.includes(index)) {
      navigate(`/level/ciudad/${level}`);
    }
  };

  const isUnlocked = (level) => {
    return level === 1 || completedLevels.includes(level - 1);
  };

  const getFlagImage = (level) => {
    if (completedLevels.includes(level)) return "/src/assets/game/banderas/BanderaVerde.png";
    if (isUnlocked(level)) return "/src/assets/game/banderas/BanderaRoja.png";
    return "/src/assets/game/banderas/BanderaGris.png";
  };

const handleCofreClick = () => {
  const hasCompletedLastLevel = completedLevels.includes(4);
  if (hasCompletedLastLevel) {
    setShowReward(true); // Abrimos el modal
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
  const stars = levelStars[levelNumber] || 0;
  return (
    <div className="flex justify-center gap-1 mt-2">
      {[1, 2, 3].map((star, index) => (
        <img
          key={star}
          src={
            star <= stars
              ? "/src/assets/icons/star.png"
              : "/src/assets/icons/star-null.png"
          }
          alt={star <= stars ? "Estrella ganada" : "Estrella vacía"}
          className={`w-5 h-5 transition-transform duration-300 ${
            star <= stars ? "animate-bounce-slow hover:scale-110" : "opacity-70"
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};

const highestCompleted = completedLevels.length ? Math.max(...completedLevels) : 0;
const cofreLevel = Math.min(highestCompleted + 1, 5);
const cofreImage = `/src/assets/game/cofres/cofre${cofreLevel}.png`;

  const getCofreImage = () => {
    return `/src/assets/game/cofres/cofre${cofreLevel}.png`;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/src/assets/game/icons-ciudad/CIUDAD.png')" }}
    >
      <div className="absolute bottom-10 w-full">

        <button
  onClick={() => navigate("/world")}
  className="mt-4 ml-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
>
  ← Regresar al Mundo
</button>


        <div className="flex gap-32 flex-wrap justify-center items-end">
          {levels.map((level, index) => {
            const unlocked = isUnlocked(level.number);
            const bandera = getFlagImage(level.number);

            let transformStyle = "";
            if (index === 0) transformStyle = "translateY(-10px)";
            if (index === 1) transformStyle = "translateY(-40px)";
            if (index === 2) transformStyle = "translateY(-40px)";
            if (index === 3) transformStyle = "translateY(-10px)";

            return (
              <div
                key={level.number}
                className={`cursor-pointer flex flex-col items-center transition-transform duration-300 relative ${
                  unlocked ? "hover:scale-110" : "opacity-40 cursor-not-allowed"
                }`}
                onClick={() => unlocked && handleLevelClick(level.number)}
                onMouseEnter={() => unlocked && setHoveredLevel(level.number)}
                onMouseLeave={() => unlocked && setHoveredLevel(null)}
                style={{ transform: transformStyle }}
              >
                <img
                  src={bandera}
                  alt={`Nivel ${level.number}`}
                  className="w-40 h-40 object-contain drop-shadow-lg"
                />
                <span className="bg-backgroung-100 font-bold mt-2 text-xl tracking-wide drop-shadow-sm">
                Nivel {level.number}
                </span>

                {unlocked && hoveredLevel === level.number && (
                  <div className="absolute bottom-full mb-4 w-72 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl p-5 shadow-2xl z-30 animate-fade-in backdrop-blur-md border-4 border-white/50">
                    <h6 className="text-xl font-extrabold text-center bg-backgroung-100 drop-shadow-sm">
                      ¡Explora el Nivel {level.number}!
                    </h6>

                    <div className="mt-3 text-center text-base text-purple-800 font-medium">
                      <p className="mb-2">Ejercicios: <span className="font-bold">{level.exercises}</span></p>

                      <p className="mb-2">Dificultad:</p>
                      <div className="flex justify-center mb-2">{renderDifficulty(level.difficulty)}</div>

                      {completedLevels.includes(level.number) && (
                        <div>
                          <p className="mb-1">Tus Estrellas:</p>
                          <div className="flex justify-center">{renderStars(level.number)}</div>
                        </div>
                      )}
                    </div>

                    {/* Flecha inferior decorativa */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-100"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Cofre */}
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
}
