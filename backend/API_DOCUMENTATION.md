# Resumind Backend API Documentation

## 🔐 Authentication

All requests except `/auth/signup` and `/auth/signin` require an active session (cookies automatically sent with `credentials: 'include'`).

---

## 📘 API Endpoints

### Authentication (`/api/auth`)

#### 1. Sign Up
**POST** `/api/auth/signup`

Create a new user account.

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. Sign In
**POST** `/api/auth/signin`

Login with email and password.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 3. Logout
**POST** `/api/auth/logout`

Logout and destroy session.

**Response (200)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 4. Verify Session
**GET** `/api/auth/verify`

Verify if user has active session.

**Response (200)**:
```json
{
  "success": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "subscription": "free"
  }
}
```

---

### Resumes (`/api/resumes`)

#### 1. Create Resume
**POST** `/api/resumes`

Create a new resume for logged-in user.

**Request Body**:
```json
{
  "name": "Software Engineer Resume",
  "templateType": "template1",
  "resumeData": {
    "personal": {
      "fullName": "John Doe",
      "jobTitle": "Software Engineer",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "New York, NY",
      "linkedin": "https://linkedin.com/in/johndoe",
      "website": "https://johndoe.com"
    },
    "summary": "Experienced software engineer...",
    "experiences": [],
    "education": [],
    "projects": [],
    "skills": ["JavaScript", "React", "Node.js"],
    "certifications": []
  }
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Resume created successfully",
  "resume": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Software Engineer Resume",
    "templateType": "template1",
    "personal": { ... },
    "summary": "...",
    "skills": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### 2. Get All Resumes
**GET** `/api/resumes`

Get all resumes for logged-in user.

**Query Parameters**:
- None

**Response (200)**:
```json
{
  "success": true,
  "count": 3,
  "resumes": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Software Engineer Resume",
      "templateType": "template1",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

---

#### 3. Get Specific Resume
**GET** `/api/resumes/:id`

Get details of a specific resume.

**Path Parameters**:
- `id` (string) - Resume ID

**Response (200)**:
```json
{
  "success": true,
  "resume": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Software Engineer Resume",
    "personal": { ... },
    "summary": "...",
    "skills": ["JavaScript", "React", "Node.js"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### 4. Update Resume
**PUT** `/api/resumes/:id`

Update resume content.

**Path Parameters**:
- `id` (string) - Resume ID

**Request Body** (partial update):
```json
{
  "name": "Updated Resume Name",
  "summary": "Updated professional summary",
  "skills": ["JavaScript", "React", "Node.js", "Python"],
  "accentColor": "#FF5733"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Resume updated successfully",
  "resume": { ... }
}
```

---

#### 5. Delete Resume
**DELETE** `/api/resumes/:id`

Delete a resume.

**Path Parameters**:
- `id` (string) - Resume ID

**Response (200)**:
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

#### 6. Duplicate Resume
**POST** `/api/resumes/:id/duplicate`

Create a copy of an existing resume.

**Path Parameters**:
- `id` (string) - Resume ID to duplicate

**Response (201)**:
```json
{
  "success": true,
  "message": "Resume duplicated successfully",
  "resume": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "name": "Software Engineer Resume (Copy)",
    ...
  }
}
```

---

### User Profile (`/api/user`)

#### 1. Get Profile
**GET** `/api/user/profile`

Get logged-in user's profile.

**Response (200)**:
```json
{
  "success": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profileImage": "https://...",
    "preferences": {
      "accentColor": "#3B82F6",
      "defaultTemplate": "template1",
      "emailNotifications": true
    },
    "subscription": "free",
    "isEmailVerified": false,
    "createdAt": "2024-01-10T08:00:00Z"
  }
}
```

---

#### 2. Update Profile
**PUT** `/api/user/profile`

Update user profile information.

**Request Body**:
```json
{
  "fullName": "John Smith",
  "profileImage": "https://...",
  "preferences": {
    "accentColor": "#FF5733",
    "defaultTemplate": "template2",
    "emailNotifications": false
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

#### 3. Change Password
**POST** `/api/user/password`

Change user password.

**Request Body**:
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

#### 4. Delete Account
**DELETE** `/api/user/account`

Permanently delete user account.

**Response (200)**:
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

### Analysis (`/api/analysis`)

#### 1. Job Matcher Analysis
**POST** `/api/analysis/job-matcher`

Analyze resume against job description for tailored suggestions.

**Request Body**:
```json
{
  "resumeId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "jobDescription": "We are looking for a software engineer with 5+ years of experience in JavaScript, React, and Node.js..."
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Job matching analysis completed",
  "analysis": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "type": "job-matcher",
    "score": 72,
    "suggestions": [
      {
        "id": 1,
        "section": "Professional Summary",
        "originalText": "Experienced software engineer",
        "suggestedText": "Experienced software engineer with proven track record...",
        "improvement": 23,
        "applied": false
      }
    ],
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

---

#### 2. ATS Analysis
**POST** `/api/analysis/ats`

Analyze resume for ATS (Applicant Tracking System) compatibility.

**Request Body**:
```json
{
  "resumeId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "jobDescription": "Required: JavaScript, React, Node.js, MongoDB...",
  "resumeText": "Optional: Resume text if not using resumeId"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "ATS analysis completed",
  "analysis": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "type": "ats-analyzer",
    "score": 78,
    "matchedKeywords": ["JavaScript", "React", "Node.js"],
    "missingKeywords": ["MongoDB", "Docker", "AWS"],
    "sections": {
      "skills": {
        "score": 85,
        "issues": []
      },
      "experience": {
        "score": 72,
        "issues": ["Could emphasize quantifiable achievements"]
      },
      "education": {
        "score": 88,
        "issues": []
      },
      "format": {
        "score": 76,
        "issues": []
      }
    },
    "recommendations": [
      "Add more action verbs to descriptions",
      "Include specific metrics",
      "Use industry keywords"
    ],
    "createdAt": "2024-01-15T12:05:00Z"
  }
}
```

---

#### 3. Get Analysis History
**GET** `/api/analysis/history`

Get user's analysis history.

**Query Parameters**:
- `type` (string, optional) - Filter by type: 'job-matcher' or 'ats-analyzer'
- `limit` (number, optional) - Results per page (default: 10)
- `page` (number, optional) - Page number (default: 1)

**Response (200)**:
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "page": 1,
  "pages": 3,
  "analyses": [ ... ]
}
```

---

#### 4. Get Specific Analysis
**GET** `/api/analysis/:id`

Get details of a specific analysis.

**Path Parameters**:
- `id` (string) - Analysis ID

**Response (200)**:
```json
{
  "success": true,
  "analysis": { ... }
}
```

---

#### 5. Delete Analysis
**DELETE** `/api/analysis/:id`

Delete an analysis record.

**Path Parameters**:
- `id` (string) - Analysis ID

**Response (200)**:
```json
{
  "success": true,
  "message": "Analysis deleted successfully"
}
```

---

## 🔒 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authenticated. Please login first."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📋 Common Workflows

### 1. User Registration & Resume Creation

```javascript
// Step 1: Signup
const signup = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  })
})

// Step 2: Create Resume
const createResume = await fetch('/api/resumes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name: 'My First Resume',
    templateType: 'template1',
    resumeData: { ... }
  })
})
```

### 2. Analyze Resume with Job Matcher

```javascript
const analyze = await fetch('/api/analysis/job-matcher', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    resumeId: 'resume-id-here',
    jobDescription: 'Job description text...'
  })
})
```

---

## 🚀 Performance Tips

1. **Batch Requests** - Load multiple resumes at once
2. **Pagination** - Use limit/page for large datasets
3. **Caching** - Cache analysis results client-side
4. **Debouncing** - Debounce update requests in forms

---

## 📞 Support

For issues or questions about the API, please contact the development team.
