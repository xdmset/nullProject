import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Lives from "./Lives";
import { useNavigate, useParams } from "react-router-dom";

export default function Header({ progress = null, lives = 3 }) {
  const [showExitModal, setShowExitModal] = useState(false);
  const navigate = useNavigate();
  const { world } = useParams(); // Para saber a qué mundo regresar

  const handleExit = () => {
    navigate(`/${world}`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between py-3 px-6 shadow-lg bg-opacity-60 backdrop-blur-md" style={{ backgroundColor: 'rgba(112, 36, 172, 0.6)' }}>
        <button
          onClick={() => setShowExitModal(true)}
          className="flex items-center justify-center w-10 h-10"
          aria-label="Regresar"
        >
          <img
            src="/src/assets/icons/back.png" // 🔁 Ruta a tu botón PNG
            alt="Regresar"
            className="w-6 h-6 object-contain"
          />
        </button>

        <div className="flex flex-col items-center flex-grow mx-4">
          <div className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="Signlingus"
              className="w-12 h-12 object-contain mr-3"
            />
            <h1 className="text-2xl font-bold text-white">Signlingus</h1>
          </div>

          {progress !== null && (
            <div className="w-full max-w-md mt-2">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>

        <Lives lives={lives} />
      </div>

      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#7024ac', border: '2px solid white' }}>
            <h3 className="text-xl font-bold text-white mb-4">¿Salir del nivel?</h3>
            <p className="text-white mb-6">Si sales ahora, perderás todo el progreso de este nivel.</p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 rounded-lg bg-white text-purple-700 font-bold hover:bg-gray-100 transition-colors"
              >
                Permanecer
              </button>
              <button
                onClick={handleExit}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
