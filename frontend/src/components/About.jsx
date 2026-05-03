import React, { useEffect } from 'react';
import '../styles/About.css';

export default function About() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.about-item').forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-item about-text">
            <h3>Who I Am</h3>
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating interactive experiences that solve real-world problems and delight users.
            </p>
            <p>
              With years of experience in React, Node.js, and database design, I've helped numerous 
              businesses scale their digital presence and achieve their goals.
            </p>
          </div>

          <div className="about-item about-skills">
            <h3>What I Do</h3>
            <div className="skills-grid">
              <div className="skill-card">
                <h4>Frontend</h4>
                <p>React, JavaScript, CSS, Responsive Design</p>
              </div>
              <div className="skill-card">
                <h4>Backend</h4>
                <p>Node.js, Express, APIs, Authentication</p>
              </div>
              <div className="skill-card">
                <h4>Databases</h4>
                <p>MongoDB, MySQL, Firebase</p>
              </div>
              <div className="skill-card">
                <h4>Tools</h4>
                <p>Git, Figma, Docker, AWS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
