import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function SimpleHeader() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const popupRef = useRef(null);

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
    <div className="relative bg-gradient-to-r from-[#005EB8] via-[#198E94] to-[#3D3D97] text-white w-full px-6 py-2 sm:py-3 rounded-b-3xl shadow-md shadow-purple-500/40 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center font-black text-white hover:scale-105 transition-transform duration-300"
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 mr-3 drop-shadow-xl hover:rotate-6 transition-transform duration-300"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl sm:text-2xl font-black">SIGNLINGUS</span>
            <span className="text-xs sm:text-sm font-light tracking-wide">
              Manos parlantes, mentes brillantes
            </span>
          </div>
        </button>

        {/* Botón Perfil */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            aria-label="Perfil"
            className="bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
          </button>

          {/* Popup */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg text-gray-800 z-50"
              >
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 rounded-t-xl font-semibold"
                >
                  Perfil
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/logout");
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 rounded-b-xl font-semibold text-red-600"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
