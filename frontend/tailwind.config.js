/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0e9ff',
          200: '#c7d8ff',
          300: '#a4baff',
          400: '#7c95ff',
          500: '#5d6bff',
          600: '#4544f4',
          700: '#3633d9',
          800: '#2d2ba8',
          900: '#262272',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ebe5ff',
          200: '#dcceff',
          300: '#c2a8ff',
          400: '#a378ff',
          500: '#8b52ff',
          600: '#7c3aed',
          700: '#6b2dd6',
          800: '#582ba8',
          900: '#48227e',
        },
        accent: '#ff6b6b',
        dark: '#0f172a',
        light: '#f8fafc',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5d6bff 0%, #8b52ff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8b52ff 0%, #ff6b6b 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(93, 107, 255, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(93, 107, 255, 0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px 0 rgba(93, 107, 255, 0.4)',
        'neon-secondary': '0 0 20px 0 rgba(139, 82, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
