import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Like from '../../assets/icons/like.png'
import GoodJob from '../../assets/icons/good-job.png'
import Trophy from '../../assets/icons/trophy-cup.png'

export default function LevelComplete({ livesRemaining, onClose }) {
  const { id, world } = useParams();
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (livesRemaining >= 3) setStars(3);
    else if (livesRemaining === 2) setStars(2);
    else if (livesRemaining === 1) setStars(1);
    else setStars(0);
  }, [livesRemaining]);

  const handleNextLevel = () => {
    saveStars();
    onClose();
    setTimeout(() => {
      navigate(`/level/${world}/${parseInt(id) + 1}`, {
        state: { reset: true }
      });
    }, 300);
  };

  const handleWorldMap = () => {
    saveStars();
    onClose();
    setTimeout(() => {
      navigate(`/${world}`);
    }, 300);
  };

  const saveStars = () => {
    const levelNumber = parseInt(id);

    // Guardar estrellas
    const starsKey = `levelStars-${world}`;
    const storedStars = JSON.parse(localStorage.getItem(starsKey)) || {};

    if (!storedStars[levelNumber] || storedStars[levelNumber] < stars) {
      storedStars[levelNumber] = stars;
      localStorage.setItem(starsKey, JSON.stringify(storedStars));
    }

    // Guardar nivel completado
    const completedKey = `completedLevels-${world}`;
    const completed = JSON.parse(localStorage.getItem(completedKey)) || [];

    if (!completed.includes(levelNumber)) {
      completed.push(levelNumber);
      localStorage.setItem(completedKey, JSON.stringify(completed));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-90 rounded-xl p-8 max-w-md w-full text-center border-2 border-purple-600 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          ¡Nivel Completado!
        </h2>

        <div className="flex justify-center gap-4 my-6">
          {[1, 2, 3].map((star) => (
            <img
              key={star}
              src={star <= stars ? "/src/assets/icons/star.png" : "/src/assets/icons/star-null.png"}
              alt={star <= stars ? "Estrella ganada" : "Estrella vacía"}
              className={`w-12 h-12 transition-transform ${star <= stars ? 'animate-bounce' : ''}`}
              style={{ animationDelay: `${star * 0.1}s` }}
            />
          ))}
        </div>

        <p className="text-lg mb-6 text-purple-700 flex justify-center items-center gap-2">
          {stars === 3 ? (
            <>
              <b>¡Perfecto!</b>
              <img src={Trophy} alt="Trofeo" className="h-8 inline-block" />
            </>
          ) : stars === 2 ? (
            <>
              <b>¡Buen trabajo!</b>
              <img src={GoodJob} alt="Buen trabajo" className="h-8 inline-block" />
            </>
          ) : (
            <>
              <b>¡Lo lograste!</b>
              <img src={Like} alt="Like" className="h-8 inline-block" />
            </>
          )}
        </p>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {parseInt(id) < 4 && (
            <button
              onClick={handleNextLevel}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              Siguiente Nivel
            </button>
          )}
          <button
            onClick={handleWorldMap}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            Volver al Mapa
          </button>
        </div>
      </div>
    </div>
  );
}
