import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const Logout = ({ setIsAuthenticated }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });

    if (response.ok) {
      localStorage.removeItem('token');
      Cookies.remove('pseudo');
      Cookies.remove('avatarUrl');
      setIsAuthenticated(false);
      setModalIsOpen(true);

    } else {
      console.error('Logout failed');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>You're logged out</h2>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Logout;