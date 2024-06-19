import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Remplacez cette fonction par la fonction que vous utilisez pour récupérer les informations de l'utilisateur
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, [userId]);


  const handleBack = () => {
    navigate('/admin');
  };

  const handleBan = () => {
    // Ban user here
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Logic to save changes goes here
  };

  const handleCancel = () => {
    // Cancel changes here
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <button onClick={handleBack}>Back</button>
        <h1>Profil: {user.pseudo}</h1>
        <button onClick={handleBan}>Ban</button>
      </header>

      <div>
        <img src={user.avatar} alt="Avatar" />
        {/* Avatar selection here */}
      </div>

      <form onSubmit={handleSave}>
        <label>
          Pseudo:
          <input type="text" value={user.pseudo} onChange={HandlePseudoChange} />
        </label>

        <label>
          Email:
          <input type="email" value={user.email} onChange={handleEmailChange} />
        </label>

        <button type="button" onClick={handlePasswordReset}>Reset Password</button>

        {/* Other fields here */}

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>

      <div>
        <h2>Logs</h2>
        {/* Log filters here */}
        {/* Display logs here */}
      </div>
    </div>
  );
};

export default UserDetails;