import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LandingHeader from '../../components/game/HeaderMain';
import { getContenido, getUserProgress } from "../../services/apiService";

// Assets
import mapa from "../../assets/mapa/MapaMenu.png";
import iconPlaya from "../../assets/mapa/BeachIcon.png";
import iconCiudad from "../../assets/mapa/CityIcon.png";
import iconJungla from "../../assets/mapa/JunglaIcon.png";
import iconCastillo from "../../assets/mapa/CastleIcon.png";
import iconPregunta from "../../assets/mapa/iconPregunta.png";
import Video from '../../assets/icons/video.png';
import Info from '../../assets/icons/book.png';
import Chat from '../../assets/icons/book.png';

const WorldSelect = () => {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState(null);
  const popupRefs = useRef({});
  const [worlds, setWorlds] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worldsResponse, progressResponse] = await Promise.all([
          getContenido(),
          getUserProgress()
        ]);
        
        setWorlds(worldsResponse.data);

        const progressMap = progressResponse.data.reduce((acc, prog) => {
          acc[prog.mundo] = prog;
          return acc;
        }, {});
        setProgress(progressMap);

      } catch (error) {
        console.error("Error al cargar los datos de los mundos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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

  const playSoundForWorld = (id) => {
    switch (id) {
      case 1: // Playa
        createTone(440, 0.2); break;
      case 2: // Ciudad
        createTone(349.23, 0.2); break;
      case 3: // Jungla
        createTone(261.63, 0.2); break;
      case 4: // Castillo
        createTone(392, 0.2); break;
      case 5: // Misterioso
        createTone(220, 0.2); setTimeout(() => createTone(110, 0.2), 200); break;
      default:
        break;
    }
  };

  const playButtonSound = () => {
    createTone(523.25, 0.1);
    setTimeout(() => createTone(659.25, 0.1), 80);
  };


  const zones = [
    { id: 1, name: "Playa", top: "bottom-[80px]", left: "left-[25%]", color: "#FFB84C", icon: iconPlaya, route: "/playa" },
    { id: 2, name: "Ciudad", top: "top-[120px]", left: "left-[25%]", color: "#6C757D", icon: iconCiudad, route: "/ciudad" },
    { id: 3, name: "Jungla", top: "top-[100px]", left: "left-[70%]", color: "#1FAB89", icon: iconJungla, route: "/jungla" },
    { id: 4, name: "Castillo", top: "bottom-[85px]", left: "left-[74%]", color: "#e9202a", icon: iconCastillo, route: "/castillo" },
    { id: 5, name: "Mundo Misterioso", top: "bottom-[130px]", left: "left-[10%]", color: "#5c584c", icon: iconPregunta, route: "/secret", size: "w-[30px] h-[30px]" }
  ];

    const menuButtons = [
    { icon: Video, label: "Videos\nde Apoyo", route: "/videos" },
    { icon: Info, label: "Información\nImportante", route: "/info" },
    { icon: Chat, label: "Chat\nIA", route: "/chat" }
  ];

  // --- CAMBIO AQUÍ ---
  // Si está cargando, no muestra nada en lugar del texto
  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-200 font-sans relative">
      <LandingHeader />
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="relative w-[900px] max-w-[90vw]">
          <img src={mapa} alt="Mapa" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[900px] h-[655px] max-w-[150vw] z-[1]" />

          {zones.map(({ id, top, left, color, icon, route, size, name }) => {
            const worldData = worlds.find(w => w.id === id);
            const worldProgress = progress[id];
            
            return (
              <div key={id} className="relative">
                <div
                  className={`absolute ${top} ${left} ${size || "w-[60px] h-[60px]"} bg-[${color}] border-[3px] border-[#1f2020] rounded-[50%_50%_50%_0] transform rotate-[-45deg] flex items-center justify-center shadow-md hover:scale-[1.15] transition-all cursor-pointer z-20`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    playSoundForWorld(id);
                    navigate(route);
                  }}
                  onMouseEnter={() => setActiveZone(id)}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  <div className="w-[80%] h-[80%] rounded-full overflow-hidden flex items-center justify-center transform rotate-[45deg]">
                    <img src={icon} alt={id} className="w-full h-full object-contain" />
                  </div>
                </div>

                {activeZone === id && (
                  <div
                    ref={(el) => (popupRefs.current[id] = el)}
                    className={`absolute top-1/2 -translate-y-1/2 z-50 w-52 p-4 rounded-xl shadow-xl bg-white border border-gray-300 left-full ml-3`}
                  >
                    <h3 className="text-center font-bold text-lg mb-2">{worldData?.nombre || name}</h3>
                    <p className="text-sm my-1">Niveles Completados: {worldProgress?.niveles_completados || 0}</p>
                    <p className="text-sm my-1">% de Terminación: {worldProgress?.porcentaje_avance || 0}%</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-8 z-40">
        {menuButtons.map(({ icon, label, route }, index) => (
          <button
            key={index}
            onClick={() => {
              playButtonSound();
              navigate(route);
            }}
            className="relative flex items-center px-5 py-5 w-[260px] h-[130px] bg-primary-700 text-white text-[18px] font-semibold rounded-[2rem] shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl animate-jump"
          >
            <img src={icon} alt="icon" className="w-[56px] h-[56px] mr-4" />
            <span className="text-left leading-tight whitespace-pre-line font-bold text-[16px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WorldSelect;