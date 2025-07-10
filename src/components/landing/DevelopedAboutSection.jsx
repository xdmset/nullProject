import React from "react";

// --- Assets ---
// Asegúrate de que la ruta a tu imagen sea correcta en la carpeta /src/assets/
import TeamIllustrationSrc from "../../assets/team-illustration-2.svg";

// --- Componente de la Sección "Developed By" ---
export default function DevelopedAboutSection({ textOnLeft = true }) {

    const heading = <>Diseñado y Desarrollado por <span className="text-blue-500">Profesionales.</span></>;
    
    const steps = [
        {
            heading: "Regístrate",
            description: "Crea tu cuenta en pocos pasos y comienza tu camino en el aprendizaje del lenguaje de señas mexicano."
        },
        {
            heading: "Inicia sesión",
            description: "Accede con tu usuario y contraseña para continuar con tus actividades y avances."
        },
        {
            heading: "Diviértete",
            description: "Explora juegos interactivos, materiales visuales y ejercicios prácticos que hacen el aprendizaje entretenido."
        }
    ];

    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">
                
                {/* Columna de la Imagen */}
                <div className={`md:w-6/12 flex-shrink-0 relative ${textOnLeft ? 'md:order-last' : ''}`}>
                    <img src={TeamIllustrationSrc} alt="Ilustración del equipo de desarrollo" className="rounded-lg shadow-lg" />
                </div>

                {/* Columna del Texto */}
                <div className={`md:w-6/12 mt-16 md:mt-0 ${textOnLeft ? 'md:mr-12 lg:mr-16' : 'md:ml-12 lg:ml-16'}`}>
                    <div className="lg:py-8 text-center md:text-left">
                        <h2 className="mt-4 font-black text-3xl sm:text-4xl lg:text-5xl leading-tight">
                            {heading}
                        </h2>
                        <ul className="mt-12">
                            {steps.map((step, index) => (
                                <li key={index} className="mt-8 flex flex-col md:flex-row items-center md:items-start">
                                    <div className="font-semibold text-4xl leading-none text-gray-400">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div className="mt-3 md:mt-0 md:ml-6 text-center md:text-left">
                                        <h3 className="leading-none text-xl font-semibold">{step.heading}</h3>
                                        <p className="mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
