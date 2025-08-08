import React from "react";
import "./WhyPropShare.css";
import RevealWrapper from "../components/RevealWrapper";
import { useNavigate } from "react-router-dom";

const WhyPropShare = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); 
  };

  return (
    <RevealWrapper delay={0.3}>
      <div className="whyprop">
        <div className="title-2">
          <h4>Why PropShare?</h4>
          <h1>Real estate opportunities designed for individual goals</h1>
          <p>
            We offer meticulously curated properties tailored to match the
            unique goals, preferences, and investment strategies of every
            individual investor, ensuring a perfect fit for their vision and
            financial aspirations.
          </p>
          <button onClick={goToHome}>Know more</button>
        </div>
      </div>
    </RevealWrapper>
  );
};

export default WhyPropShare;
