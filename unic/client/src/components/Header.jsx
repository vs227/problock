// Header.jsx
import React from 'react';
import './Header.css';
import logo from "../images/prop.jpg";

const Header = ({ onLoginClick }) => {
  return (
    <section id="header">
      <div className="cont1">
        <h2 className="black">Your Trusted Property Site</h2>
        <h2 className="blue">Get your investment secured</h2>
        <p>PropShare lets individuals co-invest in premium commercial properties through fractional ownership.</p>

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            onLoginClick();     // Trigger login form
          }}
        >
          Get Started
        </a>
      </div>
      <div className="cont2">
        <img src={logo} alt="PropShare Logo" />
      </div>
    </section>
  );
};

export default Header;
