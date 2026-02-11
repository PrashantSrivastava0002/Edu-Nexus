# 🎓 Edu Nexus - Gamified Learning Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application that makes learning fun through gamification. Students can learn through interactive chapters, take quizzes, earn XP, unlock badges, and compete on leaderboards.

## ✨ Features

### 🎮 Gamification System
- **XP & Levels**: Earn experience points and level up (1000 XP per level)
- **Daily Streaks**: Maintain login streaks for 50% bonus XP (3+ days)
- **Badges**: Unlock achievements for perfect scores, speed, and consistency
- **Leaderboard**: Compete with other students globally
- **Progress Tracking**: Track completion across subjects and chapters

### 👨‍🎓 For Students
- Browse subjects and chapters
- Watch video lessons
- Take interactive quizzes (MCQ and fill-in-the-blank)
- Earn rewards and track progress
- View global rankings

### 👨‍🏫 For Teachers
- Create and manage subjects
- Add chapters with videos and attachments
- Create quizzes with multiple question types
- Add teacher notes
- View student progress

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd caps2
```

2. **Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../Edu-Nexus
npm install
```

3. **Configure environment variables**

Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edu-nexus
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=30d
NODE_ENV=development
```

Frontend (`Edu-Nexus/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Seed the database** (optional but recommended)
```bash
cd server
npm run seed
```

5. **Start the application**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd Edu-Nexus
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔐 Test Accounts

After seeding, login with:

| Role | Email | Password |
|------|-------|----------|
| Student | student@demo.com | password123 |
| Teacher | teacher@demo.com | password123 |

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed installation and configuration
- [API Reference](API_REFERENCE.md) - Complete API documentation
- [Project Status](PROJECT_STATUS.md) - Current implementation status

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- React Router v7
- Tailwind CSS
- Framer Motion (animations)
- Axios (HTTP client)
- React Hot Toast (notifications)
- Canvas Confetti (celebrations)
- Lucide React (icons)

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- express-validator
- CORS

## 📁 Project Structure

```
caps2/
├── server/                 # Backend
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── scripts/           # Seed data
│   └── server.js          # Entry point
│
├── Edu-Nexus/             # Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── data/          # Static data
│   └── public/            # Static assets
│
└── Documentation files
```

## 🎯 Key Features Implemented

✅ Complete MERN stack backend with MongoDB  
✅ JWT authentication with role-based access  
✅ Gamification system (XP, levels, streaks, badges)  
✅ Quiz system with automatic grading  
✅ Leaderboard and progress tracking  
✅ Frontend integration with backend APIs  
✅ Quiz component fully functional  
✅ Responsive UI with animations  

## 🔄 What's Next

- Complete integration of remaining student pages
- Teacher dashboard backend integration
- File upload for videos and attachments
- Enhanced UI animations and sound effects
- Progress charts and analytics
- Profile page with detailed stats

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

**Port Already in Use**
- Change PORT in server/.env
- Update VITE_API_URL in frontend .env

**CORS Errors**
- Verify backend is running on port 5000
- Check frontend is making requests to correct URL

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for better learning experiences

