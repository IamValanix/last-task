import React from 'react';
import PanList from './PanList';
import PostreList from './PostreList';
import BebidaList from './BebidasList'; 

const componentMap: Record<string, React.FC> = {
    Panes: PanList,
    Postres: PostreList,
    Bebidas: BebidaList,
};

export default componentMap;