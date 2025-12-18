# 🎯 Quick Reference Guide

## ⚡ Start Backend in 3 Steps

```bash
# 1. Navigate to backend
cd resumind-backend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 📍 Key Endpoints Cheatsheet

### Auth
```
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/logout
GET /api/auth/verify
```

### Resumes
```
POST   /api/resumes              # Create
GET    /api/resumes              # Get all
GET    /api/resumes/:id          # Get one
PUT    /api/resumes/:id          # Update
DELETE /api/resumes/:id          # Delete
POST   /api/resumes/:id/duplicate # Copy
```

### User
```
GET    /api/user/profile         # Get profile
PUT    /api/user/profile         # Update profile
POST   /api/user/password        # Change password
DELETE /api/user/account         # Delete account
```

### Analysis
```
POST /api/analysis/job-matcher    # Match resume to JD
POST /api/analysis/ats            # ATS score
GET  /api/analysis/history        # Get history
GET  /api/analysis/:id            # Get one
DELETE /api/analysis/:id          # Delete
```

---

## 🔐 Important: Frontend Cookie Setup

Always add `credentials: 'include'` in fetch calls:

```javascript
fetch('http://localhost:5000/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',  // ← REQUIRED for sessions
  body: JSON.stringify({ email, password })
})
```

---

## 📋 Environment Setup

Create `.env` file:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumind
SESSION_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

---

## 🗂️ Project Structure Quick View

```
src/
├── config/          # Configuration
├── models/          # Database schemas (User, Resume, AnalysisResult)
├── controllers/     # Business logic (auth, resume, user, analysis)
├── routes/          # API endpoints
├── middleware/      # Auth, error handling
└── server.js        # Entry point
```

---

## 📊 Database Models

**User** - Authentication, preferences  
**Resume** - Content for multiple resume versions  
**AnalysisResult** - Job matcher & ATS results  

All connected via MongoDB with proper indexing.

---

## ✨ Key Features

✅ Express-session for session management  
✅ MongoDB for persistent storage  
✅ Password hashing with bcryptjs  
✅ CORS enabled for frontend  
✅ Error handling middleware  
✅ Authentication middleware  
✅ 19 ready-to-use API endpoints  

---

## 🧪 Test API Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| Can't connect to MongoDB | Start MongoDB or update MONGODB_URI |
| CORS error from frontend | Add frontend URL to CORS_ORIGIN in .env |
| Session lost after refresh | Check credentials: 'include' in fetch |
| Port 5000 busy | Change PORT in .env |

---

## 📚 Full Documentation

- **CODEBASE_ANALYSIS.md** - Frontend analysis
- **README.md** - Detailed setup guide
- **API_DOCUMENTATION.md** - Complete API reference
- **BACKEND_SETUP_COMPLETE.md** - Full setup guide

---

## 🚀 You're Ready!

Backend is set up and ready to connect with your frontend.

Start the server and begin integration! 💪
