# 👗 Neergz Fashion Platform

**Full-stack fashion design platform connecting students, studios, and companies with modern design tools and portfolio management.**

![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-purple?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

---

## 📖 Overview

Neergz Fashion Platform is a comprehensive web application designed for the fashion design industry. It enables fashion students, independent studios, and companies to showcase their work, connect with potential clients, and manage design inquiries through an intuitive admin interface.

### 🎯 Key Features

- **🎨 Modern Landing Page**: Responsive marketing site with elegant design
- **🌓 Theme System**: Light/dark mode with localStorage persistence
- **📬 Contact/Inquiry System**: Lead capture with form validation
- **🔐 Secure Admin Access**: JWT-based authentication
- **📊 Admin Dashboard**: Inquiry management with search and filters
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **📱 Responsive Design**: Mobile-first approach for all devices

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React 18+ (UI Library)
⚡  Vite 5+ (Build Tool & Dev Server)
🎨  CSS3 (Custom Styling)
🔄  React Router (Client-side Routing)
💾  localStorage (Theme Persistence)
```

### Backend
```
🚀  Node.js 18+ (Runtime)
🌐  Express.js (Web Framework)
🗄️  MongoDB (Database)
🔗  Mongoose (ODM)
🔐  JWT (JSON Web Tokens for Auth)
📧  Express Validator (Input Validation)
🛡️  bcrypt (Password Hashing)
```

### Development Tools
```
📦  npm (Package Manager)
🔧  ESLint (Code Quality)
🎨  Prettier (Code Formatting)
🐛  nodemon (Auto-restart Dev Server)
```

---

## ✨ Features Breakdown

### Public Features

**Landing Page**
- Hero section with call-to-action
- Services/features showcase
- About section
- Contact form
- Responsive navigation
- Theme toggle (light/dark)

**Contact System**
- Form validation (name, email, message)
- Real-time error messages
- Success confirmation
- Inquiry stored in database

### Admin Features

**Authentication**
- Secure login with email/password
- JWT token generation
- Protected routes
- Session persistence

**Dashboard**
- View all inquiries in table format
- Search inquiries by name/email
- Filter by date or status
- Responsive admin interface
- Logout functionality

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **MongoDB** 6 or higher (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

**1. Clone the Repository**
```bash
git clone https://github.com/DIYA73/neergz-fashion-platform.git
cd neergz-fashion-platform
```

**2. Backend Setup**

```bash
cd server
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
cp .env.example .env
```

**Configure `.env`:**
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/fashion_designer
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fashion_designer

JWT_SECRET=your-super-secret-jwt-key-min-32-characters
ADMIN_EMAIL=admin@neergz.com
ADMIN_PASSWORD=changeme123
```

**Start backend server:**
```bash
npm start
# Server runs on http://localhost:4000
```

**3. Frontend Setup**

Open a new terminal:

```bash
cd client
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
cp .env.example .env
```

**Configure `.env`:**
```env
# Leave empty for same-origin API calls
VITE_API_BASE_URL=

# Or specify backend URL explicitly:
# VITE_API_BASE_URL=http://localhost:4000
```

**Start frontend dev server:**
```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

**4. Access the Application**

- **Frontend**: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- **Admin Login**: [http://127.0.0.1:5173/admin/login](http://127.0.0.1:5173/admin/login)
- **Backend API**: [http://localhost:4000/api](http://localhost:4000/api)

**Default Admin Credentials:**
```
Email: admin@neergz.com
Password: changeme123
```

> ⚠️ **Important**: Change the admin password in production!

---

## 📁 Project Structure

```
neergz-fashion-platform/
├── client/                      # Frontend React Application
│   ├── src/
│   │   ├── pages/               # Route components
│   │   │   ├── Landing.jsx      # Public homepage
│   │   │   ├── AdminLogin.jsx   # Admin login page
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── components/          # Reusable components
│   │   │   ├── ThemeToggleButton.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── lib/                 # Utility functions
│   │   │   ├── api.js           # API client (axios)
│   │   │   └── theme.js         # Theme management
│   │   ├── styles.css           # Global styles
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Static assets
│   ├── .env.example             # Environment template
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── server/                      # Backend Node.js Application
│   ├── src/
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js          # Authentication endpoints
│   │   │   └── inquiries.js     # Inquiry CRUD endpoints
│   │   ├── middleware/          # Express middleware
│   │   │   └── auth.js          # JWT verification
│   │   ├── models/              # Mongoose schemas
│   │   │   └── Inquiry.js       # Inquiry model
│   │   ├── config/              # Configuration files
│   │   │   └── db.js            # MongoDB connection
│   │   └── index.js             # Express app entry
│   ├── .env.example             # Environment template
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔌 API Endpoints

### Public Endpoints

**Health Check**
```http
GET /api/health
```
Returns server status.

**Submit Inquiry**
```http
POST /api/inquiries

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services..."
}
```

### Authentication

**Admin Login**
```http
POST /api/auth/login

Body:
{
  "email": "admin@neergz.com",
  "password": "your-password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "email": "admin@neergz.com"
  }
}
```

### Protected Endpoints (Require JWT)

**Get All Inquiries**
```http
GET /api/inquiries
Authorization: Bearer <token>

Response:
{
  "inquiries": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 🗄️ Database Schema

### Inquiry Model

```javascript
const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    maxLength: 1000
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

## 🎨 Theme System

The platform includes a sophisticated light/dark theme system:

**Features:**
- Toggle button in navigation
- Smooth CSS transitions
- localStorage persistence
- System preference detection
- Icon changes based on theme

**Implementation:**
```javascript
// lib/theme.js
export const getStoredTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const setStoredTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.body.classList.toggle('dark-theme', theme === 'dark');
};
```

---

## 🧪 Development

### Run in Development Mode

**Backend (with auto-reload):**
```bash
cd server
npm run dev
```

**Frontend (with HMR):**
```bash
cd client
npm run dev
```

### Build for Production

**Frontend:**
```bash
cd client
npm run build
# Output: client/dist/
```

**Backend:**
```bash
cd server
# No build needed - Node.js runs directly
```

---

## 🚀 Deployment

### Deploy Frontend (Vercel - Recommended)

```bash
cd client

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# VITE_API_BASE_URL = https://your-backend.onrender.com
```

### Deploy Backend (Render - Recommended)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables (see `.env.example`)
5. Deploy

### Database (MongoDB Atlas - Free Tier)

1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGO_URI` in backend environment variables

---

## 🔒 Security

**Implemented Security Measures:**
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens for authentication
- ✅ Environment variables for secrets
- ✅ Input validation on all forms
- ✅ CORS configuration
- ✅ MongoDB injection prevention (Mongoose sanitization)
- ✅ XSS protection via React's built-in escaping

**Production Security Checklist:**
- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add CORS whitelist
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring/logging

---

## 🐛 Troubleshooting

### "Missing script: start"
**Problem:** Wrong directory.
**Solution:** Verify you're in the correct folder:
```bash
pwd
# Should show: .../neergz-fashion-platform/server
# or: .../neergz-fashion-platform/client
```

### MongoDB Connection Error
**Problem:** MongoDB not running or wrong connection string.
**Solution:**
```bash
# Start local MongoDB
mongod

# Or check MongoDB Atlas connection string
# Ensure IP whitelist includes your IP
```

### Port Already in Use
**Problem:** Port 4000 or 5173 already occupied.
**Solution:**
```bash
# Find and kill process
lsof -ti:4000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### API Requests Failing
**Problem:** CORS or incorrect API URL.
**Solution:**
- Check `VITE_API_BASE_URL` in `client/.env`
- Ensure backend is running on correct port
- Check browser console for CORS errors

---

## 🗺️ Roadmap

### ✅ Phase 1: Core Features (Completed)
- [x] Landing page with contact form
- [x] Admin authentication
- [x] Admin dashboard
- [x] Theme toggle system
- [x] Basic inquiry management

### 🚧 Phase 2: Enhanced Features (Planned)
- [ ] Portfolio gallery for designers
- [ ] Designer profiles with bio and contact
- [ ] Image upload for inquiries
- [ ] Email notifications for new inquiries
- [ ] Advanced filtering (by date, status)
- [ ] Inquiry status updates
- [ ] Reply to inquiries from dashboard

### 📋 Phase 3: Advanced Features (Future)
- [ ] Public designer directory
- [ ] Booking/appointment system
- [ ] Payment integration for consultations
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Social media integration

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Development Guidelines:**
- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**DIYA73**
- GitHub: [@DIYA73](https://github.com/DIYA73)
- LinkedIn: [linkedin.com/in/didi-86b00329a](https://www.linkedin.com/in/didi-86b00329a/)

---

## 🙏 Acknowledgments

- React team for the amazing library
- Vite for blazing-fast development
- MongoDB for the flexible database
- Fashion industry professionals for inspiration

---

**⭐ If this project helps you, please star the repository!**

**👗 Building modern tools for the fashion industry, one line of code at a time.**

---

**Made with ❤️ for the fashion design community**
