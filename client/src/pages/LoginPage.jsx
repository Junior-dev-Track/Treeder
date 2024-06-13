import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const LoginPage = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
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