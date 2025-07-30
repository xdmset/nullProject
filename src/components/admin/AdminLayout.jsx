import React, { useState, useEffect } from 'react';
import Dashboard, { SystemManagement } from './Dashboard'; // Importa el nuevo componente
import GestionEstudiantes from './GestionEstudiantes';
import GestionContenido from './GestionContenido';
import GestionUsuarios from './GestionUsuarios';
import logo from '../../assets/Logo.png';
import { logout } from '../../services/apiService';

const NavLink = ({ viewName, activeView, setActiveView, children, isVisible = true }) => {
  if (!isVisible) return null;
  return (
    <button
      onClick={() => setActiveView(viewName)}
      className={`flex items-center px-4 py-2.5 w-full text-left rounded-lg transition-colors duration-200 ${
        activeView === viewName
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-blue-800 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};

const AdminLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [user, setUser] = useState({ role: 'admin', name: 'Admin User' });

  useEffect(() => {
    // Aquí iría la lógica para cargar los datos del usuario real
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard currentUserRole={user.role} />;
      case 'estudiantes':
        return <GestionEstudiantes />;
      case 'contenido':
        return <GestionContenido />;
      case 'usuarios':
        return user.role === 'admin' ? <GestionUsuarios /> : <p>Acceso denegado.</p>;
      case 'sistema': // Nueva vista
        return user.role === 'admin' ? <SystemManagement /> : <p>Acceso denegado.</p>;
      default:
        return <Dashboard currentUserRole={user.role} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 flex-shrink-0 bg-blue-900 text-white flex flex-col p-4">
        <div className="flex items-center mb-8 px-2">
          <img src={logo} alt="Signlingus Logo" className="h-10 w-10 mr-3" />
          <span className="text-xl font-bold">Panel</span>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavLink viewName="dashboard" activeView={activeView} setActiveView={setActiveView}>Dashboard</NavLink>
          <NavLink viewName="estudiantes" activeView={activeView} setActiveView={setActiveView}>Progreso Estudiantes</NavLink>
          <NavLink viewName="contenido" activeView={activeView} setActiveView={setActiveView}>Gestión de Contenido</NavLink>
          <NavLink viewName="usuarios" activeView={activeView} setActiveView={setActiveView} isVisible={user.role === 'admin'}>
            Gestión de Usuarios
          </NavLink>
          {/* Nuevo enlace a la gestión del sistema */}
          <NavLink viewName="sistema" activeView={activeView} setActiveView={setActiveView} isVisible={user.role === 'admin'}>
            Gestión del Sistema
          </NavLink>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2.5 text-gray-300 hover:bg-blue-800 hover:text-white rounded-lg">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700 capitalize">{activeView.replace('-', ' ')}</h2>
          <div className="flex items-center">
            <span className="mr-3 font-semibold text-gray-700">{user.name}</span>
            <img className="h-10 w-10 rounded-full object-cover" src="https://placehold.co/100x100/a99ed6/41279b?text=A" alt="User avatar" />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;