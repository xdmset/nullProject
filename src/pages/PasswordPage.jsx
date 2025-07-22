import React, { useState } from 'react';
import IconCandado from '../assets/candado.png';
import Chango0 from '../assets/chango0.webp';
import Chango1 from '../assets/chango1.png';
import LandingHeader from '../components/ui/LandingHeader.jsx';

export default function RecuperarContrasena({ navigate }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setMensaje(true);
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        alert("¡Cambio de contraseña exitoso! Ahora inicia sesión.");
        navigate('login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-5xl bg-blue-700 rounded-xl shadow-xl flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Imagen del chango */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={step === 1 ? Chango0 : Chango1}
            alt="Chango"
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Formulario estilo card */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-purple-100 rounded-2xl shadow-md p-8 lg:p-10 max-w-md text-center text-gray-800"
        >
          <div className="flex justify-center mb-4">
            <img src={IconCandado} alt="Icono candado" className="w-16 h-16" />
          </div>

          <h2 className="text-2xl font-bold text-purple-800 mb-2">Restablecer contraseña</h2>

          {step === 1 ? (
            <>
              <p className="text-sm mb-6">
                Introduce tu correo o tu número telefónico y te enviaremos instrucciones para reestablecer tu contraseña.
              </p>
              <label htmlFor="email" className="block text-left text-sm mb-1">Ingresa tu correo registrado:</label>
              <input
                id="email"
                type="text"
                placeholder="tucorreo@gmail.com o tu número de teléfono"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 text-white font-bold py-2 rounded-md transition duration-200"
              >
                Enviar
              </button>
          <p className="mt-6 text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={(e) => { e.preventDefault(); navigate('login'); }}
              className="text-purple-600 underline"
            >
              Inicia sesión
            </button>
          </p>
            </>
          ) : (
            <>
              <p className="text-base mb-6 font-medium text-gray-700">
                ¡Revisa el enlace que te llegó al correo para continuar!
              </p>
              {errors.mensaje && <p className="text-red-500 text-sm mb-2">{errors.mensaje}</p>}
              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 text-white font-bold py-2 rounded-md transition duration-200"
              >
                Iniciar sesión
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
