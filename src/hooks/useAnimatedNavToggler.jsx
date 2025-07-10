import { useState } from "react";
import { useAnimation, useCycle } from "framer-motion";

// Este custom hook maneja la lógica para abrir y cerrar el menú de navegación en móviles.
export default function useAnimatedNavToggler() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  
  // useCycle nos permite alternar entre dos estados para la animación.
  const [x, cycleX] = useCycle("0%", "150%");
  const animation = useAnimation();

  const toggleNavbar = () => {
    setShowNavLinks(!showNavLinks);
    // Inicia la animación para mostrar u ocultar el menú.
    animation.start({ x: x, display: "block" });
    cycleX();
  };

  return { showNavLinks, animation, toggleNavbar };
}
