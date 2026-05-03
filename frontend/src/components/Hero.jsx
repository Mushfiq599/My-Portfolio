import React, { useEffect } from 'react';
import '../styles/Hero.css';

export default function Hero() {
  useEffect(() => {
    // Animate hero text on load
    const text = document.querySelector('.hero-title');
    if (text) {
      text.style.animation = 'fadeIn 1s ease-out forwards';
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">Welcome to my portfolio</p>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Mushfiq</span>
          </h1>
          <h2 className="hero-subtitle-large">Full Stack Developer</h2>
          <p className="hero-description">
            I create beautiful, interactive web experiences with modern technologies. 
            Specializing in React, Node.js, and responsive design.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => {
              document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
            }}>
              View My Work
            </button>
            <button className="btn-secondary" onClick={() => {
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}>
              Get In Touch
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-placeholder">
            <div className="placeholder-content">
              <span>Your 3D Model</span>
              <p>Add your GLTF model here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
