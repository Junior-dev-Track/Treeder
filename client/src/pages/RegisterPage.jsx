import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../assets/img/close.svg';
import { fetchData } from '../network/fetch';

const RegisterPage = ({ openModal, closeModal }) => {
  const [step, setStep] = useState(1);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState ('');

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('rat.png');
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
      SkinPlayer: avatar,
  };


    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          const response = await fetchData('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( registerData ),
          });

          const data = await response.json();

          console.log(data)

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
            }
      } catch (error) {

          const response = await error.response.json()
        const status = error.status
        const message = response.message
        const type = response.type

        if (status === 400) {

          setErrorMessage(message)
          setErrorType(type)
        }

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
                  <div className="avatar--label">
                    Choose your avatar
                  </div>
                    <div className="avatars-container">
                      <div className='avatar'>
                      <div className={`avatar--img ${avatar === 'rat.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/rat.png"
                            alt="Avatar rat"
                            className="rat-avatar"
                            onClick={() => setAvatar('rat.png')}
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
                            onClick={() => setAvatar('cacaotes.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'cacaotes.png' ? 'bold' : 'normal' }}>cacaotes</p>
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
                  {errorType !== "" && errorMessage !== "" && (
                      <div className="error-message">
                        {errorMessage}
                      </div>
                  )}
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
                <div className="avatar--label">
                Choose your avatar
                </div>
                  <div className="avatars-container">
                      <div className='avatar'>
                        <div className={`avatar--img ${avatar === 'rat.png' ? 'selected' : ''}`}>
                          <img
                            src="http://localhost:3000/public/avatars/rat.png"
                            alt="Avatar rat"
                            className="rat-avatar"
                            onClick={() => setAvatar('rat.png')}
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
                            onClick={() => setAvatar('cacaotes.png')}
                          />
                        </div>
                        <p style={{ fontWeight: avatar === 'cacaotes.png' ? 'bold' : 'normal' }}>cacaotes</p>
                      </div>
                    </div>
                </label>
                <label className="register--label">
                  Username
                  <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  {errorType === "username" && errorMessage !== "" && (
                      <div className="error-message">
                        {errorMessage}
                      </div>
                  )}
                </label>
                <label className="register--label">
                  Email
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="register--label">
                  Password
                  <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {errorType === "password" && errorMessage !== "" && (
                      <div className="error-message">
                        {errorMessage}
                      </div>
                  )}
                </label>
                <label className="register--label">
                  Confirm Password
                  <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
              </div>
              {errorType === "global" && errorMessage !== "" && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
              )}
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