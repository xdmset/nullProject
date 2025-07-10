import React, { useState } from "react";
import ReactModalAdapter from "../../helpers/ReactModalAdapter.jsx";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.jsx";

// --- Assets ---
import DesignIllustration from "../../assets/startMain.png";

// --- Iconos ---
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Componente de la Sección ---
export default function StartMainSection({ navigate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    const heading = "Nuevo enfoque en la educación de los niños";
    const description = "En Signlingus, creemos en romper barreras. Por eso creamos una herramienta divertida y accesible para que niños oyentes y no oyentes aprendan Lengua de Señas Mexicana (LSM) juntos, promoviendo la inclusión y el respeto desde pequeños.";
    const primaryButtonText = "Comenzar";
    const watchVideoButtonText = "Mirar Video";
    const watchVideoYoutubeUrl = "https://www.youtube.com/watch?v=esMq3cqxNsA";

    return (
        <div className="relative">
            <div className="flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24">
                {/* Columna Izquierda: Texto y Botones */}
                <div className="relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left">
                    <h1 className="font-black text-3xl md:text-5xl leading-snug max-w-3xl text-gray-900">{heading}</h1>
                    <p className="my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0">{description}</p>
                    <div className="flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8">
                        {/* --- ¡CAMBIO CLAVE AQUÍ! --- */}
                        {/* Ahora usa los colores primarios y el borde rectangular */}
                        <button 
                            onClick={() => navigate('signup')} 
                            className="font-bold px-8 lg:px-10 py-3 rounded-lg bg-primary-500 text-gray-100 hover:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300"
                        >
                            {primaryButtonText}
                        </button>
                        <button 
                            onClick={toggleModal}
                            className="mt-4 sm:mt-0 sm:ml-8 flex items-center text-gray-500 transition duration-300 hover:text-primary-500 focus:outline-none"
                        >
                            <PlayIcon />
                            <span className="ml-2 font-medium">{watchVideoButtonText}</span>
                        </button>
                    </div>
                </div>

                {/* Columna Derecha: Imagen */}
                <div className="relative mt-12 lg:mt-0 flex flex-col justify-center lg:w-6/12">
                    <div className="flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none">
                        <img src={DesignIllustration} alt="Niño saludando" />
                    </div>
                </div>
            </div>

            {/* Ventana Modal para el Video */}
            <ReactModalAdapter
                className="mainHeroModal"
                closeTimeoutMS={300}
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                shouldCloseOnOverlayClick={true}
            >
                <button 
                    onClick={toggleModal}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-primary-500"
                >
                    <CloseIcon />
                </button>
                <div className="w-full h-full p-4 sm:p-8 md:p-16">
                    <ResponsiveVideoEmbed url={watchVideoYoutubeUrl} />
                </div>
            </ReactModalAdapter>
        </div>
    );
};
