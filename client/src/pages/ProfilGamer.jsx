import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import SettingsGamer from './SettingsGamer';
import closeIcon from '../assets/img/close.svg';
import userIcon from '../assets/img/user.png';
import ProfilModal from '../components/ProfilModal.jsx';

import NbTrees from '../components/NbTrees.jsx';
import NbLeafs from '../components/NbLeafs.jsx';
import NbLocks from '../components/NbLocks.jsx';
import * as refresh from "../utils/Refresh";


const ProfilGamer = ({ isOpen, setIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [skin, setSelectedSkin] = useState(Cookies.get('skintrees'));
  const [playerData, setPlayerData] = useState({});

  const avatarUrl = 'http://localhost:3000/public/avatars/' + Cookies.get('skinplayer');
  
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


    function getAvatarClass(avatarUrl) {
      if (!avatarUrl) {
        return 'general-avatar__big'; // Default class if avatarUrl is undefined or null
      }
      if (avatarUrl.includes('rat.png')) {
        return 'avatar-rat__big';
      } else if (avatarUrl.includes('cacaotes.png')) {
        return 'avatar-cacaotes__big';
      } else if (avatarUrl.includes('cat.png')) {
        return 'avatar-cat__big';
      } else if (avatarUrl.includes('dog.png')) {
        return 'avatar-dog__big';
      } else if (avatarUrl.includes('rabbit.png')) {
        return 'avatar-rabbit__big';
      } else {
        return 'general-avatar__big';
      }
    }


  function setSkin(skinName) {
    setSelectedSkin(skinName);

    fetch('/setskin', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({IdUsers: Cookies.get("idUser") , SkinTrees: skinName }),
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
        .then(() => {
            Cookies.set('skintrees', skinName);
        })
    }

  return (
    <div>
      <ProfilModal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false); setIsOpen(false);}}>
        <div className='profil-container'>
          <button className='close-btn' onClick={() => {setModalIsOpen(false); setIsOpen(false);}}>
            <img className='close-icon' src={closeIcon} alt="Close" />
          </button>

          <div className='profil'>
            <div className='profil--avatar__big'>
              <img className={getAvatarClass(avatarUrl)} src={avatarUrl} alt="Avatar" />
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
            <div className='avatar'>
              <div className={`skin--img  ${skin === 'tree-own.png' ? 'selected' : ''}`}>
                <img
                  src="http://localhost:3000/public/skins/tree.png"
                  alt="Avatar tree"
                  className="tree-avatar"
                  onClick={() => setSkin('tree-own.png')}
                />
              </div>
              <p style={{ fontWeight: skin === 'tree-own.png' ? 'bold' : 'normal' }}>Default</p>
            </div>

            <div className='avatar'>
              <div className={`skin--img ${skin === 'tree-1-own.png' ? 'selected' : ''}`}>
                <img
                  src="http://localhost:3000/public/skins/tree-1.png"
                  alt="Avatar tree"
                  className="tree-1-avatar"
                  onClick={() => setSkin('tree-1-own.png')}
                />
              </div>
              <p style={{ fontWeight: skin === 'tree-1-own.png' ? 'bold' : 'normal' }}>Skin 1</p>
            </div>

            <div className='avatar'>
              <div className={`skin--img ${skin === 'tree-2-own.png' ? 'selected' : ''}`}>
                <img
                  src="http://localhost:3000/public/skins/tree-2.png"
                  alt="Avatar tree"
                  className="tree-2-avatar"
                  onClick={() => setSkin('tree-2-own.png')}
                />
              </div>
              <p style={{ fontWeight: skin === 'tree-2.png' ? 'bold' : 'normal' }}>Skin 2</p>
            </div>

            <div className='avatar'>
              <div className={`skin--img ${skin === 'tree-3-own.png' ? 'selected' : ''}`}>
                <img
                  src="http://localhost:3000/public/skins/tree-3.png"
                  alt="Avatar tree"
                  className="tree-3-avatar"
                  onClick={() => setSkin('tree-3-own.png')}
                />
              </div>
              <p style={{ fontWeight: skin === 'tree-3-own.png' ? 'bold' : 'normal' }}>Skin 3</p>
            </div>

            <div className='avatar'>
              <div className={`skin--img ${skin === 'tree-5-own.png' ? 'selected' : ''}`}>
                <img
                  src="http://localhost:3000/public/skins/tree-5.png"
                  alt="Avatar tree"
                  className="tree-4-avatar"
                  onClick={() => setSkin('tree-5-own.png')}
                />
              </div>
              <p style={{ fontWeight: skin === 'tree-5-own.png' ? 'bold' : 'normal' }}>Shiny</p>
            </div>


            </div>
          </div>

          <div className='settings--param'>
              {playerData.Admin === 1 && (
                <div className='round--btn admin--btn'>
                  <button className='admin-users--btn' onClick={() => window.location.href='/adminusers'}>
                    <img className='admin-users-icon' src={userIcon} alt="Users Admin" />
                  </button>
                </div>
              )}

            <div className='round--btn'>
              <SettingsGamer />
            </div>
          </div>

        </div>
      </ProfilModal>
    </div>
  );
};

export default ProfilGamer;