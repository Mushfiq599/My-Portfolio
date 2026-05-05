import React, { useState, useEffect, useRef } from 'react';
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
  const cursorRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.classList.add('visible');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('visible');
      cursor.classList.remove('interactive');
    };

    const handleHoverStart = (event) => {
      const target = event.target;
      if (target.closest('a, button, input, textarea, select, .btn-primary, .btn-secondary, .slider-arrow, .project-link')) {
        cursor.classList.add('interactive');
      }
    };

    const handleHoverEnd = (event) => {
      const target = event.target;
      if (target.closest('a, button, input, textarea, select, .btn-primary, .btn-secondary, .slider-arrow, .project-link')) {
        cursor.classList.remove('interactive');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  return (
    <div className="app">
      <div ref={cursorRef} className="global-cursor" />
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
