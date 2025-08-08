import React from "react";
import "./LoginForm.css";
import RevealWrapper from "../components/RevealWrapper";

const LoginForm = ({ onClose, onSignupClick }) => {
  return (
    <div className="login-modal">
      <RevealWrapper delay={0.1}>
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username or Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <p className="switch-link">
            Don't have an account? <span onClick={onSignupClick}>Sign up</span>
          </p>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>
      </RevealWrapper>
    </div>
  );
};

export default LoginForm;
