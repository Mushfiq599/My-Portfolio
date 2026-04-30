# Customization Guide

## 🎨 How to Personalize Your Portfolio

### 1. Update Personal Information

#### Hero Section
Edit `frontend/src/components/Hero.jsx`:
```jsx
// Change the main heading
<h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
  Hi, I'm a MERN Developer  // Change this
</h1>

// Change the subtitle
<p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
  Building modern, scalable web applications... // Change this
</p>
```

#### Navigation Links
Edit `frontend/src/components/Navbar.jsx`:
```jsx
const menuItems = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];
```

#### Contact Information
Edit `frontend/src/components/Contact.jsx`:
```jsx
<a href="mailto:your@email.com">
  <FaEnvelope /> your@email.com
</a>
```

#### Social Links
Update in `Navbar.jsx` and `Contact.jsx`:
```jsx
const socialLinks = [
  { icon: FaGithub, link: 'https://github.com/yourprofile' },
  { icon: FaLinkedin, link: 'https://linkedin.com/in/yourprofile' },
  { icon: FaTwitter, link: 'https://twitter.com/yourprofile' },
];
```

---

### 2. Customize Colors

Edit `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f5ff',
        100: '#e0e9ff',
        200: '#c7d8ff',
        300: '#a4baff',
        400: '#7c95ff',
        500: '#5d6bff',  // Main primary
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
        500: '#8b52ff',  // Main secondary
        600: '#7c3aed',
        700: '#6b2dd6',
        800: '#582ba8',
        900: '#48227e',
      },
      accent: '#ff6b6b',  // Accent color
    },
  },
}
```

**Popular Color Combinations:**

**Modern Blue (Current)**
- Primary: #5d6bff
- Secondary: #8b52ff
- Accent: #ff6b6b

**Cyberpunk**
- Primary: #00d4ff
- Secondary: #ff006e
- Accent: #ffbe0b

**Forest Green**
- Primary: #2d6a4f
- Secondary: #40916c
- Accent: #d6cc57

**Sunset**
- Primary: #f77f00
- Secondary: #fcbf49
- Accent: #eae2b7

---

### 3. Change Fonts

#### Global Font
Edit `frontend/src/styles/globals.css`:
```css
body {
  font-family: 'Your Font Family', sans-serif;
}
```

**Popular Font Pairs (Google Fonts):**
```html
<!-- Add to index.html head -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
```

Then update CSS:
```css
body {
  font-family: 'Poppins', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
}
```

---

### 4. Update Footer

Edit `frontend/src/components/Footer.jsx`:
```jsx
<p>
  © {currentYear} Your Name. Built with <span className="text-accent">❤</span> using MERN Stack.
</p>
```

---

### 5. Customize Animations

#### Hero Animations
Edit `frontend/src/components/Hero.jsx` - adjust timing:
```jsx
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5 }}  // Change duration
```

#### Add New Animations
Edit `frontend/tailwind.config.js`:
```javascript
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },  // Adjust distance
  },
  // Add more keyframes...
},
animation: {
  'float': 'float 6s ease-in-out infinite',  // Adjust speed
}
```

---

### 6. Add New Sections

#### Create New Component
Create `frontend/src/components/About.jsx`:
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container-custom">
        <h2 className="text-4xl font-bold gradient-text mb-8">About Me</h2>
        {/* Your content */}
      </div>
    </section>
  );
};

export default About;
```

#### Add to Navigation
Update `Navbar.jsx`:
```jsx
const menuItems = [
  // ... existing items
  { name: 'About', to: 'about' },
];
```

#### Import in App.jsx
```jsx
import About from './components/About';

