import React from "react";
import { motion } from "framer-motion";

// --- Importa tus iconos PNG (ajusta rutas) ---
import ShieldIcon from "../../assets/icons/hacker.png";
import SupportIcon from "../../assets/icons/developer.png";
import CustomizeIcon from "../../assets/icons/prestige.png";
import ReliableIcon from "../../assets/icons/24-7.png";
import FastIcon from "../../assets/icons/time-limit.png";
import SimpleIcon from "../../assets/icons/usability.png";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturesAboutSection({ heading }) {
  const description =
    "Estas funcionalidades garantizan que la plataforma sea segura, confiable y fácil de usar, brindando una experiencia óptima para todos los usuarios.";

  const cards = [
    {
      icon: ShieldIcon,
      title: "Seguridad",
      description: "Protección de los datos personales de los usuarios.",
    },
    {
      icon: SupportIcon,
      title: "Mantenimiento",
      description: "Debe ser fácilmente actualizable y de bajo costo de mantenimiento.",
    },
    {
      icon: CustomizeIcon,
      title: "Fiabilidad",
      description: "El sistema debe ser confiable para los usuarios y cumplir con los requisitos del usuario.",
    },
    {
      icon: ReliableIcon,
      title: "Disponibilidad",
      description: "La plataforma debe estar disponible para usar en todo momento.",
    },
    {
      icon: FastIcon,
      title: "Rendimiento",
      description: "Buen tiempo de respuesta, rendimiento bajo carga y capacidad de escalar.",
    },
    {
      icon: SimpleIcon,
      title: "Usabilidad",
      description: "Interfaz intuitiva y fácil de usar por personas de cualquier nivel de experiencia.",
    },
  ];

  return (
    <div className="relative bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-700 rounded-3xl text-gray-100">
      <motion.div
        className="flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <h2 className="w-full text-4xl sm:text-5xl font-extrabold text-center mb-4 drop-shadow-lg">
          {heading}
        </h2>
        <p className="w-full text-center text-gray-300 max-w-3xl mb-12 tracking-wide leading-relaxed font-medium">
          {description}
        </p>

        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="md:w-1/2 lg:w-1/3 max-w-xs px-4 mb-10"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center h-full bg-white bg-opacity-10 rounded-xl shadow-lg p-8 backdrop-blur-md hover:bg-opacity-30 transition duration-300">
              <div className="w-16 h-16 mb-6">
                <img src={card.icon} alt={`${card.title} icono`} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">
                {card.title}
              </h3>
              <p className="text-gray-200 font-normal leading-relaxed tracking-wide">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
