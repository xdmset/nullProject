import React, { useState } from 'react';

// --- Assets ---
import playaBackground from "../../assets/playa.png";
import logoSignlingus from '../../assets/Logo.png'; 
import avatarUsuario from '../../assets/changomago.jpg'; 

// --- Componentes del Juego ---
import Bandera from "./Bandera.jsx";
import Cofre from "./Cofre.jsx";

// --- Componente Header (integrado directamente) ---
const GameHeader = () => {
    const userData = {
        name: 'Reyes Contreras Ramses',
        role: 'Estudiante',
        avatar: avatarUsuario
    };

    return (
        <header className="bg-[#41279b] text-white p-3 flex justify-between items-center w-full z-20">
            <button className="text-3xl font-bold hover:text-purple-300 transition-colors">✕</button>
            <div className="flex items-center gap-4">
                <img src={userData.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
                <div>
                    <p className="font-bold text-sm">{userData.name}</p>
                    <p className="text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-0.5 inline-block">{userData.role}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <img src={logoSignlingus} alt="Signlingus Logo" className="h-8" />
                <span className="font-bold text-lg tracking-wider">SIGNLINGUS</span>
            </div>
        </header>
    );
};


// --- Componente Principal de la Pantalla de Mundos ---
export default function Mundos({ navigate }) {
    // Estado para el progreso del mundo. En el futuro, este valor vendrá de la base de datos.
    // Lo ponemos en 75 para que veas un cofre parcialmente abierto. ¡Cámbialo a 25, 50, o 100 para ver la diferencia!
    const [progresoMundo, setProgresoMundo] = useState(75);

    return (
        <div className="h-screen w-screen flex flex-col font-sans overflow-hidden">
            <GameHeader />
            
            {/* Contenedor principal del "mundo" con posicionamiento relativo */}
            <div className="relative flex-1">
                {/* Fondo de pantalla */}
                <img 
                    src={playaBackground} 
                    alt="Fondo de playa" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Elementos del Juego Posicionados Absolutamente */}
                
                {/* Bandera 1 (Nivel 1) */}
                <div className="absolute top-[55%] left-[40%] z-10">
                    <Bandera color="green" onClick={() => navigate('game')} />
                </div>
                
                {/* Bandera 2 (Nivel 2) */}
                <div className="absolute top-[50%] left-[60%] z-10">
                    <Bandera color="red" onClick={() => navigate('game')} />
                </div>
                
                {/* Cofre del Mundo */}
                <div className="absolute top-[60%] right-[15%] z-10">
                    <Cofre progreso={progresoMundo} />
                </div>
            </div>
        </div>
    );
}
