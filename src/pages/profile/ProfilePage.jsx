import React, { useState, useEffect } from "react";
import { parseISO, format } from 'date-fns';
import es from 'date-fns/locale/es';
import Header from "../../components/game/HeaderMain";
import AvatarSelectionModal from './AvatarSelectionModal';
import { getMe, getUserStats, updateUserProfile, getAvailableAvatars } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

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
  const [avatarFileName, setAvatarFileName] = useState('avatar1.png');
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const navigate = useNavigate();

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

        if (userResponse.data.perfil?.avatar) {
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
      setShowAvatarsModal(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      alert("No se pudo guardar el avatar.");
    }
  };

  if (isLoading) return <Loader />;
  if (!user) return <ErrorState />;

  return (
    <div className="min-h-screen bg-[#f8f2ff] w-full px-0 py-0 w-80">
      <Header />

      <div className="max-w-6xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => navigate("/world")}
          className="bg-[#412DB2] text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-800 transition"
        >
          ← Volver al Mundo
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl shadow-xl px-6 py-6 flex flex-row items-start gap-6">
        <img
          src={`/avatars/${avatarFileName}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-400 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#412DB2]">
            {user.nombre_menor || user.username}
          </h2>
          <p className="text-sm text-gray-500">
            Tutor: {user.perfil.nombre_padre} {user.perfil.apellidos_padre}
          </p>
          <p className="text-xs text-gray-400 mb-2">
            Se unió en {user.date_joined ? format(parseISO(user.date_joined), "MMMM 'de' yyyy", { locale: es }) : "fecha no disponible"}
          </p>
          <div className="w-full mb-4">
            <div className="text-xs text-right text-gray-400 mb-1">3000 / 8000 XP</div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full w-[40%]"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <StatCard label="Niveles completados" value={stats.completed_levels || 0} />
            <StatCard label="Mundos completados" value={stats.completed_worlds || 0} />
            <StatCard label="Logros obtenidos" value={stats.achievements_count || 0} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AchievementsPanel achievements={user.logros} onShowMore={() => setShowAchievementsModal(true)} />
<AvatarsPanel
  avatars={availableAvatars}
  onSelectAvatar={handleSelectAvatar}
  onShowMore={() => setShowAvatarModal(true)}
/>

      </div>

      {showAchievementsModal && (
        <AchievementsModal onClose={() => setShowAchievementsModal(false)} achievements={user.logros} />
      )}
{showAvatarModal && (
  <AvatarSelectionModal
    onClose={() => setShowAvatarModal(false)}
    avatars={availableAvatars}
    onSelectAvatar={handleSelectAvatar}
  />
)}


    </div>
  );
};

export default ProfilePage;

const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <p className="text-2xl font-bold text-[#412DB2]">{value}</p>
    <p className="text-xs text-gray-500 text-center max-w-[90px]">{label}</p>
  </div>
);

const AchievementsPanel = ({ achievements, onShowMore }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full flex flex-col">
    <h3 className="text-lg font-semibold text-purple-700 mb-4">Logros ({achievements?.length || 0})</h3>
    <div className="flex justify-center gap-3 flex-wrap">
      {achievements.slice(0, 6).map((a) => (
        <div key={a.id} className="bg-purple-100 p-3 rounded-xl flex flex-col items-center w-24 hover:scale-105 transition-transform">
          <img src={`/insignias/${a.insignia_url}`} alt={a.nombre} className="w-10 h-10 mb-1" />
          <p className="text-xs font-semibold text-purple-800">{a.nombre}</p>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <button onClick={onShowMore} className="text-sm text-[#412DB2] font-semibold hover:underline">
        Ver más
      </button>
    </div>
  </div>
);

const AvatarsPanel = ({ avatars, onSelectAvatar, onShowMore }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full flex flex-col">
    <h3 className="text-lg font-semibold text-purple-700 mb-4">Avatares</h3>
    <div className="flex justify-center gap-3 flex-wrap">
      {avatars.slice(0, 6).map((a) => (
        <img
          key={a.id}
          src={`/avatars/${a.url}`}
          alt={a.nombre}
          onClick={() => onSelectAvatar(a.url)}
          className="w-12 h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-500 transition-transform hover:scale-105"
        />
      ))}
    </div>
    <div className="mt-4">
<button
 onClick={onShowMore}
  className="text-sm text-[#412DB2] font-semibold hover:underline"
>
  Ver más
</button>

    </div>
  </div>
);

const AchievementsModal = ({ onClose, achievements }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#412DB2]">Todos los Logros</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((a) => (
          <div key={a.id} className="bg-purple-100 p-2 rounded-xl text-center">
            <img src={`/insignias/${a.insignia_url}`} alt={a.nombre} className="w-10 h-10 mx-auto mb-1" />
            <p className="text-xs font-semibold text-purple-800">{a.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AvatarsModal = ({ onClose, avatars, onSelectAvatar }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#412DB2]">Todos los Avatares</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {avatars.map((a) => (
          <img
            key={a.id}
            src={`/avatars/${a.url}`}
            alt={a.nombre}
            onClick={() => onSelectAvatar(a.url)}
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-500 transition-transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  </div>
);
