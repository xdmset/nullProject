import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "../../../components/game/HeaderMain";
import pdfsData from "./pdfsData";
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const InfoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedPdfIndex(0);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedPdfIndex(0);
    setCurrentPage(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pdfList = selectedCategory ? pdfsData[selectedCategory] : [];

  return (
    <div className="min-h-screen bg-[#f8f2ff] font-sans">
      <Header />

      {/* Botón regresar */}
      <button
        onClick={() => navigate("/world")}
        className="fixed top-4 left-4 z-50 bg-[#412DB2] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#229FA9] transition-colors flex items-center gap-2"
      >
        ← Regresar a World
      </button>

      <div className="pt-[70px] px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#412DB2] text-center">Temas PDF en LSM</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(pdfsData).map(([category, pdfList]) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => openCategory(category)}
            >
              <h2 className="text-xl font-semibold text-[#005EB8] mb-2">{category}</h2>
              <img
                src={pdfList[0].imagen}
                alt={pdfList[0].titulo}
                className="rounded-md shadow-md w-full object-cover aspect-video"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal con múltiples PDFs */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-3xl leading-none"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#005EB8]">
              {pdfList[selectedPdfIndex]?.titulo}
            </h2>

            {/* Botones para cambiar entre los PDFs */}
            <div className="flex gap-4 mb-4">
              {pdfList.map((pdf, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPdfIndex(index);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-md border ${
                    selectedPdfIndex === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Parte {index + 1}
                </button>
              ))}
            </div>

            <div className="w-full border rounded shadow">
              <Document
                file={pdfList[selectedPdfIndex].pdf}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={currentPage} />
              </Document>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1}
                >
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {numPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, numPages))
                  }
                  disabled={currentPage >= numPages}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
