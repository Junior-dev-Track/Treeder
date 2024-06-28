import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleLogout as logout } from './Logout.jsx';
import { Link } from 'react-router-dom';

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

    fetch('/user', {
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
    navigate(`/userdetails/${userId}`);
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
    <div>
      <header>
        <img src="/path/to/logo.png" alt="Logo" />
        <button onClick={handleProfile}>Profil</button>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <button onClick={handleBack}>Back</button>
      <h2>Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
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
                  <input
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
                  <input
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
              <button onClick={() => handleResetPassword(user.IdUsers)}>Reset Password</button>
            </td>
            <td>
              {editingUser === user.IdUsers ? (
                <button onClick={() => handleSaveEdit(user.IdUsers)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleViewUser(user.IdUsers)}>Voir</button>
                  {/*<Link to={`/user/${userId}`}>Voir</Link>*/}
                  <button onClick={() => {
                    handleEditUser(user.IdUsers);
                    setEditingUser(user.IdUsers);
                    setEditingField(null);
                    setEditedValues({Pseudo: user.Pseudo, Mail: user.Mail});
                  }}>Éditer</button>
                </>
              )}
            </td>
          </tr>
        ))}
    </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;