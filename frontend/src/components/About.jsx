import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section bg-slate-950/80 border-t border-slate-800">
      <div className="container-custom grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl">
            I build modern web products that scale and feel polished.
          </h2>
          <p className="text-slate-400 text-lg leading-8 max-w-2xl">
            I'm a MERN stack developer focused on delivering high-quality user experiences through clean interfaces, strong performance, and thoughtful interactions. My work sits at the intersection of design and engineering.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Web Applications', description: 'Responsive, accessible and fast applications using React and Node.' },
              { title: 'Backend Architecture', description: 'APIs and services built with Express, MongoDB, and solid REST patterns.' },
              { title: 'UX-focused Design', description: 'Interfaces that feel intuitive and support real user goals.' },
              { title: 'Performance', description: 'Optimized loading, smooth animations, and production-ready delivery.' },
            ].map((item, index) => (
              <div key={index} className="glass p-6 rounded-3xl border-slate-700 shadow-neon-secondary/10">
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass p-8 rounded-[32px] border border-slate-700 shadow-neon"
        >
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Experience</p>
              <h3 className="text-3xl font-bold text-white">4+ years crafting web products</h3>
              <p className="text-slate-400 leading-7">
                I deliver polished production applications for startups and businesses, with a focus on maintainability and user experience.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Projects shipped', value: '18+' },
                { label: 'Preferred stack', value: 'MERN' },
                { label: 'Industries', value: 'Fintech, SaaS, eCommerce' },
                { label: 'Focus', value: 'Scalable UI + APIs' },
              ].map((stat, index) => (
                <div key={index} className="rounded-3xl border border-slate-700 p-5 bg-slate-900/80">
                  <p className="text-3xl font-semibold text-cyan-300">{stat.value}</p>
                  <p className="text-slate-400 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
