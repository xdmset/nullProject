import React from 'react';
// Asegúrate de tener tu logo y un avatar de ejemplo en la carpeta assets
import logoSignlingus from '../assets/Logo.png'; 
import avatar from '../assets/changomago.jpg'; 

const Header = () => {
  // Datos de ejemplo para el usuario logeado
  const userData = {
    name: 'Reyes Contreras Ramses',
    role: 'Estudiante',
    avatar: avatar
  };

  return (
    <header className="bg-[#41279b] text-white p-3 flex justify-between items-center w-full z-20">
      {/* Botón de Salir a la Izquierda */}
      <button className="text-3xl font-bold hover:text-purple-300 transition-colors">
        ✕
      </button>

      {/* Perfil de Usuario en el Centro */}
      <div className="flex items-center gap-4">
        <img src={userData.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
        <div>
          <p className="font-bold text-sm">{userData.name}</p>
          <p className="text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-0.5 inline-block">{userData.role}</p>
        </div>
      </div>
      
      {/* Logo de Signlingus a la Derecha */}
      <div className="flex items-center">
        <img src={logoSignlingus} alt="Signlingus" className="h-8" />
      </div>
    </header>
  );
};

export default Header;
