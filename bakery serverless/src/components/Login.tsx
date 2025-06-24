import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const user = usuarios.find((u: any) => u.email === email && u.password === password);

        if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/admin');
        } else {
        alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
            <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            />
            <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
            Iniciar sesión
            </button>
        </div>
        </div>
    );
};

export default Login;
