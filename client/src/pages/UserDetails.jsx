import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { handleLogout as logout } from './Logout.jsx';
import logoutIcon from '../assets/img/logout.png';
import arrowIcon from '../assets/img/arrow-back.svg';

const UserDetails = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const IdUser = queryParams.get('IdUser');

  const [selectedSkin, setSelectedSkin] = useState(1);

  // Create states for user information
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [trees, setTrees] = useState('');
  const [leafs, setLeafs] = useState('');
  const [locks, setLocks] = useState('');
  const [skinTrees, setSkinTrees] = useState('');
  const [avatar, setSelectedAvatar] = useState('');

  const [logs, setLogs] = useState([]);
  const [logsDate, setLogsDate] = useState([]);
  const [logsCategory, setLogsCategory] = useState([]);


  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Token not found');
    return;
  }

  // Fetch user information when component mounts
  useEffect(() => {
    fetch(`/user?IdUser=${IdUser}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPseudo(data[0].Pseudo);
        setEmail(data[0].Mail);
        setTrees(data[0].NbTrees);
        setLeafs(data[0].Leafs);
        setLocks(data[0].Locks);
        setSkinTrees(data[0].SkinTrees);
        setSelectedAvatar(data[0].SkinPlayer);
        
        setLogs(data[0].LogMessages);
        setLogsDate(data[0].LogDate);
        setLogsCategory(data[0].LogCategories);

        console.log(data);
        

        //TODO : Set other states
        /*[
            {
              IdUsers: 1,
              Pseudo: 'Kriidfel',
              Mail: 'test@hotmail.com',
              Leafs: 10,
              SkinPlayer: null,
              SkinTrees: null,
              Admin: 1,
              NbTrees: 1,
              LastLogDate: 2024-06-13T13:48:16.000Z,
              NumberOfLogs: 1
            }
          ]*/

        // Set more states as needed...
      });
  }, [IdUser, token]);

  // Handle save button click
  const handleSave = () => {
    fetch(`/user?IdUser=${IdUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pseudo: pseudo,
        // Add more fields as needed...
      }),
    })
        .then(response => response.json());
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Reset states to initial user values
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfile = () => {
    navigate('/', { state: { openProfilePopup: true } });
  };

  const handleLogout = async () => {
    await logout(setIsAuthenticated, setModalIsOpen); 
    navigate('/');
  };

  const handleResetPassword = () => {
    // Add code to reset user password
  }

  const handleDeleteProfile = async () => {
  // Confirmez si l'utilisateur veut vraiment supprimer son profil
  const isConfirmed = window.confirm("Are you sure you want to delete this profile?");
  if (isConfirmed) {
    try {
      // Remplacez l'URL par l'endpoint approprié de votre API
      const response = await fetch('URL_DE_VOTRE_API_DE_SUPPRESSION', {
        method: 'DELETE',
        // Assurez-vous d'envoyer tout identifiant ou token nécessaire
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer VOTRE_TOKEN_ICI',
        },
        body: JSON.stringify({ userId: 'ID_UTILISATEUR' }),
      });

      if (response.ok) {
        // Gérez la suppression réussie ici, par exemple, en redirigeant l'utilisateur
        console.log("Profile deleted successfully");
        // Redirection ou mise à jour de l'état ici
      } else {
        // Gérez l'erreur ici
        console.error("Error while deleting profile");
      }
    } catch (error) {
      console.error("Error while deleting profile:", error);
    }
  }
};

