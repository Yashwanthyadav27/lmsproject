# Learning Management System (LMS)

A modern full-stack LMS built with Next.js 14, Express.js, MySQL, and Prisma.

## Features

- ✅ User registration and authentication (JWT with refresh tokens)
- ✅ Browse subjects/courses
- ✅ Watch YouTube learning videos
- ✅ Sequential video unlocking (must complete previous video)
- ✅ Progress tracking with auto-save every 10 seconds
- ✅ Resume videos from last position
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Real-time progress dashboard

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios (API client with interceptors)
- Zustand (State management)
- react-youtube (Video player)
- react-hot-toast (Notifications)

### Backend
- Node.js
- Express.js REST API
- JWT authentication
- bcrypt password hashing
- Prisma ORM
- MySQL 8.0

## Prerequisites

- Node.js 18+ installed
- MySQL 8.0 installed and running
- npm or yarn package manager

## Database Setup

The application uses MySQL with the following configuration:

```
Host: localhost
Port: 3306
User: root
Password: Yashwanth@2704
Database: lms_db
```

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Setup Database with Prisma

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npm run seed
```

This will:
- Create the `lms_db` database
- Create all required tables (users, refresh_tokens, subjects, sections, videos, video_progress)
- Optionally seed with 3 courses (Python, DSA, Web Development) with real YouTube videos

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 5. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Subjects
- `GET /api/subjects` - List all published subjects
- `GET /api/subjects/:id` - Get subject details
- `GET /api/subjects/:id/tree` - Get course tree with lock status (protected)

### Progress
- `GET /api/progress/videos/:videoId` - Get video progress (protected)
- `POST /api/progress/videos/:videoId` - Save video progress (protected)

### Health Check
- `GET /api/health` - Health check endpoint

## Usage Flow

1. **Register**: Go to `/auth/register` and create an account
2. **Login**: Go to `/auth/login` with your credentials
3. **Browse Courses**: View available subjects on the home page or `/subjects`
4. **Start Learning**: 
   - Click on a course
   - First video is unlocked
   - Watch videos sequentially (next videos unlock after completing previous ones)
5. **Track Progress**: 
   - Progress auto-saves every 10 seconds
   - Videos resume from where you left off
   - View overall progress on `/profile` page

## Project Structure

```
lms/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── modules/
│       │   ├── auth/
│       │   ├── subjects/
│       │   ├── progress/
│       │   └── health/
│       ├── utils/
│       ├── app.ts
│       └── server.ts
│
└── frontend/
    ├── app/
    │   ├── auth/
    │   │   ├── login/
    │   │   └── register/
    │   ├── subjects/
    │   ├── profile/
    │   └── page.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Sidebar.tsx
    │   ├── VideoPlayer.tsx
    │   └── SubjectCard.tsx
    ├── lib/
    │   └── apiClient.ts
    └── store/
        ├── authStore.ts
        └── videoStore.ts
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:Yashwanth@2704@localhost:3306/lms_db"
JWT_SECRET="lms-super-secret-jwt-key-change-in-production-2024"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Sample Courses

After running the seed script, you'll have:

1. **Python Programming** - 3 sections, 10 videos
2. **Data Structures & Algorithms** - 3 sections, 7 videos
3. **Web Development Bootcamp** - 4 sections, 9 videos

All courses include real YouTube tutorial URLs.

## Key Features Explained

### Sequential Learning
- Videos are locked by default (except the first one)
- Complete a video (watch 90%+) to unlock the next
- Lock icons show which videos are still locked

### Progress Tracking
- Auto-saves every 10 seconds during playback
- Marks as completed when 90% of video is watched
- Stores last watched position for resuming

### Authentication
- JWT access token (15 min expiry) stored in localStorage
- Refresh token (30 days) stored in HTTP-only cookie and database
- Automatic token refresh via Axios interceptor
- Protected routes redirect to login

## Troubleshooting

### Database Connection Error
Ensure MySQL is running and credentials in `.env` are correct.

### Port Already in Use
Change PORT in `backend/.env` if 5000 is occupied.

### Module Not Found Errors
Run `npm install` in both backend and frontend directories.

### Prisma Client Not Generated
Run `npx prisma generate` in the backend directory.

## Deployment Ready

### Backend (Render/Railway)
- Set environment variables on platform
- Build command: `npm run build`
- Start command: `npm start`

### Frontend (Vercel)
- Connect GitHub repository
- Set `NEXT_PUBLIC_API_URL` to production backend URL
- Deploy automatically on push

## License

MIT
