import React, { useState } from 'react';

// --- Assets ---
// Asegúrate de que las rutas a tus imágenes sean correctas en la carpeta /src/assets/
import logo from "../assets/logo.png";
import Chango from "../assets/startMain.png";

// --- Icono en formato de componente React ---
const LoginIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
);

// --- Componente de la Página de Login ---
export default function LoginPage({ onLogin, navigate }) {
    // Estado para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        
        // --- Lógica de Simulación de Login ---
        // Aquí, en un futuro, harías una llamada a tu API.
        // Por ahora, simularemos el rol basado en el email.
        let role = 'estudiante'; // Rol por defecto
        if (email.includes('admin')) {
            role = 'admin';
        } else if (email.includes('asesor')) {
            role = 'asesor';
        }

        // Llamamos a la función onLogin que nos pasó App.jsx
        onLogin({ email, role });
    };

return (
  <div className="relative min-h-screen flex items-center justify-center p-4">

    {/* Fondo con la imagen difuminada */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 z-0"
      style={{ backgroundImage: `url("${Chango}")` }}
    />

    {/* Card del Login */}
    <div className="w-full max-w-5xl bg-primary-500 rounded-xl shadow-xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white">

      {/* Columna del formulario */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo Signlingus" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-wide">SIGNLINGUS</h1>
          <p className="mt-2 text-sm font-medium">
            ¡Bienvenid@ a una aventura llena de diversión y conocimiento!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto text-left">
          <label className="block text-sm mb-1">Correo:</label>
          <input 
            type="email"
            placeholder="tucorreo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md text-gray-800 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <label className="block text-sm mb-1">Contraseña:</label>
          <input 
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md text-gray-800 bg-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button 
            type="submit"
            className="w-full bg-primary-700 hover:bg-primary-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Si no tienes una cuenta,{" "}
            <a onClick={(e) => { e.preventDefault(); navigate('signup'); }} 
               className="text-blue-200 underline cursor-pointer">
              ¡regístrate aquí!
            </a>
          </p>
          <p className="mt-1">
            <a onClick={(e) => { e.preventDefault(); navigate('password'); }} 
               className="text-blue-200 underline">
              ¿Haz olvidado tu contraseña?
            </a>
          </p>
        </div>
      </div>

      {/* Columna de ilustración */}
      <div 
        className="hidden lg:block w-full lg:w-1/2 bg-blue-100 bg-cover bg-center"
        style={{ backgroundImage: `url("${Chango}")` }}
      />
    </div>
  </div>
);



};
