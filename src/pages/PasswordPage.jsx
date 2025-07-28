import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Chango0 from "../assets/startMain1.png"; // Imagen para paso 1
import Chango1 from "../assets/startMain.png";  // Imagen para paso 2
import IconCandado from '../assets/icons/reset-password.png';

// Icono para botón
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6H5z" />
  </svg>
);

export default function RecuperarContrasena() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Correo o teléfono requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!mensaje) newErrors.mensaje = 'Confirma que revisaste el correo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setMensaje(true);
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      alert("¡Cambio de contraseña exitoso! Ahora inicia sesión.");
      navigate('/login');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-fredoka">

      {/* Fondo difuminado */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 z-0"
        style={{ backgroundImage: `url("${step === 1 ? Chango0 : Chango1}")` }}
      />

      {/* Card principal igual tamaño que signup */}
      <div className="w-full max-w-5xl bg-primary-500/80 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white animate-fadeIn">

        {/* Formulario con padding y max-width como signup */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img src={IconCandado} alt="Icono candado" className="w-20 h-20 drop-shadow-lg" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-wide text-primary-300 text-center mb-4">
            Restablecer contraseña
          </h1>

          <p className="text-primary-200 text-center mb-8">
            {step === 1
              ? "Ingresa tu correo o teléfono para restablecer tu contraseña."
              : "Revisa tu correo y sigue el enlace para cambiar tu contraseña."}
          </p>

          <form
            onSubmit={step === 1 ? handleContinue : handleSubmit}
            className="w-full text-left"
          >
            {step === 1 ? (
              <>
                <label className="block text-primary-100 text-md mb-1">Correo electrónico o teléfono:</label>
                <input
                  type="text"
                  placeholder="tucorreo@gmail.com o número telefónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md ${
                    errors.email ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="text-red-300 text-sm mb-4">{errors.email}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center"
                >
                  <LockIcon />
                  <span className="ml-2">Enviar instrucciones</span>
                </button>
              </>
            ) : (
              <>
                {errors.mensaje && <p className="text-red-300 text-sm mb-4">{errors.mensaje}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center"
                  onClick={() => setMensaje(true)}
                >
                  <LockIcon />
                  <span className="ml-2">Iniciar sesión</span>
                </button>
              </>
            )}
          </form>

          <p className="mt-6 text-sm text-center text-white">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              className="underline text-primary-300 hover:text-primary-500"
            >
              Inicia sesión
            </a>
          </p>
        </div>

        {/* Imagen ilustrativa */}
        <div
          className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url("${step === 1 ? Chango0 : Chango1}")` }}
        />
      </div>
    </div>
  );
}
