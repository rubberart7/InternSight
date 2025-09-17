# InternSight  
A full-stack platform for college students to acquire internships, featuring a resume analyzer and other career resources. Built with Next.js, React, TypeScript, and an Express.js backend. The core feature uses a Google Gemini-powered AI to analyze and provide detailed feedback on resumes.  

---

## 🛠️ Built With  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 💻 Tech Stack  
- **Client:** React, Next.js, TypeScript, Tailwind CSS  
- **Server:** Node.js, Express.js, PostgreSQL, Prisma, bcrypt, JSON Web Tokens, Axios, cookie-parser  
- **APIs:** Google Gemini API  

---

## ✨ Features  
- **Resume Analyzer:** Get comprehensive, AI-powered feedback on your resume based on key metrics like ATS compatibility, content, tone, and structure.  
- **Detailed Scoring:** Receive a score out of 100 for your overall resume and for specific sections to quickly identify areas for improvement.  
- **Actionable Tips:** The AI provides specific "good" and "improve" tips to help you refine your resume and make it more effective.  
- **Job-Specific Analysis:** Tailor your resume feedback by providing a specific job title and description, allowing the AI to give highly relevant suggestions.  
- **User Authentication:** Secure user registration and login using JWT and bcrypt for password hashing.  

---

## ⚙️ Installation  

### Prerequisites  
- Node.js (v18 or higher)  
- npm or yarn  
- PostgreSQL database (e.g., hosted on Supabase)  

---

## Getting Started  

### Clone the repository:
```bash
git clone https://github.com/your-username/your-internsight-repo.git
cd internsight-repo
Install backend dependencies:

cd backend
npm install
Install frontend dependencies:

cd ../frontend
npm install
🔐 Environment Variables
Backend (backend/.env)

# Database Connection
DATABASE_URL="postgresql://<user>:<password>@<your-supabase-host>:<port>/<db_name>?pgbouncer=true&pool_timeout=4000&pool_max=2"
DIRECT_URL="postgresql://<user>:<password>@<your-supabase-direct-host>:<port>/<db_name>"

# JWT Secrets
ACCESS_TOKEN_SECRET="a_very_long_and_random_string_for_access_tokens"
REFRESH_TOKEN_SECRET="a_very_long_and_random_string_for_refresh_tokens"

# API Keys
GEMINI_API_KEY="your_gemini_api_key"

# Frontend URL (for CORS)
CLIENT_URL="http://localhost:3000"
Frontend (frontend/.env)

NEXT_PUBLIC_BACKEND_URL="http://localhost:4000/"
▶️ Run Locally
Backend
Navigate to the backend directory

Run the Prisma migration to set up your database schema:


npx prisma migrate dev --name init_database_schema
Start the development server:


npm run dev
Frontend
Navigate to the frontend directory

Start the development server:


npm run dev
📁 Folder Structure
pgsql
Copy code
.
├── backend/                  # Express.js backend application
│   ├── constants/
│   ├── controllers/
│   ├── libs/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
├── frontend/                 # Next.js frontend application
│   ├── .next/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── components/
│   │   ├── enter-resume/
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── public/
│   ├── .env.local
│   ├── .env.production
│   ├── .gitignore
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── README.md
🚀 Deployment
Backend (on Render)
Create a new Web Service on Render

Connect your GitHub repository for the backend

Set the Build Command: npm install && npm run build

Set the Start Command: npm start

Add all necessary environment variables from your backend/.env file to the Render dashboard

Frontend (on Vercel)
Import your GitHub repository into Vercel

Set the project settings:

Framework: Next.js

Root Directory: frontend/

Vercel will automatically build and deploy your application


