import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../assets/img/close.svg';

const RegisterPage = ({ openModal, closeModal }) => {
  const [step, setStep] = useState(1);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const registerData = {
      Pseudo: username,
      Password: password,
      Mail: email,
      //Avatar: avatar,
  };


    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( registerData ),
      });
  
      const data = await response.json();
  
      if (data.Token) {
        //récupérer data.Token et le mettre dans le local storage
        localStorage.setItem('token', data.Token);
  
        //récupérer data.User et le mettre dans cookies (idUser, pseudo, leafs, nbtrees, skintrees, skinplayer, admin)
        document.cookie = `idUser=${data.IdUsers}`;
        document.cookie = `pseudo=${data.Pseudo}`;
        document.cookie = `leafs=${data.Leafs}`;
        document.cookie = `locks=${data.Locks}`;
        document.cookie = `skintrees=${data.SkinTrees}`;
        document.cookie = `skinplayer=${data.SkinPlayer}`;
        document.cookie = `admin=${data.Admin}`;
  
        //rediriger vers la page d'accueil
        window.location.href = '/';
  
      } else {
        console.log(data);
        //Erreur
        alert('Error');
      }
    };

  return (
    <div className="register-page">
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

        <h1 className="register--title">Register</h1>

        {isMobile ? (
          step === 1 ? (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="login--form">
                  <label className="register--label">
                    Choose your avatar
                    <input type="file" name="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                  </label>
                  <label className="register--label">
                    Username
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </label>
                </div>
                <button className="primary--btn" onClick={nextStep}>Next</button>
              </form>
            </div>
          ) : (

            <div>
              <form onSubmit={handleSubmit}>
                <div className="login--form">
                  <label className='register--label'>
                    Email
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label className='register--label'>
                    Password
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <label className='register--label'>
                    Confirm Password
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </label>
                </div>

                <div className="mobile-btn">
                  <button className="secondary--btn" onClick={prevStep}>Back</button>
                  <input className="primary--btn" type="submit" value="Register" />
                </div>
              </form>
              <Link className="secondary--btn" to="/login">Login</Link>
            </div>
          )
        ) : (

          <div>
            <form onSubmit={handleSubmit}>
              <div className="login--form">
                <label>
                  Avatar:
                  <input type="file" name="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                </label>
                <label>
                  Username:
                  <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  Password:
                  <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                  Confirm Password:
                  <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
              </div>
              <input  className="registerbutton" type="submit" value="Register" />
            </form>
            <button onClick={() => { closeModal(); openModal('login'); }}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;