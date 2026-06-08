import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/Hero.css';

export default function Hero() {
  useEffect(() => {
    // Typewriter effect for title
    const title = document.querySelector('.hero-title');
    if (title) {
      gsap.fromTo(title, { opacity: 0 }, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          // Typewriter effect
          const text = title.textContent;
          title.textContent = '';
          let i = 0;
          const typeWriter = () => {
            if (i < text.length) {
              title.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 100);
            }
          };
          typeWriter();
        }
      });
    }

    // Animate subtitle
    gsap.fromTo('.hero-subtitle-large', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power2.out' });
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
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
            <img
              src={`${process.env.PUBLIC_URL}/images/hero-photo.jpeg`}
              alt="Mushfiq"
              className="hero-photo"
              onError={(e) => {
                // fallback to placeholder text if image not present
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentNode;
                if (parent) parent.querySelector('.placeholder-content').style.display = 'flex';
              }}
            />
            <div className="placeholder-content" style={{ display: 'none' }}>
              <span>3D Model</span>
              <p>Mushfiq</p>
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
