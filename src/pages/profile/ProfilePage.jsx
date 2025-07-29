import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importación necesaria
import Header from "../../components/game/HeaderMain";
import { AchievementsModal } from "./AchievementsModal";
import AvatarSelectionModal from './AvatarSelectionModal';

import Avatar1 from "../../assets/recompensas/avatar1.png";
import Avatar2 from "../../assets/recompensas/avatar2.png";
import Avatar3 from "../../assets/recompensas/avatar3.png";
import Avatar4 from "../../assets/recompensas/avatar4.png";
import Avatar5 from "../../assets/recompensas/avatar5.png";
import Avatar6 from "../../assets/recompensas/avatar6.png";
import Avatar7 from "../../assets/recompensas/avatar7.png";
import Avatar8 from "../../assets/recompensas/avatar8.png";
import Locked from "../../assets/logo.png";

const ProfilePage = () => {
  const navigate = useNavigate(); // Inicializa navegación

  const [selectedAvatar, setSelectedAvatar] = useState(Avatar1);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const unlockedAvatars = [
    Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8
  ];
  const lockedAvatars = [Locked, Locked];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2ff] to-white">
      <Header />

      <div className="pt-[90px] px-4 md:px-10 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#412DB2] mb-6">
          Perfil del Usuario
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <Avatar
            avatar={selectedAvatar}
            avatarsAvailable={unlockedAvatars}
            onSelectAvatar={setSelectedAvatar}
            onOpenModal={() => setShowAvatarModal(true)}
          />

          <div className="flex flex-col gap-6">
            <ProfileCard avatar={selectedAvatar} />
            <Stats />
          </div>

          <Achievements onOpenAchievementsModal={() => setShowAchievementsModal(true)} />
        </div>
      </div>

      {showAvatarModal && (
        <AvatarSelectionModal
          onClose={() => setShowAvatarModal(false)}
          onSelectAvatar={(src) => {
            setSelectedAvatar(src);
            setShowAvatarModal(false);
          }}
          avatars={unlockedAvatars}
          locked={lockedAvatars}
        />
      )}

      {showAchievementsModal && (
        <AchievementsModal onClose={() => setShowAchievementsModal(false)} />
      )}
    </div>
  );
};

export default ProfilePage;

// Avatar
export function Avatar({ avatar, avatarsAvailable, onSelectAvatar, onOpenModal }) {
  return (
    <div className="relative bg-white shadow-lg rounded-lg w-full max-w-xs p-4 flex flex-col items-center">
      <img
        src={avatar}
        alt="Avatar actual"
        className="w-32 h-32 object-cover rounded-md mb-2 border-4 border-purple-300"
      />
      <div className="flex gap-2 mb-2">
        {avatarsAvailable.slice(0, 2).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Avatar ${idx + 1}`}
            className={`w-12 h-12 object-cover rounded cursor-pointer border-2 hover:border-purple-400`}
            onClick={() => onSelectAvatar(src)}
          />
        ))}
      </div>
      <button
        onClick={onOpenModal}
        className="text-2xl text-gray-600 hover:text-blue-500"
        aria-label="Cambiar imagen"
      >
        +
      </button>
    </div>
  );
}

// ProfileCard
export function ProfileCard({ avatar }) {
  return (
    <div className="relative bg-white shadow-lg rounded-lg w-full max-w-md flex items-center p-4">
      <img
        src={avatar}
        alt="Avatar fijo"
        className="w-32 h-32 object-cover rounded-md"
      />
      <div className="ml-4">
        <h2 className="text-xl font-semibold">Karen</h2>
        <p className="text-gray-500">Se unió en mayo de 2025</p>
      </div>
    </div>
  );
}

// Stats
export function Stats() {
  const stats = [
    { label: "Niveles completados", value: "6" },
    { label: "Mundos completados", value: "2" },
    { label: "Insignias obtenidas", value: "5" },
    { label: "Logros obtenidas", value: "8" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-purple-700">Estadísticas</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center bg-purple-100 rounded-lg p-2 transform hover:scale-105 transition"
          >
            <p className="text-xs text-gray-700 text-center">{s.label}</p>
            <p className="text-lg font-bold text-purple-800">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Achievements({ onOpenAchievementsModal }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm text-center">
      <h3 className="text-lg font-semibold mb-2 text-purple-700">Logros</h3>
      <p className="text-sm text-gray-600 mb-4">
        Haz clic para ver todos tus logros
      </p>
      <button
        onClick={onOpenAchievementsModal}
        className="px-4 py-2 bg-[#412DB2] text-white rounded hover:bg-purple-800 transition"
      >
        Ver Logros
      </button>
    </div>
  );
}
