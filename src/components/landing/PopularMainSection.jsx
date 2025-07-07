import React from "react";

// --- Assets ---
import AnimalsImage from "../../assets/animals.png";
import SaludosImage from "../../assets/saludos.png";
import FamilyImage from "../../assets/family.jpg";

// --- Componente de la Sección de Secciones Populares ---
export default function PopularMainSection() {

    const heading = <>Secciones <span className="text-blue-500">populares</span></>;
    const description = "Aquí hay algunos de las secciones populares del sistema seleccionados por profesionales.";

    // --- ¡CAMBIO CLAVE AQUÍ! ---
    // Se restauraron las URLs originales de YouTube.
    const cards = [
        {
            imageSrc: AnimalsImage,
            subtitle: "Mascotas",
            title: "Animales",
            description: "El tema de los animales ayuda a conocer distintas especies, sus nombres, características. En el sistema a través de actividades intuitivas, los usuarios pueden identificar animales domésticos y salvajes y realizar actividades de asociación y clasificación.",
            url: "https://www.youtube.com/watch?v=H16vT56UKzs"
        },
        {
            imageSrc: SaludosImage,
            subtitle: "Cortesía",
            title: "Saludos",
            description: "Los saludos se trabajan para que los usuarios aprendan expresiones básicas de cortesía, como hola, buenos días, buenas noches y adiós. El sistema muestra ejemplos según el momento del día y ofrece ejercicios interactivos para practicar su uso correcto.",
            url: "https://www.youtube.com/watch?v=PCHx3s-cwLU"
        },
        {
            imageSrc: FamilyImage,
            subtitle: "Exclusivo",
            title: "Familia",
            description: "La familia es el tema que enseña a identificar y nombrar a sus diferentes miembros, como mamá, papá, hermanos y abuelos. El sistema permite reconocer sus relaciones y roles a través de imágenes, palabras y actividades que refuerzan el respeto y la unión familiar.",
            url: "https://www.youtube.com/watch?v=TzfEPqQtYFc"
        }
    ];

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-center">{heading}</h2>
                    <p className="mt-4 font-medium text-gray-600 text-center max-w-sm">{description}</p>
                </div>

                <div className="mt-16">
                    {cards.map((card, i) => (
                        <div 
                            key={i} 
                            className={`mt-24 md:flex justify-center items-center ${i % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div 
                                className="rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-contain bg-center bg-no-repeat mx-4 sm:mx-8 md:mx-4 lg:mx-8"
                                style={{ backgroundImage: `url("${card.imageSrc}")` }}
                            ></div>
                            
                            <div className="mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8">
                                <div className="font-bold tracking-wide text-gray-500">{card.subtitle}</div>
                                <h4 className="text-3xl font-bold text-gray-900">{card.title}</h4>
                                <p className="mt-2 text-sm leading-loose text-gray-600">{card.description}</p>
                                
                                {/* --- ¡CAMBIO CLAVE AQUÍ! --- */}
                                {/* El enlace ahora abre la URL en una nueva pestaña. */}
                                <a 
                                    href={card.url}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-sm text-blue-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-blue-500"
                                >
                                    Más información
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
