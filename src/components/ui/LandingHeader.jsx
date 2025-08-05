import React from "react";
import { motion } from "framer-motion";
import useAnimatedNavToggler from "../../hooks/useAnimatedNavToggler.jsx";
import logo from "../../assets/logo.png";
import Menu from "../../assets/icons/burger-menu.png";
import Close from "../../assets/icons/remove.png";

// Iconos
const MenuIcon = () => (
  <img src={Menu} alt="Menu Icon" className="h-6 w-6" />
);
const CloseIcon = () => (
  <img src={Close} alt="Close Icon" className="h-6 w-6" />
);

export default function LandingHeader({ navigate }) {
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

const navLinks = [
  { text: "Inicio", action: () => navigate('/') },
  { text: "Nosotros", action: () => navigate('/about') },
  { text: "Blog", action: () => navigate('/blog') },
  { text: "Iniciar sesión", action: () => navigate('/login'), isSecondary: true },
  { text: "¡Regístrate!", action: () => navigate('/signup'), isPrimary: true },
];


  const LogoLink = () => (
    <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center font-black text-white hover:scale-105 transition-transform duration-300">
      <img src={logo} alt="logo" className="w-12 mr-3 drop-shadow-xl hover:rotate-6 transition-transform duration-300" />
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black">SIGNLINGUS</span>
        <span className="text-sm font-light tracking-wide text-white">Manos parlantes, mentes brillantes</span>
      </div>
    </a>
  );

  return (
    <div className="relative bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] text-white w-full px-6 py-6 sm:py-8 rounded-b-3xl shadow-md shadow-purple-500/40">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <header className="flex justify-between items-center w-full">
          {/* Menú escritorio */}
          <nav className="hidden lg:flex flex-1 justify-between items-center">
            <LogoLink />
            <div className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => { e.preventDefault(); link.action(); }}
                  className={`
                    text-lg font-semibold tracking-wide transition-all duration-300 transform
                    ${link.isPrimary
                      ? 'px-6 py-2 bg-white text-[#412DB2] rounded-full shadow-md hover:bg-[#f8f2ff] hover:scale-105'
                      : 'hover:text-[#f8f2ff] hover:scale-105'}
                    ${link.isSecondary ? 'ml-8 underline decoration-dotted' : ''}
                  `}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>

          {/* Menú móvil */}
          <nav className="lg:hidden flex flex-1 items-center justify-between">
            <LogoLink />
            <button
              onClick={toggleNavbar}
              className="z-20 focus:outline-none hover:text-[#f8f2ff] transition duration-300"
            >
              {showNavLinks ? <CloseIcon /> : <MenuIcon />}
            </button>
            <motion.div
              initial={{ x: "150%", display: "none" }}
              animate={animation}
              className="z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 rounded-3xl text-gray-900 bg-white shadow-2xl border-2 border-[#412DB2]"
            >
              <div className="flex flex-col items-center space-y-6">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => { e.preventDefault(); link.action(); }}
                    className={`
                      text-lg font-semibold transition duration-300 transform hover:scale-105
                      ${link.isPrimary
                        ? 'w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#7DF9FF] to-[#412DB2] text-white shadow-md'
                        : 'text-[#412DB2] hover:text-[#229FA9]'}
                    `}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </motion.div>
          </nav>
        </header>
      </div>
    </div>
  );
}
