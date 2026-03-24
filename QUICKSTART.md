# 🚀 Quick Start Guide - LMS Application

## ✅ Setup Complete!

Your Learning Management System is now fully set up and running!

---

## 📍 Current Status

### Backend Server
- **Status**: ✅ Running
- **URL**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Frontend Application
- **Status**: ✅ Running  
- **URL**: http://localhost:3000
- **Framework**: Next.js 14

### Database
- **Status**: ✅ Connected
- **Type**: MySQL 8.0
- **Database**: lms_db
- **Tables Created**: users, refresh_tokens, subjects, sections, videos, video_progress

### Sample Data
- **Status**: ✅ Seeded
- **Courses**: 3 (Python, DSA, Web Development)
- **Total Videos**: 26

---

## 🎯 How to Use the Application

### 1. Access the Application
Open your browser and go to: **http://localhost:3000**

### 2. Create an Account
1. Click "Sign Up" or go to http://localhost:3000/auth/register
2. Fill in your details:
   - Full Name
   - Email
   - Password (minimum 6 characters)
3. Click "Sign up"

### 3. Login
1. Go to http://localhost:3000/auth/login
2. Enter your email and password
3. Click "Sign in"

### 4. Start Learning
1. Browse available courses on the home page
2. Click on any course (e.g., "Python Programming")
3. First video is unlocked - click to start watching
4. Watch at least 90% of the video to mark it complete
5. Next video will automatically unlock

### 5. Track Your Progress
- Visit http://localhost:3000/profile to see your learning progress
- View completion percentage for each course
- Track how many videos you've completed

---

## 🎓 Available Courses

### 1. Python Programming
- **Sections**: 3 (Introduction, Basics, Advanced)
- **Videos**: 10
- **Topics**: Variables, Functions, OOP, File Handling, Error Handling

### 2. Data Structures & Algorithms
- **Sections**: 3 (Intro, Arrays, Linked Lists)
- **Videos**: 7
- **Topics**: Big O, Arrays, Strings, Two Pointers, Linked Lists

### 3. Web Development Bootcamp
- **Sections**: 4 (HTML, CSS, JavaScript, React)
- **Videos**: 9
- **Topics**: HTML Tags, CSS Flexbox/Grid, ES6+, DOM, React Hooks

---

## 🔧 Commands Reference

### Backend Commands
```bash
cd backend

# Install dependencies
npm install

# Run development server
npm run dev

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npm run seed
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔐 Authentication Details

### JWT Tokens
- **Access Token**: 15 minutes expiry (stored in localStorage)
- **Refresh Token**: 30 days expiry (stored in HTTP-only cookie + database)
- **Auto Refresh**: Enabled via Axios interceptor

### Password Security
- Hashed using bcrypt (10 salt rounds)
- Minimum 6 characters required

---

## 📊 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Subjects (Protected)
- `GET /api/subjects` - List all courses
- `GET /api/subjects/:id` - Get course details
- `GET /api/subjects/:id/tree` - Get course with lock status

### Progress (Protected)
- `GET /api/progress/videos/:videoId` - Get video progress
- `POST /api/progress/videos/:videoId` - Save video progress

### Health Check
- `GET /api/health` - Returns `{ status: "ok" }`

---

## 🎨 Features Implemented

✅ User registration and login
✅ JWT authentication with refresh tokens
✅ Browse subjects/courses
✅ Sequential video unlocking
✅ YouTube video player with resume capability
✅ Auto-save progress every 10 seconds
✅ Mark videos complete (90% watched)
✅ Progress tracking dashboard
✅ Responsive UI design
✅ Loading states and animations
✅ Toast notifications
✅ Protected routes

---

## 🛠️ Technology Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios
- Zustand
- react-youtube
- react-hot-toast
- lucide-react (icons)

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL 8.0
- JWT (jsonwebtoken)
- bcrypt

---

## 📝 Testing the Application

### Test Registration & Login
1. ✅ Register a new account at `/auth/register`
2. ✅ Login with credentials at `/auth/login`
3. ✅ Verify redirect to courses page

### Test Course Browsing
1. ✅ View all available courses on home page
2. ✅ Click on "Python Programming" course
3. ✅ See course sections and videos in sidebar

### Test Video Playback
1. ✅ Click on first video (should be unlocked)
2. ✅ Video plays from YouTube
3. ✅ Progress auto-saves every 10 seconds
4. ✅ Watch 90%+ to mark as complete
5. ✅ Second video should unlock
6. ✅ Try clicking third video (should be locked)

### Test Progress Tracking
1. ✅ Watch multiple videos
2. ✅ Go to `/profile` page
3. ✅ See progress percentages for each course
4. ✅ Reload page - progress persists

### Test Sequential Learning
1. ✅ Try to access a locked video directly via URL
2. ✅ Should not be able to play (shows locked state)
3. ✅ Complete previous video to unlock

---

## 🔒 Security Notes

- Passwords are hashed before storage
- JWT tokens expire automatically
- Refresh tokens stored securely in HTTP-only cookies
- Protected routes require valid authentication
- API validates all inputs

---

## 🌐 Browser Compatibility

Tested on:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari

---

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1920x1080 and above)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667 and above)

---

## 🎉 You're All Set!

Start exploring the courses and enjoy learning! 🚀

For any issues or questions, check the main README.md file.
