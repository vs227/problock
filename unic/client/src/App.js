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
import TokenDetails from "./pages/TokenDetails";

import useBlockchain from "./hooks/useBlockchain";

const GOOGLE_CLIENT_ID =
  "156158711428-dckii86h9366ors3331od1d44pi8b4u5.apps.googleusercontent.com";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { account, pstBalance, connectWallet } = useBlockchain();

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
          {/* Navbar */}
          <Navbar
            onLoginClick={openLogin}
            onSignupClick={openSignup}
            account={account}
            pstBalance={pstBalance}
            connectWallet={connectWallet}
          />


          {/* Login / Signup Modals */}
          {showLogin && (
            <LoginForm onClose={closeModals} onSignupClick={openSignup} />
          )}
          {showSignup && (
            <SignupForm onClose={closeModals} onLoginClick={openLogin} />
          )}

          {/* Main Routes */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={<Home onLoginClick={openLogin} onSignupClick={openSignup} />}
              />
              <Route path="/listmain" element={<Listmain />} />
              <Route path="/why" element={<WhyPropShare />} />
              <Route path="/token/:id" element={<TokenDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
