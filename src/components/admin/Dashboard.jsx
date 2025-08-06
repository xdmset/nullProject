import React, { useState, useEffect, useRef } from 'react';
import {
    getDashboardStats,
    getActivityChartData,
    getMaterialTypeChartData,
    getMonthlyRegistrationsChartData,
    getWorldProgressChartData,
    triggerBackup,
    triggerFullRestore,
    triggerTableRestore,
    exportUsersCSV,
    exportProgresoCSV,
    exportMaterialCSV,
    triggerTableBackup,
    triggerResetDatabase
} from '../../services/apiService';
import ActivityChart from './ActivityChart';
import MaterialChart from './MaterialChart';
import MonthlyRegistrationsChart from './MonthlyRegistrationsChart';
import WorldProgressChart from './WorldProgressChart';

// --- Sub-componente StatCard ---
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// --- Sub-componentes de Estadísticas ---
const AsesorStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <StatCard title="Estudiantes Activos" value={stats.estudiantesActivos || 0} icon="🎓" />
    <StatCard title="Promedio de Progreso" value={stats.promedioProgreso || '0%'} icon="📊" />
    <StatCard title="Material Didáctico" value={stats.materialDidacticoSubido || 0} icon="📚" />
  </div>
);

const AdminStats = ({ stats }) => (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Usuarios Totales" value={stats.usuariosTotales || 0} icon="👥" />
    <StatCard title="Asesores Activos" value={stats.asesoresActivos || 0} icon="🧑‍🏫" />
    <StatCard title="Material Didáctico" value={stats.materialDidacticoSubido || 0} icon="📹" />
    <StatCard title="Nuevos Registros (Mes)" value={stats.nuevosRegistrosMes || 0} icon="📈" />
  </div>
);

