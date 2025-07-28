import React, { useState } from 'react';
// Importamos useNavigate para navegación
import { useNavigate } from 'react-router-dom';

// --- Assets ---
import logo from "../assets/logo.png";
import Chango from "../assets/startMain.png";

// --- Componente de la Página de Login ---
export default function LoginPage({ onLogin }) {
    const navigate = useNavigate(); // Hook para navegar

    // Estado para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        
        // --- Lógica de Simulación de Login ---
        let role = 'estudiante'; // Rol por defecto
        if (email.includes('admin')) {
            role = 'admin';
        } else if (email.includes('asesor')) {
            role = 'asesor';
        }

        // Llamamos a la función onLogin que nos pasó App.jsx
        onLogin({ email, role });

        // Redirección automática según rol
        if (role === 'estudiante') {
          navigate('/world');
        } else if (role === 'admin' || role === 'asesor') {
          navigate('/admin');
        }
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 font-fredoka">

        {/* Fondo con imagen difuminada y sin animación */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 z-0"
          style={{ backgroundImage: `url("${Chango}")` }}
        />

        {/* Card del Login */}
        <div className="w-full max-w-5xl bg-primary-700/80 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white animate-fadeIn">

          {/* Columna del formulario */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <img 
                src={logo} 
                alt="Logo Signlingus" 
                className="h-20 mx-auto mb-4 animate-bounceSlow" 
              />
              <h1 className="text-4xl font-extrabold tracking-wide text-primary-300">SIGNLINGUS</h1>
              <p className="mt-2 text-base font-medium text-primary-200">
                ¡Bienvenid@ a una aventura llena de diversión y conocimiento!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto text-left">
              <label className="block text-primary-100 text-md mb-1">Correo:</label>
              <input 
                type="email"
                placeholder="tucorreo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md"
              />

              <label className="block text-primary-100 text-md mb-1">Contraseña:</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md"
              />

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105"
              >
                Ingresar
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p>
                Si no tienes una cuenta,{" "}
                <a 
                  onClick={(e) => { e.preventDefault(); navigate('/signup'); }} 
                  className="text-primary-300 underline cursor-pointer hover:text-primary-500 transition"
                >
                  ¡regístrate aquí!
                </a>
              </p>
              <p className="mt-1">
                <a 
                  onClick={(e) => { e.preventDefault(); navigate('/password'); }} 
                  className="text-primary-300 underline hover:text-primary-500 transition"
                >
                  ¿Haz olvidado tu contraseña?
                </a>
              </p>
            </div>
          </div>

          {/* Columna de ilustración SIN animación */}
          <div 
            className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url("${Chango}")` }}
          />
        </div>
      </div>
    );
};
