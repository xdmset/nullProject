import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/game/HeaderMain';
import { getMaterialDidactico } from '../../../services/apiService';

const VideosPage = () => {
  const [materiales, setMateriales] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMaterialDidactico();
        const videos = response.data.filter(item => item.tipo === 'Video');
        setMateriales(videos);
        if (videos.length > 0) {
          setCurrentVideo(videos[0]); // Pone el primer video como principal
        }
      } catch (error) {
        console.error("Error al cargar los videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Agrupamos los videos por categoría usando useMemo para eficiencia
  const videoData = useMemo(() => {
    return materiales.reduce((acc, video) => {
      const category = video.categoria || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
          title: video.descripcion,
          url: video.url,
          // La API no provee thumbnail, usamos un placeholder.
          // Podrías añadir este campo a tu modelo en Django.
          thumbnail: 'https://placehold.co/400x225/a99ed6/ffffff?text=Video',
      });
      return acc;
    }, {});
  }, [materiales]);

  if (isLoading) {
    return <div>Cargando videos...</div>;
  }
  
  if (!currentVideo) {
    return <div>No hay videos disponibles.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-theme-200 font-sans">
      <Header />
      <div className="pt-[70px] px-4 py-6 flex flex-col md:flex-row gap-6 items-start justify-center">
        <div className="flex flex-col items-center flex-[4] w-full">
          <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={currentVideo.url}
              title={currentVideo.descripcion}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
          <div className="mt-5 w-full max-w-4xl bg-white p-4 rounded-lg text-left shadow-md">
            <p className="text-lg font-semibold text-gray-800">{currentVideo.descripcion}</p>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm bg-white p-5 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
          <h3 className="text-gray-700 text-lg font-semibold mb-4">Sugerencias:</h3>
          {Object.entries(videoData).map(([category, videos]) => (
            <div key={category} className="mb-6">
              <h4 className="text-gray-500 font-semibold mb-2">{category}</h4>
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="mb-4 cursor-pointer hover:translate-x-1 transition-transform duration-200"
                  onClick={() => setCurrentVideo(materiales.find(m => m.url === video.url))}
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full rounded-md mb-2 shadow-sm" />
                  <div className="text-sm font-medium text-gray-800">{video.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;