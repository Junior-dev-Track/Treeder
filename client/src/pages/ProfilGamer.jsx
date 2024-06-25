import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SettingsGamer from './SettingsGamer';

const ProfilGamer = ({ isOpen, setIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(1);
  const [playerData, setPlayerData] = useState(null); 

  const handleSkinSelect = (skinNumber) => {
    setSelectedSkin(skinNumber);
  };

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    fetch('/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPlayerData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false); setIsOpen(false);}}>
      {playerData && (
        <>
          <img src="/path/to/avatar.png" alt="Avatar" />
          <h2>Pseudo: {playerData.Pseudo}</h2>
          <p>Classement: {playerData.classement}</p>
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
        </>
      )}
        <SettingsGamer />
        <button onClick={() => {setModalIsOpen(false); setIsOpen(false);}}>Close</button>
      </Modal>
    </div>
  );
};

export default ProfilGamer;