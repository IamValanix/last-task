import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Usuario {
    name: string;
    email: string;
    password: string;
    age: string;
    }

    const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Usuario>({ name: '', email: '', password: '', age: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('usuarios') || '[]');
        setUsuarios(data);
    }, []);

    const eliminarUsuario = (index: number) => {
        const nuevosUsuarios = [...usuarios];
        nuevosUsuarios.splice(index, 1);
        setUsuarios(nuevosUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    };

    const comenzarEdicion = (index: number) => {
        setEditIndex(index);
        setEditForm(usuarios[index]);
    };

    const guardarEdicion = () => {
        if (editIndex === null) return;
        const nuevosUsuarios = [...usuarios];
        nuevosUsuarios[editIndex] = editForm;
        setUsuarios(nuevosUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
        setEditIndex(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Panel de Administrador</h2>
        {usuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
        ) : (
            <table className="w-full border">
            <thead>
                <tr className="bg-gray-200">
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Correo</th>
                <th className="border p-2">Edad</th>
                <th className="border p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario, index) => (
                <tr key={index} className="border-t">
                    <td className="border p-2">
                    {editIndex === index ? (
                        <input
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="border p-1"
                        />
                    ) : (
                        usuario.name
                    )}
                    </td>
                    <td className="border p-2">
                    {editIndex === index ? (
                        <input
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="border p-1"
                        />
                    ) : (
                        usuario.email
                    )}
                    </td>
                    <td className="border p-2">
                    {editIndex === index ? (
                        <input
                        name="age"
                        value={editForm.age}
                        onChange={handleChange}
                        className="border p-1"
                        />
                    ) : (
                        usuario.age
                    )}
                    </td>
                    <td className="border p-2 flex gap-2">
                    {editIndex === index ? (
                        <button
                        onClick={guardarEdicion}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                        Guardar
                        </button>
                    ) : (
                        <>
                        <button
                            onClick={() => comenzarEdicion(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => eliminarUsuario(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Eliminar
                        </button>
                        </>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        <button
            onClick={() => navigate('/login')}
            className="mt-4 text-blue-600 underline"
        >
            Cerrar sesión
        </button>
        </div>
    );
};

export default AdminPanel;
