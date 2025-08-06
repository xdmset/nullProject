import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from 'date-fns';
import es from 'date-fns/locale/es';
import Header from "../../components/game/HeaderMain";
import AchievementsModal from "./AchievementsModal";
import AvatarSelectionModal from './AvatarSelectionModal';
import { 
    getMe, 
    getUserStats, 
    updateUserProfile, 
    getAvailableAvatars, 
    getUnlockedAvatars,
    getAllAchievements,
    getCurrentUserProgress // Añadimos esta importación
} from "../../services/apiService";
import logo from "../../assets/logo.png";
import Back from '../../assets/icons/back.png';

const Loader = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f8f2ff] to-white">
    <img src={logo} alt="Cargando..." className="h-24 w-24 animate-pulse" />
    <p className="mt-4 text-lg font-semibold text-primary-500">Cargando perfil...</p>
  </div>
);

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
  const [avatarFileName, setAvatarFileName] = useState('default.png');
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [unlockedAvatars, setUnlockedAvatars] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);
  const [userProgress, setUserProgress] = useState([]); // Nuevo estado para el progreso
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const [
        userRes, 
        statsRes, 
        availableAvatarsRes, 
        unlockedAvatarsRes, 
        allAchievementsRes,
        progressRes // Nuevo: obtenemos el progreso del usuario
      ] = await Promise.all([
        getMe(),
        getUserStats(),
        getAvailableAvatars(),
        getUnlockedAvatars(),
        getAllAchievements(),
        getCurrentUserProgress() // Nueva llamada al API
      ]);
      
      setUser(userRes.data);
      setStats(statsRes.data);
      setAvailableAvatars(availableAvatarsRes.data);
      setUnlockedAvatars(unlockedAvatarsRes.data);
      setAllAchievements(allAchievementsRes.data);
      setUserProgress(progressRes.data); // Guardamos el progreso

      if (userRes.data.perfil && userRes.data.perfil.avatar) {
        setAvatarFileName(userRes.data.perfil.avatar);
      }
    } catch (error) {
      console.error("Error al cargar los datos del perfil:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  // Función para determinar logros desbloqueados basados en el progreso
  const getUnlockedAchievements = () => {
    if (!Array.isArray(userProgress) )return [];

    // Mapeo de nombre de mundo a ID de logro
    const worldToAchievementMap = {
      "Playa": 1,
      "Ciudad": 4,
      "Jungla": 3,
      "Castillo": 2,
      "Mundo Misterioso": 11
    };

    // Logros por mundos completados
    const unlocked = allAchievements.filter(achievement => {
      return userProgress.some(progress => 
        progress.mundo?.nombre && 
        progress.porcentaje_avance === "100.00" &&
        worldToAchievementMap[progress.mundo.nombre] === achievement.id
      );
    });

    // Logro especial por completar todos los mundos
    const totalWorlds = 5; // Ajusta según tu cantidad de mundos
    const completedWorlds = userProgress.filter(p => p.porcentaje_avance === "100.00").length;
    
    if (completedWorlds >= totalWorlds) {
      const allWorldsAchievement = allAchievements.find(a => a.id === 9);
      if (allWorldsAchievement) {
        unlocked.push(allWorldsAchievement);
      }
    }

    return unlocked;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <ErrorState />;
  }

  const avatarUrl = `/avatars/${avatarFileName}`;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2ff] to-white">
      <Header />
      <div className="pt-[90px] px-4 md:px-10 pb-12 max-w-7xl mx-auto">
        
        <button 
          onClick={() => navigate('/world')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 font-semibold"
        >
          <img src={Back} alt="Volver" className="w-6 h-6 mr-2" />
          Volver a Mundos
        </button>

        <h1 className="text-3xl font-bold text-center text-[#412DB2] mb-6">
          Perfil del Usuario
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <Avatar avatarUrl={avatarUrl} onOpenModal={() => setShowAvatarModal(true)} />
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <ProfileCard user={user} />
            <Stats stats={stats} />
          </div>
          <Achievements 
            onOpenAchievementsModal={() => setShowAchievementsModal(true)} 
            unlockedCount={getUnlockedAchievements().length}
          />
        </div>
      </div>

      {showAvatarModal && (
        <AvatarSelectionModal
          onClose={() => setShowAvatarModal(false)}
          onSelect={handleSelectAvatar}
          availableAvatars={availableAvatars}
          unlockedAvatars={unlockedAvatars}
        />
      )}

     
{showAchievementsModal && (
  <AchievementsModal 
    onClose={() => setShowAchievementsModal(false)} 
    allAchievements={allAchievements}
    unlockedAchievements={getUnlockedAchievements()} // Pasamos los logros ya calculados
  />
)}
    </div>
  );
};

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
    <div className="relative bg-white shadow-lg rounded-lg w-full lg:w-96 flex items-center p-4">
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{user.perfil?.nombre_menor || user.username}</h2>
        <p className="text-gray-500">Se unió en {joinDate}</p>
        <p className="text-gray-600 mt-2">Tutor: {user.perfil?.nombre_padre} {user.perfil?.apellidos_padre}</p>
      </div>
    </div>
  );
}

export function Stats({ stats }) {
  const statItems = [
    { label: "Mundos completados", value: stats.mundos_completados || 0 },
    { label: "Niveles completados", value: stats.niveles_completados || 0 },

  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full lg:w-96">
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

export function Achievements({ onOpenAchievementsModal, unlockedCount }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-xs text-center">
      <h3 className="text-lg font-semibold mb-2 text-purple-700">Logros</h3>
      <p className="text-sm text-gray-600 mb-3">
        {unlockedCount} logros desbloqueados
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

export default ProfilePage;