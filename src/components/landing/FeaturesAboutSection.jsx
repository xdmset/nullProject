import React from "react";

// --- Iconos en formato de componente React ---
// Recreados para evitar dependencias de importación de SVG.
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a11.955 11.955 0 0018 0 12.02 12.02 0 00-2.382-8.971z" />
    </svg>
);
const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CustomizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const ReliableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const FastIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const SimpleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-2.714 4.224a2 2 0 00-.23 1.054V18a2 2 0 002 2h4a2 2 0 002-2v-4m-7-2h-3a2 2 0 00-2 2v4a2 2 0 002 2h3m-3-4h.01M12 19h.01" />
    </svg>
);


// --- Componente de la Sección de Características ---
export default function FeaturesAboutSection({ heading }) {
    
    const description = "Estas funcionalidades garantizan que la plataforma sea segura, confiable y fácil de usar, brindando una experiencia óptima para todos los usuarios.";
    const cards = [
        { Icon: ShieldIcon, title: "Seguridad", description: "Protección de los datos personales de los usuarios." },
        { Icon: SupportIcon, title: "Mantenimiento", description: "Debe ser fácilmente actualizable y de bajo costo de mantenimiento." },
        { Icon: CustomizeIcon, title: "Fiabilidad", description: "El sistema debe ser confiable para los usuarios y cumplir con los requisitos del usuario." },
        { Icon: ReliableIcon, title: "Disponibilidad", description: "La plataforma debe estar disponible para usar en todo momento." },
        { Icon: FastIcon, title: "Rendimiento", description: "Buen tiempo de respuesta, rendimiento bajo carga y capacidad de escalar." },
        { Icon: SimpleIcon, title: "Usabilidad", description: "Interfaz intuitiva y fácil de usar por personas de cualquier nivel de experiencia." }
    ];

    return (
        <div className="relative bg-blue-900 -mx-8 px-8 text-gray-100">
            <div className="flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24">
                <h2 className="w-full text-3xl sm:text-4xl font-black text-center">{heading}</h2>
                <p className="w-full text-center text-gray-300 mt-4 max-w-2xl">{description}</p>
                
                <div className="mt-10 w-full"></div>

                {cards.map((card, i) => (
                    <div key={i} className="md:w-1/2 lg:w-1/3 max-w-xs">
                        <div className="flex flex-col items-center text-center h-full mx-4 px-2 py-8">
                            <div className="bg-gray-100 text-blue-900 text-center rounded-full p-5 flex-shrink-0">
                                <card.Icon />
                            </div>
                            <div className="mt-6">
                                <h3 className="tracking-wider font-bold text-xl leading-none">{card.title}</h3>
                                <p className="mt-2 font-normal text-gray-400 leading-snug">{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
