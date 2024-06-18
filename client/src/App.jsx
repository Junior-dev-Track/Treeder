import React, { useState, useEffect, useContext } from 'react';
import './style/App.scss';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ForgotPassword from './pages/ForgotPass.jsx';

import MapContext from './components/MapContext.jsx';



const App = () => {
  const [data, setData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const map = useContext(MapContext);


  useEffect(() => {
    console.log(map);
    if (!map) {
      return;
    }
 
    setTimeout(() => {
      bounds = map.getBounds();
      ne = bounds.getNorthEast();
      sw = bounds.getSouthWest();
      console.log(ne, sw);
    
    fetch(`/trees?minLat=${sw.lat}&maxLat=${ne.lat}&minLon=${sw.lng}&maxLon=${ne.lng}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));

      map.on('moveend', () => {
        // Your code here...
      });
    }, 1000); 
  }, [map]);





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
        <Route path="/" element={<HomePage openModal={openModal} treeData={data} />} />
        {isMobile && (
          <>
            <Route path="/login" element={<LoginPage openModal={openModal} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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