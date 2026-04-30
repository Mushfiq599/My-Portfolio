import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="home" className="section min-h-screen relative overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-14 left-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center"
      >
        <div className="space-y-8 py-8 lg:py-0">
          <motion.p
            variants={itemVariants}
            className="text-sm uppercase tracking-[0.35em] text-cyan-400"
          >
            Portfolio Banner
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-white">
              Hi, I’m <span className="text-cyan-300">Mushfiq</span>
            </h1>
            <p className="text-4xl md:text-5xl font-semibold text-slate-200">
              MERN Stack Developer
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-lg md:text-xl text-slate-400 leading-9"
          >
            I help businesses launch high-performing web products with clean interfaces, readable code, and a polished experience that feels premium.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <ScrollLink to="projects" smooth className="w-full sm:w-auto">
              <button className="btn-primary w-full">See My Projects</button>
            </ScrollLink>
            <ScrollLink to="contact" smooth className="w-full sm:w-auto">
              <button className="btn-secondary w-full">Let’s Talk</button>
            </ScrollLink>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Clients', value: '12+' },
              { label: 'Projects', value: '18+' },
              { label: 'Stack', value: 'MERN' },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-3xl p-5 border border-slate-700 shadow-neon-secondary">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-slate-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-[40px] border border-slate-700 bg-slate-900/80 p-6 shadow-neon"
        >
          <div className="absolute -top-8 left-8 rounded-full bg-cyan-500/20 px-5 py-3 text-sm text-cyan-200 backdrop-blur-xl border border-cyan-500/20">
            Animated Profile
          </div>

          <div className="h-full rounded-[30px] border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-6">
            <div className="relative overflow-hidden rounded-[30px] border border-slate-700 bg-slate-950 shadow-2xl shadow-slate-950/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.18),transparent_25%)]" />
              <div className="relative flex h-[520px] flex-col items-center justify-between p-6">
                <div className="flex items-center gap-4 rounded-3xl bg-slate-900/90 px-4 py-3 border border-slate-700">
                  <div className="h-3 w-3 rounded-full bg-cyan-300 animate-pulse" />
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Now available</p>
                </div>

                <div className="relative flex h-full w-full items-center justify-center">
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 blur-3xl" />
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 flex h-72 w-72 items-center justify-center rounded-full bg-slate-800/95 border border-slate-700 shadow-[0_25px_80px_-40px_rgba(59,130,246,0.8)]"
                  >
                    <img
                      src="https://i.ibb.co.com/4Z9Y0LdK/Chat-GPT-Image-Jun-20-2025-12-05-30-PM.pnghttps://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                      alt="Profile"
                      className="h-64 w-64 rounded-full object-cover border-4 border-cyan-400/20"
                    />
                  </motion.div>
                  <div className="absolute -left-8 top-8 rounded-full bg-cyan-500/15 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200 border border-cyan-500/20 backdrop-blur-xl">
                    Animated Portrait
                  </div>
                </div>

                <div className="mt-6 w-full rounded-3xl bg-slate-900/90 p-5 text-slate-300 border border-slate-700">
                  <p className="text-lg font-semibold text-white">Meet the developer</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    This is a portrait placeholder — swap this image with your own photo or illustration. The card now feels more personal and dynamic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
