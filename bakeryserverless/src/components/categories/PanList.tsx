import React from "react"

interface Pan {
    nombre: string;
    precio: number;
    imagen: string;
}

const panes: Pan[] = [
    {
        nombre: "Pan de chocolate",
        precio: 5,
        imagen: "src/assets/panchocolate.jpeg",
    },
    {
        nombre: "Pan integral",
        precio: 4,
        imagen : "src/assets/pan integral.jpeg",
    },
    {
        nombre: "Pan de ajo",
        precio: 3,
        imagen: "src/assets/pan de ajo.jpeg",
    }
]
const PanList: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-6 p-4 justify-center w-full">
            {panes.map((pan, index) => (
                <div
                    key={index}
                    className="w-75 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                    <img
                        src={pan.imagen}
                        alt={pan.nombre}
                        className="w-full h-32 object-cover"
                    />
                    <div className="p-3 text-center">
                        <h3 className="text-lg font-semibold">{pan.nombre}</h3>
                        <p className="text-sm text-gray-600">${pan.precio.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default PanList;