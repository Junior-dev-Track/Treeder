import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import logoutIcon from '../assets/img/logout.png';
import closeIcon from '../assets/img/close.svg';


export const handleLogout = async (setIsAuthenticated, setModalIsOpen) => {
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

  const Logout = ({ setIsAuthenticated }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  

  return (
    <div>
      <button onClick={() => handleLogout(setIsAuthenticated, setModalIsOpen)}>
        <img src={logoutIcon} alt="Logout" style={{width: '18px', height: '32px', marginRight: '5px'}} />Logout
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>You're logged out</h2>
        <button onClick={() => setModalIsOpen(false)}>
        <img src={closeIcon} alt="Close" style={{width: '34px', height: '34px'}} />
        </button>
      </Modal>
    </div>
  );
};

export default Logout;