# Resume Storage Structure - Database Schema Visualization

## Overview
This document demonstrates how resumes for different users and multiple resumes per user would be stored in the database.

---

## Database Collections

### **1. Users Collection**

```json
{
  "Users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "123456",
      "fullName": "John Doe",
      "email": "john@example.com",
      "password": "hashed_password_here",
      "projectsId": "123456-PROJECT-ABC123",
      "createdAt": "2025-12-19T10:00:00Z",
      "updatedAt": "2025-12-19T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "654321",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "password": "hashed_password_here",
      "projectsId": "654321-PROJECT-XYZ789",
      "createdAt": "2025-12-19T11:00:00Z",
      "updatedAt": "2025-12-19T11:00:00Z"
    }
  ]
}
```

---

### **2. Projects Collection**

```json
{
  "Projects": [
    {
      "_id": "607f1f77bcf86cd799439021",
      "projectsId": "123456-PROJECT-ABC123",
      "userId": "507f1f77bcf86cd799439011",  // Reference to John Doe
      "projectsCount": 3,
      "projects": [
        "707f1f77bcf86cd799439031",  // Resume ID 1
        "707f1f77bcf86cd799439032",  // Resume ID 2
        "707f1f77bcf86cd799439033"   // Resume ID 3
      ],
      "createdAt": "2025-12-19T10:05:00Z",
      "updatedAt": "2025-12-19T10:05:00Z"
    },
    {
      "_id": "607f1f77bcf86cd799439022",
      "projectsId": "654321-PROJECT-XYZ789",
      "userId": "507f1f77bcf86cd799439012",  // Reference to Jane Smith
      "projectsCount": 2,
      "projects": [
        "707f1f77bcf86cd799439041",  // Resume ID 1
        "707f1f77bcf86cd799439042"   // Resume ID 2
      ],
      "createdAt": "2025-12-19T11:05:00Z",
      "updatedAt": "2025-12-19T11:05:00Z"
    }
  ]
}
```

---

### **3. Resumes Collection**

```json
{
  "Resumes": [
    
    // ============ JOHN DOE'S RESUMES (3 resumes) ============
    
    {
      "_id": "707f1f77bcf86cd799439031",
      "userId": "507f1f77bcf86cd799439011",         // Reference to John Doe
      "projectsId": "123456-PROJECT-ABC123",
      "resumeIndex": 0,
      "resumeName": "resume-123456-0",
      "templateType": "template1",
      "accentColor": "#3B82F6",
      
      // Resume content (to be added based on user input)
      "personal": {
        "fullName": "John Doe",
        "jobTitle": "Senior Software Engineer",
        "email": "john@example.com",
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/johndoe",
        "website": "johndoe.com"
      },
      
      "summary": "Experienced software engineer with 5+ years...",
      "experiences": [],
      "education": [],
      "projects": [],
      "skills": [],
      "certifications": [],
      
      "createdAt": "2025-12-19T10:10:00Z",
      "updatedAt": "2025-12-19T10:10:00Z"
    },
    
    {
      "_id": "707f1f77bcf86cd799439032",
      "userId": "507f1f77bcf86cd799439011",         // Reference to John Doe
      "projectsId": "123456-PROJECT-ABC123",
      "resumeIndex": 1,
      "resumeName": "resume-123456-1",
      "templateType": "template2",
      "accentColor": "#EF4444",
      
      "personal": {
        "fullName": "John Doe",
        "jobTitle": "Full Stack Developer",
        "email": "john@example.com",
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/johndoe",
        "website": "johndoe.com"
      },
      
      "summary": "Full stack developer passionate about web technologies...",
      "experiences": [],
      "education": [],
      "projects": [],
      "skills": [],
      "certifications": [],
      
      "createdAt": "2025-12-19T10:20:00Z",
      "updatedAt": "2025-12-19T10:20:00Z"
    },
    
    {
      "_id": "707f1f77bcf86cd799439033",
      "userId": "507f1f77bcf86cd799439011",         // Reference to John Doe
      "projectsId": "123456-PROJECT-ABC123",
      "resumeIndex": 2,
      "resumeName": "resume-123456-2",
      "templateType": "template3",
      "accentColor": "#10B981",
      
      "personal": {
        "fullName": "John Doe",
        "jobTitle": "Technical Lead",
        "email": "john@example.com",
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/johndoe",
        "website": "johndoe.com"
      },
      
      "summary": "Technical leader with expertise in system design...",
      "experiences": [],
      "education": [],
      "projects": [],
      "skills": [],
      "certifications": [],
      
      "createdAt": "2025-12-19T10:30:00Z",
      "updatedAt": "2025-12-19T10:30:00Z"
    },
    
    // ============ JANE SMITH'S RESUMES (2 resumes) ============
    
    {
      "_id": "707f1f77bcf86cd799439041",
      "userId": "507f1f77bcf86cd799439012",         // Reference to Jane Smith
      "projectsId": "654321-PROJECT-XYZ789",
      "resumeIndex": 0,
      "resumeName": "resume-654321-0",
      "templateType": "template1",
      "accentColor": "#8B5CF6",
      
      "personal": {
        "fullName": "Jane Smith",
        "jobTitle": "Data Scientist",
        "email": "jane@example.com",
        "phone": "+0987654321",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/janesmith",
        "website": "janesmith.com"
      },
      
      "summary": "Data scientist with expertise in machine learning...",
      "experiences": [],
      "education": [],
      "projects": [],
      "skills": [],
      "certifications": [],
      
      "createdAt": "2025-12-19T11:10:00Z",
      "updatedAt": "2025-12-19T11:10:00Z"
    },
    
    {
      "_id": "707f1f77bcf86cd799439042",
      "userId": "507f1f77bcf86cd799439012",         // Reference to Jane Smith
      "projectsId": "654321-PROJECT-XYZ789",
      "resumeIndex": 1,
      "resumeName": "resume-654321-1",
      "templateType": "template4",
      "accentColor": "#F59E0B",
      
      "personal": {
        "fullName": "Jane Smith",
        "jobTitle": "Machine Learning Engineer",
        "email": "jane@example.com",
        "phone": "+0987654321",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/janesmith",
        "website": "janesmith.com"
      },
      
      "summary": "ML engineer specialized in NLP and computer vision...",
      "experiences": [],
      "education": [],
      "projects": [],
      "skills": [],
      "certifications": [],
      
      "createdAt": "2025-12-19T11:20:00Z",
      "updatedAt": "2025-12-19T11:20:00Z"
    }
  ]
}
```

