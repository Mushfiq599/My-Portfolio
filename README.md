# MERN Stack Portfolio

A modern, clean, and responsive portfolio website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- ✨ Modern and clean UI with smooth animations
- 🎨 Unique color combination with gradient effects
- 📱 Fully responsive design
- 🚀 Fast and optimized performance
- 🔐 Secure authentication system
- 📧 Contact form with email functionality
- 🎯 Admin dashboard for managing projects, skills, and messages
- 🌙 Dark theme optimized for readability

## Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file from `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update `.env` with your MongoDB URI and other configurations:
\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-portfolio
JWT_SECRET=your_super_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

5. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file from `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update `.env` if your backend is on a different URL:
\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm start
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
My-Portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── contact.js
│   │   └── admin.js
│   ├── middleware/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Contact.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   ├── utils/
    │   │   └── api.js
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.jsx
    │   └── index.js
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/me\` - Get current user

### Projects
- \`GET /api/projects\` - Get all projects
- \`GET /api/projects/:id\` - Get single project
- \`POST /api/projects\` - Create project (protected)
- \`PUT /api/projects/:id\` - Update project (protected)
- \`DELETE /api/projects/:id\` - Delete project (protected)

### Skills
- \`GET /api/skills\` - Get all skills
- \`GET /api/skills/grouped/categories\` - Get skills grouped by category
- \`POST /api/skills\` - Create skill (protected)
- \`PUT /api/skills/:id\` - Update skill (protected)
- \`DELETE /api/skills/:id\` - Delete skill (protected)

### Contact
- \`POST /api/contact\` - Send contact message
- \`GET /api/contact\` - Get all messages (admin)
- \`PUT /api/contact/:id\` - Mark message as read (admin)
- \`DELETE /api/contact/:id\` - Delete message (admin)

### Admin
- \`GET /api/admin/profile\` - Get admin profile
- \`PUT /api/admin/profile/:id\` - Update admin profile (protected)

## Features to Implement

- [ ] Admin Dashboard for managing content
- [ ] Image upload functionality for projects
- [ ] Blog section
- [ ] Dark/Light theme toggle
- [ ] Email notifications for contact form
- [ ] Social media integration
- [ ] SEO optimization
- [ ] Performance optimization

## Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: { ... },
  secondary: { ... },
  accent: '#ff6b6b',
}
```

### Animations
Modify animation settings in `tailwind.config.js` under `keyframes` and `animation`.

### Content
Update personal information, social links, and project details in the components and add data through the backend API.

## Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Run \`heroku login\`
3. Create Heroku app: \`heroku create app-name\`
4. Set environment variables: \`heroku config:set KEY=VALUE\`
5. Deploy: \`git push heroku main\`

### Frontend Deployment (Vercel)
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in frontend directory
3. Follow the prompts and configure deployment settings

## License

This project is open source and available under the MIT License.

## Support

For support, email your@email.com or create an issue on GitHub.

## Author

Built with ❤️ by Your Name
