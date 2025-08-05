import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Iconos
import ArrowRightIcon from '../../assets/icons/right-arrow.png';
import ArrowLeftIcon from '../../assets/icons/left-arrow.png';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const getCard = (index) => {
    return cards[(index + cards.length) % cards.length];
  };

  const mainCard = getCard(currentIndex);
  const prevCardData = getCard(currentIndex - 1);
  const nextCardData = getCard(currentIndex + 1);

  return (
    <div className="my-20 relative px-6">
      {/* Encabezado */}
      <h2 className="text-4xl font-black text-center text-primary-900">
        Valores <span className="text-primary-500">del Proyecto</span>
      </h2>
      <p className="text-center text-gray-700 mt-4 max-w-xl mx-auto font-medium">
        Creamos experiencias educativas únicas que acercan a las personas, promueven el respeto y facilitan el aprendizaje sin barreras.
      </p>

      {/* Carrusel con dos visibles */}
      <div className="mt-16 flex items-center justify-center relative gap-4 max-w-5xl mx-auto">
        {/* Botón izquierdo */}
        <button
          onClick={prevCard}
          className="z-10 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          <img src={ArrowLeftIcon} alt="Anterior" className="w-6 h-6" />
        </button>

        {/* Cards */}
        <div className="flex gap-4 items-center">
          {/* Card anterior (más pequeña) */}
          <motion.div
            key={`prev-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 0.9, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex w-[16rem] h-[21rem] bg-white rounded-3xl p-4 shadow-md flex-col items-center justify-start opacity-70"
          >
            <img src={icons[prevCardData.icon]} alt={prevCardData.title} className="w-16 h-16 mb-2" />
            <h4 className="text-lg font-semibold text-primary-700 text-center">{prevCardData.title}</h4>
            <p className="text-gray-600 text-sm text-center mt-2">{prevCardData.description}</p>
          </motion.div>

          {/* Card principal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-[20rem] h-[24rem] bg-gradient-to-br from-primary-200 via-white to-primary-300 rounded-[2.5rem] p-6 shadow-xl border-4 border-transparent hover:border-primary-500 flex flex-col items-center justify-start text-center"
            >
              <div className="w-24 h-24 mb-4 bg-white rounded-full p-4 shadow-lg animate-float flex items-center justify-center">
                <img
                  src={icons[mainCard.icon]}
                  alt={mainCard.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary-700">{mainCard.title}</h3>
              <p className="text-gray-800 mt-2 text-sm font-medium">{mainCard.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Card siguiente (más pequeña) */}
          <motion.div
            key={`next-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 0.9, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex w-[16rem] h-[21rem] bg-white rounded-3xl p-4 shadow-md flex-col items-center justify-start opacity-70"
          >
            <img src={icons[nextCardData.icon]} alt={nextCardData.title} className="w-16 h-16 mb-2" />
            <h4 className="text-lg font-semibold text-primary-700 text-center">{nextCardData.title}</h4>
            <p className="text-gray-600 text-sm text-center mt-2">{nextCardData.description}</p>
          </motion.div>
        </div>

        {/* Botón derecho */}
        <button
          onClick={nextCard}
          className="z-10 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          <img src={ArrowRightIcon} alt="Siguiente" className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2 mt-6 justify-center">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-primary-500 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
