import React from 'react';

// Componente para la barra de progreso
const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
  </div>
);

const GestionEstudiantes = () => {
  // Datos de marcador de posición
  const students = [
    { id: 1, name: 'Ana Sofía Paredes', progress: 75, currentLevel: 'Mundo 3: La Familia', completedWorlds: 2 },
    { id: 2, name: 'Carlos Mendoza', progress: 40, currentLevel: 'Mundo 2: Lugares', completedWorlds: 1 },
    { id: 3, name: 'Beatriz Herrera', progress: 100, currentLevel: 'Completado', completedWorlds: 5 },
    { id: 4, name: 'David Jiménez', progress: 15, currentLevel: 'Mundo 1: Saludos', completedWorlds: 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Progreso de Estudiantes</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progreso General</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mundos Completados</th>
                <th className="relative px-6 py-3"><span className="sr-only">Ver</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.currentLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProgressBar progress={student.progress} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{student.completedWorlds}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Ver Detalles</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionEstudiantes;
