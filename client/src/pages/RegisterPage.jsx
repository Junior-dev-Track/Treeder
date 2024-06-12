import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [step, setStep] = useState(1);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
  };

  return (
    <div>
      <h2>Register</h2>
      {isMobile ? (
        step === 1 ? (
          <form onSubmit={nextStep}>
            {/* Avatar and User Name fields */}
            <button type="submit">Next</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email, Password, and Confirm Password fields */}
            <input type="submit" value="Register" />
          </form>
        )
      ) : (
        <Modal isOpen={true}>
          <form onSubmit={handleSubmit}>
            {/* All fields */}
            <input type="submit" value="Register" />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RegisterPage;