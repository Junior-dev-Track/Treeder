import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const UserDetails = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const IdUser = queryParams.get('IdUser');

  // Create states for user information
  const [pseudo, setPseudo] = useState('');

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

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>{pseudo}</h1>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      {/* Add more fields and logs... */}
    </div>
  );
}

export default UserDetails;