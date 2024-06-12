import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <a href="/forgot-password">Forgot your password?</a>
        <button type="submit">Login</button>
        
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;