import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorldProgress } from '../../services/apiService';
import ProgressBar from './ProgressBar'; // Importando el componente reutilizable

const GestionMundos = () => {
    const [worlds, setWorlds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorldProgress = async () => {
            try {
                const response = await getWorldProgress();
                setWorlds(response.data);
            } catch (error) {
                console.error("Error al cargar el progreso de los mundos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorldProgress();
    }, []);

    if (isLoading) {
        return <p>Cargando progreso por mundos...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Progreso por Mundos</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mundo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiantes Activos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progreso Promedio</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Ver</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {worlds.map((world) => (
                                <tr key={world.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{world.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{world.student_count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ProgressBar progress={world.average_progress || 0} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/admin/mundos/${world.id}`} className="text-indigo-600 hover:text-indigo-900">
                                            Ver Detalles
                                        </Link>
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

export default GestionMundos;