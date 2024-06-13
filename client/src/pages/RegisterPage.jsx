import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const RegisterPage = ({ openModal, closeModal }) => {
  const [step, setStep] = useState(1);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <h1>Register Page</h1>
      {isMobile ? (
        step === 1 ? (
          <div>
            <form>
              <label>
                Avatar:
                <input type="file" name="avatar" />
              </label>
              <label>
                Username:
                <input type="text" name="username" />
              </label>
              <button onClick={nextStep}>Next</button>
            </form>
          </div>
        ) : (
          <div>
            <form>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <label>
                Password:
                <input type="password" name="password" />
              </label>
              <label>
                Confirm Password:
                <input type="password" name="confirmPassword" />
              </label>
              <button onClick={prevStep}>Back</button>
              <input type="submit" value="Register" />
            </form>
            <Link to="/login">Login</Link>
            <button onClick={closeModal}>Close</button>
          </div>
        )
      ) : (
        <div>
          <form>
            <label>
              Avatar:
              <input type="file" name="avatar" />
            </label>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" />
            </label>
            <input type="submit" value="Register" />
          </form>
          <button onClick={() => { closeModal(); openModal('login'); }}>Login</button>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;