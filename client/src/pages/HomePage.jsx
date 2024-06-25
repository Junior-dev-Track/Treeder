// HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';

import StadiaMap from '../components/StadiaMap.jsx';
import Scores from './Scores.jsx'; 
import Logs from './Logs.jsx';
import ProfilGamer from './ProfilGamer.jsx';
import ProfilAdmin from './ProfilAdmin.jsx';
import Logout from './Logout.jsx';


const HomePage = ({ openModal, treeData, playerLogs, scoreData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const pseudo = Cookies.get('pseudo');
  const avatarUrl = Cookies.get('avatarUrl');


  return (
    <div>
      <div className='map-container'>
       <StadiaMap treeData={treeData} />
      </div>
      <h1>Home Page</h1>
      {!pseudo ? (
        isMobile ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={() => openModal('login')}>Login</button>
        )
      ) : (
        <>
          <button onClick={() => setIsProfileModalOpen(true)}>
            <img src={avatarUrl} alt="Avatar" />
            {pseudo}
          </button>
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </>
      )}
      <Scores score={scoreData} />
      <Logs logs={playerLogs} />
    
      <ProfilGamer isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen} />
      <ProfilAdmin />
    </div>
  );
};

export default HomePage;