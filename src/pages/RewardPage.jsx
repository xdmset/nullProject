import React from 'react';

// --- Assets ---
// Asegúrate de que las rutas a tus imágenes sean correctas en la carpeta /src/assets/
import Logo from "../assets/Logo.png";
import changoBombero from '../assets/changobombero.jpg';
import changoMago from '../assets/changomago.jpg';
import cofre from '../assets/cofre.jpg';

// --- Componente de la Página de Recompensa ---
export default function RewardPage({ navigate }) {
  // El componente ahora recibe la función 'navigate' para poder cambiar de página.

  return (
    <div className="min-h-screen bg-[#a99ed6] text-[#4a219b] flex flex-col font-sans">
      
      {/* Header (simplificado para esta pantalla) */}
      <header className="bg-[#41279b] py-4 px-8 flex items-center justify-center text-white w-full">
        <div className="flex items-center">
          <img src={Logo} alt="Signlingus logo" className="h-[50px] mr-4" />
          <div>
            <h1 className="text-2xl font-bold">SIGNLINGUS</h1>
            <p className="text-sm">Para oídos callados... manos parlantes</p>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl py-8 px-12 max-w-3xl w-full sm:w-[90%] shadow-lg text-center">
          
          <h3 className="text-2xl font-medium">¡Has conseguido 2 nuevos avatares!</h3>
          
          <div className="flex justify-center items-center gap-x-5 my-5 sm:flex-row flex-col sm:gap-y-0 gap-y-6">
            <div className="flex gap-x-4">
              <div className="relative">
                <img src={changoBombero} alt="Avatar Mono bombero" className="w-24 h-24 md:w-24 md:h-24 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-300 shadow-lg shadow-yellow-400/50" />
                <span className="absolute text-yellow-400 text-2xl animate-pulse top-[-5px] right-[-5px]">✦</span>
                <span className="absolute text-yellow-400 text-lg animate-pulse bottom-[5px] left-[-10px]" style={{ animationDelay: '0.5s' }}>✦</span>
              </div>
              
              <div className="relative">
                <img src={changoMago} alt="Avatar Mono mago" className="w-24 h-24 md:w-24 md:h-24 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-300 shadow-lg shadow-yellow-400/50" />
                <span className="absolute text-yellow-400 text-2xl animate-pulse top-[-5px] right-[-5px]">✦</span>
                <span className="absolute text-yellow-400 text-lg animate-pulse bottom-[5px] left-[-10px]" style={{ animationDelay: '0.5s' }}>✦</span>
              </div>
            </div>
            
            <img src={cofre} alt="Cofre del tesoro" className="w-36 h-auto sm:w-44" />
          </div>

          <h2 className="text-xl sm:text-2xl font-medium my-4">Has completado todos los retos en este mundo</h2>
          <p className="text-4xl sm:text-5xl text-orange-700 font-bold my-6">¡¡Felicidades!!</p>
          
          {/* ¡CAMBIO IMPORTANTE! El botón ahora usa 'navigate' para volver a los mundos. */}
          <button 
            onClick={() => navigate('mundos')}
            className="bg-green-500 text-white py-4 w-full sm:w-auto sm:px-16 rounded-xl text-lg font-bold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
};
