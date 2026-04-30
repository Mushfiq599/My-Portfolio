import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-slate-900 border-t border-slate-700 py-8"
    >
      <div className="container-custom">
        <div className="text-center text-slate-400">
          <p>
            © {currentYear} Your Name. Built with <span className="text-accent">❤</span> using MERN Stack.
          </p>
          <p className="mt-2 text-sm">All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
