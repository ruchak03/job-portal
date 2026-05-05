## ⚠️ Project Status
This project demonstrates a Job Portal system built using Java Spring Boot and React.

- Frontend is functional and demonstrates UI.
- Backend implementation is partially complete and may require additional setup.

## Overview
This project focuses on backend API design, CRUD operations, and frontend-backend integration.

# 🏢 JobPortal - Full Stack Job Portal Application

A full-stack **Job Portal Web Application** built with **React**, **Spring Boot**, **Hibernate**, and **MySQL** — perfect for your portfolio!

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router v6, Axios, CSS3 |
| Backend   | Java 17, Spring Boot 3, Spring Security |
| ORM       | Hibernate (via Spring Data JPA)     |
| Database  | MySQL 8                             |
| Auth      | JWT (JSON Web Tokens)               |

---

## ✨ Features

### Job Seekers
- 🔍 Browse and search jobs with filters (category, type, location)
- 📋 View detailed job descriptions
- ✉️ Apply for jobs with a cover letter
- 📊 Track all applications and their statuses (Pending → Shortlisted → Hired)

### Employers
- 📝 Post new job listings with full details
- 👥 View all applicants for each job
- ✅ Update applicant status (Pending / Reviewed / Shortlisted / Rejected / Hired)
- 🗑️ Delete job postings

### General
- 🔐 JWT-based authentication (Register / Login)
- 👤 Role-based access (Job Seeker / Employer)
- 📱 Fully responsive UI

---

## 🗂️ Project Structure

```
JobPortal/
├── job-portal-backend/          # Spring Boot Backend
│   ├── src/main/java/com/jobportal/
│   │   ├── controller/          # REST Controllers
│   │   ├── entity/              # Hibernate Entities (User, Job, Application)
│   │   ├── repository/          # Spring Data JPA Repositories
│   │   ├── service/             # Business Logic
│   │   ├── security/            # JWT, Spring Security Config
│   │   └── dto/                 # Data Transfer Objects
│   └── src/main/resources/
│       └── application.properties
│
├── job-portal-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/          # Navbar, Footer, JobCard, ProtectedRoute
│   │   ├── pages/               # HomePage, JobsPage, LoginPage, Dashboards...
│   │   ├── context/             # Auth Context (React Context API)
│   │   └── services/            # Axios API calls
│   └── public/
│
└── database/
    └── setup.sql                # MySQL setup script
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

---

### 1. Database Setup

```sql
-- In MySQL shell or MySQL Workbench:
CREATE DATABASE job_portal_db;
```

---

### 2. Backend Setup

```bash
cd job-portal-backend

# Update database credentials in:
# src/main/resources/application.properties
#   spring.datasource.username=root
#   spring.datasource.password=YOUR_PASSWORD

# Run the application
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080`

---

### 3. Frontend Setup

```bash
cd job-portal-frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend starts at: `http://localhost:3000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| POST   | /api/auth/register  | Register new user  |
| POST   | /api/auth/login     | Login user         |

### Jobs
| Method | Endpoint             | Description              | Auth         |
|--------|----------------------|--------------------------|--------------|
| GET    | /api/jobs            | Get all active jobs       | Public       |
| GET    | /api/jobs/{id}       | Get job by ID             | Public       |
| GET    | /api/jobs/search     | Search jobs by keyword    | Public       |
| GET    | /api/jobs/filter     | Filter jobs               | Public       |
| POST   | /api/jobs/post       | Post a new job            | EMPLOYER     |
| GET    | /api/jobs/my-jobs    | Get employer's jobs       | EMPLOYER     |
| PUT    | /api/jobs/{id}       | Update job                | EMPLOYER     |
| DELETE | /api/jobs/{id}       | Delete job                | EMPLOYER     |

### Applications
| Method | Endpoint                          | Description               | Auth         |
|--------|-----------------------------------|---------------------------|--------------|
| POST   | /api/applications/apply           | Apply for a job            | JOB_SEEKER   |
| GET    | /api/applications/my-applications | Get my applications        | JOB_SEEKER   |
| GET    | /api/applications/job/{jobId}     | Get applications for a job | EMPLOYER     |
| PUT    | /api/applications/{id}/status     | Update application status  | EMPLOYER     |

---

## 🗄️ Database Schema

```
users            jobs              applications
--------         --------          --------
id (PK)          id (PK)           id (PK)
fullName         title             job_id (FK)
email            companyName       applicant_id (FK)
password         location          coverLetter
role             jobType           resumeUrl
phone            workMode          status
location         description       employerNote
bio              requirements      appliedAt
resumeUrl        salaryRange       
companyName      experienceLevel   
createdAt        category          
                 deadline          
                 status            
                 posted_by (FK)    
                 createdAt         
```

---

## 👨‍💻 Author

Built for portfolio/resume purposes. Feel free to fork, star ⭐, and customize!

---

## 📄 License

MIT License - Free to use for personal and commercial projects.
