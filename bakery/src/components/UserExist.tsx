import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserExist: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [exists, setExist] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheckUser = async () => {
        if (!username) return toast.warn("Por favor, ingresa un nombre de usuario.");

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/checkUser', { username });
            const exists = response.data.exists;
            setExist(exists);

            if (exists) {
                toast.success("Usuario encontrado");
            } else {
                toast.error("Usuario no encontrado");
            }
        } catch (error) {
            console.error('Error checking user:', error);
            toast.error("⚠️ Error al conectar con el servidor");
            setExist(false);
        } finally {
            setLoading(false);
        }
    };

    const displayName = username.length > 10 ? username.slice(0, 10) + '...' : username;

    return (
        <div className="flex flex-col items-start gap-3 bg-white rounded px-4 py-3 shadow text-black max-w-md">
            <div className="flex items-center gap-2 w-full">
                <input
                    type="text"
                    placeholder="Buscar usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none w-full"
                />
                <button
                    onClick={handleCheckUser}
                    disabled={loading}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                >
                    Verificar
                </button>

                {exists === true && <CheckCircle className="text-green-500" size={24} />}
                {exists === false && <XCircle className="text-red-500" size={24} />}
            </div>

            {username.length > 10 && (
                <span className="text-gray-500 text-sm">Buscando: {displayName}</span>
            )}

            {/* Contenedor de Toast */}
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
        </div>
    );
};

export default UserExist;
