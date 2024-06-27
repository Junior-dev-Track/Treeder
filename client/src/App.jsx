import React, { useState, useEffect } from 'react';
import './style/App.scss';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ForgotPassword from './pages/ForgotPass.jsx';
import AdminUsers from './pages/AdminUser.jsx';
import UserDetails from './pages/UserDetails.jsx';
import ProfilGamer from './pages/ProfilGamer.jsx';


const App = () => {
  const [trees, setTrees] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [logs, setLogs] = useState([]);
  const [score, setScore] = useState([]);


  useEffect(() => {
    const fetchTrees = fetch(`/trees`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTrees(data);
      });


    const fetchLogs = fetch('/logsPlayer')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLogs(data);
      });

      const fetchScore = fetch('/score')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setScore(data);
      });

  Promise.all([fetchTrees, fetchLogs, fetchScore ])
    .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));
}, []);


  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  return (
    <Router>
      <Routes>
      <Route path="/" element={Array.isArray(logs) ? <HomePage openModal={openModal} treeData={trees} playerLogs={logs} scoreData={score} /> : null} isAuthenticated={isAuthenticated} />
        {isMobile && (
          <>
            <Route path="/login" element={<LoginPage openModal={openModal} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
        {!isMobile && (
          <>
            <Route path="/adminusers" element={<AdminUsers />} /> 
            <Route path="/userdetails/:userId" element={<UserDetails />} />
            <Route path="/profilgamer" element={<ProfilGamer />} />
          </>
        )}
      </Routes>
      {!isMobile && modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel={modalContent === 'login' ? 'Login Modal' : 'Register Modal'}
        >
          {modalContent === 'forgot-password' ? <ForgotPassword openModal={openModal} closeModal={closeModal} /> : (modalContent === 'login' ? <LoginPage openModal={openModal} closeModal={closeModal} /> : <RegisterPage openModal={openModal} closeModal={closeModal} />)}
        </Modal>
      )}
    </Router>
  );
};



export default App;