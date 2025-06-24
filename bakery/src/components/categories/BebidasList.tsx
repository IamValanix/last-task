import React from "react";

interface Bebida {
  nombre: string;
  precio: number;
  imagen: string; // URL de la imagen
}

const bebidas: Bebida[] = [
  {
    nombre: "Café",
    precio: 1,
    imagen: "src/assets/Cafe.jpg", // ← cambia esto por tu imagen
  },
  {
    nombre: "Té",
    precio: 1.5,
    imagen: "src/assets/te.jpeg",
  },
  {
    nombre: "Refresco",
    precio: 2.0 ,
    imagen: "src/assets/refresco.jpg",
  },
];

const BebidasList: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center w-full">
      {bebidas.map((bebida, index) => (
        <div
          key={index}
          className="w-75 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={bebida.imagen}
            alt={bebida.nombre}
            className="w-full h-32 object-cover"
          />
          <div className="p-3 text-center">
            <h3 className="text-lg font-semibold">{bebida.nombre}</h3>
            <p className="text-sm text-gray-600">${bebida.precio.toFixed(2)}</p>
            {/* Aquí puedes agregar el stock luego */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BebidasList;
