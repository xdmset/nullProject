import React, { useState } from 'react';

// --- 1. Importar TODOS los componentes de página/vista REALES ---
import MainPage from './pages/MainPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import RewardPage from './pages/RewardPage.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Mundos from './components/game/Mundos.jsx';
import SignlingusGame from './components/game/SignlingusGame.jsx';

// --- 2. Componente Principal de la Aplicación (Router) ---
function App() {
  // Estado para saber qué página mostrar. Empezamos en 'home' (la página de inicio).
  const [currentPage, setCurrentPage] = useState('home');
  
  // Estado para guardar la información del usuario logueado. 'null' significa que no hay sesión iniciada.
  const [user, setUser] = useState(null);

  // Función para cambiar de página. Se la pasaremos a los componentes hijos.
  const navigate = (page) => {
    setCurrentPage(page);
  };

  // Función para manejar el login.
  const handleLogin = (userData) => {
    setUser(userData);
    // Lógica de redirección por rol
    if (userData.role === 'estudiante') {
      navigate('mundos');
    } else if (userData.role === 'admin' || userData.role === 'asesor') {
      navigate('admin');
    }
  };

  // Función para renderizar la página correcta según el estado.
  const renderPage = () => {
    switch (currentPage) {
      // --- Flujo de Autenticación y Páginas Públicas ---
      case 'login':
        return <LoginPage onLogin={handleLogin} navigate={navigate} />;
      case 'signup':
        return <SignupPage navigate={navigate} />;
      case 'about':
        return <AboutPage navigate={navigate} />;
      
      // --- Flujo de Administrador ---
      case 'admin':
        // En un futuro, aquí podrías añadir una comprobación: si el usuario no es admin, redirigir a login.
        return <AdminLayout />;
      
      // --- Flujo del Juego para Estudiantes ---
      case 'mundos':
        return <Mundos navigate={navigate} />;
      case 'game':
        return <SignlingusGame navigate={navigate} />;
      case 'reward':
        return <RewardPage navigate={navigate} />;
        
      // --- Página de Inicio por defecto ---
      case 'home':
      default:
        return <MainPage navigate={navigate} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;
