import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const Logout = ({ setIsAuthenticated }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      user: {
        Pseudo: Cookies.get('pseudo'),
      }
    })

    if (response.ok) {
      localStorage.removeItem('token');
      Cookies.remove('pseudo');
      Cookies.remove('idUser');
      Cookies.remove('leafs');
      Cookies.remove('skintrees');
      Cookies.remove('skinplayer');
      Cookies.remove('avatarUrl');
      Cookies.remove('admin');
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