import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleLogout as logout } from './Logout.jsx';
import { Link } from 'react-router-dom';
import logoutIcon from '../assets/img/logout.png';
import arrowIcon from '../assets/img/arrow-back.svg';
import viewIcon from '../assets/img/view.svg';
import editIcon from '../assets/img/edit.svg';

const avatarUrl = 'http://localhost:3000/public/avatars/'
const token = localStorage.getItem('token');
if (!token) {
  console.log('Token not found');
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    fetch('/alluser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      user: {
        Pseudo: Cookies.get('pseudo'),
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => console.error(error));
  }, []);


  const [editingUser, setEditingUser] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [editingField, setEditingField] = useState(null);

  //console.log(users);
  const handleEditUser = (userId) => {
    const user = users.find((user) => user.IdUsers === userId);
    setEditingUser(userId);
    setEditedValues({ Pseudo: user.Pseudo, Mail: user.Mail });
  };

  const handleInputChange = (event) => {
    setEditedValues({ ...editedValues, [event.target.name]: event.target.value });
  };

const handleSaveEdit = (userId) => {
  fetch(`/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedValues),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((updatedUser) => {
      // Update the local state with the new data
      setUsers(users.map((user) => {
        if (user.IdUsers === userId) {
          // Spread the existing user info and overwrite with updatedUser info
          // Ensure updatedUser contains all the fields you want to update
          return { ...user, ...updatedUser };
        }
        return user;
      }));
      setEditingUser(null);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};


  const handleResetPassword = (userId) => {
    // Ajoutez ici le code pour réinitialiser le mot de passe de l'utilisateur
  };

  const handleViewUser = (userId) => {
    navigate(`/user?IdUser=${userId}`);
  };
  
  const handleBack = () => {
    navigate('/', { state: { openAdminProfile: true } });
  };


  /*const handleProfile = () => {
    navigate('/', { state: { openProfilePopup: true } });
  };*/

  const handleLogout = async () => {
    await logout(setIsAuthenticated, setModalIsOpen); // Appelle la fonction logout
    navigate('/'); // Redirige vers la page d'accueil
  };


  function getAvatarClass(avatarUrl) {
    if (!avatarUrl) {
      return 'general-avatar';
    }
    if (avatarUrl.includes('rat.png')) {
      return 'avatar-rat__small';
    } else if (avatarUrl.includes('cacaotes.png')) {
      return 'avatar-cacaotes__small';
    } else if (avatarUrl.includes('cat.png')) {
      return 'avatar-cat__small';
    } else if (avatarUrl.includes('dog.png')) {
      return 'avatar-dog__small';
    } else if (avatarUrl.includes('rabbit.png')) {
      return 'avatar-rabbit__small';
    } else {
      return 'general-avatar';
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

      <h2 className="adminuser--title">Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th">ID</th>
            <th className="th">Avatar</th>
            <th className="th">Pseudo</th>
            <th className="th">Email</th>
            <th className="th">Password</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.IdUsers}>
            <td className="td">{user.IdUsers}</td>
            <td className="td">
              <div className='profil--avatar__small'>
                <img className={getAvatarClass(avatarUrl + user.SkinPlayer)} src={avatarUrl + user.SkinPlayer} alt="Avatar" />
              </div>
            </td>
            <td className="td" onClick={() => {
              setEditingUser(user.IdUsers);
              setEditingField('Pseudo');
              setEditedValues({Pseudo: user.Pseudo, Mail: user.Mail});
            }}>
              {editingUser === user.IdUsers && (editingField === 'Pseudo' || editingField === null) ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit(user.IdUsers);
                }}>
                  <input className="adminuser--editinginput"
                    type="text"
                    name="Pseudo"
                    value={editedValues.Pseudo}
                    onChange={handleInputChange}
                  />
                </form>
              ) : (
                user.Pseudo
              )}
            </td>
            <td className="td" onClick={() => {
              setEditingUser(user.IdUsers);
              setEditingField('Mail');
              setEditedValues({Pseudo: user.Pseudo, Mail: user.Mail});
            }}>
              {editingUser === user.IdUsers && (editingField === 'Mail' || editingField === null) ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit(user.IdUsers);
                }}>
                  <input className="adminuser--editinginput"
                    type="email"
                    name="Mail"
                    value={editedValues.Mail}
                    onChange={handleInputChange}
                  />
                </form>
              ) : (
                user.Mail
              )}
            </td>
            <td className="td">
              <button className="adminuser-reset--btn" onClick={() => handleResetPassword(user.IdUsers)}>Reset Password</button>
            </td>
            <td className="td">
              {editingUser === user.IdUsers ? (
                <button className="adminuser-save--btn" onClick={() => handleSaveEdit(user.IdUsers)}>Save</button>
              ) : (
                <>
                  <div className="adminuser--btn">
                    <button onClick={() => handleViewUser(user.IdUsers)}>
                      <img className='view-icon' src={viewIcon} alt="View" />
                    </button>
                    <button onClick={() => {
                      handleEditUser(user.IdUsers);
                      setEditingUser(user.IdUsers);
                      setEditingField(null);
                      setEditedValues({Pseudo: user.Pseudo, Mail: user.Mail});
                    }}>
                      <img className='edit-icon' src={editIcon} alt="Edit" />
                    </button>
                  </div>
                </>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
        </div>
    </div>
  );
};

export default AdminUsers;