import React from "react";
import { motion } from "framer-motion";

// --- Íconos o imágenes (puedes usar imágenes si tienes otras) ---
import FamilyIcon from "../../assets/icons/family.png";
import KidsIcon from "../../assets/icons/kids.png";
import SchoolIcon from "../../assets/icons/school.png";

export default function ImpactMainSection() {
  const heading = "Más de 3,000 sonrisas nuevas.";
  const description = "Cada niño que aprende LSM abre un mundo de posibilidades y entendimiento.";

  const stats = [
    {
      key: "Familias",
      value: "800+",
      icon: FamilyIcon,
      bg: "bg-primary-300",
    },
    {
      key: "Niños",
      value: "1500+",
      icon: KidsIcon,
      bg: "bg-primary-200",
    },
    {
      key: "Escuelas",
      value: "200+",
      icon: SchoolIcon,
      bg: "bg-primary-900",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900 text-white py-16 lg:py-24 px-6 rounded-3xl mx-4 shadow-xl border-4 border-white/10 overflow-hidden">
      {/* Fondo decorativo con burbujas animadas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-ping top-0 left-10"></div>
        <div className="absolute w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-ping bottom-0 right-16"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-primary-200 max-w-2xl mx-auto mt-4 font-medium"
        >
          {description}
        </motion.p>

        {/* Estadísticas animadas */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 flex-wrap">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl shadow-lg p-6 w-52 flex flex-col items-center ${stat.bg} text-gray-900 hover:scale-105 transition-transform duration-300`}
            >
              <img src={stat.icon} alt={stat.key} className="w-12 h-12 mb-3" />
              <span className="text-3xl font-extrabold">{stat.value}</span>
              <span className="text-lg font-semibold">{stat.key}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
