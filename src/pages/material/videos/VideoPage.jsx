import React, { useState } from "react";
import Header from "../../../components/game/HeaderMain";
import videosData from "./videosData";
import { useNavigate } from "react-router-dom";

const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedVideo(videosData[category][0]);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f2ff] font-sans">
      <Header />

      {/* Botón regresar */}
      <button
        onClick={() => navigate("/world")} // Cambia "/world" por la ruta correcta
        className="fixed top-4 left-4 z-50 bg-[#412DB2] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#229FA9] transition-colors flex items-center gap-2"
        aria-label="Regresar a la sección World"
      >
        ← Regresar a World
      </button>

      <div className="pt-[70px] px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#412DB2] text-center">Videos por Temas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(videosData).map(([category, videos]) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => openCategory(category)}
            >
              <h2 className="text-xl font-semibold text-[#005EB8] mb-2">{category}</h2>
              <p className="text-sm text-gray-600 mb-4">{videos[0].description}</p>
              <img
                src={videos[0].thumbnail}
                alt={videos[0].title}
                className="rounded-md shadow-md w-full object-cover aspect-video"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "85vh", overflowY: "auto" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-3xl leading-none"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#005EB8]">{selectedCategory}</h2>

            {selectedVideo && (
              <div className="mb-6 aspect-video w-full rounded overflow-hidden shadow-lg">
                <iframe
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {videosData[selectedCategory].map((video) => (
                <div
                  key={video.title}
                  className={`cursor-pointer rounded p-2 border ${
                    selectedVideo?.title === video.title ? "border-[#412DB2]" : "border-transparent"
                  } hover:border-[#229FA9] transition`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded mb-2 object-cover aspect-video w-full"
                  />
                  <p className="text-sm text-gray-700 font-semibold">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosPage;
