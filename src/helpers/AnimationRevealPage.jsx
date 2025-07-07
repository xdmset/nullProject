import React from "react";
import { motion } from "framer-motion";
import useInView from "../hooks/useInView.jsx"; // Importamos el hook desde su nueva ubicación

// Componente interno que anima una sección individual cuando entra en la vista.
function AnimatedSlideInComponent({ direction = "left", offset = 30, children }) {
  // Usamos nuestro custom hook 'useInView'
  const [ref, inView] = useInView({ margin: `-${offset}px 0px 0px 0px` });

  const x = { target: "0%" };
  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <div ref={ref}>
      <motion.section
        initial={{ x: x.initial }}
        animate={{
          x: inView ? x.target : x.initial,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 100 }}
      >
        {children}
      </motion.section>
    </div>
  );
}

// Componente que toma a sus hijos y los envuelve en el componente de animación.
function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}


// Componente principal exportado. Envuelve toda la página.
export default function AnimationRevealPage(props) {
    return (
        // Reemplazamos 'StyledDiv' por un div con clases de Tailwind.
        // NOTA: 'font-display' y 'text-secondary-500' son clases personalizadas.
        // Asegúrate de definirlas en tu 'tailwind.config.js' o usa clases estándar como 'font-sans' y 'text-gray-800'.
        <div className="font-sans min-h-screen text-gray-800 p-4 sm:p-8 overflow-x-hidden">
            <AnimationReveal {...props} />
        </div>
    );
};
