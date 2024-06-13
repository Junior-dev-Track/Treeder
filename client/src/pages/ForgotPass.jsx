import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const ForgotPassword = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
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
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ForgotPassword;