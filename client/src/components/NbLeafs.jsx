import React, { useState, useEffect } from 'react';
import nbLeafsIcon from '../assets/img/nb-leafs.png';
import Cookies from 'js-cookie';
import * as refresh from "../utils/Refresh";

const isLoggedIn = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant si un token d'utilisateur existe dans le localStorage
  return !!localStorage.getItem('token');
}

const NbLeafs = () => {
  const [nbLeafs, setNbLeafs] = useState(0);

  const fetchNbLeafs = () => {
    if (isLoggedIn()) {
      fetch('/userLeafs', {
      method:'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
      
    })
          .then((response) => {
            if (response.status === 401) {
              //if the token is expired call a function to send the refresh token and get a new acces token
              console.log('Token expired');
                refresh.tokenExpired().then(() => {
                    // After refreshing the token, retry the fetchNbLeafs function
                    fetchNbLeafs();
                });
              return;
            }
            return response.json();
          })
        .then(data => {
          setNbLeafs(data[0].NbLeafs);
          Cookies.set('nbLeafs', data[0].NbLeafs);
          
        });
    }
  };

  useEffect(() => {
    fetchNbLeafs(); 
    const intervalId = setInterval(fetchNbLeafs, 15 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  if (!isLoggedIn()) {
    return null;
  }


  return (
    <button className='leaf--btn profil-leaf--btn'>
      <img className='leaf-icon' src={nbLeafsIcon} alt="Leaf Icon" />
      {Cookies.get('leafs')}
    </button>
  );
}

export default NbLeafs;