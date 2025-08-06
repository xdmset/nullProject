import React, { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "../../../components/game/HeaderMain";
import { getMaterialDidactico } from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Back from "../../../assets/icons/back.png";

// Configuración del worker de PDF.js
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// Mapa de imágenes para las portadas de las categorías de PDF
const categoryImages = {
  'Abecedario': '/portadas/abecedario.jpg',
  'Familia': '/portadas/familia.jpg',
  'Saludos': '/portadas/saludos.gif',
  'Preguntas': '/portadas/preguntas.jpg',
  'Colores': '/portadas/colores.jpg',
  'Numeros': '/portadas/numeros.jpg',
  'Animales': '/portadas/animales.jpg',
  'Emociones': '/portadas/emociones.jpg',
  'General': '/portadas/default.png' // Imagen por defecto
};

const InfoPage = () => {
  const [materiales, setMateriales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const API_URL = 'http://127.0.0.1:8000'; // URL base de tu backend

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMaterialDidactico();
        setMateriales(response.data.filter(item => item.tipo === 'PDF'));
      } catch (error) {
        console.error("Error al cargar los PDFs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const pdfsData = useMemo(() => {
    return materiales.reduce((acc, pdf) => {
      const category = pdf.categoria || 'General';
      if (!acc[category]) acc[category] = [];
      
      // Si la URL que viene de la API empieza con '/media/', es un archivo subido.
      // Si no, es un archivo predeterminado que está en /public/pdfs/.
      const pdfPath = pdf.url.startsWith('/media/') 
        ? `${API_URL}${pdf.url}` 
        : `/pdfs/${pdf.url}`;

      acc[category].push({
        titulo: pdf.descripcion,
        pdf: pdfPath,
        imagen: categoryImages[category] || categoryImages['General']
      });
      return acc;
    }, {});
  }, [materiales]);

  const openCategory = (category) => {
    const pdfList = pdfsData[category];
      if (pdfList.length > 0) {
        pdfList.forEach(pdf => window.open(pdf.pdf, "_blank"));
      }
  };

  const closeModal = () => setSelectedCategory(null);
  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  
  const pdfList = selectedCategory ? pdfsData[selectedCategory] : [];

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#f8f2ff] font-sans">
      <Header />
      {/* Botón volver */}
      <button
        onClick={() => navigate("/world")}
        className="fixed top-20 left-4 z-50 text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-200"
        aria-label="Regresar al Mundo"
      >
        <img src={Back} alt="Volver" className="w-6 h-6" />
      </button>
      <div className="pt-[70px] px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-primary-500 text-center">Temas PDF en LSM</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(pdfsData).map(([category, pdfs]) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => openCategory(category)}
            >
              <h2 className="text-xl font-semibold text-primary-700 mb-2">{category}</h2>
              <img src={pdfs[0].imagen} alt={category} className="rounded-md shadow-md w-full object-cover aspect-video" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;