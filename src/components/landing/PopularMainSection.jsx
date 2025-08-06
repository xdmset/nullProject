import React from "react";

// --- Assets ---
import AnimalsImage from "../../assets/pagina/animals.png";
import SaludosImage from "../../assets/pagina/saludos.png";
import FamilyImage from "../../assets/pagina/family.jpg";

export default function PopularMainSection() {
  const heading = (
    <>
      Secciones <span className="text-primary-500">populares</span>
    </>
  );
  const description =
    "Aquí hay algunas de las secciones populares del sistema seleccionadas por profesionales.";

  const cards = [
    {
      imageSrc: AnimalsImage,
      subtitle: "Mascotas",
      title: "Animales",
      description:
        "Conoce distintas especies, sus nombres y características. En el sistema puedes identificar animales domésticos y salvajes con actividades divertidas.",
      url: "https://www.youtube.com/watch?v=H16vT56UKzs",
    },
    {
      imageSrc: SaludosImage,
      subtitle: "Cortesía",
      title: "Saludos",
      description:
        "Aprende expresiones básicas como hola, buenos días y adiós. Con ejemplos y juegos según el momento del día para usarlos correctamente.",
      url: "https://www.youtube.com/watch?v=PCHx3s-cwLU",
    },
    {
      imageSrc: FamilyImage,
      subtitle: "Exclusivo",
      title: "Familia",
      description:
        "Identifica a mamá, papá, hermanos y abuelos. Reconoce sus roles con imágenes y actividades que enseñan respeto y unión familiar.",
      url: "https://www.youtube.com/watch?v=TzfEPqQtYFc",
    },
  ];

  return (
  <div className="relative my-12 px-4 lg:px-12 overflow-hidden">
    {/* Burbujas decorativas */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-32 h-32 bg-primary-700 rounded-full opacity-20 animate-ping top-0 left-10"></div>
      <div className="absolute w-20 h-20 bg-primary-500 rounded-full opacity-20 animate-ping bottom-0 right-16"></div>
    </div>

    <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-black">{heading}</h2>
        <p className="mt-4 text-gray-600 font-medium max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="mt-16 flex flex-col gap-20">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col-reverse md:flex-row ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-8 md:gap-12 group`}
          >
            {/* Imagen con efecto flotante */}
            <div className="relative w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="object-cover w-full h-64 md:h-96 rounded-3xl"
              />
            </div>

            {/* Contenido */}
            <div className="w-full md:w-1/2 px-4">
              <span className="text-sm uppercase text-primary-500 font-bold tracking-wide">
                {card.subtitle}
              </span>
              <h3 className="mt-2 text-3xl font-extrabold text-gray-800">{card.title}</h3>
              <p className="mt-4 text-gray-600 text-md leading-relaxed">{card.description}</p>

              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-primary-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-primary-700 transition duration-300"
              >
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
