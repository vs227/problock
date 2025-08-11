import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import Home from "./pages/Home";
import Listmain from "./pages/Listmain";
import WhyPropShare from "./pages/WhyPropShare";

// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID =
  "156158711428-dckii86h9366ors3331od1d44pi8b4u5.apps.googleusercontent.com";

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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
              <Route path="/listmain" element={<Listmain />} />
              <Route path="/why" element={<WhyPropShare />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
