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
        <form>
          <div className="forgot--form">
            <label className="forgot--label">
              Email
              <input type="email" name="email"/>
            </label>
          </div>

        {isMobile ? (
            <div className="register--btn">
              <Link className="secondary--btn" to="/login">Login</Link>
              <input className="primary--btn" type="submit" value="Reset"/>
            </div>
        ) : (
          <>
            <input className="primary--btn" type="submit" value="Reset"/>
            <div className="register-section">
              <p className='p-opacity'>You don’t have an account yet? </p>
              <button className="secondary--btn__small" onClick={() => {
                closeModal();
                openModal('login');
              }}>Login
              </button>
            </div>
          </>
        )}
      </form>

      </div>
    </div>
  );
};

export default ForgotPassword;