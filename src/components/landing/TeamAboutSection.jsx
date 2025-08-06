import React from "react";

// --- Imágenes de miembros ---
import LeonelImg from "../../assets/team/leonel.jpg";
import KarenImg from "../../assets/team/karen.jpg";
import KevinImg from "../../assets/team/kevin.jpg";
import RamsesImg from "../../assets/team/ramses.jpg";
import CharleeneImg from "../../assets/team/char.jpg";
import AndresImg from "../../assets/team/andres.jpg";

// --- Íconos PNG ---
import IgIcon from "../../assets/icons/instagram.png";
import FaceIcon from "../../assets/icons/facebook.png";

export default function TeamAboutSection({ heading }) {
  const description =
    "Un grupo apasionado de profesionales comprometidos con crear soluciones inclusivas y transformar la manera de aprender el lenguaje de señas.";

  const cards = [
    {
      imageSrc: LeonelImg,
      position: "Founder",
      name: "Leonel Castillo",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
    {
      imageSrc: KarenImg,
      position: "Sr. Designer",
      name: "Karen Farrera",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
    {
      imageSrc: KevinImg,
      position: "Jr. Designer",
      name: "Kevin Mendoza",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
    {
      imageSrc: RamsesImg,
      position: "Lead Developer",
      name: "Ramses Reyes",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
    {
      imageSrc: CharleeneImg,
      position: "Sr. Developer",
      name: "Charleene Rodriguez",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
    {
      imageSrc: AndresImg,
      position: "Quality Assurance",
      name: "Andres Ruiz",
      socials: [
        { src: IgIcon, alt: "Instagram", url: "#" },
        { src: FaceIcon, alt: "Facebook", url: "#" },
      ],
    },
  ];

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black">{heading}</h2>
          <p className="mx-auto text-gray-600 mt-4 max-w-2xl">{description}</p>
        </div>

        <div className="flex flex-wrap justify-center sm:max-w-2xl lg:max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="mt-16 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center"
            >
              <div
                className="w-64 h-64 bg-cover bg-center rounded-xl shadow-md transition hover:shadow-xl hover:-translate-y-1 duration-300"
                style={{ backgroundImage: `url("${card.imageSrc}")` }}
              ></div>

              <div className="flex flex-col items-center mt-6 text-center">
                <span className="uppercase font-bold tracking-widest text-xs text-blue-500">
                  {card.position}
                </span>
                <span className="mt-1 text-xl font-medium text-gray-900">
                  {card.name}
                </span>

                <div className="mt-4 flex gap-4">
                  {card.socials.map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={social.src}
                        alt={social.alt}
                        className="w-5 h-5 hover:scale-110 transition"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
