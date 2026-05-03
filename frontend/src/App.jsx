import React, { useState, useEffect } from 'react';
import './styles/index.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {isLoading && <Loading onLoadComplete={() => setIsLoading(false)} />}
      
      <Navbar />
      
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
