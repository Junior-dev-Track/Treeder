import React from 'react';
import nbLocksIcon from '../assets/img/nb-locks.png';
import Cookies from "js-cookie";

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
    <button className='lock--btn profil-lock--btn'>
      <img className='lock-icon' src={nbLocksIcon} alt="Lock Icon" />
      {Cookies.get('locks')}
    </button>
  );
}

export default NbLocks;