const handleSkinSelect = (skinNumber) => {
  setSelectedSkin(skinNumber);
};

  

  return (

    <div className="adminuser--page">
        <div className='container'>
          <div className='header'>
            <button onClick={handleBack}>
              <div className='logo'>
                <img className='logo__img' src="../assets/img/logo.png" alt="Logo" />
              </div>
            </button>

            <button onClick={handleProfile}>Profil</button>
            <button onClick={() => handleLogout(setIsAuthenticated, setModalIsOpen)}>
              <img src={logoutIcon} alt="Logout" style={{width: '18px', height: '32px', marginRight: '5px'}} />Logout
            </button>
        </div>

        <button className="adminuser--back" onClick={handleBack}>
          <img src={arrowIcon} alt="arrow back" style={{width: '24px', height: '24px'}} />Back
        </button>

        <h1>Profil - {pseudo}</h1>
        <button onClick={handleDeleteProfile} className="delete-profile-btn">
          Delete
        </button>

        <img src={avatar} alt="Avatar" />

        <div className="settings-avatar">
          <div className='avatar'>
            <div className={`avatar--img ${avatar === 'rat.png' ? 'selected' : ''}`}>
              <img
                src="http://localhost:3000/public/avatars/rat.png"
                alt="Avatar rat"
                className="rat-avatar"
                onClick={() => setSelectedAvatar('rat.png')}
              />
            </div>
            <p style={{ fontWeight: avatar === 'rat.png' ? 'bold' : 'normal' }}>rat</p>
          </div>

          <div className='avatar'>
            <div className={`avatar--img ${avatar === 'cacaotes.png' ? 'selected' : ''}`}>
              <img
                src="http://localhost:3000/public/avatars/cacaotes.png"
                alt="Avatar cacaotes"
                className="cacaotes-avatar"
                onClick={() => setSelectedAvatar('cacaotes.png')}
              />
            </div>
            <p style={{ fontWeight: avatar === 'cacaotes.png' ? 'bold' : 'normal' }}>cacaotes</p>
          </div>

          <div className='avatar'>
            <div className={`avatar--img ${avatar === 'cat.png' ? 'selected' : ''}`}>
              <img
                src="http://localhost:3000/public/avatars/cat.png"
                alt="Avatar cat"
                className="cat-avatar"
                onClick={() => setSelectedAvatar('cat.png')}
              />
            </div>
            <p style={{ fontWeight: avatar === 'cat.png' ? 'bold' : 'normal' }}>cat</p>
          </div>

          <div className='avatar'>
            <div className={`avatar--img ${avatar === 'dog.png' ? 'selected' : ''}`}>
              <img
                src="http://localhost:3000/public/avatars/dog.png"
                alt="Avatar dog"
                className="dog-avatar"
                onClick={() => setSelectedAvatar('dog.png')}
              />
            </div>
            <p style={{ fontWeight: avatar === 'dog.png' ? 'bold' : 'normal' }}>dog</p>
          </div>

          <div className='avatar'>
            <div className={`avatar--img ${avatar === 'rabbit.png' ? 'selected' : ''}`}>
              <img
                src="http://localhost:3000/public/avatars/rabbit.png"
                alt="Avatar rabbit"
                className="rabbit-avatar"
                onClick={() => setSelectedAvatar('rabbit.png')}
              />
            </div>
            <p style={{ fontWeight: avatar === 'rabbit.png' ? 'bold' : 'normal' }}>rabbit</p>
          </div>
        </div>


        <p>Pseudo</p>
        <input type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} />

        <p>Email</p>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

        <p>Password</p>
        <button onClick={handleResetPassword}>Reset Password</button>

        <p>Trees</p>
        <input type="text" value={trees !== null && trees !== undefined ? trees.toString() : '0'} onChange={e => setTrees(e.target.value)} />

        <p>Leafs</p>
        <input type="text" value={leafs !== null && leafs !== undefined ? leafs.toString() : '0'} onChange={e => setLeafs(e.target.value)} />

        <p>Locks</p>
        <input type="text" value={locks !== null && locks !== undefined ? locks.toString() : '0'} onChange={e => setLocks(e.target.value)} />

        <div className='skins'>
          <p>Skin Trees</p> 

          <div className='skins--infos'>
            {[1, 2, 3, 4, 5].map((skinNumber) => (
              <button
                className='skin--btn'
                key={skinNumber}
                onClick={() => handleSkinSelect(skinNumber)}
                style={{ backgroundColor: selectedSkin === skinNumber ? 'blue' : 'grey' }}
              >
                Skin {skinNumber}
              </button>
            ))}
          </div>
        </div>     


        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>

        <h3>Logs</h3>


  
      </div>
    </div>
  );
}

export default UserDetails;