import React, { useState } from 'react';
import '../styles/Contact.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call your contact API here
      // await contactAPI.send(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: FaGithub, url: '#', label: 'GitHub' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaEnvelope, url: '#', label: 'Email' },
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Let's work together</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {isSuccess && (
                <p className="success-message">Message sent successfully!</p>
              )}
            </form>
          </div>

          <div className="contact-info">
            <div className="info-section">
              <h3>Let's Connect</h3>
              <p>
                I'm always open to new opportunities and interesting projects. 
                Feel free to reach out!
              </p>
              <div className="social-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      className="social-link"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="info-section">
              <h3>Quick Links</h3>
              <ul className="quick-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#skills">Skills</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
