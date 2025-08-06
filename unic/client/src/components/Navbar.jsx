import React, { useState } from "react";
import "./Navbar.css";
import logo from "../images/image22.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="PropShare Logo" />
        </a>
        <span className="navbar-title">PropShare</span>
      </div>

      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "open" : ""}></span>
        <span className={isOpen ? "open" : ""}></span>
        <span className={isOpen ? "open" : ""}></span>
      </button>

      
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <ul>
          <li><a href="/login">Login / SignUp</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Listings</a></li>
          <li><a href="/why">Why PropShare?</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
