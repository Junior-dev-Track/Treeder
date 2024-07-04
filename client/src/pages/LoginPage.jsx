import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../assets/img/close.svg';

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

      //récupérer data.User et le mettre dans cookies (idUser, pseudo, leafs, nbtrees, skintrees, skinplayer, admin)
      document.cookie = `idUser=${data.IdUsers}`;
      document.cookie = `pseudo=${data.Pseudo}`;
      document.cookie = `mail=${data.Mail}`;
      document.cookie = `leafs=${data.Leafs}`;
      document.cookie = `locks=${data.Locks}`;
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
    <div className="login-page">
      <div className='login-container'>
      <button className='close-btn' onClick={() => {
        if (isMobile) {
          window.location.href = '/';
        } else {
          closeModal();
        }
      }}>
          <img className='close-icon' src={closeIcon} alt="Close" />
        </button>
        
        <h1 className="login--title">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="login--label">
            Username
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="login--label">
            Password
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {isMobile ? (
            <>
            <Link className="forget--btn" to="/forgot-password">Forgot Password?</Link>
            <div className="btn-container-mobile">
              <input className="primary--btn" type="submit" value="Login" />
              <Link className="secondary--btn" to="/register">Register</Link>
            </div>
          </>
          ) : (
            <>
              <button className="forget--btn" onClick={() => openModal('forgot-password')}>Forgot Password?</button>
              <input className="primary--btn" type="submit" value="Login" />
              <div className="register-section">
              <p className='p-opacity'>You don’t have an account yet? </p>
              <button className="secondary--btn secondary--btn__small" onClick={() => {
                closeModal();
                openModal('register');
              }}>Register
              </button>
            </div>
            </>
          )}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;