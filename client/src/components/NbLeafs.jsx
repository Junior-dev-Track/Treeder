import React from 'react';
import nbLeafsIcon from '../assets/img/nb-leafs.png';

const nbLeafs = 5; // Remplacez ceci par la constante réelle

const isLoggedIn = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant si un token d'utilisateur existe dans le localStorage
  return !!localStorage.getItem('token');
}

const NbLeafs = () => {
  if (!isLoggedIn()) {
    return null;
  }

  return (
    <button>
      <img src={nbLeafsIcon} alt="Leaf Icon" style={{width: '24px', height: '37px', marginRight: '5px'}} />
      {nbLeafs}
    </button>
  );
}

export default NbLeafs;