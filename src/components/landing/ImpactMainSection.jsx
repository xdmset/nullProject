import React from "react";

// --- Componente de la Sección de Impacto ---
export default function ImpactMainSection() {
    
    // Datos para la sección, igual que en tu componente original
    const subheading = "";
    const heading = "Más de 3,000 sonrisas nuevas.";
    const description = "Cada niño que aprende LSM abre un mundo de posibilidades y entendimiento.";
    const stats = [
        {
            key: "Familias",
            value: "800+",
        },
        {
            key: "Niños",
            value: "1500+",
        },
        {
            key: "Escuelas",
            value: "200+",
        },
    ];

    return (
        // Usamos clases de Tailwind directamente. Asumimos que 'bg-primary-900' es un azul oscuro.
        <div className="my-8 lg:my-10 bg-blue-900 text-gray-100 -mx-8 px-8">
            <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                {/* Contenedor del Encabezado */}
                <div>
                    {subheading && <h3 className="text-gray-100 text-center font-semibold uppercase tracking-widest">{subheading}</h3>}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">{heading}</h2>
                    {description && <p className="text-gray-400 text-center mx-auto max-w-screen-md mt-4">{description}</p>}
                </div>

                {/* Contenedor de las Estadísticas */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col text-center p-4 tracking-wide">
                            <span className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black">{stat.value}</span>
                            <span className="text-xl font-medium">{stat.key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
