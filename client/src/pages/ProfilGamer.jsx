import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import SettingsGamer from './SettingsGamer';
import closeIcon from '../assets/img/close.svg';

const ProfilGamer = ({ isOpen, setIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(1);
  const [playerData, setPlayerData] = useState({});

  const handleSkinSelect = (skinNumber) => {
    setSelectedSkin(skinNumber);
  };

  useEffect(() => {
    setModalIsOpen(isOpen);

    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Token not found');
      return;
    }

    //console.log(token);
    
    fetch('/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      user: {
        Pseudo: Cookies.get('pseudo'),
      }
    })
    .then((response) => response.text())
    .then((text) => {
      //console.log(text); 
      return JSON.parse(text);
    })

    //.then((data) => console.log(data[0]))
    .then((data) => {
      setPlayerData(data[0]);
    })
    .catch((error) => console.error(error));
    }, [isOpen]);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false); setIsOpen(false);}}>
        <img src={playerData.Avatar} alt="Avatar" />
        {playerData.Admin === 1 && <h1>Admin</h1>}
        <h2>Pseudo: {playerData.Pseudo}</h2>
        <p>Nombre d'arbres: {playerData.NbTrees}</p>
        <p>Nombre de feuilles: {playerData.Leafs}</p>
        <p>Nombre de locks: {playerData.Locks}</p>
      <div>
          <h3>Skins:</h3>
          {[1, 2, 3, 4, 5].map((skinNumber) => (
            <button
              key={skinNumber}
              onClick={() => handleSkinSelect(skinNumber)}
              style={{ backgroundColor: selectedSkin === skinNumber ? 'blue' : 'grey' }}
            >
              Skin {skinNumber}
            </button>
          ))}
        </div>
        {playerData.Admin === 1 && <button onClick={() => window.location.href='/adminusers'}>Admin Users</button>}
        <SettingsGamer />
        <button onClick={() => {setModalIsOpen(false); setIsOpen(false);}}>
        <img src={closeIcon} alt="Close" style={{width: '34px', height: '34px'}} />
        </button>
      </Modal>
    </div>
  );
};

export default ProfilGamer;