import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import mapa from "../../assets/mapa/MapaMenu.png";
import LandingHeader from '../../components/game/HeaderMain';
import iconPlaya from "../../assets/mapa/BeachIcon.png";
import iconCiudad from "../../assets/mapa/CityIcon.png";
import iconJungla from "../../assets/mapa/JunglaIcon.png";
import iconCastillo from "../../assets/mapa/CastleIcon.png";
import iconPregunta from "../../assets/mapa/iconPregunta.png";
import Video from '../../assets/icons/video.png';
import Info from '../../assets/icons/book.png';

const WorldSelect = () => {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState(null);
  const popupRefs = useRef({});
  const iconRefs = useRef({});


  const zonesInfo = {
    playa: {
      nombre: "La Playa",
      completados: 1,
      perfeccionados: 0,
      terminacion: "20%",
    },
    ciudad: {
      nombre: "La Ciudad",
      completados: 3,
      perfeccionados: 2,
      terminacion: "60%",
    },
    jungla: {
      nombre: "La Jungla",
      completados: 2,
      perfeccionados: 1,
      terminacion: "40%",
    },
    castillo: {
      nombre: "El Castillo",
      completados: 5,
      perfeccionados: 5,
      terminacion: "100%",
    },
    pregunta: {
      nombre: "Zona Secreta",
      completados: 0,
      perfeccionados: 0,
      terminacion: "???",
    },
  };

const isLeftSide = (id) => {
  const icon = iconRefs.current[id];
  if (!icon) return true; // Por defecto
  const iconRect = icon.getBoundingClientRect();
  const mapCenter = window.innerWidth / 2;
  return iconRect.left < mapCenter;
};


  // Cerrar popup si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        activeZone &&
        popupRefs.current[activeZone] &&
        !popupRefs.current[activeZone].contains(event.target)
      ) {
        setActiveZone(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeZone]);

  const zones = [
    { id: "playa", top: "bottom-[80px]", left: "left-[25%]", color: "#FFB84C", icon: iconPlaya, route: "/playa" },
    { id: "ciudad", top: "top-[120px]", left: "left-[25%]", color: "#6C757D", icon: iconCiudad, route: "/ciudad" },
    { id: "jungla", top: "top-[100px]", left: "left-[70%]", color: "#1FAB89", icon: iconJungla, route: "/jungla" },
    { id: "castillo", top: "bottom-[85px]", left: "left-[74%]", color: "#e9202a", icon: iconCastillo, route: "/castillo" },
    { id: "pregunta", top: "bottom-[130px]", left: "left-[10%]", color: "#5c584c", icon: iconPregunta, route: "/SecretLevel", size: "w-[30px] h-[30px]" }
  ];

 return (
  <div className="min-h-screen w-full overflow-x-hidden bg-[#E9ECEF] font-sans relative">
    {/* Header */}
    <LandingHeader />

    {/* Contenedor principal del mapa */}
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="relative w-[900px] max-w-[90vw]">
        {/* Imagen del mapa */}
        <img
          src={mapa}
          alt="Mapa"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[900px] h-[655px] max-w-[150vw] z-[1]"
        />

        {/* Zonas interactivas */}
        {zones.map(({ id, top, left, color, icon, route, size }) => (
          <div key={id} className="relative">
            {/* Botón de la zona */}
            <div
              className={`absolute ${top} ${left} ${size || "w-[60px] h-[60px]"} bg-[${color}] border-[3px] border-[#1f2020] rounded-[50%_50%_50%_0] transform rotate-[-45deg] flex items-center justify-center shadow-md hover:scale-[1.15] transition-all cursor-pointer z-20`}
              style={{ boxShadow: `0 0 15px 4px ${color}aa` }}
              onClick={() => navigate(route)}
              onMouseEnter={() => setActiveZone(id)}
              onMouseLeave={() => setActiveZone(null)}
            >
              <div className="w-[80%] h-[80%] rounded-full overflow-hidden flex items-center justify-center transform rotate-[45deg]">
                <img src={icon} alt={id} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Popup lateral */}
{activeZone === id && (
  <div
    ref={(el) => (popupRefs.current[id] = el)}
    className={`
      absolute top-1/2 -translate-y-1/2 z-50 w-52 p-4
      rounded-xl shadow-xl bg-white border border-gray-300
      ${parseInt(left.replace("left-[", "").replace("]", "")) < 500 ? "left-full ml-3" : "right-full mr-3"}
    `}
  >
    <h3 className="text-center font-bold text-lg mb-2">{zonesInfo[id].nombre}</h3>
    <p className="text-sm my-1">Niveles Completados: {zonesInfo[id].completados}</p>
    <p className="text-sm my-1">Niveles Perfeccionados: {zonesInfo[id].perfeccionados}</p>
    <p className="text-sm my-1">% de Terminación: {zonesInfo[id].terminacion}</p>
  </div>
)}

          </div>
        ))}
      </div>
    </div>

    {/* Botones laterales */}
<div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-16 z-40">
  {[{ icon: Video, label: "Videos de\nApoyo", route: "/videos" }, { icon: Info, label: "Información\nImportante", route: "/info" }].map(
    ({ icon, label, route }, index) => (
      <button
        key={index}
        onClick={() => navigate(route)}  // <-- Navega al hacer clic
        className="relative flex items-center px-5 py-5 w-[280px] h-[160px] bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] text-white text-[18px] font-semibold rounded-[14px] shadow-lg cursor-pointer transition-all hover:translate-x-1 hover:shadow-xl"
        style={{ clipPath: "polygon(0 0, 92% 0, 80% 50%, 92% 100%, 0 100%)" }}
      >
        <img src={icon} alt="icon" className="w-[56px] h-[56px] mr-3" />
        <div className="text-left leading-tight whitespace-pre-line">
          <span className="font-bold text-[17px]">{label}</span>
        </div>
      </button>
    )
  )}
</div>
  </div>
);
}
export default WorldSelect;
