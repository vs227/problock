import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import Home from "./pages/Home";
import Listmain from "./pages/Listmain";
import WhyPropShare from "./pages/WhyPropShare";

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
    <Router basename="/problock">
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
            <Route path="/listmain" element={<Listmain />} />
            <Route path="/why" element={<WhyPropShare />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
