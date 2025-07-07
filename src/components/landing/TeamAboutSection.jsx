import React from "react";

// --- Iconos en formato de componente React ---
const TwitterIcon = () => <svg className="fill-current w-6 h-6" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.297 1.634 4.208 3.791 4.649-.69.188-1.452.23-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.028-1.455-.086 2.679 1.714 5.868 2.714 9.28 2.714 8.351 0 12.92-6.924 12.58-12.926.886-.642 1.657-1.446 2.267-2.357z" /></svg>;
const LinkedinIcon = () => <svg className="fill-current w-6 h-6" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GithubIcon = () => <svg className="fill-current w-6 h-6" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;

// --- Componente de la Sección del Equipo ---
export default function TeamAboutSection({ heading }) {
    
    const description = "Un grupo apasionado de profesionales comprometidos con crear soluciones inclusivas y transformar la manera de aprender el lenguaje de señas.";
    // --- CAMBIO CLAVE AQUÍ: Se añadieron todos los miembros del equipo ---
    const cards = [
        { imageSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80", position: "Founder", name: "Leonel Castillo", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
        { imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80", position: "Sr. Designer", name: "Karen Farrera", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
        { imageSrc: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80", position: "Jr. Designer", name: "Mendoza Kevin", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
        { imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80", position: "Lead Developer", name: "Ramses Reyes", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
        { imageSrc: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=3.45&w=512&h=512&q=80", position: "Sr. Developer", name: "Charleene Rodriguez", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
        { imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=3.45&w=512&h=512&q=80", position: "Quality Assurance", name: "Andres Ruiz", links: [{ url: "#", icon: TwitterIcon }, { url: "#", icon: LinkedinIcon }, { url: "#", icon: GithubIcon }] },
    ];

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-black">{heading}</h2>
                    <p className="mx-auto text-center text-gray-600 mt-4 max-w-2xl">{description}</p>
                </div>
                <div className="flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto">
                    {cards.map((card, index) => (
                        <div key={index} className="mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center">
                            <div 
                                className="w-64 h-64 bg-cover bg-center rounded"
                                style={{ backgroundImage: `url("${card.imageSrc}")` }}
                            ></div>
                            <div className="flex flex-col items-center mt-6 text-center">
                                <span className="uppercase font-bold tracking-widest text-xs text-blue-500">{card.position}</span>
                                <span className="mt-1 text-xl font-medium text-gray-900">{card.name}</span>
                                <div className="mt-6 flex">
                                    {card.links.map((link, linkIndex) => (
                                        <a key={linkIndex} className="mr-8 last:mr-0 text-gray-400 hover:text-blue-500 transition duration-300" href={link.url}>
                                            <link.icon />
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
};
