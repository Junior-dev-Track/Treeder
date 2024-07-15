import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { handleLogout as logout } from './Logout.jsx';
import logoutIcon from '../assets/img/logout.png';
import arrowIcon from '../assets/img/arrow-back.svg';
import * as events from "node:events";

const UserDetails = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const IdUser = queryParams.get('IdUser');
  const avatarUrl = 'http://localhost:3000/public/avatars/';

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

  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState ('')




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
        
        setLogs(data[0].Logs);
        setFilteredLogs(data[0].Logs);

      });
  }, [IdUser, token]);

  // Handle save button click
  const handleSave = () => {
  // Construct the body with the updated user data
  const updatedUserData = JSON.stringify({
    Pseudo: pseudo,
    Mail: email,
    Leafs: leafs,
    Locks: locks,
    SkinTrees: skinTrees,
    SkinPlayer: avatar,
  });

  fetch(`/user/${IdUser}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: updatedUserData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
    return response.json();
  })
  .then(data => {
    console.log('User updated successfully:', data);
    // Here you can update the local state or redirect the user
      //navigate(-1);
      setSuccessMessage("User was successfully edited")
  })
  .catch(error => {
    console.error('Error updating user:', error);
      setErrorMessage("User could not be edited")
  });
};

  // Handle cancel button click
  const handleCancel = () => {
      navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
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


    const handleFilterSelect = (filter) => {
        let filteredLogs = [];
        if (filter === 'all') {
            filteredLogs = [...logs];
        }
        else {
            filteredLogs = logs.filter(log => log.LogCategory.includes(filter));
        }
        setFilteredLogs(filteredLogs);
        setSelectedFilter(filter);
    };

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    function getAvatarClass(avatarUrl) {
      if (!avatarUrl) {
        return 'general-avatar__big'; // Default class if avatarUrl is undefined or null
      }
      if (avatarUrl.includes('rat.png')) {
        return 'user-rat__big';
      } else if (avatarUrl.includes('cacaotes.png')) {
        return 'user-cacaotes__big';
      } else if (avatarUrl.includes('cat.png')) {
        return 'user-cat__big';
      } else if (avatarUrl.includes('dog.png')) {
        return 'user-dog__big';
      } else if (avatarUrl.includes('rabbit.png')) {
        return 'user-rabbit__big';
      } else {
        return 'general-avatar__big';
      }
    }



  return (
    <div className="adminuser--page">
        <div className='container'>
          <div className='header'>
            <button onClick={handleBack}>
              <div className='logo'>
                <img className='logo__img' src="../assets/img/logo.png" alt="Logo" />
              </div>
            </button>

            {/*<button onClick={handleProfile}>
              Profil
            </button>*/}

            <button className='btn logout--btn' onClick={() => handleLogout(setIsAuthenticated, setModalIsOpen)}>
              <img className='logout-icon' src={logoutIcon} alt="Logout" />
              <span className='btn--text'>Logout</span>
            </button>
          </div>

            <button className="adminuser--back" onClick={handleBack}>
              <img src={arrowIcon} alt="arrow back" style={{width: '24px', height: '24px'}} />Back
            </button>

            {errorMessage !== "" && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            {successMessage !== "" && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <div className="adminuser--topsection">
                <h1>Profil - {pseudo}</h1>
                <button onClick={handleDeleteProfile} className="delete--btn">
                  Ban
                </button>
            </div>


            <div className="profil--section">
                <div className="profil--section-left">
                    <div className="avatar-choose">

                        <div className="profil--avatar__big user--avatar__big">
                            <img className={getAvatarClass(avatarUrl + avatar)} src={avatarUrl + avatar} alt="Avatar"/>
                        </div>

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
                                <p style={{fontWeight: avatar === 'rat.png' ? 'bold' : 'normal'}}>rat</p>
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
                                <p style={{fontWeight: avatar === 'cacaotes.png' ? 'bold' : 'normal'}}>cacaotes</p>
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
                                <p style={{fontWeight: avatar === 'cat.png' ? 'bold' : 'normal'}}>cat</p>
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
                                <p style={{fontWeight: avatar === 'dog.png' ? 'bold' : 'normal'}}>dog</p>
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
                                <p style={{fontWeight: avatar === 'rabbit.png' ? 'bold' : 'normal'}}>rabbit</p>
                            </div>
                        </div>
                    </div>

                    <div className="adminuser--form__left">
                      <div className="adminuser--label">
                        <p>Pseudo</p>
                        <input type="text" value={pseudo} onChange={e => setPseudo(e.target.value)}/>
                      </div>

                      <div className="adminuser--label">
                        <p>Email</p>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                      </div>

                      <div className="adminuser--label">
                        <p>Password</p>
                      </div>
                    </div>
                        <button className="user-reset--btn" onClick={handleResetPassword}>Reset Password</button>
                </div>

                <div className="separation-bar"></div>

                <div className="profil--section-right">
                    <div className="adminuser--form__right">

                      <div className='adminuser--col'>
                        <div className="adminuser--label label-trees">
                          <p>Trees</p>
                          <p>{trees !== null && trees !== undefined ? trees.toString() : '0'}</p>
                        </div>

                        <div className="adminuser--label">
                          <p>Leafs</p>
                          <input type="text" value={leafs !== null && leafs !== undefined ? leafs.toString() : '0'} onChange={e => setLeafs(e.target.value)} />
                        </div>
                      </div>

                      <div className="adminuser--label">
                          <p>Locks</p>
                          <input type="text" value={locks !== null && locks !== undefined ? locks.toString() : '0'} onChange={e => setLocks(e.target.value)} />
                      </div>

                    <div className='skins'>
                      <p>Skins</p>

                      <div className='skins--infos'>

                        <div className='avatar' onClick={() => setSkinTrees('tree-own.png')}>
                          <div className={`skin--img  ${skinTrees === 'tree-own.png' ? 'selected' : ''}`}>
                            <img
                              src="http://localhost:3000/public/skins/tree.png"
                              alt="Avatar tree"
                              className="tree-avatar"
                            />

                          </div>
                          <p style={{ fontWeight: skinTrees === 'tree-own.png' ? 'bold' : 'normal' }}>Default</p>
                        </div>

                        <div className='avatar' onClick={() => setSkinTrees('tree-1-own.png')}>
                          <div className={`skin--img ${skinTrees === 'tree-1-own.png' ? 'selected' : ''}`}>
                            <img
                              src="http://localhost:3000/public/skins/tree-1.png"
                              alt="Avatar tree"
                              className="tree-1-avatar"
                            />
                          </div>
                          <p style={{ fontWeight: skinTrees === 'tree-1-own.png' ? 'bold' : 'normal' }}>Skin 1</p>
                        </div>

                        <div className='avatar' onClick={() => setSkinTrees('tree-2-own.png')}>
                          <div className={`skin--img ${skinTrees === 'tree-2-own.png' ? 'selected' : ''}`}>
                            <img
                              src="http://localhost:3000/public/skins/tree-2.png"
                              alt="Avatar tree"
                              className="tree-2-avatar"
                            />
                          </div>
                          <p style={{ fontWeight: skinTrees === 'tree-2-own.png' ? 'bold' : 'normal' }}>Skin 2</p>
                        </div>

                        <div className='avatar' onClick={() => setSkinTrees('tree-3-own.png')}>
                          <div className={`skin--img ${skinTrees === 'tree-3-own.png' ? 'selected' : ''}`}>
                            <img
                              src="http://localhost:3000/public/skins/tree-3.png"
                              alt="Avatar tree"
                              className="tree-3-avatar"
                            />
                          </div>
                          <p style={{ fontWeight: skinTrees === 'tree-3-own.png' ? 'bold' : 'normal' }}>Skin 3</p>
                        </div>

                        <div className='avatar' onClick={() => setSkinTrees('tree-5-own.png')}>
                          <div className={`skin--img ${skinTrees === 'tree-5-own.png' ? 'selected' : ''}`}>
                            <img
                              src="http://localhost:3000/public/skins/tree-5.png"
                              alt="Avatar tree"
                              className="tree-4-avatar"
                            />
                          </div>
                          <p style={{ fontWeight: skinTrees === 'tree-5-own.png' ? 'bold' : 'normal' }}>Shiny</p>
                        </div>
                      </div> 
                    </div>


                    <div className="adminuser--btn__right">
                        <button className="user-save--btn" onClick={handleSave}>Save</button>
                        <button className="adminuser-cancel--btn" onClick={handleCancel}>Cancel</button>
                    </div>
                  </div>

                </div>
            </div>


            <div className="logs-section">
              <h3>Logs</h3>

              <div className="log--el">
                <div className="log--el--center">
                  <div className="log-filters">
                    <button className={`filter--btn ${selectedFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterSelect('all')}>All</button>
                    <button className={`filter--btn ${selectedFilter === 'buy' ? 'active' : ''}`} onClick={() => handleFilterSelect('buy')}>Buy</button>
                    <button className={`filter--btn ${selectedFilter === 'wasPurchasedBy' ? 'active' : ''}`} onClick={() => handleFilterSelect('wasPurchasedBy')}>Purchase</button>
                    <button className={`filter--btn ${selectedFilter === 'lock' ? 'active' : ''}`} onClick={() => handleFilterSelect('lock')}>Lock</button>
                  </div>
                  <div className="log-entries">
                    {filteredLogs.map((log, index) => (
                      <div key={index} className="log-entry">
                        <span>{formatDate(log.LogDate)} </span>
                        <div className="log-entry-2">
                          <span className='bold'>{pseudo}</span>
                          <span>{log.LogMessage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
      </div>
    </div>
  );
}

export default UserDetails;