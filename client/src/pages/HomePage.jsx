// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import StadiaMap from '../components/StadiaMap.jsx';


const HomePage = ({ openModal, treeData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
       <StadiaMap treeData={treeData} />
      <h1>Home Page</h1>
      {isMobile ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={() => openModal('login')}>Login</button>
      )}
    </div>
  );
};

export default HomePage;