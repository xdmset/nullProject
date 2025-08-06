import React, { useRef, useState, useEffect  } from "react";
import Hand from "../../assets/icons/banano.png";
import DesignIllustration from "../../assets/pagina/Inicio.png";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

export default function StartMainSection({ navigate }) {
    const handRef = useRef(null);
    const monkeyRef = useRef(null);
    const controls = useAnimation();
    const [isHiding, setIsHiding] = useState(false);

    const checkCollision = () => {
  if (handRef.current && monkeyRef.current) {
    const handRect = handRef.current.getBoundingClientRect();
    const monkeyRect = monkeyRef.current.getBoundingClientRect();

    const isColliding =
      handRect.right > monkeyRect.left &&
      handRect.left < monkeyRect.right &&
      handRect.bottom > monkeyRect.top &&
      handRect.top < monkeyRect.bottom;

    if (isColliding) {
      setIsHiding(true);
      controls.start({ opacity: 0, x: -50, transition: { duration: 0.4 } });
    } else {
      setIsHiding(false);
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.4 } });
    }
  }
};


useEffect(() => {
  const interval = setInterval(() => {
    checkCollision();
  }, 100); // chequeo cada 100ms

  return () => clearInterval(interval);
}, []);


  const heading = "Nuevo enfoque en la educación de los niños";
  const description = "En Signlingus, creemos en romper barreras. Por eso creamos una herramienta divertida y accesible para que niños oyentes y no oyentes aprendan Lengua de Señas Mexicana (LSM) juntos, promoviendo la inclusión y el respeto desde pequeños.";
  const primaryButtonText = "Comenzar";

return (
    <section className="w-full relative overflow-hidden">
      <div className="flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24 px-6 sm:px-8 relative z-10">
        {/* Columna Izquierda */}
        <div className="relative lg:w-6/12 lg:pr-12 text-center lg:text-left z-10">
          <h1 className="font-black text-3xl md:text-5xl leading-snug max-w-3xl text-gray-900 font-fredoka">
            {heading}
          </h1>
          <p className="my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0 text-justify">
            {description}
          </p>
          <div className="flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8">
            <button 
              onClick={() => navigate('signup')} 
              className="font-bold px-8 lg:px-10 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-700 transition duration-300"
            >
              {primaryButtonText}
            </button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="relative mt-16 lg:mt-0 flex justify-center lg:w-6/12">
          <img
            src={DesignIllustration}
            alt="Niño saludando"
            className="max-w-[380px] h-auto relative z-10 animate-float"
          />

          <motion.img
            ref={handRef}
            src={Hand}
            alt="Mano"
            drag
            dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }}
            dragElastic={0.7}
            className="w-24 cursor-pointer absolute top-[100px] left-[60%] rotate-12 z-30"
          />
        </div>
      </div>
    </section>
  );
}
