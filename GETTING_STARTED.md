# MERN Portfolio - Quick Start Guide

## 🚀 Next Steps

### 1. **Install MongoDB** (if not already installed)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 3. **Frontend Setup** (in a new terminal)

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

**Frontend will run on:** `http://localhost:3000`

---

## 🎨 Design Features

### Color Palette
- **Primary**: Deep Blue & Purple (#5d6bff - #8b52ff)
- **Secondary**: Vibrant Purple (#8b52ff)
- **Accent**: Coral Red (#ff6b6b)
- **Background**: Dark Navy (#0f172a)

### Animations Included
- Smooth page transitions
- Floating elements
- Hover effects with scaling
- Scroll animations
- Gradient text effects
- Glassmorphism design elements

---

## 📝 How to Add Content

### Add Skills
1. Create an admin login (modify the User model)
2. Send a POST request to `/api/skills` with:
```json
{
  "name": "React",
  "category": "frontend",
  "proficiency": "expert",
  "icon": "optional-icon-url"
}
```

### Add Projects
```json
{
  "title": "Project Name",
  "description": "Project description",
  "image": "image-url",
  "technologies": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://live-link.com",
  "githubLink": "https://github.com/repo",
  "featured": true,
  "category": "fullstack"
}
```

### Update Profile
```json
{
  "name": "Your Name",
  "title": "MERN Stack Developer",
  "bio": "Your bio here",
  "social": {
    "github": "https://github.com/yourprofile",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "twitter": "https://twitter.com/yourprofile",
    "instagram": "https://instagram.com/yourprofile"
  }
}
```

---

## 🔐 Authentication

The portfolio includes JWT-based authentication:

```bash
# Register
POST /api/auth/register
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}

# Login
POST /api/auth/login
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

Store the returned token in localStorage. It's automatically included in API requests.

---

## 🎯 Customization Tips

### 1. **Update Navbar Links**
   Edit `frontend/src/components/Navbar.jsx` - menuItems array

### 2. **Change Color Scheme**
   Edit `frontend/tailwind.config.js` - colors object

### 3. **Modify Animations**
   Edit `frontend/src/styles/globals.css` - keyframes

### 4. **Update Social Links**
   Edit `frontend/src/components/Navbar.jsx` and `Contact.jsx`

### 5. **Change Hero Text**
   Edit `frontend/src/components/Hero.jsx`

---

## 📦 Dependencies Breakdown

### Backend
- `express`: Web server
- `mongoose`: MongoDB ORM
- `jsonwebtoken`: Authentication tokens
- `bcryptjs`: Password encryption
- `cors`: Cross-origin requests
- `dotenv`: Environment variables

### Frontend
- `react`: UI library
- `tailwindcss`: Utility CSS framework
- `framer-motion`: Advanced animations
- `react-router-dom`: Navigation
- `axios`: HTTP requests
- `react-icons`: Icon library
- `react-scroll`: Smooth scrolling

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- For MongoDB Atlas, ensure IP is whitelisted

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Ensure both servers are running
- Clear browser cache

### Port Already in Use
```bash
# For backend (port 5000)
netstat -ano | findstr :5000

# For frontend (port 3000)
netstat -ano | findstr :3000
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

---

## 🎉 You're All Set!

Your modern MERN portfolio is ready to customize and deploy. Happy coding! 🚀
