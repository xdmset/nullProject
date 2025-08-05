import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import Avatar from "../../assets/avatars/avatar1.png";
import Avatar1 from "../../assets/avatars/avatar2.png";
import Avatar2 from "../../assets/avatars/avatar3.png";
import Avatar3 from "../../assets/avatars/avatar4.png";
import Avatar4 from "../../assets/avatars/avatar5.png";
import Avatar5 from "../../assets/avatars/avatar6.png";
import Avatar6 from "../../assets/avatars/avatar7.png";
import Avatar7 from "../../assets/avatars/avatar8.png";

import ArrowRightIcon from '../../assets/icons/right-arrow.png';
import ArrowLeftIcon from '../../assets/icons/left-arrow.png';
import StarIcon from '../../assets/icons/star.png';

import loveIllustrationImage from "../../assets/pagina/Testimonio.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestimonyMainSection() {
  const [sliderRef, setSliderRef] = useState(null);

  const testimonials = [
    {
      stars: 5,
      profileImageSrc: Avatar,
      heading: "Una experiencia educativa inolvidable",
      quote: "Cada persona que aprende la lengua de señas contribuye a un mundo más inclusivo y justo.",
      customerName: "Mariana G.",
      customerTitle: "Director General, Delos Inc.",
    },
    {
      stars: 5,
      profileImageSrc: Avatar1,
      heading: "Diseño y desarrollo que marcan la diferencia",
      quote: "La lengua de señas es el lenguaje que une más allá de las palabras, conecta a través de los gestos.",
      customerName: "Alejandro T.",
      customerTitle: "Fundadora, EventsNYC",
    },
    {
      stars: 5,
      profileImageSrc: Avatar2,
      heading: "Tecnología al servicio de la inclusión",
      quote: "La tecnología no reemplaza la lengua de señas, solo amplifica su alcance y visibilidad.",
      customerName: "Manuel M.",
      customerTitle: "Director General, Delos Inc.",
    },
    {
      stars: 5,
      profileImageSrc: Avatar3,
      heading: "Comunicación que toca el alma",
      quote: "Cuando no escuchas con los oídos, escuchas con el alma, y ahí es donde la lengua de señas cobra vida.",
      customerName: "Alondra T.",
      customerTitle: "Fundadora, EventsNYC",
    },
    {
      stars: 5,
      profileImageSrc: Avatar4,
      heading: "Un lenguaje visual y lleno de vida",
      quote: "La lengua de señas no es solo un lenguaje, es una conexión profunda con el mundo visual.",
      customerName: "Brayan A.",
      customerTitle: "Director General, Delos Inc.",
    },
    {
      stars: 5,
      profileImageSrc: Avatar5,
      heading: "Educación inclusiva desde las aulas",
      quote: "La verdadera inclusión llegará cuando cada escuela enseñe la lengua de señas como parte de su currículo básico.",
      customerName: "David G.",
      customerTitle: "Fundadora, EventsNYC",
    },
    {
      stars: 5,
      profileImageSrc: Avatar6,
      heading: "Escuchar con el corazón",
      quote: "Cuando no escuchas con los oídos, escuchas con el alma, y ahí es donde la lengua de señas cobra vida.",
      customerName: "Alejandra B.",
      customerTitle: "Director General, Delos Inc.",
    },
    {
      stars: 5,
      profileImageSrc: Avatar7,
      heading: "Empatía a través del lenguaje",
      quote: "El aprendizaje de la lengua de señas es una lección en empatía, porque nos permite comunicarnos en un nivel más profundo.",
      customerName: "Beatriz C.",
      customerTitle: "Fundadora, EventsNYC",
    },
  ];

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const handlePrev = () => sliderRef && sliderRef.slickPrev();
  const handleNext = () => sliderRef && sliderRef.slickNext();

  // Variants para animaciones framer-motion
  const imageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900 w-full rounded-3xl px-4 py-12 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-primary-100">
        Lo que dicen <span className="text-primary-200">nuestros usuarios</span>
      </h2>
      <p className="text-center text-primary-100 mt-2 max-w-xl mx-auto font-medium text-sm sm:text-base">
        Experiencias reales que reflejan el impacto positivo de aprender y enseñar la Lengua de Señas Mexicano.
      </p>

      <div className="relative mt-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Imagen animada */}
        <motion.div
          className="md:w-5/12 w-full"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={imageVariants}
        >
          <img
            src={loveIllustrationImage}
            alt="Testimonio ilustración"
            className="w-full rounded-3xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Slider animado */}
        <div className="md:w-7/12 w-full relative">
          {/* Botones */}
          <button
            onClick={handlePrev}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:scale-105 transition"
            aria-label="Anterior"
          >
            <img src={ArrowLeftIcon} alt="Anterior" className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:scale-105 transition"
            aria-label="Siguiente"
          >
            <img src={ArrowRightIcon} alt="Siguiente" className="w-6 h-6" />
          </button>

          {/* Carrusel */}
          <Slider ref={setSliderRef} {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3 py-2">
                <div className="relative group">
                  {/* Brillo */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-waveFlow z-0" />

                  {/* Card animado */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={cardVariants}
                    className="relative bg-white/90 border border-white/30 rounded-3xl p-4 sm:p-5 shadow-md w-full max-w-md mx-auto h-full flex flex-col justify-between z-10"
                  >
                    <div className="mb-4 flex justify-center">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <motion.img
                          key={i}
                          src={StarIcon}
                          alt="Estrella"
                          className="w-4 h-4 mx-0.5"
                          whileHover={{ scale: 1.3, rotate: [-10, 0, 10, 0, -10], transition: { duration: 1, repeat: Infinity } }}
                        />
                      ))}
                    </div>

                    <h3 className="text-lg font-bold mb-1 text-primary-700 text-center">
                      {testimonial.heading}
                    </h3>
                    <blockquote className="text-gray-800 italic text-sm mb-4 text-center">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center gap-3 justify-center mt-auto">
                      <img
                        className="rounded-full w-12 h-12 border-2 border-black"
                        src={testimonial.profileImageSrc}
                        alt={testimonial.customerName}
                      />
                      <div className="text-left">
                        <h5 className="font-semibold text-black text-sm">
                          {testimonial.customerName}
                        </h5>
                        <p className="text-xs text-gray-600">
                          {testimonial.customerTitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
