import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Mid from './components/Mid';
import Res from './components/Res';
import Why from './components/Why';
import Footer from './components/Footer';
import RevealWrapper from './components/RevealWrapper';

function App() {
  return (
    <div>
      <Navbar />

      <RevealWrapper delay={0.1}>
        <Header />
      </RevealWrapper>

      <RevealWrapper delay={0.2}>
        <Mid />
      </RevealWrapper>

      <RevealWrapper delay={0.3}>
        <Res />
      </RevealWrapper>

      <RevealWrapper delay={0.4}>
        <Why />
      </RevealWrapper>

      <RevealWrapper delay={0.5}>
        <Footer />
      </RevealWrapper>
    </div>
  );
}

export default App;
