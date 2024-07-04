import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import settingsIcon from '../assets/img/settings.png';
import arrowIcon from '../assets/img/arrow-back.svg';
import CustomModal from '../components/CustomModal.jsx';
import * as refresh from '../utils/Refresh';


const SettingsGamer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const pseudo = Cookies.get('pseudo');
    const email = Cookies.get('mail');
    const avatar = Cookies.get('avatar');


    if (pseudo) {
      setPseudo(pseudo);
    }

    if (email) {
      setEmail(email);
    }

    if (avatar) {
      setSelectedAvatar(avatar);
    }
  }, []);


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
        user: {
          Pseudo: Cookies.get('pseudo'),
        },
        avatar: selectedAvatar,
        pseudo: pseudo,
        email: email,
        password: password,
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setModalIsOpen(false);
    })
    .catch((error) => console.error(error));
  };


  return (
    <div className="settings-page">
      <button onClick={() => setModalIsOpen(true)}>
        <img src={settingsIcon} alt="Settings" style={{width: '32px', height: '31px'}} /></button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>
          <img src={arrowIcon} alt="arrow back" style={{width: '24px', height: '24px'}}/>Back
        </button>
        <h2 className="settings--title">Settings</h2>
        <div className="settings-container">
          <div className="settings-avatar">
            <h3>Avatars</h3>
            {[1, 2, 3, 4, 5].map((avatarNumber) => (
                <button
                    key={avatarNumber}
                    onClick={() => handleAvatarSelect(avatarNumber)}
                    style={{backgroundColor: selectedAvatar === avatarNumber ? 'blue' : 'grey'}}
                >
                  Avatar {avatarNumber}
                </button>
            ))}
          </div>
          <div className="settings-reste">
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
        <div className="settings-buttons">
          <button className="primary--btn" onClick={handleSave}>Save</button>
          <button className="secondary--btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </CustomModal>
    </div>
  );
};

export default SettingsGamer;