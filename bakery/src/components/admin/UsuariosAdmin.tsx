import { useEffect, useState } from 'react';
import axios from 'axios';

interface Usuario {
    user_id: number;
    name: string;
    email: string;
    age: number;
    role: string;
    created_at: string;
}

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ name: '', email: '', age: '' });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/usuarios');
            setUsuarios(response.data);
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            setError('No se pudieron cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const eliminarUsuario = async () => {
        if (!selectedId) return alert('Escribe un ID válido');
        try {
            await axios.delete(`http://localhost:5000/admin/usuarios/${selectedId}`);
            alert('Usuario eliminado');
            fetchUsuarios();
        } catch (err) {
            alert('Error al eliminar usuario');
            console.error(err);
        }
    };

    const editarUsuario = async () => {
    if (!selectedId) return alert('Escribe un ID válido');
    try {
        await axios.put(`http://localhost:5000/admin/usuarios/${selectedId}`, {
            name: editData.name,
            email: editData.email
        });
        alert('Usuario actualizado');
        fetchUsuarios();
    } catch (err) {
        alert('Error al editar usuario');
        console.error(err);
    }
};

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="usuarios-container">
            <h2>Lista de Usuarios</h2>
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Rol</th>
                        <th>Fecha de Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.user_id}>
                            <td>{usuario.user_id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.age}</td>
                            <td>{usuario.role}</td>
                            <td>{new Date(usuario.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="mt-5">Acciones sobre Usuario</h3>
            <input
                type="number"
                placeholder="ID del usuario"
                value={selectedId ?? ''}
                onChange={(e) => setSelectedId(Number(e.target.value))}
            />
            <div className="flex gap-6 mt-4">
                <button
                    onClick={eliminarUsuario}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    🗑️ Eliminar
                </button>
                <button
                    onClick={editarUsuario}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    ✏️ Editar
                </button>
            </div>


            <div className="mt-4">
                <h4>Editar datos</h4>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
            </div>
        </div>
    );
};

export default UsuariosAdmin;
