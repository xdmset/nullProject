import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/apiService"; // Importar el servicio
import logo from "../../assets/logo.png";

export default function HeaderMain() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarFileName, setAvatarFileName] = useState('avatar1.png');
  const popupRef = useRef(null);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getMe();
        setUser(userResponse.data);
        if (userResponse.data.perfil?.avatar) {
          setAvatarFileName(userResponse.data.perfil.avatar);
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className="relative bg-gradient-to-r from-[#005EB8] via-[#198E94] to-[#3D3D97] text-white w-full px-6 py-2 sm:py-3  shadow-md shadow-purple-500/40 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <header className="flex items-center px--70 py-0">
          {/* Logo a la izquierda */}
          <img
            src={logo}
            alt="logo"
            className="w-10 mr-3 drop-shadow-xl hover:rotate-6 transition-transform duration-300"
          />

          {/* Texto a la izquierda */}
          <div className="flex flex-col leading-tight px-1">
            <span className="text-xl sm:text-2xl font-black">SIGNLINGUS</span>
            <span className="text-xs sm:text-sm font-light tracking-wide">
              Para oídos callados, Manos parlantes...
            </span>
          </div>
        </header>




        {/* Información del usuario y botón perfil */}
        <div className="flex items-center gap-3">
          {/* Nombre del usuario */}
          {user && (
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold">
                {user.nombre_menor || user.username}
              </p>
              <p className="text-xs opacity-75">
                Tutor: {user.perfil?.nombre_padre}
              </p>
            </div>
          )}

          {/* Avatar y menú desplegable */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              aria-label="Perfil"
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-1 shadow-md focus:outline-none transition-all duration-200"
            >
              {/* Avatar del usuario */}
              <img
                src={`/avatars/${avatarFileName}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                onError={(e) => {
                  // Fallback si la imagen no se carga
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback icon si no se carga la imagen */}
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 items-center justify-center hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9 9 0 1118.878 6.196 9 9 0 015.121 17.804z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              
              {/* Nombre en móviles */}
              <span className="sm:hidden text-sm font-medium pr-2">
                {user ? (user.nombre_menor || user.username) : '...'}
              </span>

              {/* Icono de flecha */}
              <svg
                className={`w-3 h-3 text-white transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Popup del menú */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  ref={popupRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl text-gray-800 z-50 border border-gray-100"
                >
                  {/* Header del popup con info del usuario */}
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/avatars/${avatarFileName}`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full border-2 border-purple-200 object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.nombre_menor || user.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            Tutor: {user.perfil?.nombre_padre}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Opciones del menú */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-gray-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Ver Perfil
                  </button>
                  
                  
                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/logout");
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 rounded-b-xl font-medium text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}