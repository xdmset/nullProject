import { useEffect, useState } from "react";

// ⚠️ Asegúrate de pasar `onLevelSelect` como prop desde App.jsx
export default function WorldScreen({ onLevelSelect }) {
  const [completedLevels, setCompletedLevels] = useState([]);
  const [levelStars, setLevelStars] = useState({});
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const levels = [
    { number: 1, exercises: 6, difficulty: 4 },
    { number: 2, exercises: 7, difficulty: 4 },
    { number: 3, exercises: 7, difficulty: 5 },
    { number: 4, exercises: 9, difficulty: 5 }
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
      onLevelSelect(level); // ✅ Redirige manualmente
    }
  };

  const isUnlocked = (level) => {
    return level === 1 || completedLevels.includes(level - 1);
  };

  const getFlagImage = (level) => {
    if (completedLevels.includes(level)) return "/src/assets/banderas/BanderaVerde.png";
    if (isUnlocked(level)) return "/src/assets/banderas/BanderaRoja.png";
    return "/src/assets/banderas/BanderaGris.png";
  };

  const renderDifficulty = (difficulty) => {
    return Array.from({ length: difficulty }).map((_, i) => (
      <img 
        key={i} 
        src="/src/assets/banana.png" 
        alt="banana" 
        className="w-6 h-6 inline-block mx-0.5" 
      />
    ));
  };

  const renderStars = (levelNumber) => {
    const stars = levelStars[levelNumber] || 0;
    return (
      <div className="flex justify-center gap-1 mt-2">
        {[1, 2, 3].map((star) => (
          <img
            key={star}
            src={star <= stars ? "/src/assets/estrellas/Estrella.png" : "/src/assets/estrellas/Estrellanull.png"}
            alt={star <= stars ? "Estrella ganada" : "Estrella vacía"}
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  };

  const allLevelsCompleted = completedLevels.length === levels.length;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/src/assets/CastleWorld.jpg')" }}
    >
      <div className="absolute bottom-10 w-full">
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
                className={`cursor-pointer flex flex-col items-center transition-transform relative ${
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
                  className="w-40 h-40 object-contain"
                />
                <span className="text-white font-bold mt-2">Nivel {level.number}</span>

                {unlocked && hoveredLevel === level.number && (
                  <div className="absolute bottom-full mb-4 w-64 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg z-10">
                    <h3 className="text-xl font-bold text-center text-gray-800">Nivel {level.number}</h3>
                    <div className="mt-2 text-center">
                      <p className="text-gray-600">Ejercicios: {level.exercises}</p>
                      <div className="mt-2">
                        <p className="text-gray-600 mb-1">Dificultad:</p>
                        <div className="flex justify-center">
                          {renderDifficulty(level.difficulty)}
                        </div>
                      </div>
                      {completedLevels.includes(level.number) && (
                        <div className="mt-2">
                          <p className="text-gray-600 mb-1">Tus estrellas:</p>
                          {renderStars(level.number)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-90"></div>
                  </div>
                )}
              </div>
            );
          })}

          <div 
            className="flex flex-col items-center transition-transform hover:scale-110 cursor-pointer"
            style={{ transform: "translateY(20px)" }}
          >
            <img
              src={allLevelsCompleted 
                ? "/src/assets/cofres/CofreAbierto.png" 
                : "/src/assets/cofres/CofreCerrado.png"}
              alt={allLevelsCompleted ? "Cofre abierto" : "Cofre cerrado"}
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
