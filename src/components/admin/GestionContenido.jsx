import React, { useState, useEffect } from 'react';
import { 
    getMaterialDidactico, 
    createMaterial, 
    updateMaterial, 
    deleteMaterial,
    getCategorias 
} from '../../services/apiService';

// --- Componente Modal ---
const MaterialFormModal = ({ item, onClose, onSave, categories }) => {
    const [descripcion, setDescripcion] = useState(item?.descripcion || '');
    const [tipo, setTipo] = useState(item?.tipo || 'Video');
    const [url, setUrl] = useState(item?.url || '');
    const [file, setFile] = useState(null);
    const [categoriaId, setCategoriaId] = useState(item?.categoria_id || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('tipo', tipo);

        if (tipo === 'PDF') {
            if (file) {
                // El backend espera el archivo bajo la clave 'file'
                formData.append('file', file);
            }
            if (categoriaId) {
                formData.append('categoria', categoriaId);
            }
        } else { // Si es Video
            formData.append('url', url);
            if (categoriaId) {
                formData.append('categoria', categoriaId);
            }
        }
        
        onSave(formData, item?.id);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-black">
                <h2 className="text-2xl font-bold mb-4">{item ? 'Editar' : 'Subir'} Material</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea 
                        value={descripcion} 
                        onChange={e => setDescripcion(e.target.value)} 
                        placeholder="Descripción del material" 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                    
                    <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded bg-white">
                        <option value="Video">Video</option>
                        <option value="PDF">PDF</option>
                    </select>

                    <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)} className="w-full p-2 border rounded bg-white">
                        <option value="">Selecciona una Categoría (Opcional)</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>

                    {tipo === 'Video' ? (
                        <input 
                            value={url} 
                            onChange={e => setUrl(e.target.value)} 
                            placeholder="URL del Video (YouTube, etc.)" 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Archivo PDF</label>
                            <input 
                                type="file" 
                                onChange={e => setFile(e.target.files[0])} 
                                className="w-full p-2 border rounded" 
                                accept=".pdf" 
                                required={!item} // Requerido solo al crear, no al editar
                            />
                            {item && <p className="text-xs text-gray-500 mt-1">Archivo actual: {item.url}. Sube uno nuevo para reemplazarlo.</p>}
                        </div>
                    )}

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Componente Principal ---
const GestionContenido = () => {
    const [content, setContent] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [contentRes, categoriasRes] = await Promise.all([
                getMaterialDidactico(),
                getCategorias(),
            ]);
            
            setContent(contentRes.data);
            setCategories(categoriasRes.data);

        } catch (error) {
            console.error("Error al cargar el contenido:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (formData, id) => {
        try {
            if (id) {
                await updateMaterial(id, formData);
            } else {
                await createMaterial(formData);
            }
            fetchData();
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Error al guardar el material:", error);
            alert("Hubo un error al guardar. Revisa la consola para más detalles.");
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este material?')) {
            try {
                await deleteMaterial(id);
                fetchData();
            } catch (error) {
                console.error("Error al eliminar el material:", error);
                alert("Hubo un error al eliminar.");
            }
        }
    };
    
    const openModal = (item = null) => {
        const itemWithCategoryId = item ? { ...item, categoria_id: categories.find(c => c.nombre === item.categoria)?.id } : null;
        setEditingItem(itemWithCategoryId);
        setIsModalOpen(true);
    };

    if (isLoading) return <p>Cargando contenido...</p>;

    return (
        <div>
            {isModalOpen && <MaterialFormModal item={editingItem} onClose={() => setIsModalOpen(false)} onSave={handleSave} categories={categories} />}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Contenido Didáctico</h1>
                <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
                    Subir Nuevo Material
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {content.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.descripcion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tipo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.categoria || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
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

export default GestionContenido;