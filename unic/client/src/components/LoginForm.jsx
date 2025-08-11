import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginForm.css";

const LoginForm = ({ onClose, onSignupClick }) => {
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User Info:", decoded);
    alert(`Welcome, ${decoded.name}!`);
    onClose();
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
    alert("Google Login Failed. Please try again.");
  };

  return (
    <div className="login-modal">
      <AnimatePresence>
        <motion.div
          className="login-box"
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <h2>Welcome Back</h2>
          <p className="subtext">Sign in to continue</p>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit" className="btn">
            Login
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="google-login-container">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="pill"
              theme="filled_black"
              size="large"
            />
          </div>

          <p className="switch-link">
            Don’t have an account?{" "}
            <span onClick={onSignupClick}>Sign up</span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
