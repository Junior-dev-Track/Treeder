import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import settingsIcon from '../assets/img/settings.png';
import arrowIcon from '../assets/img/arrow-back.svg';
import ProfilModal from '../components/ProfilModal.jsx';
import * as refresh from '../utils/Refresh';

import closeIcon from '../assets/img/close.svg';


const SettingsGamer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [avatar, setSelectedAvatar] = useState(Cookies.get('skinplayer'));
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const pseudo = Cookies.get('pseudo');
    const email = Cookies.get('mail');

    Cookies.set('skinplayer', avatar);




    if (pseudo) {
      setPseudo(pseudo);
      Cookies.set('pseudo', pseudo);
    }

    if (email) {
      setEmail(email);
      Cookies.set('mail', email);
    }

    if (avatar) {
      setSelectedAvatar(avatar);
    }
  }, [avatar]);


  const handleSave = () => {
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    fetch('/settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IdUsers: Cookies.get('idUser'),
        Pseudo: pseudo,
        Password: password,
        Mail: email,
        SkinPlayer: avatar,
      }),
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
    .then((data) => {
      console.log(data);
      setModalIsOpen(false);
    })
    .catch((error) => console.error(error));
  };


  return (
    <div>
      <button className='round--btn' onClick={() => setModalIsOpen(true)}>
        <img className='settings-icon' src={settingsIcon} alt="Settings" />
      </button>

      <ProfilModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} >
        <div className="settings-page">
          <div className='settings-container'>
            <button className='close-btn' onClick={() => setModalIsOpen(false)}>
              <img className='close-icon' src={closeIcon} alt="Close" />
            </button>

            <div className="settings--header">
              <button className="settings--btn-back" onClick={() => setModalIsOpen(false)}>
                <img className='arrow-icon' src={arrowIcon} alt="arrow back"/>Back
              </button>

              <h2 className="settings--title">Settings</h2>
            </div>

            <div className="settings-infos-container">
              <div className="settings-container-avatar">
                <h3 className='avatar--title__small'>Avatars</h3>
                <div className="settings-avatar">
                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'rat.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/rat.png"
                            alt="Avatar rat"
                            className="rat-avatar"
                            onClick={() => setSelectedAvatar('rat.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'rat.png' ? 'bold' : 'normal' }}>rat</p>
                      </div>

                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'cacaotes.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/cacaotes.png"
                            alt="Avatar cacaotes"
                            className="cacaotes-avatar"
                            onClick={() => setSelectedAvatar('cacaotes.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'cacaotes.png' ? 'bold' : 'normal' }}>cacaotes</p>
                      </div>

                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'cat.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/cat.png"
                            alt="Avatar cat"
                            className="cat-avatar"
                            onClick={() => setSelectedAvatar('cat.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'cat.png' ? 'bold' : 'normal' }}>cat</p>
                      </div>

                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'dog.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/dog.png"
                            alt="Avatar dog"
                            className="dog-avatar"
                            onClick={() => setSelectedAvatar('dog.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'dog.png' ? 'bold' : 'normal' }}>dog</p>
                      </div>

                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'rabbit.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/rabbit.png"
                            alt="Avatar rabbit"
                            className="rabbit-avatar"
                            onClick={() => setSelectedAvatar('rabbit.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'rabbit.png' ? 'bold' : 'normal' }}>rabbit</p>
                      </div>

                    </div>
              </div>
              <div className="settings-container-label">
                <div>
                  <label className="settings--label">
                    Pseudo
                    <input value={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label className="settings--label">
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label className="settings--label">
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label className="settings--label">
                    Confirm Password
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings--btn">
              <button className="primary--btn settings-primary--btn" onClick={handleSave}>Save</button>
              <button className="secondary--btn settings-secondary--btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>

      </ProfilModal>
    </div>
  );
};

export default SettingsGamer;