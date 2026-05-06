import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/index.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Initialize scroll animations after loading
      setTimeout(() => {
        gsap.fromTo('.hero-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
        gsap.fromTo('.hero-visual', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'back.out(1.7)' });

        const sections = [
          { selector: '.about', start: 'top 85%' },
          { selector: '.skills', start: 'top 85%' },
          { selector: '.projects', start: 'top 85%' },
          { selector: '.contact', start: 'top 85%' },
        ];

        sections.forEach(({ selector, start }) => {
          gsap.fromTo(selector, { opacity: 0, y: 40 }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: selector,
              start,
              toggleActions: 'play none none none',
              markers: false,
            },
            immediateRender: false,
          });
        });

        ScrollTrigger.refresh();
      }, 500);
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
