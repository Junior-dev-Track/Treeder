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
      <button className='btn logout--btn' onClick={() => handleLogout(setIsAuthenticated, setModalIsOpen)}>
        <img className='logout-icon' src={logoutIcon} alt="Logout" />
        <span className='btn--text'>Logout</span>
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>
          <img className='close-icon' src={closeIcon} alt="Close" />
        </button>
        <h2>You're logged out</h2>
      </Modal>
    </div>
  );
};

export default Logout;