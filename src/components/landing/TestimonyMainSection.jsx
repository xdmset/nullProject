import React, { useState } from "react";
import Slider from "react-slick";

// --- ¡CAMBIO CLAVE AQUÍ! ---
// Importamos los estilos necesarios para el carrusel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- Assets ---
import loveIllustrationImage from "../../assets/love-illustration.svg";

// --- Iconos ---
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 text-orange-400 fill-current mr-1 last:mr-0" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
);
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export default function TestimonyMainSection() {
    const [sliderRef, setSliderRef] = useState(null);

    const heading = <>Lo que dicen <span className="text-blue-500">nuestros usuarios</span></>;
    const description = "Experiencias reales que reflejan el impacto positivo de aprender y enseñar la Lengua de Señas Mexicano.";
    const testimonials = [
        {
            stars: 5,
            profileImageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
            heading: "Una experiencia educativa inolvidable",
            quote: "Cada persona que aprende la lengua de señas contribuye a un mundo más inclusivo y justo.",
            customerName: "Mariana G.",
            customerTitle: "Director General, Delos Inc."
        },
        {
            stars: 5,
            profileImageSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
            heading: "Diseño y desarrollo que marcan la diferencia",
            quote: "La lengua de señas es el lenguaje que une más allá de las palabras, conecta a través de los gestos.",
            customerName: "Alejandro T.",
            customerTitle: "Fundadora, EventsNYC"
        }
    ];

    return (
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-5/12 xl:w-6/12 flex-shrink-0 relative">
                    <img src={loveIllustrationImage} alt="Love" className="rounded border shadow-lg" />
                </div>
                <div className="md:w-7/12 xl:w-6/12 mt-16 md:mt-0 md:pl-12 lg:pl-16">
                    <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight">{heading}</h2>
                    <p className="mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-500">{description}</p>
                    <Slider arrows={false} ref={setSliderRef} className="w-full mt-10 text-center md:text-left">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="outline-none h-full">
                                <div>
                                    {Array.from({ length: testimonial.stars }).map((_, starIndex) => <StarIcon key={starIndex} />)}
                                </div>
                                <h3 className="mt-4 text-xl font-bold">{testimonial.heading}</h3>
                                <blockquote className="mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="mt-auto flex justify-between items-center flex-col sm:flex-row">
                                    <div className="flex items-center">
                                        <img className="rounded-full w-16 h-16 sm:w-20 sm:h-20" src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                                        <div className="text-left sm:ml-6">
                                            <h5 className="font-bold text-xl">{testimonial.customerName}</h5>
                                            <p className="font-medium text-gray-500">{testimonial.customerTitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-8 sm:mt-0">
                                        <button onClick={sliderRef?.slickPrev} className="mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline">
                                            <ArrowLeftIcon />
                                        </button>
                                        <div className="my-3 border-r"></div>
                                        <button onClick={sliderRef?.slickNext} className="mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline">
                                            <ArrowRightIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};
