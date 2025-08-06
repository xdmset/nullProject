import React from 'react';

// Un simple contenedor de iframe que lo hace responsivo con un aspect-ratio de 16:9.
export default ({ url, className = "" }) => {
  return (
    // Usamos clases de Tailwind para lograr el aspect ratio.
    <div className={`relative w-full h-0 pb-[56.25%] bg-black ${className}`}>
      <iframe
        title="Embeded Video"
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
