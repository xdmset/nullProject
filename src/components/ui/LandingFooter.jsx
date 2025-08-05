import React from "react";
import logo from "../../assets/logo.png";
import FacebookIcon from "../../assets/icons/facebook.png";
import GmailIcon from "../../assets/icons/gmail.png";
import InstagramIcon from "../../assets/icons/instagram.png";

export default function LandingFooter() {
  return (
    <div className="relative bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] text-white px-6 py-12 sm:py-16 mt-20 rounded-t-3xl shadow-lg shadow-blue-600/30 overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo y lema */}
          <div className="flex items-center justify-center md:justify-start">
            <a href="/" className="flex items-center font-black hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="logo" className="w-12 mr-4 drop-shadow-lg hover:rotate-6 transition-transform duration-300" />
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-extrabold">SIGNLINGUS</span>
                <span className="text-sm font-light tracking-wide text-white">Para oídos callados... manos parlantes</span>
              </div>
            </a>
          </div>

          {/* Derechos de autor */}
          <p className="text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-white/80">
            &copy; 2025 SignLingus | Todos los derechos reservados.
          </p>

          {/* Redes sociales (PNG) */}
          <div className="mt-8 md:mt-0 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="bg-white p-2 rounded-full hover:scale-110 transition duration-300 shadow-md">
              <img src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="mailto:contacto@signlingus.com" className="bg-white p-2 rounded-full hover:scale-110 transition duration-300 shadow-md">
              <img src={GmailIcon} alt="Gmail" className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="bg-white p-2 rounded-full hover:scale-110 transition duration-300 shadow-md">
              <img src={InstagramIcon} alt="Instagram" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bolitas decorativas opcionales */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#412DB2] opacity-30 rounded-full transform -translate-x-20 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#005EB8] opacity-30 rounded-full transform translate-x-32 translate-y-48"></div>
      </div>
    </div>
  );
}
