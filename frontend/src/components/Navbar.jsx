import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 bg-slate-950/75 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="container-custom flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          <span className="text-cyan-300">Portfolio</span> 
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.to}
              spy
              smooth
              offset={-70}
              duration={500}
              className="cursor-pointer text-slate-300 hover:text-primary-400 transition-colors"
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>

        {/* Social Icons */}
        <div className="hidden md:flex gap-4">
          {[FaGithub, FaLinkedin, FaTwitter, FaInstagram].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2, color: '#5d6bff' }}
              className="text-slate-400 hover:text-primary-400 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-slate-900 border-t border-slate-700 p-4"
        >
          {menuItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.to}
              smooth
              onClick={() => setIsOpen(false)}
              className="block py-2 text-slate-300 hover:text-primary-400 cursor-pointer"
            >
              {item.name}
            </ScrollLink>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;



// // For Skills section add.
// as frontend, html, css, tailwind, js, bootstrap, react, next , php etc.
// as backend add node, express, firebase, rest api, context api, authjs
// as db add mongodb mysql
// // and for tools add git , npm , vite.js , figma vercel netlify

// // add these withe their icons