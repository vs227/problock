import React from "react";
import "./WhyPropShare.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WhyPropShare = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="whyprop"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="title-2">
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          Why PropShare?
        </motion.h4>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
        >
          Real estate opportunities designed for individual goals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          We offer meticulously curated properties tailored to match the
          unique goals, preferences, and investment strategies of every
          individual investor, ensuring a perfect fit for their vision and
          financial aspirations.
        </motion.p>

        <motion.button
          onClick={goToHome}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true }}
        >
          Know more
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WhyPropShare;
