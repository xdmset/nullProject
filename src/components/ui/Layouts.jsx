import React from 'react';

/**
 * Un contenedor base que simplemente añade posicionamiento relativo.
 * Útil para contener elementos posicionados de forma absoluta.
 */
export const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Un contenedor centrado con un ancho máximo de `screen-xl` y padding vertical.
 */
export const ContentWithPaddingXl = ({ children, className = "", ...props }) => {
  return (
    <div className={`max-w-screen-xl mx-auto py-20 lg:py-24 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Un contenedor centrado con un ancho máximo de `screen-lg` y padding vertical.
 */
export const ContentWithPaddingLg = ({ children, className = "", ...props }) => {
  return (
    <div className={`max-w-screen-lg mx-auto py-20 lg:py-24 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Un contenedor que solo aplica padding vertical.
 */
export const ContentWithVerticalPadding = ({ children, className = "", ...props }) => {
  return (
    <div className={`py-20 lg:py-24 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Un contenedor centrado con un ancho máximo de `screen-2xl`.
 */
export const Content2Xl = ({ children, className = "", ...props }) => {
  return (
    <div className={`max-w-screen-2xl mx-auto ${className}`} {...props}>
      {children}
    </div>
  );
};
