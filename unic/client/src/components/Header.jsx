// Header.jsx
import React from 'react';
import './Header.css';
import logo from "../images/prop.jpg";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  })
};

const Header = ({ onLoginClick }) => {
  return (
    <motion.section
      id="header"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="cont1">
        <motion.h2
          className="black"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={textVariants}
        >
          Your Trusted Property Site
        </motion.h2>

        <motion.h2
          className="blue"
          initial="hidden"
          animate="visible"
          custom={0.4}
          variants={textVariants}
        >
          Get your investment secured
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={textVariants}
        >
          PropShare lets individuals co-invest in premium commercial properties
          through fractional ownership.
        </motion.p>

        <motion.a
          href="/"
          initial="hidden"
          animate="visible"
          custom={0.8}
          variants={textVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            onLoginClick();
          }}
        >
          Get Started
        </motion.a>
      </div>

      <motion.div
        className="cont2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
        <img src={logo} alt="PropShare Logo" />
      </motion.div>
    </motion.section>
  );
};

export default Header;
