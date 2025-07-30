import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// --- Tus imports ---
import { getMe } from './services/apiService';
import MainPage from './pages/MainPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PasswordPage from './pages/PasswordPage.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import World from './pages/world/WorldSelect.jsx';
import RewardModal from './pages/game/RewardModal.jsx';
import VideosPage from './pages/material/videos/VideoPage.jsx';
import InfoPage from './pages/material/info/InfoPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import CityPage from './pages/game/ciudad/CityPage.jsx';
import CastlePage from './pages/game/castillo/CastlePage.jsx';
import JunglaPage from './pages/game/jungla/JunglaPage.jsx';
import LevelRouter from './pages/game/LevelRouter.jsx';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && user.rol && !allowedRoles.includes(user.rol.nombre)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await getMe();
          setUser(response.data);
        } catch (error) {
          console.error("Token inválido, limpiando sesión.", error);
          localStorage.clear();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.rol && (userData.rol.nombre === 'Administrador' || userData.rol.nombre === 'Asesor')) {
      navigate('/admin');
    } else {
      navigate('/world');
    }
  };

  // --- CAMBIO AQUÍ ---
  // Si está cargando, no muestra nada en lugar del texto
  if (isLoading) {
    return null; 
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/password" element={<PasswordPage />} />
      <Route path="/reward" element={<RewardModal />} />
      
      {/* Rutas Protegidas */}
      <Route path="/admin/*" element={<ProtectedRoute user={user} allowedRoles={['Administrador', 'Asesor']}><AdminLayout user={user} /></ProtectedRoute>} />
      <Route path="/world" element={<ProtectedRoute user={user}><World /></ProtectedRoute>} />
      <Route path="/ciudad" element={<ProtectedRoute user={user}><CityPage /></ProtectedRoute>} />
      <Route path="/castillo" element={<ProtectedRoute user={user}><CastlePage /></ProtectedRoute>} />
      <Route path="/jungla" element={<ProtectedRoute user={user}><JunglaPage /></ProtectedRoute>} />
      <Route path="/level/:world/:id" element={<ProtectedRoute user={user}><LevelRouter /></ProtectedRoute>} />
      <Route path="/videos" element={<ProtectedRoute user={user}><VideosPage /></ProtectedRoute>} />
      <Route path="/info" element={<ProtectedRoute user={user}><InfoPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute user={user}><ProfilePage /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;