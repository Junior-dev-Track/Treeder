import React from 'react';
import nbLocksIcon from '../assets/img/nb-locks.png';

const nbLocks = 5; // Remplacez ceci par la constante réelle

const isLoggedIn = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant si un token d'utilisateur existe dans le localStorage
  return !!localStorage.getItem('token');
}

const NbLocks = () => {
  if (!isLoggedIn()) {
    return null;
  }

  return (
    <button className='lock-btn'>
      <img className='lockIcon' src={nbLocksIcon} alt="Lock Icon" />
      {nbLocks}
    </button>
  );
}

export default NbLocks;