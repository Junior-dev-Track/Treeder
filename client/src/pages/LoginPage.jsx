import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const LoginPage = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginData = {
    Pseudo: username,
    Password: password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( loginData ),
    });

    const data = await response.json();

    if (data.Token) {
      //récupérer data.Token et le mettre dans le local storage
      localStorage.setItem('token', data.Token);
      
      //récupérer data.User et le mettre dans cookies (pseudo, leafs, nbtrees, skintrees, skinplayer, admin)
      document.cookie = `pseudo=${data.Pseudo}`;
      document.cookie = `leafs=${data.Leafs}`;
      document.cookie = `nbtrees=${data.NbTrees}`;
      document.cookie = `skintrees=${data.SkinTrees}`;
      document.cookie = `skinplayer=${data.SkinPlayer}`;
      document.cookie = `admin=${data.Admin}`;

      //rediriger vers la page d'accueil
      window.location.href = '/';

    } else {
      console.log(data);
      //ajout pour utilisateur "pseudo or password incorrect"
      alert('Pseudo or password incorrect');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Login" />
      </form>
      {isMobile ? (
        <Link to="/forgot-password">Forgot Password?</Link>
      ) : (
        <button onClick={() => openModal('forgot-password')}>Forgot Password?</button>
      )}
      {isMobile ? (
        <Link to="/register">Register</Link>
      ) : (
        <button onClick={() => { closeModal(); openModal('register'); }}>Register</button>
      )}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default LoginPage;