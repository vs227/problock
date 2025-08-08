// LoginForm.jsx
import React from "react";
import "./LoginForm.css";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ onClose, onSignupClick }) => {
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
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username or Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <p className="switch-link">
            Don't have an account?{" "}
            <span onClick={onSignupClick}>Sign up</span>
          </p>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
