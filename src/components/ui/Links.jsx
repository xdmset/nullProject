import React from 'react';

/**
 * Un componente de enlace (a) con estilos primarios.
 * @param {object} props - Props del componente, incluyendo `href`, `children`, etc.
 * @param {string} [props.className] - Clases de Tailwind adicionales para pasar al elemento.
 */
export const PrimaryLink = ({ className = "", ...props }) => {
  // NOTA: 'hocus:' se traduce a las clases 'hover:' y 'focus:' de Tailwind.
  // 'text-primary-500' y 'text-primary-800' se han reemplazado por colores estándar de Tailwind.
  const baseClasses = "cursor-pointer font-bold text-blue-500 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-800 focus:border-blue-500 focus:text-blue-800 transition duration-300";

  return (
    <a className={`${baseClasses} ${className}`} {...props}>
      {props.children}
    </a>
  );
};
