import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = ({ match }) => {
  const userId = match.params.id; // Get the user ID from the URL
  const navigate = useNavigate();

  // Create states for user information
  const [pseudo, setPseudo] = useState('');
  // Add more states as needed...

  // Fetch user information when component mounts
  useEffect(() => {
    fetch(`/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setPseudo(data.Pseudo);
        // Set more states as needed...
      });
  }, [userId]);

  // Handle save button click
  const handleSave = () => {
    fetch(`/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pseudo: pseudo,
        // Add more fields as needed...
      }),
    });
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