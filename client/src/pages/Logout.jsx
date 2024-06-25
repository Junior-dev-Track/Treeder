import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const Logout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove('pseudo');
    Cookies.remove('avatarUrl');
    setModalIsOpen(true);
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