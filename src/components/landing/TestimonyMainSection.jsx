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

  const heading = <>Lo que dicen <span className="text-yellow-300">nuestros usuarios</span></>;
  const description = "Experiencias reales que reflejan el impacto positivo de aprender y enseñar la Lengua de Señas Mexicano.";

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

return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900 text-white py-16 lg:py-24 px-6 rounded-3xl mx-4 shadow-xl border-4 border-white/10 overflow-hidden">
      {/* Fondo decorativo con burbujas animadas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-ping top-0 left-10"></div>
        <div className="absolute w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-ping bottom-0 right-16"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-5/12 xl:w-6/12"
        >
          <img
            src={loveIllustrationImage}
            alt="Testimonio"
            className="w-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <div className="md:w-7/12 xl:w-6/12">
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 text-white">
            {heading}
          </h2>
          <p className="text-primary-200 max-w-xl font-medium mb-10">
            {description}
          </p>

          <Slider arrows={false} ref={setSliderRef} className="w-full text-center md:text-left">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="outline-none h-full px-2 sm:px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-white bg-opacity-90 border border-white rounded-3xl p-6 md:p-10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="mb-3 flex justify-center md:justify-start space-x-1">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <motion.img
                        key={i}
                        src={StarIcon}
                        alt="Estrella"
                        className="w-5 h-5"
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black">{testimonial.heading}</h3>
                  <blockquote className="text-gray-900 italic mb-6">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <img className="rounded-full w-16 h-16 border-2 border-black" src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                    <div>
                      <h5 className="font-bold text-black">{testimonial.customerName}</h5>
                      <p className="text-sm text-gray-700">{testimonial.customerTitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>

          <div className="flex justify-center md:justify-start mt-8 gap-6">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={sliderRef?.slickPrev}
              className="transition transform hover:scale-110"
            >
              <img src={ArrowLeftIcon} alt="Anterior" className="w-10 h-10 filter invert" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={sliderRef?.slickNext}
              className="transition transform hover:scale-110"
            >
              <img src={ArrowRightIcon} alt="Siguiente" className="w-10 h-10 filter invert" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}