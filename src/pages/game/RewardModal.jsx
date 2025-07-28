import React, { useEffect } from "react";
import { motion } from "framer-motion";
import changoBombero from "../../assets/changobombero.jpg";
import changoMago from "../../assets/changomago.jpg";
import logo from "../../assets/logo.png";

export default function RewardModal({ onClose, rewards = [] }) {
useEffect(() => {
  playCelebrationSound();
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


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-3xl py-8 px-10 w-[90%] max-w-3xl shadow-xl text-center relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-800 font-bold text-2xl hover:text-red-500 transition-transform hover:scale-125"
        >
          ✕
        </button>

        {/* Logo + Título */}
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

        {/* Texto principal */}
        <motion.h3
          className="text-2xl font-medium text-purple-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡Has conseguido {rewards.length || 2} nuevos avatares!
        </motion.h3>

        {/* Recompensas */}
        <div className="flex justify-center items-center gap-x-5 my-5 flex-wrap">
          {(rewards.length > 0 ? rewards : [
            { img: changoBombero, comment: "¡Eres fuego!" },
            { img: changoMago, comment: "¡Magia pura!" }
          ]).map((reward, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
              <img
                src={reward.img}
                alt={`Recompensa ${index + 1}`}
                className="w-24 h-24 rounded-full border-4 border-yellow-300 shadow-lg mx-auto"
              />
              <span className="absolute text-yellow-400 text-2xl animate-pulse top-[-5px] right-[-5px]">✦</span>
              <p className="text-sm mt-2 font-semibold text-purple-700">{reward.comment}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          className="text-xl sm:text-2xl font-medium my-4 text-purple-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Has completado todos los retos en este mundo
        </motion.h2>

        <motion.p
          className="text-4xl sm:text-5xl text-orange-700 font-bold my-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          ¡¡Felicidades!!
        </motion.p>
      </motion.div>
    </div>
  );
}
