import React from 'react';

//Componente definido fuera para evitar re-creación
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

//Componente definido fuera
const AsesorStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <StatCard title="Estudiantes Activos" value="150" icon="🎓" />
    <StatCard title="Promedio de Progreso" value="68%" icon="📊" />
    <StatCard title="Videos más Vistos" value="Lección 3" icon="▶️" />
  </div>
);

//Componente definido fuera
const AdminStats = () => (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Usuarios Totales" value="1,250" icon="👥" />
    <StatCard title="Asesores Activos" value="12" icon="🧑‍🏫" />
    <StatCard title="Videos Subidos" value="320" icon="📹" />
    <StatCard title="Nuevos Registros (Mes)" value="85" icon="📈" />
  </div>
);


const Dashboard = ({ currentUserRole }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard de {currentUserRole === 'admin' ? 'Administrador' : 'Asesor'}
      </h1>
      
      {currentUserRole === 'admin' ? <AdminStats /> : <AsesorStats />}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h2>
        <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
          <p className="text-gray-500">Gráfico de Actividad</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
