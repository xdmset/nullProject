import React from 'react';

// --- Assets ---
// Importamos las imágenes de las banderas desde la carpeta de assets.
import banderaVerde from '../../assets/bandera_verde.png';
import banderaRoja from '../../assets/bandera_roja.png';

// --- Componente Bandera (versión con imágenes) ---
// Esta versión es más robusta y garantiza que el diseño sea perfecto.
export default function Bandera({ color = "green", onClick }) {
  
  // Seleccionamos la imagen correcta basado en la prop 'color'.
  const imagenSrc = color === "green" ? banderaVerde : banderaRoja;

  return (
    // Contenedor principal con efecto de hover y click.
    <div 
      onClick={onClick} 
      className="w-20 h-24 cursor-pointer transition-transform hover:scale-110" // Ajusta el tamaño si es necesario
      title={`Nivel ${color}`}
    >
      <img 
        src={imagenSrc} 
        alt={`Bandera de color ${color}`} 
        className="w-full h-full object-contain" 
      />
    </div>
  );
}
