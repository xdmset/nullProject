import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/game/HeaderMain';
import { getMaterialDidactico } from '../../../services/apiService';
import { useNavigate } from 'react-router-dom';

const VideosPage = () => {
    const [materiales, setMateriales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getMaterialDidactico();
                // Filtramos para quedarnos solo con los videos
                setMateriales(response.data.filter(item => item.tipo === 'Video'));
            } catch (error) {
                console.error("Error al cargar los videos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Procesamos los datos de la API para agruparlos por categoría
    const videosData = useMemo(() => {
        return materiales.reduce((acc, video) => {
            const category = video.categoria || 'General';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({
                title: video.descripcion,
                url: video.url,
                description: "Aprende LSM con esta divertida lección.", // Descripción genérica
                // La API no provee thumbnail, usamos un placeholder.
                thumbnail: `https://i.ytimg.com/vi/${video.url.split('/').pop()}/hqdefault.jpg`,
            });
            return acc;
        }, {});
    }, [materiales]);

    const openCategory = (category) => {
        setSelectedCategory(category);
        setSelectedVideo(videosData[category][0]);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setSelectedVideo(null);
    };

    if (isLoading) {
        return <div>Cargando videos...</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8f2ff] font-sans">
            <Header />
            <button
                onClick={() => navigate("/world")}
                className="fixed top-20 left-4 z-50 bg-[#412DB2] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#229FA9] transition-colors flex items-center gap-2"
            >
                ← Regresar al Mundo
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
                            <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">{videos[0].description}</p>
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
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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