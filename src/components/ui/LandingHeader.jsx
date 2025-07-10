import React, { useState } from "react";
import { motion } from "framer-motion";
import useAnimatedNavToggler from "../../hooks/useAnimatedNavToggler.jsx";
import Logo from "../../assets/Logo.png";

// --- Iconos en formato de componente React ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);


// --- Componente del Header ---
export default function LandingHeader({ navigate }) {
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

  const navLinks = [
    { text: "Inicio", action: () => navigate('home') },
    { text: "Nosotros", action: () => navigate('about') },
    { text: "Blog", action: () => navigate('blog') },
    { text: "Iniciar sesión", action: () => navigate('login'), isSecondary: true },
    { text: "¡Regístrate!", action: () => navigate('signup'), isPrimary: true },
  ];

  const LogoLink = () => (
    <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center font-black text-gray-800">
      <img src={Logo} alt="logo" className="w-10 mr-3" />
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black">SIGNLINGUS</span>
        <span className="text-sm font-normal text-gray-600">Para oídos callados... manos parlantes</span>
      </div>
    </a>
  );

  return (
    <header className="flex justify-between items-center max-w-screen-xl mx-auto py-6 px-4 md:px-8">
      
      {/* --- Menú para Escritorio (Desktop) --- */}
      <nav className="hidden lg:flex flex-1 justify-between items-center">
        <LogoLink />
        <div className="flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href="#" 
              onClick={(e) => { e.preventDefault(); link.action(); }} 
              className={`
                text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2
                ${link.isPrimary 
                  // --- ¡CAMBIO CLAVE AQUÍ! ---
                  // Cambiamos 'rounded-full' por 'rounded-lg' para un estilo más rectangular.
                  ? 'px-8 py-3 rounded-lg bg-primary-500 text-gray-100 hover:bg-primary-700 focus:shadow-outline border-b-0' 
                  : 'border-transparent text-gray-600 hover:border-primary-500 hover:text-primary-500'}
                ${link.isSecondary ? 'lg:ml-12' : ''}
              `}
            >
              {link.text}
            </a>
          ))}
        </div>
      </nav>

      {/* --- Menú para Móviles (Mobile) --- */}
      <nav className="lg:hidden flex flex-1 items-center justify-between">
        <LogoLink />
        <button 
          onClick={toggleNavbar} 
          className="z-20 focus:outline-none hover:text-primary-500 transition duration-300"
        >
          {showNavLinks ? <CloseIcon /> : <MenuIcon />}
        </button>
        <motion.div 
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          className="z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white shadow-lg"
        >
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href="#" 
                onClick={(e) => { e.preventDefault(); link.action(); }}
                className={`
                  text-lg font-semibold tracking-wide
                  ${link.isPrimary ? 'w-full text-center px-8 py-3 rounded-lg bg-primary-500 text-gray-100 hover:bg-primary-700' : ''}
                `}
              >
                {link.text}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

    </header>
  );
};
