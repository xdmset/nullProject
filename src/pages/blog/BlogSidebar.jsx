import React from 'react';
import Blog1 from '../../assets/pagina/blog2.jpg';
import Blog3 from '../../assets/pagina/blog1.jpg';
import UserImg from '../../assets/pagina/animals.png';

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      <div className="bg-primary-700 text-white text-center rounded p-6">
        <img src={UserImg} alt="Autor" className="w-24 h-24 rounded-full mx-auto mb-3" />
        <h3 className="text-xl font-bold">Ana Farrera</h3>
        <p className="text-sm">Apasionada por la inclusión, la educación y el aprendizaje interactivo.</p>
      </div>

      <img src={Blog1} className="rounded w-full" alt="Imagen adicional 1" />

      <div>
        <h2 className="text-xl font-semibold mb-3 text-primary-500">🏷️ Palabras Claves</h2>
        <div className="flex flex-wrap gap-2">
          {['LSM', 'Juegos', 'Educación', 'Diversión', 'Señas', 'Accesibilidad'].map((tag) => (
            <span key={tag} className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold shadow text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <img src={Blog3} className="rounded w-full" alt="Imagen adicional 2" />

      <div>
        <h2 className="text-xl font-semibold mb-3 text-primary-500">💡 Texto Informativo</h2>
        <p className="text-sm text-gray-700">
          El lenguaje de señas es una puerta abierta a la comunicación sin barreras.
        </p>
      </div>
    </div>
  );
}
