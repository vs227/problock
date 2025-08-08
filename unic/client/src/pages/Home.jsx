import React from "react";
import Header from "../components/Header";
import Mid from "../components/Mid";
import Res from "../components/Res";
import Why from "../components/Why";
import Footer from "../components/Footer";

const Home = ({ onLoginClick, onSignupClick }) => {
  return (
    <>
      <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <Mid />
      <Res />
      <Why />
      <Footer/>
    </>
  );
};

export default Home;
