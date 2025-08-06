import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMundoProgreso } from '../../services/apiService';
import ProgressBar from './ProgressBar';

const MundoDetail = () => {
    const { id: mundoId } = useParams();
    const [progressList, setProgressList] = useState([]);
    const [mundoNombre, setMundoNombre] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getMundoProgreso(mundoId);
                setProgressList(response.data);
                // Si hay datos, toma el nombre del mundo del primer registro
                if (response.data.length > 0) {
                    setMundoNombre(response.data[0].mundo.nombre);
                }
            } catch (error) {
                console.error("Error al cargar los detalles del mundo:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [mundoId]);

    if (isLoading) return <p>Cargando detalles del mundo...</p>;

    return (
        <div>
            <Link to="/admin/mundos" className="text-indigo-600 hover:underline mb-6 inline-block">&larr; Volver a Progreso por Mundos</Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Progreso de Estudiantes en: {mundoNombre}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiante</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progreso</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveles Completados</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intentos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {progressList.length > 0 ? progressList.map(p => (
                            <tr key={p.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.usuario.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ProgressBar progress={p.porcentaje_avance} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{p.niveles_completados}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{p.intentos_realizados}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No hay datos de progreso para este mundo todavía.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MundoDetail;