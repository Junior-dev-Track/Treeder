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
              <form onSubmit={handleSubmit} className='register--form'>
                <div className="login--form">
                  <label className="register--label">
                    Choose your avatar
                    <div className="avatars-container">
                      <div className='avatar'>
                        <img
                          src="http://localhost:3000/public/avatars/rat.png"
                          alt="Avatar rat"
                          className={`avatar ${avatar === 'rat.png' ? 'selected' : ''}`}
                          onClick={() => setAvatar('rat.png')}
                        />
                        <p>rat</p>
                      </div>

                      <div className='avatar'>
                        <img
                          src="http://localhost:3000/public/avatars/cacaotes.png"
                          alt="Avatar cacaotes"
                          className={`avatar ${avatar === 'cacaotes.png' ? 'selected' : ''}`}
                          onClick={() => setAvatar('cacaotes.png')}
                        />
                        <p>cacaotes</p>
                      </div>
                    </div>
                  </label>
                  <label className="register--label">
                    Username
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </label>
                </div>

                <div className="register--btn">
                  <Link className="secondary--btn" to="/login">Login</Link>
                  <button className="primary--btn" onClick={nextStep}>Next</button>
                </div>
              </form>
            </div>
          ) : (

            <div>
              <form onSubmit={handleSubmit} className='register--form'>
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

                <div className="register--btn">
                  <Link className="secondary--btn" to="/login">Login</Link>
                  <div className="nav--btn">
                    <button className="secondary--btn" onClick={prevStep}>Back</button>
                    <input className="primary--btn" type="submit" value="Register" />
                  </div>
                </div>

              </form>
            </div>
          )
        ) : (

          <div>
            <form onSubmit={handleSubmit}>
              <div className="login--form">
                <label className="register--label">
                Choose your avatar
                  <div className="avatars-container">
                      <div className='avatar'>
                        <img
                          src="http://localhost:3000/public/avatars/rat.png"
                          alt="Avatar rat"
                          className={`avatar ${avatar === 'rat.png' ? 'selected' : ''}`}
                          onClick={() => setAvatar('rat.png')}
                        />
                        <p>rat</p>
                      </div>

                      <div className='avatar'>
                        <img
                          src="http://localhost:3000/public/avatars/cacaotes.png"
                          alt="Avatar cacaotes"
                          className={`avatar ${avatar === 'cacaotes.png' ? 'selected' : ''}`}
                          onClick={() => setAvatar('cacaotes.png')}
                        />
                        <p>cacaotes</p>
                      </div>
                    </div>
                </label>
                <label className="register--label">
                  Username:
                  <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="register--label">
                  Email:
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="register--label">
                  Password:
                  <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="register--label">
                  Confirm Password:
                  <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
              </div>
              <input  className="primary--btn" type="submit" value="Register" />

              <div className="register-section">
                <p className='p-opacity'>You already have an account? </p>
                <button className="secondary--btn__small" onClick={() => { closeModal(); openModal('login'); }}>Login</button>
              </div>
            </form>

          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;