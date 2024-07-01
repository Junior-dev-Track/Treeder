import React, { useState, useEffect } from 'react';
import nbTreesIcon from '../assets/img/nb-trees.png';

const nbTrees = 5; // Remplacez ceci par la constante réelle

const isLoggedIn = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant si un token d'utilisateur existe dans le localStorage
  return !!localStorage.getItem('token');
}

const NbTrees = () => {
  const [nbTrees, setNbTrees] = useState(0);

  useEffect(() => {
    if (isLoggedIn()) {
      fetch('/user')
        .then(response => response.json())
        .then(data => {
          console.log(data); // Ajoutez cette ligne
          const user = data.find(user => user.IdUsers === 1);
          if (user) {
            setNbTrees(user.NbTrees);
          }
        });
    }
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <button>
      <img src={nbTreesIcon} alt="Tree Icon" style={{width: '26px', height: '32px', marginRight: '5px'}} />
      {nbTrees}
    </button>
  );
}

export default NbTrees;