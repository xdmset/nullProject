import React, { useState } from 'react';

// --- Assets ---
// Asegúrate de que las rutas a tus imágenes sean correctas en la carpeta /src/assets/
import Logo from "../assets/Logo.png";

import illustration from "../assets/login-illustration.svg";
import googleIcon from "../assets/google-icon.png";
import twitterIcon from "../assets/twitter-icon.png";

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
        // Usamos clases de Tailwind directamente. Asumimos que 'bg-primary-900' es un azul oscuro.
        <div className="min-h-screen bg-blue-900 text-white font-medium flex justify-center items-center p-4 sm:p-8">
            <div className="max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow-lg sm:rounded-lg flex justify-center flex-1">
                
                {/* Columna Principal del Formulario */}
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex justify-center">
                        <a href="#" onClick={(e) => {e.preventDefault(); navigate('home')}}>
                            <img src={Logo} className="h-12" alt="Logo Signlingus" />
                        </a>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">SignLingus</h1>
                        <div className="w-full flex-1 mt-8">
                            
                            {/* Formulario de Login */}
                            <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                                <input 
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                                    type="email" 
                                    placeholder="Correo electrónico" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input 
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" 
                                    placeholder="Contraseña" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <LoginIcon />
                                    <span className="ml-3">Iniciar sesión</span>
                                </button>
                            </form>
                            
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                <a href="#" className="border-b border-gray-500 border-dotted">
                                    ¿Haz olvidado tu contraseña?
                                </a>
                            </p>
                            <p className="mt-8 text-sm text-gray-600 text-center">
                                Si no tienes cuenta{" "}
                                <a href="#" onClick={(e) => {e.preventDefault(); navigate('signup')}} className="border-b border-gray-500 border-dotted">
                                    ¡regístrate aquí!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Columna de la Ilustración */}
                <div className="flex-1 bg-blue-100 text-center hidden lg:flex justify-center items-center sm:rounded-r-lg">
                    <div 
                        className="m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat h-96"
                        style={{ backgroundImage: `url("${illustration}")` }}
                    ></div>
                </div>

            </div>
        </div>
    );
};
