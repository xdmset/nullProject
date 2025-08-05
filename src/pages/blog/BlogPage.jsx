import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from '../../helpers/AnimationRevealPage.jsx';
import LandingHeader from '../../components/ui/LandingHeader.jsx';
import LandingFooter from '../../components/ui/LandingFooter.jsx';

import Importancia from '../../assets/pagina/blog.png';
import Blog1 from '../../assets/pagina/blog6.jpg';
import Blog2 from '../../assets/pagina/blog7.jpg';
import Blog3 from '../../assets/pagina/blog1.jpg';
import Blog4 from '../../assets/pagina/blog2.jpg';
import UserImg from '../../assets/pagina/changuito.png';
import Post1 from '../../assets/pagina/animals.png';
import Post2 from '../../assets/pagina/blog4.jpg';
import Post3 from '../../assets/pagina/blog3.jpg';

export default function BlogDetail() {
const navigate = useNavigate(); // Hook para navegación
  return (
    <AnimationRevealPage>
      <LandingHeader navigate={navigate} />

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8 pt-10 animate-fade-in">
          {/* Main Blog Content */}
          <div className="lg:w-2/3">

            <div className="mb-10">
              <img className="w-full rounded mb-6 shadow-lg animate-float" src={Importancia} alt="Importancia de la LSM" />

              <p className="mb-4 text-gray-700 text-justify">
                La <strong>Lengua de Señas Mexicana (LSM)</strong> es un idioma visual y gestual utilizado por miles de personas sordas en México. Es una lengua completa con gramática y estructura propias, no es una traducción directa del español.
              </p>
              <p className="mb-4 text-gray-700 text-justify">
                Enseñar la LSM a niños de entre 6 y 8 años es una oportunidad clave para fomentar valores como la empatía, la inclusión y la comunicación accesible desde edades tempranas. Además, este tipo de aprendizaje fortalece la memoria visual, la coordinación y el lenguaje corporal.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-primary-500">¿Qué debe incluir un sistema de enseñanza de LSM para niños?</h2>
              <ul className="text-gray-700 mb-6 space-y-2 text-justify">
                <li>🎨 Diseño colorido y fácil de usar</li>
                <li>🔠 Niveles: alfabeto, colores, frases</li>
                <li>🎥 Lecciones con videos y animaciones</li>
                <li>🧠 Juegos de memoria y opción múltiple</li>
                <li>🏅 Recompensas y stickers por completar</li>
              </ul>

              <p className="mb-4 text-gray-700 text-justify">
                Este blog forma parte del proyecto educativo interactivo <strong>SignLingus</strong>, diseñado para que niñas y niños aprendan LSM de forma dinámica y divertida. A través de una plataforma digital amigable, se busca construir un puente de comunicación y empatía entre oyentes y personas sordas.
              </p>

              {/* Sección 1 */}
              <section className="bg-yellow-100 p-6 rounded-xl mb-10 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img className="w-full md:w-1/2 rounded-xl shadow-md animate-bounceSlow" src={Blog1} alt="Niños aprendiendo LSM" />
                  <div className="md:w-1/2 text-gray-800 text-justify">
                    <h3 className="text-2xl font-bold mb-2 text-yellow-600">🎈 Importancia de sensibilizar desde la infancia</h3>
                    <p className="mb-3">
                      La infancia es el mejor momento para introducir nuevos lenguajes. Aprender señas no solo mejora habilidades cognitivas, ¡también es muy divertido! 🙌
                    </p>
                    <p>
                      Además, los niños se conectan rápidamente con juegos de manos, gestos y mímica. Les encanta aprender jugando.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 2 */}
              <section className="bg-pink-100 p-6 rounded-xl mb-10 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                  <img className="w-full md:w-1/2 rounded-xl shadow-md animate-bounceSlow" src={Blog2} alt="Inclusión y diversidad" />
                  <div className="md:w-1/2 text-gray-800 text-justify">
                    <h3 className="text-2xl font-bold mb-2 text-pink-600">🌟 Una herramienta de inclusión</h3>
                    <p className="mb-3">
                      En un país donde muchas personas sordas enfrentan barreras de comunicación, aprender LSM desde la infancia es un paso hacia una sociedad más equitativa. ❤️
                    </p>
                    <p>
                      ¡La lengua de señas no es solo para personas sordas! Todos podemos aprenderla, compartirla y ayudar a que más personas se sientan incluidas.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Related Posts */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary-700">📰 Otros artículos sobre la LSM</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[{
                  img: Post1,
                  title: "¿Por qué enseñar señas desde preescolar?",
                  link: "https://www.incluyeme.com/la-importancia-de-ensenar-lengua-de-senas-desde-niveles-preescolares/"
                }, {
                  img: Post2,
                  title: "Juegos ideales para aprender LSM",
                  link: "https://www.cerebriti.com/juegos-de-idiomas/animales-en-lengua-de-senas-mexicana"
                }, {
                  img: Post3,
                  title: "Beneficios cognitivos de la lengua de señas",
                  link: "https://bienestarcosmico.com/beneficios-de-dominar-la-lengua-de-senas/"
                }].map((post, index) => (
                  <a
                    key={index}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-primary-200 shadow-lg hover:shadow-xl transition duration-300 rounded p-4 min-w-[250px] transform hover:scale-105"
                  >
                    <img src={post.img} alt={post.title} className="w-20 h-20 rounded object-cover" />
                    <div className="ml-3">
                      <h5 className="font-medium text-primary-100 text-justify">{post.title}</h5>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Author Bio */}
            <div className="bg-primary-700 text-white text-center rounded p-6 transition-transform duration-300 ease-in-out hover:scale-[1.01]">
              <img src={UserImg} alt="Autor" className="w-24 h-24 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Changuito</h3>
              <p className="text-sm text-justify">Apasionada por la inclusión, la educación y el aprendizaje interactivo. Este proyecto busca acercar la lengua de señas a más personas desde la niñez.</p>
            </div>

            {/* Imágenes */}
            <img src={Blog4} className="rounded w-full shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.01]" alt="Imagen adicional 1" />

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-primary-700">🏷️ Palabras Claves</h2>
              <div className="flex flex-wrap gap-2">
                {['LSM', 'Juegos', 'Educación', 'Diversión', 'Señas', 'Accesibilidad'].map((tag) => (
                  <span key={tag} className="bg-primary-800 text-primary-200 px-3 py-1 rounded-full font-semibold shadow text-sm animate-wiggle">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <img src={Blog3} className="rounded w-full shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.01]" alt="Imagen adicional 2" />

            {/* Texto simple */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-primary-500">💡 Texto Informativo</h2>
              <p className="text-sm text-gray-700 text-justify">
                El lenguaje de señas es una puerta abierta a la comunicación sin barreras. Al enseñar LSM a la infancia, cultivamos empatía, respeto y accesibilidad desde el juego.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </AnimationRevealPage>
  );
}
