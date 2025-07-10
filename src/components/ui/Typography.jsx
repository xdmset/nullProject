import React from 'react';

/**
 * Un componente de párrafo (p) para descripciones de sección.
 * @param {object} props - Props del componente.
 * @param {React.ReactNode} props.children - El contenido a mostrar dentro del párrafo.
 * @param {string} [props.className] - Clases de Tailwind adicionales para pasar al elemento.
 */
export const SectionDescription = ({ children, className = "" }) => {
  // NOTA: 'text-secondary-100' es un color personalizado. 
  // Lo he reemplazado con 'text-gray-600' de Tailwind, que es un color de texto secundario común.
  return (
    <p className={`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-600 max-w-xl ${className}`}>
      {children}
    </p>
  );
};
