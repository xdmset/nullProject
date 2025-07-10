import React from "react";
import logo from "../../assets/logo.png";

// --- Iconos en formato de componente React ---
const FacebookIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>;
const TwitterIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.297 1.634 4.208 3.791 4.649-.69.188-1.452.23-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.028-1.455-.086 2.679 1.714 5.868 2.714 9.28 2.714 8.351 0 12.92-6.924 12.58-12.926.886-.642 1.657-1.446 2.267-2.357z" /></svg>;
const YoutubeIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;

export default function LandingFooter() {
    return (
        // Usamos el color primario y añadimos overflow-hidden para contener las "bolitas"
        <div className="relative bg-primary-900 text-gray-100 -mb-8 -mx-8 px-8 py-20 lg:py-24 overflow-hidden">
            <div className="max-w-screen-xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center justify-center md:justify-start">
                        <a href="/" className="flex items-center font-black">
                            <img src={logo} alt="logo" className="w-10 mr-3" />
                            <div className="flex flex-col leading-none">
                                <div className="text-2xl font-black">SIGNLINGUS</div>
                                <span className="text-sm font-normal text-gray-200 mt-0">Para oídos callados... manos parlantes</span>
                            </div>
                        </a>
                    </div>
                    <p className="text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-400">
                        &copy; 2025 SignLingus | Derechos de autor.
                    </p>
                    <div className="mt-8 md:mt-0 flex">
                        <a href="https://facebook.com" className="cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0"><FacebookIcon /></a>
                        <a href="https://twitter.com" className="cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0"><TwitterIcon /></a>
                        <a href="https://youtube.com" className="cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0"><YoutubeIcon /></a>
                    </div>
                </div>
            </div>
            {/* Añadimos las "bolitas" decorativas con el color primario correcto */}
            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                <div className="absolute top-0 left-0 w-80 h-80 bg-primary-700 opacity-50 rounded-full transform -translate-x-20 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-700 opacity-50 rounded-full transform translate-x-32 translate-y-48"></div>
            </div>
        </div>
    );
};
