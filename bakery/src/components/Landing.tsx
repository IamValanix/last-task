import React from 'react'
import CatSelect from './catSelect';
import UserExist from './UserExist';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Landing() {
    console.log('Landing component rendered');
    return (
        <div>
            <header className="bg-orange-500 text-white p-4 flex items-center">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <h1 className="text-3xl font-bold">Busca usuario en base de datos</h1>
                    <UserExist />
                </div>
                <div className="ml-auto">
                    <img
                    src="src/assets/icon.png"
                    alt="Logo de la panadería"
                    className="w-16 h-16 object-contain"
                    />
                </div>
            </header>

            <CatSelect />
            <div className="w-full h-[400px] mt-10 flex justify-center shadow" >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.368512570336!2d-69.2935097!3d10.0688604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e87677c062760e9%3A0x98accb15969704b0!2sPanader%C3%ADa%20del%20Este!5e0!3m2!1ses-419!2sve!4v1750169942988!5m2!1ses-419!2sve"
                    className="w-[75%] h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>
    )
}
