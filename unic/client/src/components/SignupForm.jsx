import React from 'react';
import './SignupForm.css'; // updated to match file name

const SignupForm = ({ onClose, onLoginClick }) => {
  return (
    <div className="signup-modal">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p className="subtext">Create your account to get started</p>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p className="footer-text">
          Already have an account? <span className="link" onClick={onLoginClick}>Login</span>
        </p>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SignupForm;
