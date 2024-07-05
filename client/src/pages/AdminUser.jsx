import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleLogout as logout } from './Logout.jsx';
import { Link } from 'react-router-dom';
import logoutIcon from '../assets/img/logout.png';
import arrowIcon from '../assets/img/arrow-back.svg';
import viewIcon from '../assets/img/view.svg';
import editIcon from '../assets/img/edit.svg';

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

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.IdUsers === userId);
    setEditingUser(userId);
    setEditedValues({ Pseudo: user.Pseudo, Mail: user.Mail });
  };

  const handleInputChange = (event) => {
    setEditedValues({ ...editedValues, [event.target.name]: event.target.value });
  };

  const handleSaveEdit = (userId) => {
    // Save the edited values here
    fetch(`/user/${userId}`, {
      method: 'PUT',
      headers: {
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
      .then((data) => {
        // Update the local state with the new data
        setUsers(users.map((user) => (user.IdUsers === userId ? data : user)));
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


  const handleProfile = () => {
    navigate('/', { state: { openProfilePopup: true } });
  };

  const handleLogout = async () => {
    await logout(setIsAuthenticated, setModalIsOpen); // Appelle la fonction logout
    navigate('/'); // Redirige vers la page d'accueil
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

      <h2 className="adminuser--title">Utilisateurs</h2>
      <table className="table">
        <thead className="th">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="td">
        {users.map((user) => (
          <tr key={user.IdUsers}>
            <td>{user.IdUsers}</td>
            <td><img src={user.Avatar} alt="Avatar" /></td>
            <td onClick={() => {
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
            <td onClick={() => {
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
            <td>
              <button className="settings-secondary-button" onClick={() => handleResetPassword(user.IdUsers)}>Reset Password</button>
            </td>
            <td>
              {editingUser === user.IdUsers ? (
                <button className="adminuser--save" onClick={() => handleSaveEdit(user.IdUsers)}>Save</button>
              ) : (
                <>
                  <div className="adminuser--buttons">
                    <button onClick={() => handleViewUser(user.IdUsers)}>
                      <img src={viewIcon} alt="View" style={{width: '24px', height: '24px'}}/>
                    </button>
                    {/*<Link to={`/user/${userId}`}>Voir</Link>*/}
                    <button onClick={() => {
                      handleEditUser(user.IdUsers);
                      setEditingUser(user.IdUsers);
                      setEditingField(null);
                      setEditedValues({Pseudo: user.Pseudo, Mail: user.Mail});
                    }}>
                      <img src={editIcon} alt="Edit" style={{width: '24px', height: '24px'}}/>
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