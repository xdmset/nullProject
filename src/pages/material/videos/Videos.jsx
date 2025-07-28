import { useState } from 'react';
import Header from '../../../components/game/HeaderMain';

const Videos = ({ mainVideo, videoData }) => {
  const [currentVideo, setCurrentVideo] = useState(mainVideo);

  return (
    <div className="min-h-screen w-full bg-theme-200 font-sans">
      <Header />

      <div className="pt-[70px] px-4 py-6 flex flex-col md:flex-row gap-6 items-start justify-center">
        {/* Video principal */}
        <div className="flex flex-col items-center flex-[4] w-full">
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={currentVideo.url}
              title={currentVideo.title}
              frameBorder="0"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>

          <div className="mt-5 w-full max-w-2xl bg-white p-4 rounded-lg text-left shadow-md">
            <p className="text-base text-theme-100">{currentVideo.title}</p>
          </div>
        </div>

        {/* Sugerencias */}
        <div className="flex-1 w-full max-w-sm bg-white p-5 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
          <h3 className="text-theme-700 text-lg font-semibold mb-4">Sugerencias:</h3>

          {Object.entries(videoData).map(([category, videos]) => (
            <div key={category} className="mb-6">
              <h4 className="text-theme-500 font-semibold mb-2">{category}</h4>
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="mb-4 cursor-pointer hover:translate-x-1 transition-transform duration-200"
                  onClick={() => setCurrentVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full rounded-md mb-2 shadow-sm"
                  />
                  <div className="text-sm font-medium text-theme-100">{video.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
