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
        document.cookie = `nbtrees=${data.NbTrees}`;
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
    <div className="registerPage">
      <h1 className="registerh1">Register</h1>
      {isMobile ? (
        step === 1 ? (
          <div>
            <form onSubmit={handleSubmit}>
              <label className="avatarlabel">
                Choose your avatar
                <input type="file" name="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
              </label>
              <label className="usernamelabel">
                Username
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <button className="nextbutton" onClick={nextStep}>Next</button>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Password
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <label>
                Confirm Password
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </label>
              <button className="backbutton" onClick={prevStep}>Back</button>
              <input className="registerbutton" type="submit" value="Register" />
            </form>
            <Link className="loginbutton" to="/login">Login</Link>
            <button onClick={closeModal}>Close</button>
          </div>
        )
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
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
            <input  className="registerbutton" type="submit" value="Register" />
          </form>
          <button onClick={() => { closeModal(); openModal('login'); }}>Login</button>
          <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" style={{width: '34px', height: '34px'}} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;