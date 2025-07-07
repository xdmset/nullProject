import React from "react";

// --- Iconos en formato de componente React ---
// He recreado los íconos como componentes SVG simples para que todo funcione sin dependencias externas.
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
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


// --- Componente de la Sección de Valores ---
export default function ValuesMainSection() {

    const heading = <>Valores <span className="text-blue-500">del Proyecto</span></>;
    const description = "Creamos experiencias educativas únicas que acercan a las personas, promueven el respeto y facilitan el aprendizaje sin barreras.";
    const cards = [
        { Icon: ShieldIcon, title: "Innovación", description: "Desarrollamos soluciones creativas con impacto positivo haciendo el aprendizaje más accesible para todas las personas." },
        { Icon: SupportIcon, title: "Compromiso social", description: "Trabajamos por la inclusión y la equidad a través de proyectos que mejoren la calidad de vida." },
        { Icon: CustomizeIcon, title: "Accesibilidad y equidad", description: "Desarrollamos productos fáciles de usar, intuitivos y accesibles para cualquier persona." },
        { Icon: ReliableIcon, title: "Transparencia y ética", description: "Operamos con integridad, fomentando relaciones honestas." },
        { Icon: FastIcon, title: "Calidad y excelencia", description: "Nos enfocamos en altos estándares técnicos y humanos." },
        { Icon: SimpleIcon, title: "Adaptabilidad y aprendizaje", description: "Evolucionamos con los cambios sociales y tecnológicos." }
    ];

    return (
        <div className="relative">
            <div className="flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24">
                <h2 className="w-full text-3xl sm:text-4xl font-black text-center">{heading}</h2>
                <p className="w-full text-center text-gray-600 mt-4 max-w-2xl">{description}</p>
                
                {/* Espaciador vertical */}
                <div className="mt-10 w-full"></div>

                {cards.map((card, i) => (
                    <div key={i} className="md:w-1/2 lg:w-1/3 max-w-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8">
                            <div className="border text-center rounded-full p-5 flex-shrink-0 text-blue-500">
                                <card.Icon />
                            </div>
                            <div className="sm:ml-4 mt-4 sm:mt-2">
                                <h3 className="mt-4 tracking-wide font-bold text-2xl leading-none">{card.title}</h3>
                                <p className="mt-1 sm:mt-4 font-medium text-gray-500 leading-loose">{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
