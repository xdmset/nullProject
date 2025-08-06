import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function RewardModal({ onClose, unlockedAchievement }) {
  const navigate = useNavigate();

  useEffect(() => {
    playCelebrationSound();
    return () => {
      // Limpieza si es necesaria
    };
  }, []);

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

  const playCelebrationSound = () => {
    const notes = [
      { freq: 523.25, duration: 0.2, delay: 0 },
      { freq: 659.25, duration: 0.2, delay: 150 },
      { freq: 783.99, duration: 0.2, delay: 300 },
      { freq: 1046.5, duration: 0.3, delay: 450 },
      { freq: 783.99, duration: 0.15, delay: 600 },
      { freq: 1046.5, duration: 0.15, delay: 700 },
      { freq: 1318.5, duration: 0.4, delay: 800 },
    ];

    notes.forEach(note => {
      setTimeout(() => {
        createTone(note.freq, note.duration, "triangle");
      }, note.delay);
    });
  };

  const AchievementBadge = () => (
    <svg 
      width="64" 
      height="64" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 mr-4"
    >
      <path 
        d="M12 15L9 18V20H15V18L12 15Z" 
        fill="url(#paint0_linear)" 
        stroke="#6B46C1" 
        strokeWidth="1.5"
      />
      <path 
        d="M7 7L9 3H15L17 7H7Z" 
        fill="url(#paint1_linear)" 
        stroke="#6B46C1" 
        strokeWidth="1.5"
      />
      <path 
        d="M6 7V13C6 15 9 16 12 16C15 16 18 15 18 13V7H6Z" 
        fill="url(#paint2_linear)" 
        stroke="#6B46C1" 
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="12" y1="15" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6E05E"/>
          <stop offset="1" stopColor="#ECC94B"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="12" y1="3" x2="12" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6E05E"/>
          <stop offset="1" stopColor="#ECC94B"/>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="12" y1="7" x2="12" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6E05E"/>
          <stop offset="1" stopColor="#ECC94B"/>
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-3xl py-8 px-10 w-[90%] max-w-3xl shadow-xl text-center relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-800 font-bold text-2xl hover:text-red-500 transition-transform hover:scale-125"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <motion.div
          className="flex justify-center items-center mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src={logo} alt="Logo" className="h-14 mr-4 drop-shadow-lg" />
          <div className="text-left">
            <h1 className="text-2xl font-bold text-purple-800">SIGNLINGUS</h1>
            <p className="text-sm text-gray-600">Para oídos callados... manos parlantes</p>
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl font-medium text-purple-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡Nuevo logro desbloqueado!
        </motion.h3>

        <motion.div
          className="mt-4 mb-6 p-4 bg-purple-100 rounded-lg border-2 border-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center">
            <AchievementBadge />
            <div className="text-left">
              <h4 className="text-lg font-bold text-purple-800">
                {unlockedAchievement?.nombre || "Logro nuevo desbloqueado"}
              </h4>
              <p className="text-sm text-purple-600">
                {unlockedAchievement?.descripcion || "Has alcanzado un nuevo hito"}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="text-xl sm:text-2xl font-medium my-4 text-purple-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          ¡Felicidades por tu progreso!
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button 
            onClick={onClose}
            className="bg-green-500 text-white py-3 px-8 rounded-xl text-lg font-bold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Continuar
          </button>
          <button 
            onClick={() => {
              onClose();
              navigate('/profile');
            }}
            className="bg-purple-500 text-white py-3 px-8 rounded-xl text-lg font-bold hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Ver mi perfil
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}