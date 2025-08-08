import React from "react";
import Header from "../components/Header";
import Mid from "../components/Mid";
import Res from "../components/Res";
import Why from "../components/Why";
import RevealWrapper from "../components/RevealWrapper";

const Home = ({ onLoginClick, onSignupClick }) => {
  return (
    <>
      <RevealWrapper delay={0.1}>
        <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      </RevealWrapper>
      <Mid />
      <RevealWrapper delay={0.3}><Res /></RevealWrapper>
      <RevealWrapper delay={0.4}><Why /></RevealWrapper>
      
    </>
  );
};

export default Home;