function App() {
  return (
    <main>
      <Hero />
      <About />  // Add here
      <Skills />
      {/* ... */}
    </main>
  );
}
```

---

### 7. Change Layout/Design

#### Card Styling
Edit `frontend/src/styles/globals.css`:
```css
.card {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
  border-radius: 20px;  /* More/less rounded */
  padding: 30px;  /* Increase/decrease padding */
  /* ... */
}
```

#### Button Styling
```css
.btn-primary {
  padding: 12px 24px;  /* Change size */
  border-radius: 10px;  /* More/less rounded */
  /* ... */
}
```

---

### 8. Add Images

#### Hero Background
Edit `frontend/src/components/Hero.jsx` - modify the background divs:
```jsx
<div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full...">
```

#### Project Images
When adding projects via API, provide image URLs:
```json
{
  "title": "My Project",
  "image": "https://your-image-url.com/image.jpg",
  "description": "..."
}
```

---

### 9. Update Metadata

Edit `frontend/public/index.html`:
```html
<meta name="description" content="Your portfolio description">
<title>Your Name | Portfolio</title>
```

---

### 10. Add Featured Projects

Post to backend:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Amazing Project",
    "description": "Project description",
    "image": "image-url",
    "technologies": ["React", "Node.js"],
    "liveLink": "https://project-link.com",
    "githubLink": "https://github.com/project",
    "featured": true
  }'
```

---

### 11. Customize Sections

#### Modify Hero Copy
Edit `frontend/src/components/Hero.jsx`:
- Main heading
- Subtitle
- Call-to-action buttons
- Background animations

#### Modify Skills Display
Edit `frontend/src/components/Skills.jsx`:
- Change category layout (grid columns)
- Modify proficiency colors
- Update category names

#### Modify Projects Grid
Edit `frontend/src/components/Projects.jsx`:
- Change number of columns
- Modify card hover effects
- Update project filters

#### Modify Contact Form
Edit `frontend/src/components/Contact.jsx`:
- Add/remove form fields
- Change form layout
- Update validation rules

---

### 12. Theme Variations

#### Dark Theme (Default)
Already configured. Background: `#0f172a`

#### Light Theme
Update `frontend/tailwind.config.js` and components:
```javascript
dark: '#0f172a',  // Change to light color
light: '#f8fafc',  // Change to dark color
```

#### Custom Theme
Create new color palette in config:
```javascript
theme: {
  extend: {
    colors: {
      // Your custom colors
      brand: '#your-color',
    }
  }
}
```

---

### 13. Performance Optimization

#### Image Optimization
```jsx
<img 
  src={image} 
  alt="description"
  loading="lazy"  // Add lazy loading
  width="300"
  height="200"
/>
```

#### Component Optimization
```jsx
import React, { memo } from 'react';

const OptimizedComponent = memo(({ prop }) => (
  // Component JSX
));

export default OptimizedComponent;
```

---

### 14. SEO Optimization

Add meta tags to `index.html`:
```html
<meta name="keywords" content="MERN, React, Node.js, Portfolio">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Name | Developer">
<meta property="og:description" content="Portfolio description">
<meta property="og:image" content="thumbnail-image-url">
```

---

### 15. Add Analytics

Add Google Analytics to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 Quick Customization Checklist

- [ ] Update hero heading and subtitle
- [ ] Change primary and secondary colors
- [ ] Update social media links
- [ ] Change contact email
- [ ] Add profile image
- [ ] Add featured projects
- [ ] Add skills
- [ ] Update footer name
- [ ] Change page title and meta description
- [ ] Customize fonts
- [ ] Adjust animations
- [ ] Add more sections
- [ ] Optimize images
- [ ] Add analytics
- [ ] Test on mobile

---

## 💡 Pro Tips

1. **Use Figma** to design color schemes before implementing
2. **Test on mobile** - Use Chrome DevTools
3. **Keep animations subtle** - Don't overdo it
4. **Consistent spacing** - Use Tailwind's spacing system
5. **Accessible colors** - Check contrast ratios
6. **Fast loading** - Optimize images and bundle size
7. **Mobile first** - Design for mobile then scale up
8. **User testing** - Get feedback from others

---

## 🔗 Useful Tools

- **Color Palette Generator**: https://coolors.co
- **Gradient Generator**: https://gradient.style
- **Font Pairing**: https://www.fontpair.co
- **Image Optimization**: https://tinypng.com
- **Accessibility Checker**: https://wave.webaim.org
- **Performance Audit**: https://pagespeed.web.dev

---

Happy customizing! 🎨✨
