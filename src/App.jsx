import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Tus imports
import { getMe, logout } from './services/apiService';
import MainPage from './pages/MainPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import BlogPage from './pages/blog/BlogPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PasswordPage from './pages/PasswordPage.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import World from './pages/world/WorldSelect.jsx';
import VideosPage from './pages/material/videos/VideoPage.jsx';
import InfoPage from './pages/material/info/InfoPage.jsx';
import ChatPage from './pages/material/ia/ChatPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import CityPage from './pages/game/ciudad/CityPage.jsx';
import CastlePage from './pages/game/castillo/CastlePage.jsx';
import JunglaPage from './pages/game/jungla/JunglaPage.jsx';
import BeachPage from './pages/game/playa/BeachPage.jsx';
import LevelRouter from './pages/game/LevelRouter.jsx';
import SecretPage from './pages/game/secret/SecretPage.jsx';

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
          logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.rol && (userData.rol.nombre === 'Administrador' || userData.rol.nombre === 'Asesor')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/world');
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/password" element={<PasswordPage />} />
      
      {/* --- RUTA PRINCIPAL PARA EL PANEL DE ADMIN --- */}
      <Route 
        path="/admin/*" // El '*' delega todas las sub-rutas a AdminLayout
        element={
          <ProtectedRoute user={user} allowedRoles={['Administrador', 'Asesor']}>
            <AdminLayout user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />

      {/* --- Rutas Protegidas de Juego y Otras --- */}
      <Route path="/world" element={<ProtectedRoute user={user}><World /></ProtectedRoute>} />
      <Route path="/ciudad" element={<ProtectedRoute user={user}><CityPage /></ProtectedRoute>} />
      <Route path="/castillo" element={<ProtectedRoute user={user}><CastlePage /></ProtectedRoute>} />
      <Route path="/jungla" element={<ProtectedRoute user={user}><JunglaPage /></ProtectedRoute>} />
      <Route path="/playa" element={<ProtectedRoute user={user}><BeachPage /></ProtectedRoute>} />
      <Route path="/secret" element={<ProtectedRoute user={user}><SecretPage /></ProtectedRoute>} />
      <Route path="/level/:world/:id" element={<ProtectedRoute user={user}><LevelRouter /></ProtectedRoute>} />
      <Route path="/videos" element={<ProtectedRoute user={user}><VideosPage /></ProtectedRoute>} />
      <Route path="/info" element={<ProtectedRoute user={user}><InfoPage /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute user={user}><ChatPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute user={user}><ProfilePage /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;