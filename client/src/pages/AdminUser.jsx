import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleLogout as logout } from './Logout.jsx';

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
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      user: {
        Pseudo: Cookies.get('pseudo'),
      }
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      setUsers(data);
    })
    .catch((error) => console.error(error));
  }, []);


  const [editingUser, setEditingUser] = useState(null);
  const [editedValues, setEditedValues] = useState({ pseudo: '', email: '' });

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    setEditingUser(userId);
    setEditedValues({ pseudo: user.pseudo, email: user.email });
  };

  const handleInputChange = (event) => {
    setEditedValues({ ...editedValues, [event.target.name]: event.target.value });
  };

  const handleSaveEdit = (userId) => {
    // Save the edited values here
    // ...

    setEditingUser(null);
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
          <tr key={user.id}>
            <td>{user.id}</td>
            <td><img src={user.avatar} alt="Avatar" /></td>
            <td>
              {editingUser === user.id ? (
                <input
                  type="text"
                  name="pseudo"
                  value={editedValues.pseudo}
                  onChange={handleInputChange}
                />
              ) : (
                user.pseudo
              )}
            </td>
            <td>
              {editingUser === user.id ? (
                <input
                  type="email"
                  name="email"
                  value={editedValues.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              <button onClick={() => handleResetPassword(user.id)}>Reset Password</button>
            </td>
            <td>
              {editingUser === user.id ? (
                <button onClick={() => handleSaveEdit(user.id)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleViewUser(user.id)}>Voir</button>
                  <button onClick={() => handleEditUser(user.id)}>Éditer</button>
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