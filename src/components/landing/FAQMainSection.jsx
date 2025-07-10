import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Assets ---
// Usaremos una imagen de placeholder como en el original. Puedes cambiarla por una de tu carpeta de assets.
const faqImageSrc = "https://images.unsplash.com/photo-1579427421635-a0015b804b2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";

// --- Iconos en formato de componente React ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);
const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
    </svg>
);

// --- Componente de la Sección de FAQ ---
export default function FAQMainSection() {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const heading = <>Algunas <span className="text-blue-500">preguntas ?</span></>;
    const description = "Voces que inspiran y muestran cómo la Lengua de Señas Mexicano transforma vidas y fomenta la inclusión.";
    const faqs = [
        {
            question: "¿Qué es el Lenguaje de Señas Mexicano (LSM) y por qué es importante?",
            answer: "El LSM es una lengua visual-gestual utilizada por la comunidad sorda en México. Es importante porque permite la comunicación efectiva y fomenta la inclusión social de las personas sordas."
        },
        {
            question: "¿Cuáles son las principales características que diferencian al LSM de otros idiomas?",
            answer: "El LSM utiliza movimientos de manos, expresiones faciales y el espacio para comunicar. Tiene su propia gramática y vocabulario, distinto del español hablado."
        },
        {
            question: "¿Cómo contribuye el aprendizaje del LSM a la inclusión social?",
            answer: "Aprender LSM elimina barreras de comunicación, promueve la igualdad de oportunidades y ayuda a crear una sociedad más respetuosa y accesible para todos."
        },
        {
            question: "¿Qué elementos visuales y expresivos son fundamentales para comunicarse en lengua de señas?",
            answer: "Se usan la configuración y movimiento de las manos, la ubicación en el espacio, las expresiones faciales y la postura corporal para transmitir significado y emoción."
        }
    ];

    const toggleQuestion = (questionIndex) => {
        if (activeQuestionIndex === questionIndex) {
            setActiveQuestionIndex(null);
        } else {
            setActiveQuestionIndex(questionIndex);
        }
    };

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                <div className="flex">
                    {/* Columna de la Imagen */}
                    <div className="hidden lg:block w-5/12 flex-shrink-0">
                        <div 
                            className="rounded h-[36rem] bg-center bg-cover shadow-lg" // h-144
                            style={{ backgroundImage: `url("${faqImageSrc}")` }}
                        ></div>
                    </div>

                    {/* Columna del Contenido de FAQ */}
                    <div className="w-full lg:w-7/12 lg:ml-12">
                        <h2 className="text-3xl sm:text-4xl font-black lg:text-left">{heading}</h2>
                        <p className="max-w-xl mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-gray-500">{description}</p>
                        
                        <dl className="mt-12">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer mt-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none group"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <dt className="flex justify-between items-center">
                                        <span className="text-lg lg:text-xl font-semibold">{faq.question}</span>
                                        <span className="ml-2 bg-blue-500 text-gray-100 p-1 rounded-full group-hover:bg-blue-700 group-hover:text-gray-200 transition duration-300">
                                            {activeQuestionIndex === index ? <MinusIcon /> : <PlusIcon />}
                                        </span>
                                    </dt>
                                    <motion.dd
                                        className="pointer-events-none text-sm sm:text-base leading-relaxed overflow-hidden"
                                        variants={{
                                            open: { opacity: 1, height: "auto", marginTop: "16px" },
                                            collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                                        }}
                                        initial="collapsed"
                                        animate={activeQuestionIndex === index ? "open" : "collapsed"}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        {faq.answer}
                                    </motion.dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};
