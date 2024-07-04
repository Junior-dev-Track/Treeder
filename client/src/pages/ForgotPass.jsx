import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../assets/img/close.svg';

const ForgotPassword = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div className="forgot-page">
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

        <h1 className="forgot--title">Forgot Password</h1>
        <form className="forgot--form">
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <input className="primary--btn" type="submit" value="Reset" />
        </form>
        {isMobile ? (
          <Link className="secondary--btn" to="/login">Login</Link>
        ) : (
          <button onClick={() => { closeModal(); openModal('login'); }}>Login</button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;