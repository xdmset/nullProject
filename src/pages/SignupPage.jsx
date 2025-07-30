import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/apiService';

// --- Assets e Iconos ---
import logo from "../assets/logo.png";
import Chango from "../assets/startMain.png";
import Chango1 from "../assets/startMain1.png";

const SignUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

// --- Componente Principal ---
export default function SignupPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Estados para el Formulario
    const [tutorName, setTutorName] = useState('');
    const [lastName, setLastName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [childName, setChildName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaChecked, setCaptchaChecked] = useState(false);
    
    // Estados para errores y carga
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Lógica de Validación y Envío
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
        if (!username) newErrors.username = 'Nombre de usuario requerido';
        if (!email) newErrors.email = 'Correo requerido';
        if (!password) newErrors.password = 'Contraseña requerida';
        if (password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        if (!captchaChecked) newErrors.captcha = 'Verifica el captcha';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (validateStep1()) {
            setErrors({});
            setStep(2);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        setIsLoading(true);
        setApiError('');
        
        const userData = {
            username: username,
            password: password,
            email: email,
            nombre_menor: childName,
            nombre_padre: tutorName,
            apellidos_padre: `${lastName} ${motherLastName}`.trim()
        };

        try {
            await createUser(userData);
            alert("¡Registro exitoso! Ahora serás redirigido para iniciar sesión.");
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessages = Object.entries(err.response.data).map(([field, messages]) => 
                    `${field}: ${messages.join(', ')}`
                ).join(' ');
                setApiError(errorMessages || 'Error en el registro. Inténtalo de nuevo.');
            } else {
                setApiError('No se pudo conectar con el servidor.');
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
              style={{ backgroundImage: `url("${step === 1 ? Chango1 : Chango}")` }}
            />
            <div className="w-full max-w-5xl bg-primary-700/80 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 text-white animate-fadeIn">
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <img src={logo} alt="Logo Signlingus" className="h-20 mx-auto mb-4 animate-bounceSlow" />
                        <h1 className="text-4xl font-extrabold tracking-wide text-primary-300">SIGNLINGUS</h1>
                        <p className="mt-2 text-base font-medium text-primary-200">
                            ¡Crea tu cuenta para comenzar la aventura!
                        </p>
                    </div>

                    <form className="w-full max-w-sm mx-auto text-left" onSubmit={step === 1 ? handleContinue : handleRegister}>
                        {apiError && <p className="text-red-300 text-center text-sm mb-4">{apiError}</p>}
                        
                        {step === 1 ? (
                            <>
                                <label className="block text-primary-100 text-md mb-1">Nombre del padre o tutor:</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Juan"
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
                                            placeholder='Ej. López'
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
                                            placeholder='Ej. Martínez'
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
                                    placeholder='Ej. María'
                                    value={childName}
                                    onChange={(e) => setChildName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-4"
                                />
                                {errors.childName && <p className="text-red-300 text-sm">{errors.childName}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center"
                                >
                                    <span className="ml-2">Continuar</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <label className="block text-primary-100 text-md mb-1">Nombre de Usuario:</label>
                                <input
                                  type="text"
                                  placeholder="Elige un nombre de usuario"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                                  required
                                />
                                {errors.username && <p className="text-red-300 text-sm">{errors.username}</p>}
                                
                                <label className="block text-primary-100 text-md mb-1">Correo electrónico:</label>
                                <input
                                  type="email"
                                  placeholder="tucorreo@gmail.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                                  required
                                />
                                {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}

                                <label className="block text-primary-100 text-md mb-1">Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white mb-2"
                                    required
                                />
                                {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}

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
                                  disabled={isLoading}
                                  className="w-full bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] hover:opacity-90 text-white font-bold py-2 rounded-lg mt-6 transition duration-300 shadow-lg hover:scale-105 flex items-center justify-center disabled:opacity-50"
                                >
                                  <SignUpIcon />
                                  <span className="ml-2">{isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}</span>
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
                <div
                  className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
                  style={{ backgroundImage: `url("${step === 1 ? Chango1 : Chango}")` }}
                />
            </div>
        </div>
    );
}