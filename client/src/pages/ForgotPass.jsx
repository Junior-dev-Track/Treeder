import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../assets/img/close.svg';

const ForgotPassword = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
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

        <h1>Forgot Password</h1>
        <form>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <input type="submit" value="Reset Password" />
        </form>
        {isMobile ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={() => { closeModal(); openModal('login'); }}>Login</button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;