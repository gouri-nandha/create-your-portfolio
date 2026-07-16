import React from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      {/* Dynamic Animated Particles Background Canvas */}
      <Background />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Layout Wrap */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* Premium Glass Footer */}
      <footer className="footer-glass">
        <div className="footer-content">
          <p className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            Gouri
            <span className="logo-bracket">/&gt;</span>
          </p>
          <p className="footer-text">&copy; 2026 Gourinandhana A M. Built with React & Django.</p>
          <p className="footer-location">Aluva, EKM, Kerala, India</p>
        </div>
      </footer>
    </>
  );
}

export default App;
