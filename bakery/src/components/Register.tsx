import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import backgroundImage from '../assets/bakery.jpeg';


const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [age, setAge] = useState<number | ''>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof age === 'number' && age < 16) {
            alert('Debes tener al menos 16 años para registrarte.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                password,
                age,
                name
            });

            console.log('Respuesta del backend:', response.data);
            alert('Registro exitoso');

        } catch (error: any) {
            console.error('Error al registrar:', error);
            alert('Error al registrar usuario');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-3 sm:px-5"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-4 sm:p-6 w-full max-w-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-orange-500">Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block font-medium text-gray-700">Edad</label>
                        <input
                            type="number"
                            id="age"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">Correo electrónico</label>
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
                        <label htmlFor="password" className="block font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-3 mb-3 text-center">
                        <Link
                            to="/"
                            className="font-medium text-indigo-600 hover:text-indigo-500">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 text-sm"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
