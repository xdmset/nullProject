import React from 'react';

/**
 * Un componente de encabezado principal (h2) para títulos de sección.
 * @param {object} props - Props del componente.
 * @param {React.ReactNode} props.children - El contenido a mostrar dentro del encabezado.
 * @param {string} [props.className] - Clases de Tailwind adicionales para pasar al elemento.
 */
export const SectionHeading = ({ children, className = "" }) => {
  return (
    <h2 className={`text-4xl sm:text-5xl font-black tracking-wide text-center ${className}`}>
      {children}
    </h2>
  );
};

/**
 * Un componente de sub-encabezado (h5) para resaltar texto.
 * @param {object} props - Props del componente.
 * @param {React.ReactNode} props.children - El contenido a mostrar dentro del sub-encabezado.
 * @param {string} [props.className] - Clases de Tailwind adicionales para pasar al elemento.
 */
export const Subheading = ({ children, className = "" }) => {
  // NOTA: 'text-primary-500' es un color personalizado de tu proyecto original.
  // Lo he reemplazado con 'text-blue-500' de Tailwind. Puedes ajustarlo si usas otro color primario.
  return (
    <h5 className={`font-bold text-blue-500 ${className}`}>
      {children}
    </h5>
  );
};
