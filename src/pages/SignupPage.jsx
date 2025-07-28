import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Assets ---
import logo from "../assets/logo.png";
import Chango from "../assets/startMain.png";
import Chango1 from "../assets/startMain1.png";

// Icono
const SignUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

// --- Componente Principal ---
export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Paso 1
  const [tutorName, setTutorName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [childName, setChildName] = useState('');

  // Paso 2
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!tutorName) newErrors.tutorName = 'Nombre del tutor requerido';
    if (!lastName) newErrors.lastName = 'Apellido paterno requerido';
    if (!motherLastName) newErrors.motherLastName = 'Apellido materno requerido';
    if (!childName) newErrors.childName = 'Nombre del menor requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Correo requerido';
    if (!phone) newErrors.phone = 'Teléfono requerido';
    if (!password) newErrors.password = 'Contraseña requerida';
    if (!captchaChecked) newErrors.captcha = 'Verifica el captcha';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      alert("¡Registro exitoso! Ahora inicia sesión.");
      navigate('/login');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-fredoka">

      {/* Fondo difuminado */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 z-0"
        style={{ backgroundImage: `url("${step === 1 ? Chango1 : Chango}")` }}
      />

      {/* Card principal */}
      <div className="w-full max-w-5xl bg-primary-700/80 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white animate-fadeIn">

        {/* Columna izquierda: formulario */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="text-center mb-6">
            <img src={logo} alt="Logo Signlingus" className="h-20 mx-auto mb-4 animate-bounceSlow" />
            <h1 className="text-4xl font-extrabold tracking-wide text-primary-300">SIGNLINGUS</h1>
            <p className="mt-2 text-base font-medium text-primary-200">
              ¡Crea tu cuenta para comenzar la aventura!
            </p>
          </div>

          <form className="w-full max-w-sm mx-auto text-left" onSubmit={step === 1 ? handleContinue : handleRegister}>
            {step === 1 ? (
              <>
                {/* Paso 1 */}
                <label className="block text-primary-100 text-md mb-1">Nombre del padre o tutor:</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2 focus:outline-none"
                />
                {errors.tutorName && <p className="text-red-300 text-sm">{errors.tutorName}</p>}

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-primary-100 text-md mb-1">Apellido paterno:</label>
                    <input
                      type="text"
                      placeholder='Ej. Lopez'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                    />
                    {errors.lastName && <p className="text-red-300 text-sm">{errors.lastName}</p>}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-primary-100 text-md mb-1">Apellido materno:</label>
                    <input
                      type="text"
                      placeholder='Ej. Martinez'
                      value={motherLastName}
                      onChange={(e) => setMotherLastName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                    />
                    {errors.motherLastName && <p className="text-red-300 text-sm">{errors.motherLastName}</p>}
                  </div>
                </div>

                <label className="block text-primary-100 text-md mb-1">Nombre del menor:</label>
                <input
                  type="text"
                  placeholder='Ej. Maria'
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-4"
                />
                {errors.childName && <p className="text-red-300 text-sm">{errors.childName}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center"
                >
                  <SignUpIcon />
                  <span className="ml-2">Continuar</span>
                </button>
              </>
            ) : (
              <>
                {/* Paso 2 */}
                <label className="block text-primary-100 text-md mb-1">Correo electrónico:</label>
                <input
                  type="email"
                  placeholder="tucorreo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                />
                {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-primary-100 text-md mb-1">Teléfono:</label>
                    <input
                      type="tel"
                      placeholder='0123456789'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                    />
                    {errors.phone && <p className="text-red-300 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-primary-100 text-md mb-1">Contraseña:</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                    />
                    {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={captchaChecked}
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">No soy un robot</span>
                </div>
                {errors.captcha && <p className="text-red-300 text-sm mt-1">{errors.captcha}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg mt-6 transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center"
                >
                  <SignUpIcon />
                  <span className="ml-2">Crear Cuenta</span>
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

        {/* Imagen ilustrativa (no animada) */}
        <div
          className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url("${step === 1 ? Chango1 : Chango}")` }}
        />
      </div>
    </div>
  );
}
