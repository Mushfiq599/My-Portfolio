import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../utils/api';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-gradient-dark">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Get In Touch</h2>
          <p className="text-slate-400 text-lg">Let's collaborate on something great</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(93, 107, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-center"
                >
                  Message sent successfully!
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="card card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">Let's connect</h3>
              <p className="text-slate-400 mb-6">
                I'm always interested in hearing about new projects and opportunities.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:your@email.com"
                  className="flex items-center gap-4 text-slate-300 hover:text-primary-400 transition-colors"
                >
                  <FaEnvelope className="text-primary-400" size={24} />
                  <span>your@email.com</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="card card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">Follow me</h3>
              <div className="flex gap-4">
                {[
                  { icon: FaGithub, link: '#' },
                  { icon: FaLinkedin, link: '#' },
                  { icon: FaTwitter, link: '#' },
                  { icon: FaInstagram, link: 'https://www.instagram.com/mushfiq.ur/' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.2, color: '#5d6bff' }}
                    className="text-3xl text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
