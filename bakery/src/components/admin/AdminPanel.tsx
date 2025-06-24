import React, { useState } from 'react';
import UsuariosAdmin from './UsuariosAdmin';
// En el futuro puedes importar más tabs: PostresAdmin, PanesAdmin, BebidasAdmin

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'usuarios' | 'postres' | 'panes' | 'bebidas'>('usuarios');

    const tabs: Array<'usuarios' | 'postres' | 'panes' | 'bebidas'> = ['usuarios', 'postres', 'panes', 'bebidas'];

    return (
    <div className="p-4">
        <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 capitalize ${
                activeTab === tab
                ? 'border-b-2 border-orange-500 font-bold text-orange-500'
                : 'text-gray-600 hover:text-orange-400'
            }`}
            >
            {tab}
            </button>
        ))}
        </div>

        {activeTab === 'usuarios' && <UsuariosAdmin />}
        {activeTab === 'postres' && <div>Gestión de Postres (pronto)</div>}
        {activeTab === 'panes' && <div>Gestión de Panes (pronto)</div>}
        {activeTab === 'bebidas' && <div>Gestión de Bebidas (pronto)</div>}
    </div>
    );
};

export default AdminPanel;
