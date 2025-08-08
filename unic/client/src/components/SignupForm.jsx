import React from 'react';
import './LoginForm.css'; // or create `SignupForm.css` if needed

const SignupForm = ({ onClose, onLoginClick }) => {
  return (
    <div className="login-modal">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch-link">
          Already have an account? <span onClick={onLoginClick}>Login</span>
        </p>
        <button className="close-btn" onClick={onClose}>x</button>
      </div>
    </div>
  );
};

export default SignupForm;
