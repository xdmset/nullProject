import React, { useState, useEffect } from "react";
import { parseISO, format } from 'date-fns';
import es from 'date-fns/locale/es';
import Header from "../../components/game/HeaderMain";
import { AchievementsModal } from "./AchievementsModal";
import AvatarSelectionModal from './AvatarSelectionModal';
import { getMe, getUserStats, updateUserProfile, getAvailableAvatars } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// --- Componente de Carga ---
const Loader = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f8f2ff] to-white">
    <img src={logo} alt="Cargando..." className="h-24 w-24 animate-pulse" />
    <p className="mt-4 text-lg font-semibold text-primary-500">Cargando perfil...</p>
  </div>
);

// --- Componente de Error ---
const ErrorState = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <p className="text-5xl mb-4">😢</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Oh no! Algo salió mal</h2>
        <p className="text-gray-600 mb-6">No se pudieron cargar los datos del usuario. Por favor, intenta de nuevo o vuelve al inicio.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-700 transition"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avatarFileName, setAvatarFileName] = useState('avatar1.png');
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, statsResponse, avatarsResponse] = await Promise.all([
          getMe(),
          getUserStats(),
          getAvailableAvatars()
        ]);
        setUser(userResponse.data);
        setStats(statsResponse.data);
        setAvailableAvatars(avatarsResponse.data);

        if (userResponse.data.perfil && userResponse.data.perfil.avatar) {
          setAvatarFileName(userResponse.data.perfil.avatar);
        }
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectAvatar = async (newAvatarFile) => {
    try {
      await updateUserProfile({ avatar: newAvatarFile });
      setAvatarFileName(newAvatarFile);
      setShowAvatarModal(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      alert("No se pudo guardar el avatar.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <ErrorState />;
  }

  const avatarUrl = `/avatars/${avatarFileName}`;
  
  const unlockedAvatars = availableAvatars; 
  const lockedAvatars = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2ff] to-white">
      <Header />
      <div className="pt-[90px] px-4 md:px-10 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#412DB2] mb-6">
          Perfil del Usuario
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <Avatar avatarUrl={avatarUrl} onOpenModal={() => setShowAvatarModal(true)} />
          <div className="flex flex-col gap-6">
            <ProfileCard user={user} />
            <Stats stats={stats} />
          </div>
          <Achievements onOpenAchievementsModal={() => setShowAchievementsModal(true)} />
        </div>
      </div>

      {showAvatarModal && (
        <AvatarSelectionModal
          onClose={() => setShowAvatarModal(false)}
          onSelectAvatar={handleSelectAvatar}
          avatars={unlockedAvatars}
          locked={lockedAvatars}
        />
      )}

      {showAchievementsModal && (
        <AchievementsModal onClose={() => setShowAchievementsModal(false)} achievements={user.logros} />
      )}
    </div>
  );
};

export default ProfilePage;

// --- Componentes Hijos ---

export function Avatar({ avatarUrl, onOpenModal }) {
  return (
    <div className="relative bg-white shadow-lg rounded-lg w-full max-w-xs p-4 flex flex-col items-center">
      <img
        src={avatarUrl}
        alt="Avatar actual"
        className="w-32 h-32 object-cover rounded-md mb-2 border-4 border-purple-300"
      />
      <button
        onClick={onOpenModal}
        className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
      >
        Cambiar Avatar
      </button>
    </div>
  );
}

export function ProfileCard({ user }) {
  const joinDate = user && user.date_joined 
    ? format(parseISO(user.date_joined), "MMMM 'de' yyyy", { locale: es })
    : 'Fecha no disponible';

  return (
    <div className="relative bg-white shadow-lg rounded-lg w-full max-w-md flex items-center p-4">
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{user.nombre_menor || user.username}</h2>
        <p className="text-gray-500">Se unió en {joinDate}</p>
        <p className="text-gray-600 mt-2">Tutor: {user.perfil.nombre_padre} {user.perfil.apellidos_padre}</p>
      </div>
    </div>
  );
}

export function Stats({ stats }) {
  const statItems = [
    { label: "Niveles completados", value: stats.completed_levels || 0 },
    { label: "Mundos completados", value: stats.completed_worlds || 0 },
    { label: "Logros obtenidos", value: stats.achievements_count || 0 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-purple-700">Estadísticas</h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((s, idx) => (
          <div key={idx} className="flex flex-col justify-center items-center bg-purple-100 rounded-lg p-2">
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
      <button
        onClick={onOpenAchievementsModal}
        className="px-4 py-2 bg-[#412DB2] text-white rounded hover:bg-purple-800 transition"
      >
        Ver Logros
      </button>
    </div>
  );
}