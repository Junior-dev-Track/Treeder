import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import SettingsGamer from './SettingsGamer';
import closeIcon from '../assets/img/close.svg';
import ProfilModal from '../components/ProfilModal.jsx';

import NbTrees from '../components/NbTrees.jsx';
import NbLeafs from '../components/NbLeafs.jsx';
import NbLocks from '../components/NbLocks.jsx';
import * as refresh from "../utils/Refresh";


const ProfilGamer = ({ isOpen, setIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(1);
  const [playerData, setPlayerData] = useState({});

  const avatarUrl = 'http://localhost:3000/public/avatars/' + Cookies.get('skinplayer');

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
        .then((response) => {
          if (response.status === 401) {
            //if the token is expired call a function to send the refresh token and get a new acces token
            console.log('Token expired');
            refresh.tokenExpired();
            return;
          }
          return response.json();
        })

    //.then((data) => console.log(data[0]))
    .then((data) => {
      setPlayerData(data[0]);
    })
    .catch((error) => console.error(error));
    }, [isOpen]);

  return (
    <div>
      <ProfilModal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false); setIsOpen(false);}}>
        <div className='profil-container'>
          <button className='close-btn' onClick={() => {setModalIsOpen(false); setIsOpen(false);}}>
            <img className='close-icon' src={closeIcon} alt="Close" />
          </button>

          <div className='profil'>
            <div className='profil--avatar__big'>
              <img className='general-avatar__big' src={avatarUrl} alt="Avatar" />
            </div>
            {playerData.Admin === 1 && <h1>Admin</h1>}
            <h2>{playerData.Pseudo}</h2>
          </div>

          <div className='profil--infos'>
            <NbTrees playerData={playerData.NbTrees} />
            <NbLeafs playerData={playerData.Leafs} />
            <NbLocks playerData={playerData.Locks} />
          </div>
      

        <div className='skins'>
            <h3>Skins</h3>

            <div className='skins--infos'>
              {[1, 2, 3, 4, 5].map((skinNumber) => (
                <button
                  className='skin--btn'
                  key={skinNumber}
                  onClick={() => handleSkinSelect(skinNumber)}
                  style={{ backgroundColor: selectedSkin === skinNumber ? 'blue' : 'grey' }}
                >
                  Skin {skinNumber}
                </button>
              ))}
            </div>
          </div>
          {playerData.Admin === 1 && <button onClick={() => window.location.href='/adminusers'}>Admin Users</button>}

          <div className='round--btn, settings--param'>
            <SettingsGamer />
          </div>
        </div>
      </ProfilModal>
    </div>
  );
};

export default ProfilGamer;