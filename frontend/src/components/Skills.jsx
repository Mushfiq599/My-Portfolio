import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaPhp, FaGitAlt, FaNpm, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiExpress, SiFirebase, SiMongodb, SiMysql, SiVite, SiNetlify, SiVercel } from 'react-icons/si';
import { AiOutlineApi, AiOutlineLock } from 'react-icons/ai';

const Skills = () => {
  const skills = [
    { category: 'frontend', name: 'HTML', icon: FaHtml5, iconClass: 'text-orange-400' },
    { category: 'frontend', name: 'CSS', icon: FaCss3Alt, iconClass: 'text-sky-400' },
    { category: 'frontend', name: 'Tailwind', icon: SiTailwindcss, iconClass: 'text-cyan-400' },
    { category: 'frontend', name: 'JavaScript', icon: SiJavascript, iconClass: 'text-yellow-400' },
    { category: 'frontend', name: 'Bootstrap', icon: FaBootstrap, iconClass: 'text-violet-400' },
    { category: 'frontend', name: 'React', icon: FaReact, iconClass: 'text-sky-300' },
    { category: 'frontend', name: 'Next.js', icon: SiNextdotjs, iconClass: 'text-slate-100' },
    { category: 'frontend', name: 'PHP', icon: FaPhp, iconClass: 'text-indigo-400' },
    { category: 'backend', name: 'Node.js', icon: FaNodeJs, iconClass: 'text-lime-400' },
    { category: 'backend', name: 'Express', icon: SiExpress, iconClass: 'text-slate-300' },
    { category: 'backend', name: 'Firebase', icon: SiFirebase, iconClass: 'text-orange-400' },
    { category: 'backend', name: 'REST API', icon: AiOutlineApi, iconClass: 'text-cyan-300' },
    { category: 'backend', name: 'Context API', icon: FaReact, iconClass: 'text-sky-300' },
    { category: 'backend', name: 'Auth.js', icon: AiOutlineLock, iconClass: 'text-fuchsia-400' },
    { category: 'database', name: 'MongoDB', icon: SiMongodb, iconClass: 'text-emerald-400' },
    { category: 'database', name: 'MySQL', icon: SiMysql, iconClass: 'text-blue-400' },
    { category: 'tools', name: 'Git', icon: FaGitAlt, iconClass: 'text-orange-400' },
    { category: 'tools', name: 'npm', icon: FaNpm, iconClass: 'text-red-400' },
    { category: 'tools', name: 'Vite', icon: SiVite, iconClass: 'text-fuchsia-400' },
    { category: 'tools', name: 'Figma', icon: FaFigma, iconClass: 'text-pink-400' },
    { category: 'tools', name: 'Vercel', icon: SiVercel, iconClass: 'text-white' },
    { category: 'tools', name: 'Netlify', icon: SiNetlify, iconClass: 'text-cyan-300' },
  ];

  const categories = ['frontend', 'backend', 'database', 'tools'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skills.filter(skill => skill.category === category);
    return acc;
  }, {});

  return (
    <section id="skills" className="section bg-gradient-dark">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-slate-400 text-lg">Technologies I work with</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card card-hover"
            >
              <h3 className="text-2xl font-bold text-primary-400 mb-6 capitalize">
                {category}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skillsByCategory[category].length > 0 ? (
                  skillsByCategory[category].map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={`${category}-${skill.name}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 px-4 py-2 bg-slate-900/75 border border-slate-700 rounded-full text-slate-100 hover:border-cyan-400 transition-all"
                      >
                        {Icon && <Icon className={`text-xl ${skill.iconClass}`} />}
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-slate-500">No skills added yet</p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
