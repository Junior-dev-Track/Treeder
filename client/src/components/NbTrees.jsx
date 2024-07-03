import React, { useState, useEffect } from 'react';
import nbTreesIcon from '../assets/img/nb-trees.png';
import Cookies from 'js-cookie';


const isLoggedIn = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant si un token d'utilisateur existe dans le localStorage
  return !!localStorage.getItem('token');
}


const NbTrees = () => {
  const [nbTrees, setNbTrees] = useState(0);

  const fetchNbTrees = () => {
    if (isLoggedIn()) {
      fetch('/userTrees', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          //console.log("NbTrees: ", data[0].NbTrees);
          setNbTrees(data[0].NbTrees);
          Cookies.set('nbTrees', data[0].NbTrees);
          
        });
    }
  };

  useEffect(() => {
    fetchNbTrees(); 
    const intervalId = setInterval(fetchNbTrees, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <button className='tree--btn'>
      <img className='tree-icon' src={nbTreesIcon} alt="Tree Icon" />
      {nbTrees}
    </button>
  );
}

export default NbTrees;