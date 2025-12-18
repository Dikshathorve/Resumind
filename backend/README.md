# Resumind Backend

AI-powered resume builder backend server built with Node.js and Express.

## 🎯 Features

- **User Authentication** - Signup, signin, session management
- **Resume Management** - Create, read, update, delete resumes
- **Job Matcher** - Match resume against job descriptions
- **ATS Analyzer** - Analyze resume for ATS compatibility
- **Session Management** - Express-session with MongoDB store
- **User Profiles** - Manage user information and preferences

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone and Navigate**
```bash
cd resumind-backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Configure MongoDB**
Update `MONGODB_URI` in `.env`:
- Local: `mongodb://localhost:27017/resumind`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/resumind`

5. **Start Development Server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
src/
├── config/
│   ├── config.js          # Configuration management
│   ├── database.js        # MongoDB connection
│   └── session.js         # Session configuration
├── models/
│   ├── User.js            # User schema
│   ├── Resume.js          # Resume schema
│   └── AnalysisResult.js  # Analysis results schema
├── controllers/
│   ├── authController.js      # Auth logic
│   ├── resumeController.js    # Resume CRUD
│   ├── userController.js      # User profile
│   └── analysisController.js  # Analysis logic
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── resumeRoutes.js    # Resume endpoints
│   ├── userRoutes.js      # User endpoints
│   └── analysisRoutes.js  # Analysis endpoints
├── middleware/
│   └── middleware.js      # Custom middleware
└── server.js              # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify session

### Resumes
- `POST /api/resumes` - Create resume
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume

### User Profile
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account

### Analysis
- `POST /api/analysis/job-matcher` - Job matcher analysis
- `POST /api/analysis/ats` - ATS analysis
- `GET /api/analysis/history` - Analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `DELETE /api/analysis/:id` - Delete analysis

## 🔐 Session Management

**Technology**: Express-session with MongoDB Store

**Features**:
- Secure, httpOnly cookies
- 7-day session expiration
- CSRF protection with sameSite: 'strict'
- MongoDB persistence

**Session Data**:
```javascript
{
  userId: String,
  email: String,
  name: String,
  iat: timestamp
}
```

## 📊 Database Models

### User
- fullName, email, password (hashed)
- profileImage, preferences
- subscription level
- Email verification, password reset tokens
- Activity tracking (lastLogin)

### Resume
- userId (reference to User)
- Template type and name
- Sections: personal, summary, experiences, education, projects, skills, certifications
- Styling: accentColor, profileImage

### AnalysisResult
- userId, resumeId (references)
- Analysis type: 'job-matcher' or 'ats-analyzer'
- Score, results, recommendations
- Keywords and section analysis

## 🛠️ Development Commands

```bash
# Start dev server with auto-reload
npm run dev

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test
```

## 🔄 CORS Configuration

Frontend URLs in `.env`:
```
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

## 🚦 Environment Variables

Key variables to configure:

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | Runtime environment |
| PORT | 5000 | Server port |
| MONGODB_URI | localhost:27017/resumind | MongoDB connection |
| SESSION_SECRET | dev-secret-key | Session encryption key |
| CORS_ORIGIN | localhost:5173 | Allowed frontend origin |
| AI_SERVICE_URL | localhost:8000 | AI service endpoint |

## 🔗 Frontend Integration

The frontend (React/Vite) communicates with this backend:

**Frontend URL**: `http://localhost:5173`  
**Backend URL**: `http://localhost:5000`  
**API Base**: `http://localhost:5000/api`

### Example API Call
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: Send cookies
  body: JSON.stringify({ email: 'user@example.com', password: 'password' })
})
```

## 📈 Next Steps

### Phase 2 - Core Features
- [ ] PDF parsing for resume upload
- [ ] Resume export functionality
- [ ] Email verification
- [ ] Password reset

### Phase 3 - AI Integration
- [ ] Connect to AI service for suggestions
- [ ] Implement job matcher algorithm
- [ ] Implement ATS scoring algorithm
- [ ] Keyword extraction

### Phase 4 - Advanced
- [ ] Real-time collaboration
- [ ] Resume versioning
- [ ] Analytics dashboard
- [ ] Export reports

## 🐛 Troubleshooting

**MongoDB Connection Error**
```
Solution: Ensure MongoDB is running and MONGODB_URI is correct
```

**Session Not Persisting**
```
Solution: Check CORS_ORIGIN includes frontend URL with credentials: true
```

**Port Already in Use**
```
Solution: Change PORT in .env or kill process using port 5000
```

## 📝 License

MIT

## 👤 Author

Vivek

---

**Happy Coding! 🚀**
