import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FAQ from "../../assets/pagina/faq.png";
import PlusIcon from "../../assets/icons/plus.png";
import MinusIcon from "../../assets/icons/minus.png";

export default function FAQMainSection() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const heading = (
    <>
      Algunas{" "}
      <motion.span
        className="text-primary-500"
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        preguntas ?
      </motion.span>
    </>
  );

  const description =
    "Voces que inspiran y muestran cómo la Lengua de Señas Mexicano transforma vidas y fomenta la inclusión.";

  const faqs = [
    {
      question: "¿Qué es el Lenguaje de Señas Mexicano (LSM) y por qué es importante?",
      answer:
        "El LSM es una lengua visual-gestual utilizada por la comunidad sorda en México. Es importante porque permite la comunicación efectiva y fomenta la inclusión social de las personas sordas.",
    },
    {
      question: "¿Cuáles son las principales características que diferencian al LSM de otros idiomas?",
      answer:
        "El LSM utiliza movimientos de manos, expresiones faciales y el espacio para comunicar. Tiene su propia gramática y vocabulario, distinto del español hablado.",
    },
    {
      question: "¿Cómo contribuye el aprendizaje del LSM a la inclusión social?",
      answer:
        "Aprender LSM elimina barreras de comunicación, promueve la igualdad de oportunidades y ayuda a crear una sociedad más respetuosa y accesible para todos.",
    },
    {
      question: "¿Qué elementos visuales y expresivos son fundamentales para comunicarse en lengua de señas?",
      answer:
        "Se usan la configuración y movimiento de las manos, la ubicación en el espacio, las expresiones faciales y la postura corporal para transmitir significado y emoción.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestionIndex((prev) => (prev === index ? null : index));
  };

  return (
  <div className="relative py-16 lg:py-24 bg-white -mx-6 px-6 overflow-hidden">
    {/* Burbujas decorativas */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-ping top-0 left-10"></div>
      <div className="absolute w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-ping bottom-0 right-16"></div>
    </div>

    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10">
        {/* Imagen */}
        <motion.div
          className="hidden lg:block w-5/12"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={FAQ}
            alt="Ilustración de FAQ"
            className="rounded-full w-full max-w-[500px] shadow-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Preguntas */}
        <div className="w-full lg:w-7/12">
          <h2 className="text-4xl sm:text-5xl font-black text-center lg:text-left text-gray-800">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium mt-4 mb-10 text-center lg:text-left max-w-xl">
            {description}
          </p>

          <dl className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-white via-primary-50 to-white border-2 border-primary-100 hover:border-primary-300 rounded-3xl p-6 sm:p-8 shadow-md transition-all cursor-pointer`}
                onClick={() => toggleQuestion(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <dt className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-gray-800">
                    {faq.question}
                  </span>
                  <motion.img
                    src={activeQuestionIndex === index ? MinusIcon : PlusIcon}
                    alt={activeQuestionIndex === index ? "Cerrar" : "Abrir"}
                    className="w-7 h-7 object-contain"
                    animate={{ rotate: activeQuestionIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </dt>

                <AnimatePresence initial={false}>
                  {activeQuestionIndex === index && (
                    <motion.dd
                      key="content"
                      className="mt-4 text-gray-700 text-base sm:text-lg"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      {faq.answer}
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
