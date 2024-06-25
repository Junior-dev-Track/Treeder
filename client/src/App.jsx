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


const App = () => {
  const [trees, setTrees] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
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

    const fetchUsers = fetch('/user')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        //console.log(data);
        // Mettez à jour votre état avec les données des utilisateurs ici
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

  Promise.all([fetchTrees, fetchUsers, fetchLogs, fetchScore ])
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
      <Route path="/" element={Array.isArray(logs) ? <HomePage openModal={openModal} treeData={trees} playerLogs={logs} scoreData={score} /> : null} />
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