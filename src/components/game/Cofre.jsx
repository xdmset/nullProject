import React from 'react';

// --- Assets ---
// Importamos las 4 imágenes que representan los estados del cofre.
// Asegúrate de que las rutas y los nombres de archivo sean correctos.
import cofre25 from '../../assets/cofre_25.png';
import cofre50 from '../../assets/cofre_50.png';
import cofre75 from '../../assets/cofre_75.png';
import cofre100 from '../../assets/cofre_100.png';

// --- Componente Cofre ---
// Este componente recibe el progreso del mundo y muestra la imagen correspondiente.
export default function Cofre({ progreso }) {
  
  // Esta función decide qué imagen del cofre mostrar basado en el progreso.
  const getImagenCofre = () => {
    if (progreso >= 100) {
      return cofre100; // Cofre lleno y brillante
    }
    if (progreso >= 75) {
      return cofre75; // Cofre casi lleno
    }
    if (progreso >= 50) {
      return cofre50; // Cofre abriéndose
    }
    // Por defecto, o si el progreso es menor a 50, muestra el cofre cerrado.
    return cofre25;
  };

  return (
    // Contenedor principal con efecto de hover para dar feedback visual.
    <div className="w-32 h-32 md:w-40 md:h-40 cursor-pointer transition-transform hover:scale-110">
      <img 
        src={getImagenCofre()} 
        alt="Cofre del tesoro" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};
