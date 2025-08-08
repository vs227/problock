import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/image22.png";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="PropShare Logo" />
        </Link>
        <span className="navbar-title">PropShare</span>
      </div>

      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "open" : ""}></span>
        <span className={isOpen ? "open" : ""}></span>
        <span className={isOpen ? "open" : ""}></span>
      </button>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/listmain" onClick={() => setIsOpen(false)}>Listings</Link>
          </li>
          <li>
            <Link to="/why" onClick={() => setIsOpen(false)}>Why PropShare?</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
