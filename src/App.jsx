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
import CityPage from './pages/game/ciudad/CityScreen.jsx';
import LevelScreen from './pages/game/ciudad/LevelScreen.jsx';
import VideosPage from './pages/material/videos/VideoPage.jsx';


// Aquí deberías importar las otras páginas que usabas (BeachPage, JunglePage, CastlePage, etc.)
// Por ejemplo:
// import BeachPage from './pages/game/beach/BeachPage.jsx';
// import JunglePage from './pages/game/jungle/JunglePage.jsx';
// import CastlePage from './pages/game/castle/CastlePage.jsx';
// import SecretLevelPage from './pages/game/SecretLevelPage.jsx';
// import RewardPage from './pages/game/RewardPage.jsx';

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
        <Route path="/level/:id" element={<LevelScreen />} />
        <Route path="/world" element={<World />} />
        <Route path="/ciudad" element={<CityPage />} />
        <Route path="/reward" element={<RewardModal  />} />
        <Route path="/videos" element={<VideosPage  />} />

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
              <Navigate to="/login" replace />
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

        {/* Rutas de niveles */}
        <Route
          path="/level/:id"
          element={
            user && user.role === 'estudiante' ? (
              <LevelScreen levelId="/level/:id" />
            ) : (
              <Navigate to="/level/:id" replace />
            )
          }
        />

        {/* Otras rutas de juego: jungla, castillo, secretLevel, reward, etc.
            Agrega igual que arriba con validación de usuario */}

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


        {/* Ruta por defecto: redirigir a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
