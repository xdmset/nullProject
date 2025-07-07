import { useRef } from "react";
import { useInView as useInViewFromFramer } from 'framer-motion';

// Custom Hook para detectar cuándo un elemento es visible en la pantalla.
// Utiliza el hook 'useInView' de la librería framer-motion.
export default function useInView({ once = true, margin = "-30px 0px 0px 0px" } = {}) {
  const ref = useRef(null);
  
  // Pasamos las opciones 'once' y 'margin' al hook de framer-motion.
  const isInView = useInViewFromFramer(ref, {
    once: once,
    margin: margin
  });

  return [ref, isInView];
}
