import React, { useState, useEffect } from 'react';
import { getUsuariosAdmin, getRoles, createUser } from '../../services/apiService';

// --- Componente Modal para Crear Usuario ---
const CreateUserModal = ({ roles, onClose, onUserCreated }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombreMenor, setNombreMenor] = useState('');
    const [nombrePadre, setNombrePadre] = useState('');
    const [apellidosPadre, setApellidosPadre] = useState('');
    const [rolId, setRolId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const userData = {
            username, email, password,
            nombre_menor: nombreMenor,
            nombre_padre: nombrePadre,
            apellidos_padre: apellidosPadre,
            rol: rolId
        };
        try {
            await createUser(userData);
            alert('¡Usuario creado con éxito!');
            onUserCreated(); // Llama a la función para refrescar la lista
            onClose(); // Cierra el modal
        } catch (err) {
            setError('Error al crear el usuario. Revisa los datos.');
            console.error(err);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-black">
                <h2 className="text-2xl font-bold mb-4">Dar de Alta Usuario</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <input className="w-full p-2 border rounded" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    <input className="w-full p-2 border rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <input className="w-full p-2 border rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
                    <input className="w-full p-2 border rounded" value={nombreMenor} onChange={e => setNombreMenor(e.target.value)} placeholder="Nombre del Menor (opcional)" />
                    <input className="w-full p-2 border rounded" value={nombrePadre} onChange={e => setNombrePadre(e.target.value)} placeholder="Nombre del Padre/Tutor" required />
                    <input className="w-full p-2 border rounded" value={apellidosPadre} onChange={e => setApellidosPadre(e.target.value)} placeholder="Apellidos del Padre/Tutor" required />
                    
                    <select className="w-full p-2 border rounded bg-white" value={rolId} onChange={e => setRolId(e.target.value)} required>
                        <option value="">Selecciona un rol</option>
                        {roles.map(rol => (
                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Componente Principal ---
const GestionUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchUsersAndRoles = async () => {
    setIsLoading(true);
    try {
      const [usersResponse, rolesResponse] = await Promise.all([getUsuariosAdmin(), getRoles()]);
      
      const formattedUsers = usersResponse.data.map(user => ({
        id: user.id,
        name: user.nombre_menor || user.username,
        email: user.email,
        role: user.rol ? user.rol.nombre : 'Sin Rol'
      }));
      setUsers(formattedUsers);
      
      // Filtramos para que el admin solo pueda crear Asesores o Estudiantes
      const filteredRoles = rolesResponse.data.filter(rol => rol.nombre === 'Asesor' || rol.nombre === 'Estudiante');
      setRoles(filteredRoles);

    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  if (isLoading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      {showModal && <CreateUserModal roles={roles} onClose={() => setShowModal(false)} onUserCreated={fetchUsersAndRoles} />}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
          Dar de Alta Usuario
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Administrador' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
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

export default GestionUsuarios;