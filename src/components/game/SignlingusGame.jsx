import React, { useState, useEffect } from 'react';

// --- Assets ---
// Asegúrate de que las rutas a tus imágenes sean correctas en la carpeta /src/assets/
import imageC from '../../assets/C.png';
import imageA from '../../assets/A.png';
import imageNoSalgas from '../../assets/nosalgas.jpg';

// --- Componente Principal del Juego ---
export default function SignlingusGame({ navigate }) {
  // --- ESTADO Y DATOS DEL JUEGO ---
  const exercises = [
    { image: imageC, answer: 'C', options: ['E', 'C', 'P'] },
    { image: imageA, answer: 'A', options: ['A', 'B', 'M'] }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [lives, setLives] = useState(3);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [gameModalData, setGameModalData] = useState({ title: '', message: '', type: 'info' });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const isCheckButtonVisible = !notification.show;
  const progressPercentage = (currentIndex / exercises.length) * 100;

  // --- LÓGICA DE SONIDOS ---
  const createTone = (frequency, duration, type = 'sine') => {
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
    } catch (error) {
      console.log('Web Audio API no disponible:', error);
    }
  };

  const playNotificationSound = (type) => {
    // ... (la lógica de sonidos se mantiene igual)
  };

  // --- FUNCIONES CONTROLADORAS ---
  const showNotificationBar = (message, type = 'success', duration = 3000) => {
    // ... (la lógica de notificaciones se mantiene igual)
  };
  
  const showModal = (title, message, type = 'info') => {
    setGameModalData({ title, message, type });
    setShowGameModal(true);
  };

  const handleCloseClick = () => {
    if (progressPercentage > 10) {
      setShowExitModal(true);
    } else {
      exitLesson();
    }
  };

  // ¡CAMBIO IMPORTANTE! Ahora usamos la función navigate para salir.
  const exitLesson = () => {
    console.log('Saliendo de la lección...');
    navigate('mundos'); // Redirige a la pantalla de selección de niveles.
  };
  
  const selectOption = (letter) => {
    setSelected(letter);
  };
  
  const checkAnswer = () => {
    if (!selected) {
      showNotificationBar('Por favor selecciona una opción', 'warning', 2000);
      return;
    }
    
    const isCorrect = exercises[currentIndex].answer === selected;
    
    if (isCorrect) {
      showNotificationBar('¡Correcto! Muy bien hecho', 'success', 2000);
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < exercises.length) {
          setCurrentIndex(nextIndex);
          setSelected(null);
        } else {
          // ¡CAMBIO IMPORTANTE! Al completar el juego, navegamos a la pantalla de recompensa.
          playNotificationSound('celebration');
          setTimeout(() => {
            setShowGameModal(false); // Cerramos el modal de felicitaciones
            navigate('reward'); // Navegamos a la página de recompensa
          }, 2500); // Damos tiempo para ver la animación de felicitaciones
          showModal('¡Felicitaciones!', '¡Has completado todos los ejercicios!', 'complete');
        }
      }, 2000);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        showNotificationBar('Respuesta incorrecta - Se acabaron las vidas', 'danger', 2000);
        setTimeout(() => showModal('Juego terminado', '¡Inténtalo de nuevo!', 'game-over'), 2000);
      } else {
        showNotificationBar(`Incorrecto. Te quedan ${newLives} vida${newLives > 1 ? 's' : ''}`, 'danger', 3000);
      }
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelected(null);
    setLives(3);
    setShowGameModal(false);
  };
  
  const currentExercise = exercises[currentIndex];
  if (!currentExercise) {
    return <div>Cargando...</div>;
  }

  const getIcon = (type) => ({ success: '✅', danger: '❌', warning: '⚠️' }[type] || 'ℹ️');

  return (
    <div className="min-h-screen bg-purple-200 flex flex-col items-center overflow-hidden font-sans">
      {/* El resto del JSX del componente se mantiene exactamente igual */}
      {/* Header */}
      <header className="bg-purple-800 w-full p-4 flex items-center justify-between text-white relative mb-5 shadow-lg">
        <button onClick={handleCloseClick} className="text-2xl hover:opacity-70 transition-opacity">✕</button>
        <div className="font-bold text-2xl tracking-wide">SIGNLINGUS</div>
        <div className="flex items-center text-xl font-bold">
          <span className="text-red-400 mr-1">💜</span>
          <span>{lives}</span>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-3/5 bg-gray-300 rounded-full">
          <div className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progressPercentage}%` }}/>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="p-5 text-center w-full max-w-2xl flex flex-col items-center">
        <p className="text-2xl my-8 font-medium text-gray-800">¿Cuál letra se representa en la imagen?</p>
        <div className="my-5">
          <img src={currentExercise.image} alt="Signo de mano" className="w-48 mx-auto block rounded-lg shadow-lg"/>
        </div>
        <div className="flex justify-center gap-5 mb-5 flex-wrap">
          {currentExercise.options.map(letter => (
            <button key={letter} onClick={() => selectOption(letter)}
              className={`bg-white border-2 text-3xl cursor-pointer p-4 min-w-[70px] rounded-xl font-bold shadow-md transition-all duration-300 hover:bg-gray-100 hover:border-purple-400 hover:-translate-y-1 ${
                selected === letter ? 'bg-purple-400 border-purple-700 text-white transform -translate-y-1' : 'border-gray-300 text-gray-800'
              }`}>
              {letter}
            </button>
          ))}
        </div>
      </main>

      {/* Botón de verificación */}
      {isCheckButtonVisible && (
        <button onClick={checkAnswer} className="fixed bottom-5 right-5 p-4 text-xl bg-green-500 border-none rounded-xl cursor-pointer font-bold text-white shadow-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 z-20">
          Comprobar
        </button>
      )}

      {/* El resto de los modales y notificaciones se mantienen igual... */}
      {notification.show && (
        <div className={`fixed bottom-0 left-0 w-full text-white text-lg p-4 z-30 flex items-center justify-between ${notification.type === 'success' ? 'bg-green-600' : notification.type === 'danger' ? 'bg-red-600' : 'bg-yellow-500'}`}>
            {/* ... */}
        </div>
      )}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
            {/* ... */}
        </div>
      )}
      {showGameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
            {/* ... */}
        </div>
      )}
    </div>
  );
};
