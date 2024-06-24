import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      avatar: 'https://via.placeholder.com/150',
      pseudo: 'Test User',
      email: 'testuser@example.com',
    },
  ]);

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
  

  return (
    <div>
      <header>
        <img src="/path/to/logo.png" alt="Logo" />
        <button onClick={() => navigate('/profiladmin')}>Profil</button>
        <button onClick={() => navigate('/logout')}>Logout</button>
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