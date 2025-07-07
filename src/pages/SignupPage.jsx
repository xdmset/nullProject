import React, { useState } from 'react';

// --- Assets ---
// Asegúrate de que las rutas a tus imágenes sean correctas en la carpeta /src/assets/
import Logo from "../assets/Logo.png";
import illustration from "../assets/signup-illustration.svg";
import googleIcon from "../assets/google-icon.png";
import twitterIcon from "../assets/twitter-icon.png";

// --- Icono en formato de componente React ---
const SignUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

// --- Componente de la Página de Registro ---
export default function SignupPage({ navigate }) {
    // Estado para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí, en un futuro, harías una llamada a tu API para registrar al usuario.
        // Por ahora, simplemente lo redirigimos a la página de login después del registro.
        console.log("Registrando con:", { email, password });
        alert("¡Registro exitoso! Ahora inicia sesión.");
        navigate('login');
    };

    return (
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
                        <h1 className="text-2xl xl:text-3xl font-extrabold">¡Únete a SignLingus!</h1>
                        <div className="w-full flex-1 mt-8">
                            
                            {/* Formulario de Registro */}
                            <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                                <input 
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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
                                    <SignUpIcon />
                                    <span className="ml-3">Crear Cuenta</span>
                                </button>
                            </form>
                            
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                Al registrarte, aceptas nuestros{" "}
                                <a href="#" className="border-b border-gray-500 border-dotted">
                                    Términos de Servicio
                                </a> y nuestra{" "}
                                <a href="#" className="border-b border-gray-500 border-dotted">
                                    Política de Privacidad
                                </a>.
                            </p>
                            <p className="mt-8 text-sm text-gray-600 text-center">
                                ¿Ya tienes una cuenta?{" "}
                                <a href="#" onClick={(e) => {e.preventDefault(); navigate('login')}} className="border-b border-gray-500 border-dotted">
                                    Inicia sesión
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Columna de la Ilustración */}
                <div className="flex-1 bg-blue-100 text-center hidden lg:flex justify-center items-center sm:rounded-r-lg">
                    <div 
                        className="m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat h-96"
                        style={{ backgroundImage: `url("${illustration}")` }}
                    ></div>
                </div>

            </div>
        </div>
    );
};
