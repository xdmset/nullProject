import React from "react";

// Iconos
import Innovation from '../../assets/icons/innovation.png';
import Compromise from '../../assets/icons/compromise.png';
import Accessibility from '../../assets/icons/accessibility.png';
import Transparency from '../../assets/icons/transparency.png';
import Quality from '../../assets/icons/quality.png';
import Adaptation from '../../assets/icons/adaptation.png';

const icons = {
  Innovation,
  Compromise,
  Accessibility,
  Transparency,
  Quality,
  Adaptation
};

const cards = [
  {
    icon: "Innovation",
    title: "Innovación",
    description: "Desarrollamos soluciones creativas con impacto positivo haciendo el aprendizaje más accesible para todas las personas."
  },
  {
    icon: "Compromise",
    title: "Compromiso social",
    description: "Trabajamos por la inclusión y la equidad a través de proyectos que mejoren la calidad de vida."
  },
  {
    icon: "Accessibility",
    title: "Accesibilidad y equidad",
    description: "Desarrollamos productos fáciles de usar, intuitivos y accesibles para cualquier persona."
  },
  {
    icon: "Transparency",
    title: "Transparencia y ética",
    description: "Operamos con integridad, fomentando relaciones honestas."
  },
  {
    icon: "Quality",
    title: "Calidad y excelencia",
    description: "Nos enfocamos en altos estándares técnicos y humanos."
  },
  {
    icon: "Adaptation",
    title: "Adaptabilidad y aprendizaje",
    description: "Evolucionamos con los cambios sociales y tecnológicos."
  }
];

export default function ValuesMainSection() {
  return (
    <div className="my-20 relative overflow-visible">
      {/* Burbujas decorativas */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary-300 opacity-30 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary-500 opacity-30 rounded-full animate-ping"></div>

      {/* Encabezado */}
      <h2 className="text-4xl font-black text-center text-primary-900">
        Valores <span className="text-primary-500">del Proyecto</span>
      </h2>
      <p className="text-center text-gray-700 mt-4 max-w-xl mx-auto font-medium">
        Creamos experiencias educativas únicas que acercan a las personas, promueven el respeto y facilitan el aprendizaje sin barreras.
      </p>

      {/* Cards Scroll Horizontales en móvil */}
      <div className="mt-16 max-w-7xl mx-auto px-4">
        <div className="flex md:flex-wrap gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-primary-400">
          {cards.map((card, index) => (
            <div
              key={index}
              className="snap-start shrink-0 md:shrink md:w-[18rem] w-[16rem] h-[22rem] bg-gradient-to-br from-primary-200 via-white to-primary-300 rounded-[2.5rem] p-6 shadow-xl transition-transform duration-500 hover:rotate-1 hover:scale-105 border-4 border-transparent hover:border-primary-500 flex flex-col items-center justify-start"
            >
              <div className="w-24 h-24 mb-4 bg-white rounded-full p-4 shadow-md animate-float flex items-center justify-center">
                <img
                  src={icons[card.icon]}
                  alt={card.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary-700 text-center">{card.title}</h3>
              <p className="text-gray-800 mt-2 text-sm text-center px-2 font-medium">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