// --- Componente para la Gestión del Sistema ---
export const SystemManagement = () => {
    const fullRestoreInputRef = useRef(null);
    const tableRestoreInputRef = useRef(null);
    const [tableToRestore, setTableToRestore] = useState('');

    const handleDownload = async (serviceFunc, defaultFilename) => {
        try {
            const response = await serviceFunc();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            
            const contentDisposition = response.headers['content-disposition'];
            let filename = defaultFilename;
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch.length === 2)
                    filename = filenameMatch[1];
            }
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert(`Error al descargar el archivo.`);
            console.error(error);
        }
    };
    
    const handleFullRestoreClick = () => {
        if (window.confirm('ADVERTENCIA: ¿Estás seguro de que quieres reemplazar la base de datos actual con un respaldo? Esta acción no se puede deshacer.')) {
            fullRestoreInputRef.current.click();
        }
    };
    
    const handleFullRestoreFileSelected = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('backup_file', file);
            try {
                await triggerFullRestore(formData);
                alert('Restauración iniciada. El servidor se reiniciará. Refresca la página en un momento.');
            } catch (error) {
                alert('Error al subir el archivo de restauración.');
                console.error(error);
            }
        }
        event.target.value = null;
    };

    const handleTableRestoreClick = (tableName) => {
        if (window.confirm(`¿Seguro que quieres restaurar la tabla '${tableName}'? Los datos actuales se perderán.`)) {
            setTableToRestore(tableName);
            tableRestoreInputRef.current.click();
        }
    };

    const handleTableRestoreFileSelected = async (event) => {
        const file = event.target.files[0];
        if (file && tableToRestore) {
            const formData = new FormData();
            formData.append('backup_file', file);
            formData.append('table_name', tableToRestore);
            try {
                await triggerTableRestore(formData);
                alert(`Tabla '${tableToRestore}' restaurada con éxito.`);
            } catch (error) {
                alert('Error al restaurar la tabla.');
                console.error(error);
            }
        }
        event.target.value = null;
        setTableToRestore('');
    };

    const handleResetDatabase = async () => {
        const confirmMessage = `
ADVERTENCIA: Esta acción es irreversible.

Se borrarán los siguientes datos:
- Todos los usuarios que NO son administradores.
- Todos los perfiles asociados.
- TODO el progreso de los estudiantes.
- Todos los logros ganados por los estudiantes.

El contenido (Mundos, Niveles, etc.) y los usuarios administradores NO se borrarán.

¿Estás seguro de que quieres continuar?
        `;
        
        if (window.confirm(confirmMessage)) {
            try {
                const response = await triggerResetDatabase();
                alert(response.data.detail);
            } catch (error) {
                alert('Error al resetear los datos.');
                console.error(error);
            }
        }
    };

    const tablesToManage = [
        { name: 'Usuarios', table: 'users_usuario', csvFunc: exportUsersCSV, backupFunc: triggerTableBackup },
        { name: 'Progreso', table: 'rewards_progreso', csvFunc: exportProgresoCSV, backupFunc: triggerTableBackup },
        { name: 'Material Didáctico', table: 'lessons_materialdidactico', csvFunc: exportMaterialCSV, backupFunc: triggerTableBackup },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión del Sistema</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Gestión General de la Base de Datos</h2>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => handleDownload(triggerBackup, 'backup_completo.sql')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Respaldar BD Completa</button>
                    <button onClick={handleFullRestoreClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Restaurar BD desde Archivo</button>
                    <input type="file" ref={fullRestoreInputRef} onChange={handleFullRestoreFileSelected} style={{ display: 'none' }} accept=".sql" />
                    <button onClick={handleResetDatabase} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Resetear Datos de Usuarios</button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Gestión por Tabla</h2>
                <input type="file" ref={tableRestoreInputRef} onChange={handleTableRestoreFileSelected} style={{ display: 'none' }} accept=".sql" />
                <div className="space-y-4">
                    {tablesToManage.map(({ name, table, csvFunc, backupFunc }) => (
                        <div key={table} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="font-semibold">{name}</span>
                            <div className="flex space-x-2">
                                <button onClick={() => handleDownload(() => backupFunc(table), `backup_${table}.sql`)} className="text-sm bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded">Respaldar (.sql)</button>
                                <button onClick={() => handleTableRestoreClick(table)} className="text-sm bg-orange-200 hover:bg-orange-300 py-1 px-3 rounded">Restaurar (.sql)</button>
                                <button onClick={() => handleDownload(csvFunc, `${name.toLowerCase().replace(/ /g, '_')}.csv`)} className="text-sm bg-green-200 hover:bg-green-300 py-1 px-3 rounded">Exportar (.csv)</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal del Dashboard ---
const Dashboard = ({ currentUserRole }) => {
    const [stats, setStats] = useState({});
    const [activityChartData, setActivityChartData] = useState({});
    const [materialChartData, setMaterialChartData] = useState({});
    const [monthlyChartData, setMonthlyChartData] = useState({});
    const [worldProgressChartData, setWorldProgressChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const statsRes = await getDashboardStats();
                setStats(statsRes.data);

                if (currentUserRole === 'administrador') {
                    const [activityRes, materialRes, monthlyRes] = await Promise.all([
                        getActivityChartData(),
                        getMaterialTypeChartData(),
                        getMonthlyRegistrationsChartData()
                    ]);
                    setActivityChartData(activityRes.data);
                    setMaterialChartData(materialRes.data);
                    setMonthlyChartData(monthlyRes.data);
                } else if (currentUserRole === 'asesor') {
                    const [materialRes, worldProgressRes] = await Promise.all([
                        getMaterialTypeChartData(),
                        getWorldProgressChartData()
                    ]);
                    setMaterialChartData(materialRes.data);
                    setWorldProgressChartData(worldProgressRes.data);
                }
            } catch (error) {
                console.error("Error al cargar datos del dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentUserRole]);

    if (isLoading) {
        return <p>Cargando dashboard...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Dashboard de {currentUserRole === 'administrador' ? 'Administrador' : 'Asesor'}
            </h1>
            
            {currentUserRole === 'administrador' ? <AdminStats stats={stats} /> : <AsesorStats stats={stats} />}

            {currentUserRole === 'administrador' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="relative h-80"><ActivityChart chartData={activityChartData} /></div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="relative h-80"><MaterialChart chartData={materialChartData} /></div>
                        </div>
                    </div>
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="relative h-80"><MonthlyRegistrationsChart chartData={monthlyChartData} /></div>
                    </div>
                </>
            )}

            {currentUserRole === 'asesor' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="relative h-80"><MaterialChart chartData={materialChartData} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="relative h-80"><WorldProgressChart chartData={worldProgressChartData} /></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;