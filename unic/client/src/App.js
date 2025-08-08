import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import WhyPropShare from "./pages/WhyPropShare";
import RevealWrapper from "./components/RevealWrapper";

import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={openLogin} onSignupClick={openSignup} />

        {showLogin && (
          <LoginForm onClose={closeModals} onSignupClick={openSignup} />
        )}
        {showSignup && (
          <SignupForm onClose={closeModals} onLoginClick={openLogin} />
        )}

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home onLoginClick={openLogin} onSignupClick={openSignup} />
              }
            />
            <Route path="/listings" element={<Listings />} />
            <Route path="/why" element={<WhyPropShare />} />
          </Routes>
        </main>
        <RevealWrapper delay={0.5}>
          <Footer />
        </RevealWrapper>
      </div>
    </Router>
  );
}

export default App;
