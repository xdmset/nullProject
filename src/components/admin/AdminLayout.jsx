import React from 'react';
import { Routes, Route, NavLink as RouterNavLink, Navigate, useLocation } from 'react-router-dom';
import Dashboard, { SystemManagement } from './Dashboard';
import GestionContenido from './GestionContenido';
import GestionUsuarios from './GestionUsuarios';
import GestionMundos from './GestionMundos';
import MundoDetail from './MundoDetail';
import logo from '../../assets/Logo.png';

const NavLink = ({ to, children, isVisible = true }) => {
  if (!isVisible) return null;
  return (
    <RouterNavLink
      to={to}
      end={!to.includes('*')}
      className={({ isActive }) =>
        `flex items-center px-4 py-2.5 w-full text-left rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white'
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
};

const AdminLayout = ({ user, onLogout }) => {
  const userRole = user?.rol?.nombre || 'Estudiante';
  const location = useLocation();

  const getHeaderTitle = () => {
    const path = location.pathname.replace('/admin/', '');
    if (path.startsWith('mundos/')) return 'Detalle de Mundo';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 flex-shrink-0 bg-blue-900 text-white flex flex-col p-4">
        <div className="flex items-center mb-8 px-2">
          <img src={logo} alt="Signlingus Logo" className="h-10 w-10 mr-3" />
          <span className="text-xl font-bold">Panel</span>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/mundos">Progreso por Mundos</NavLink>
          <NavLink to="/admin/contenido">Gestión de Contenido</NavLink>
          <NavLink to="/admin/usuarios" isVisible={userRole === 'Administrador'}>Gestión de Usuarios</NavLink>
          <NavLink to="/admin/sistema" isVisible={userRole === 'Administrador'}>Gestión del Sistema</NavLink>
        </nav>
        <div className="mt-auto">
          <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2.5 text-gray-300 hover:bg-blue-800 hover:text-white rounded-lg">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">{getHeaderTitle()}</h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Routes>
            <Route path="dashboard" element={<Dashboard currentUserRole={userRole.toLowerCase()} />} />
            <Route path="mundos" element={<GestionMundos />} />
            <Route path="mundos/:id" element={<MundoDetail />} />
            <Route path="contenido" element={<GestionContenido />} />
            <Route path="usuarios" element={<GestionUsuarios />} />
            <Route path="sistema" element={<SystemManagement />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;