---

## Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER: John Doe                          │
│  _id: 507f1f77bcf86cd799439011                                  │
│  userId: 123456                                                 │
│  projectsId: 123456-PROJECT-ABC123                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ (1-to-1 relationship)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROJECTS: John Doe                           │
│  projectsId: 123456-PROJECT-ABC123                              │
│  projectsCount: 3                                               │
│  projects: [                                                    │
│    "707f1f77bcf86cd799439031",  ◄── Resume 0                  │
│    "707f1f77bcf86cd799439032",  ◄── Resume 1                  │
│    "707f1f77bcf86cd799439033"   ◄── Resume 2                  │
│  ]                                                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ (1-to-Many relationship)
                       ▼
        ┌──────────────┬──────────────┬──────────────┐
        │              │              │              │
        ▼              ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
    │Resume 0│    │Resume 1│    │Resume 2│
    │        │    │        │    │        │
    │Index:0 │    │Index:1 │    │Index:2 │
    │Templ:1 │    │Templ:2 │    │Templ:3 │
    └────────┘    └────────┘    └────────┘
```

---

## Query Examples

### **Get all resumes for John Doe**
```javascript
// Option 1: Query by userId
Resume.find({ userId: "507f1f77bcf86cd799439011" })

// Option 2: Query by projectsId
Resume.find({ projectsId: "123456-PROJECT-ABC123" })
```

### **Get a specific resume**
```javascript
Resume.findById("707f1f77bcf86cd799439031")
```

### **Create a new resume for John Doe**
```javascript
// 1. Get current projectsCount from Projects
// 2. Create Resume with resumeIndex = projectsCount
// 3. Add resume._id to Projects.projects array
// 4. Increment Projects.projectsCount
```

### **Update a resume**
```javascript
Resume.findByIdAndUpdate("707f1f77bcf86cd799439031", updateData)
```

### **Delete a resume**
```javascript
// 1. Delete Resume by _id
// 2. Remove _id from Projects.projects array
// 3. Decrement Projects.projectsCount
```

---

## Key Points

✅ **Each user has their own Projects document** (tracks all their resumes)

✅ **Each user can have multiple Resume documents** (separate collections)

✅ **Resume naming follows pattern**: `resume-{userId}-{index}`

✅ **Easy to scale**: Can add/update/delete resumes independently

✅ **Efficient querying**: Indexed by userId and projectsId

✅ **Maintains relationships**: Projects array holds resume ObjectIds

---
