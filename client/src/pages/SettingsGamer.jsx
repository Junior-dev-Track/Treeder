import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

const SettingsGamer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [pseudo, setPseudo] = useState('Player1');
  const [email, setEmail] = useState('player1@example.com');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    fetch('/settings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      user: {
        Pseudo: Cookies.get('pseudo'),
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setSelectedAvatar(data.avatar);
      setPseudo(data.pseudo);
      setEmail(data.email);
    })
    .catch((error) => console.error(error));
  }, []);


  const handleAvatarSelect = (avatarNumber) => {
    setSelectedAvatar(avatarNumber);
  };


  const handleSave = () => {
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
      user: {
        Pseudo: Cookies.get('pseudo'),
      },
      body: JSON.stringify({
        avatar: selectedAvatar,
        pseudo: pseudo,
        email: email,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setModalIsOpen(false);
    })
    .catch((error) => console.error(error));
  };


  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Settings</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>Back</button>
        <h2>Settings</h2>
        <div>
          <h3>Choix de l'avatar:</h3>
          {[1, 2, 3, 4, 5].map((avatarNumber) => (
            <button
              key={avatarNumber}
              onClick={() => handleAvatarSelect(avatarNumber)}
              style={{ backgroundColor: selectedAvatar === avatarNumber ? 'blue' : 'grey' }}
            >
              Avatar {avatarNumber}
            </button>
          ))}
        </div>
        <div>
          <label>
            Pseudo:
            <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default SettingsGamer;