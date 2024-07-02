// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';


import StadiaMap from '../components/StadiaMap.jsx';
import Scores from './Scores.jsx'; 
import Logs from './Logs.jsx';
import ProfilGamer from './ProfilGamer.jsx';
//import ProfilAdmin from './ProfilAdmin.jsx';
import Logout from './Logout.jsx';
import SpotifyButton from '../components/SpotifyButton.jsx';
import NbTrees from '../components/NbTrees.jsx';
import NbLeafs from '../components/NbLeafs.jsx';
import NbLocks from '../components/NbLocks.jsx';



const HomePage = ({ openModal, treeData, playerLogs, scoreData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const pseudo = Cookies.get('pseudo');
  const avatarUrl = Cookies.get('avatarUrl');

  const location = useLocation();
  const openProfilePopup = location.state?.openProfilePopup;
  const navigate = useNavigate();

  useEffect(() => {
    if (openProfilePopup) {
      setIsProfileModalOpen(true);
    }

    // Cleanup function
    return () => {
      if (openProfilePopup) {
        // Reset the state
        navigate('.', { state: { openProfilePopup: false } });
      }
    };
  }, [openProfilePopup, navigate]);


  return (
    <div>
      <div className='map-container'>
       <StadiaMap treeData={treeData} />
      </div>

      <div className='container'>
        <div className='header'>
          <div className='logo'>
            <img className='logo__img' src="../assets/img/logo.png" alt="Logo" />
          </div>

          <div className='nb-btn'>
            <NbTrees isAuthenticated={isAuthenticated} />
            <NbLeafs isAuthenticated={isAuthenticated} />
            <NbLocks isAuthenticated={isAuthenticated} />
          </div>

          {!pseudo ? (
            isMobile ? (
              <Link to="/login">Login</Link>
            ) : (
              <button className='login-btn' onClick={() => openModal('login')}>Login</button>
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
        </div>

      
        <div className='right'>
          <Scores score={scoreData} />
        </div>

      <div className='footer'>
        <Logs logs={playerLogs} />
        <SpotifyButton />
      </div>
    
      <ProfilGamer isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen} />
    </div>

    </div>
  );
};

export default HomePage;