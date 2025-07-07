import React from 'react';
import Modal from "react-modal";

// Este componente simplemente envuelve a 'react-modal' para permitir estilizarlo más fácilmente.
// No es necesario modificarlo.
export default ({ className, ...props }) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  
  // Es importante establecer el appElement para la accesibilidad.
  // Lo haremos en el componente principal de la app.
  if (Modal.defaultStyles.content) {
    Modal.setAppElement('#root');
  }

  return (
    <Modal
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};
