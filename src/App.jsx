import React, { useState } from 'react';

// Importamos React Router DOM
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- 1. Importar TODOS los componentes de página/vista REALES ---
import MainPage from './pages/MainPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PasswordPage from './pages/PasswordPage.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import World from './pages/world/WorldSelect.jsx';
import RewardModal  from './pages/game/RewardModal.jsx'
import VideosPage from './pages/material/videos/VideoPage.jsx';
import InfoPage from './pages/material/info/InfoPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';

//Mundos
import CityPage from './pages/game/ciudad/CityPage.jsx';
import CastlePage from './pages/game/castillo/CastlePage.jsx';
import JunglaPage from './pages/game/jungla/JunglaPage.jsx';
import LevelRouter from './pages/game/LevelRouter.jsx';

function App() {
  // Estado para guardar la información del usuario logueado. 'null' significa que no hay sesión iniciada.
  const [user, setUser] = useState(null);

  // Función para manejar el login.
  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        {/* --- Páginas públicas --- */}
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/world" element={<World />} />
        <Route path="/ciudad" element={<CityPage />} />
        <Route path="/castillo" element={<CastlePage />} />
        <Route path="/jungla" element={<JunglaPage />} />
        <Route path="/level/:world/:id" element={<LevelRouter />} />
        <Route path="/reward" element={<RewardModal  />} />
        <Route path="/videos" element={<VideosPage  />} />
        <Route path='/info' element={<InfoPage />} />
        <Route path='/profile' element={<ProfilePage />} />

        {/* --- Ruta protegida admin --- */}
        <Route
          path="/admin/*"
          element={
            user && (user.role === 'admin' || user.role === 'asesor') ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* --- Rutas para estudiantes / juego --- */}
        <Route
          path="/world"
          element={
            user && user.role === 'estudiante' ? (
              <World />
            ) : (
              <Navigate to="/world" replace />
            )
          }
        />
        <Route
          path="/beach"
          element={
            user && user.role === 'estudiante' ? (
              // <BeachPage />
              <div>BeachPage placeholder</div> // Cambia esto cuando importes BeachPage
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/ciudad"
          element={
            user && user.role === 'estudiante' ? (
              <CityPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/jungla"
          element={
            user && user.role === 'estudiante' ? (
              <JunglaPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/castillo"
          element={
            user && user.role === 'estudiante' ? (
              <CastlePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
          

        {/* Rutas de niveles */}
      <Route
        path="/level/:world/:id"
        element={
          user && user.role === 'estudiante' ? (
            <LevelRouter />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

        <Route
          path="/videos"
          element={
            user && user.role === 'estudiante' ? (
              <VideosPage />
            ) : (
              <Navigate to="/videos" replace />
            )
          }
        />

        <Route
          path="/info"
          element={
            user && user.role === 'estudiante' ? (
              <InfoPage />
            ) : (
              <Navigate to="/info" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user && user.role === 'estudiante' ? (
              <InfoPage />
            ) : (
              <Navigate to="/profile" replace />
            )
          }
        />

        {/* Ruta por defecto: redirigir a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
