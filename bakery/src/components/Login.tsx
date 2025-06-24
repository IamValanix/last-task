import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/bakery.jpeg';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            if (response.data.success) {
                alert('Login exitoso. Bienvenido ' + response.data.name);
                navigate('/landing'); // Redirige al componente Landing
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('❌ Error en login:', error);
            alert('Error al intentar iniciar sesión. Intenta nuevamente.');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-md font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-3 mb-3 text-center">
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            ¿No tienes cuenta? Regístrate
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
