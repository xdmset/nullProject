import React from 'react';

/**
 * Un componente de botón principal con estilos predefinidos.
 * @param {object} props - Props del componente, incluyendo `onClick`, `type`, `children`, etc.
 * @param {string} [props.className] - Clases de Tailwind adicionales para pasar al elemento.
 */
export const PrimaryButton = ({ className = "", ...props }) => {
  // NOTA: 'hocus:' se traduce a las clases 'hover:' y 'focus:' de Tailwind.
  // 'bg-primary-500' y 'bg-primary-700' se han reemplazado por colores estándar de Tailwind.
  const baseClasses = "px-8 py-3 font-bold rounded bg-blue-500 text-gray-100 hover:bg-blue-700 hover:text-gray-200 focus:bg-blue-700 focus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300";

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {props.children}
    </button>
  );
};
