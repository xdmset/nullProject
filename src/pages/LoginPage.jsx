import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importar los servicios de la API
import { login, getMe } from '../services/apiService';

// --- Assets ---
import logo from "../assets/logo.png";
import Chango from "../assets/startMain.png";

// --- Componente de la Página de Login ---
export default function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();

    // 2. Estado para el username, loading y errores
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 3. Nueva lógica para conectar con la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Paso 1: Llamar al endpoint de login para obtener los tokens
            const loginResponse = await login(username, password);
            localStorage.setItem('accessToken', loginResponse.data.access);
            localStorage.setItem('refreshToken', loginResponse.data.refresh);

            // Paso 2: Usar el token para obtener los datos del usuario (incluyendo el rol)
            const userResponse = await getMe();
            
            // Paso 3: Llamar a la función del componente App.jsx con los datos del usuario
            // para que App se encargue de la redirección
            if (onLoginSuccess) {
                onLoginSuccess(userResponse.data);
            }

        } catch (err) {
            // Manejo de errores
            if (err.response && err.response.status === 401) {
                setError('El usuario o la contraseña son incorrectos.');
            } else {
                setError('Ocurrió un error en el servidor. Inténtalo más tarde.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 font-fredoka">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 z-0"
          style={{ backgroundImage: `url("${Chango}")` }}
        />
        <div className="w-full max-w-5xl bg-primary-700/80 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white animate-fadeIn">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <img src={logo} alt="Logo Signlingus" className="h-20 mx-auto mb-4 animate-bounceSlow" />
              <h1 className="text-4xl font-extrabold tracking-wide text-primary-300">SIGNLINGUS</h1>
              <p className="mt-2 text-base font-medium text-primary-200">
                ¡Bienvenid@ a una aventura llena de diversión y conocimiento!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto text-left">
              {/* 4. Mostrar mensajes de error */}
              {error && (
                <div className="bg-red-500 text-white text-sm font-bold p-3 mb-4 rounded-md text-center">
                  {error}
                </div>
              )}

              {/* 5. Cambiado de 'Correo' a 'Usuario' */}
              <label className="block text-primary-100 text-md mb-1">Usuario:</label>
              <input 
                type="text"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

              {/* 6. Botón con estado de carga */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
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
             
            </div>
          </div>

          <div 
            className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url("${Chango}")` }}
          />
        </div>
      </div>
    );
};