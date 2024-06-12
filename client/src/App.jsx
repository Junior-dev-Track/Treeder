import React, { useState, useEffect } from 'react';
import './style/App.scss';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';




const App = () => {
  const [data, setData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch('/exemple')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <div>
      <h1>Hello, World!</h1>
      <div>
        <button onClick={openModal}>Login</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
        >
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
        <button onClick={closeModal}>Close</button>
      </Modal>
      </div>
    </div>
  );
}

//Mettre les trucs dans home et laisser routes racines

export default App;