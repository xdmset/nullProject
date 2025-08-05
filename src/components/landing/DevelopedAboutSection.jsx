import React from "react";
import { motion } from "framer-motion";

// --- Importa tus íconos PNG (ajusta rutas según tu proyecto) ---
import IconRegister from "../../assets/icons/add-user.png";
import IconLogin from "../../assets/icons/user.png";
import IconFun from "../../assets/icons/smile.png";

import TeamIllustrationSrc from "../../assets/pagina/about.png";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.3, duration: 0.6 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DevelopedAboutSection({ textOnLeft = true }) {
  const heading = (
    <>
      Diseñado y Desarrollado por{" "}
      <span className="text-blue-500">Profesionales.</span>
    </>
  );

  const steps = [
    {
      icon: IconRegister,
      heading: "Regístrate",
      description:
        "Crea tu cuenta en pocos pasos y comienza tu camino en el aprendizaje del lenguaje de señas mexicano.",
    },
    {
      icon: IconLogin,
      heading: "Inicia sesión",
      description:
        "Accede con tu usuario y contraseña para continuar con tus actividades y avances.",
    },
    {
      icon: IconFun,
      heading: "Diviértete",
      description:
        "Explora juegos interactivos, materiales visuales y ejercicios prácticos que hacen el aprendizaje entretenido.",
    },
  ];

  return (
    <div className="relative bg-white py-20 md:py-24">
      <motion.div
        className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Imagen */}
        <motion.div
          className={`md:w-6/12 flex-shrink-0 relative ${
            textOnLeft ? "md:order-last" : ""
          }`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={TeamIllustrationSrc}
            alt="Ilustración del equipo de desarrollo"
            className="rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          className={`md:w-6/12 mt-16 md:mt-0 ${
            textOnLeft ? "md:mr-12 lg:mr-16" : "md:ml-12 lg:ml-16"
          }`}
          variants={itemVariants}
        >
          <div className="lg:py-8 text-center md:text-left">
            <h2 className="mt-4 font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900">
              {heading}
            </h2>

            <ul className="mt-12 space-y-10">
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start cursor-pointer group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 group-hover:bg-gradient-to-tr group-hover:from-blue-400 group-hover:to-purple-600 shadow-md transition-colors duration-300">
                    <img
                      src={step.icon}
                      alt={`${step.heading} icono`}
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left max-w-xs">
                    <h3 className="leading-none text-2xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {step.heading}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
