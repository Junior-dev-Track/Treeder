// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


import StadiaMap from '../components/StadiaMap.jsx';
import Scores from './Scores.jsx'; 
import Logs from './Logs.jsx';
import ProfilGamer from './ProfilGamer.jsx';
import ProfilAdmin from './ProfilAdmin.jsx';


const HomePage = ({ openModal, treeData, playerLogs, scoreData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
      <div className='map-container'>
       <StadiaMap treeData={treeData} />
      </div>
      <h1>Home Page</h1>
      {isMobile ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={() => openModal('login')}>Login</button>
      )}
      <Scores score={scoreData} />
      <Logs logs={playerLogs} />
      <ProfilGamer />
      <ProfilAdmin />
    </div>
  );
};

export default HomePage;