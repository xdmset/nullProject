import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import GestionEstudiantes from './GestionEstudiantes';
import GestionContenido from './GestionContenido';
import GestionUsuarios from './GestionUsuarios';
import logo from '../../assets/Logo.png';
import { logout } from '../../services/apiService'; // Asumimos que getMe existe para obtener datos del usuario

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
  const [user, setUser] = useState({ role: 'admin', name: 'Admin User' }); // Valor inicial mientras carga

  // Simulación de carga de datos del usuario al montar el componente
  useEffect(() => {
    // En una app real, aquí llamarías a una función como getMe()
    // para obtener los datos del usuario usando el token guardado.
    // const fetchUser = async () => {
    //   try {
    //     const response = await getMe();
    //     setUser({ role: response.data.rol.nombre.toLowerCase(), name: response.data.username });
    //   } catch (error) {
    //     handleLogout(); // Si falla, cerramos sesión
    //   }
    // };
    // fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirige a la página de login
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
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2.5 text-gray-300 hover:bg-blue-800 hover:text-white rounded-lg">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700 capitalize">{activeView}</h2>
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