import React from "react";

interface Postre {
  nombre: string;
  precio: number;
  imagen: string; // URL de la imagen
}

const postres: Postre[] = [
    {
        nombre: "Pastel de chocolate",
        precio: 3.5,
        imagen: "src/assets/Pastel de chocolate.jpeg", 
    },
    {
        nombre: "Helado",
        precio: 2.0,
        imagen: "src/assets/helado.jpeg",
    },
    {
        nombre: "Marquesa",
        precio: 2.5,
        imagen: "src/assets/marquesa.jpg",
    },
]

const PostreList: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-6 p-4 justify-center w-full">
            {postres.map((postre, index) => (
                <div
                    key={index}
                    className="w-75 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                    <img
                        src={postre.imagen}
                        alt={postre.nombre}
                        className="w-full h-32 object-cover"
                    />
                    <div className="p-3 text-center">
                        <h3 className="text-lg font-semibold">{postre.nombre}</h3>
                        <p className="text-sm text-gray-600">${postre.precio.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default PostreList;