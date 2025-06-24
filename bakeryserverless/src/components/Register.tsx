import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', age: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const age = parseInt(form.age, 10);
        if (isNaN(age) || age < 16) {
        alert('Debes tener al menos 16 años para registrarte');
        return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const emailExistente = usuarios.find((u: any) => u.email === form.email);

        if (emailExistente) {
        alert('El correo ya está registrado');
        return;
        }

        usuarios.push(form);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('✅ Registro exitoso');

        navigate('/login');
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input name="name" type="text" placeholder="Nombre" onChange={handleChange} required className="border p-2" />
            <input name="email" type="email" placeholder="Correo" onChange={handleChange} required className="border p-2" />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required className="border p-2" />
            <input name="age" type="number" placeholder="Edad" onChange={handleChange} required className="border p-2" />
            <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Registrarse
            </button>
        </form>
        </div>
    );
};

export default Register;
