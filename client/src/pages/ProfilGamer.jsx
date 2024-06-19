import React, { useState } from 'react';
import Modal from 'react-modal';
import SettingsGamer from './SettingsGamer';

const ProfilGamer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(1);

  const handleSkinSelect = (skinNumber) => {
    setSelectedSkin(skinNumber);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Profil Gamer</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <img src="/path/to/avatar.png" alt="Avatar" />
        <h2>Pseudo: Player1</h2>
        <p>Classement: 1</p>
        <p>Nombre d'arbres: 10</p>
        <p>Nombre de feuilles: 100</p>
        <p>Nombre de locks: 5</p>
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
        <SettingsGamer />
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ProfilGamer;