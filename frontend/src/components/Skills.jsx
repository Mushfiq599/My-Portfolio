import React from 'react';
import '../styles/Skills.css';
import { FaReact, FaNode, FaDatabase, FaTools } from 'react-icons/fa';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: FaReact,
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'Tailwind CSS', 'GSAP Animations']
    },
    {
      title: 'Backend',
      icon: FaNode,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Middleware', 'Real-time Features']
    },
    {
      title: 'Databases',
      icon: FaDatabase,
      skills: ['MongoDB', 'MySQL', 'Firebase', 'Data Modeling', 'Optimization', 'Queries']
    },
    {
      title: 'Tools & DevOps',
      icon: FaTools,
      skills: ['Git', 'Docker', 'Vite', 'NPM', 'Figma', 'AWS']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="skill-category"
              >
                <div className="category-header">
                  <Icon className="category-icon" />
                  <h3>{category.title}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <span className="skill-dot"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="skills-summary">
          <h3>And More...</h3>
          <p>
            I'm always learning and expanding my skill set. Currently exploring Three.js, Web3, 
            and advanced animation libraries to create even more engaging user experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
