# 🔐 From Zero to Full Stack — Chapter 6: Authentication with JWT

> Learn how to secure a Full-Stack application using JWT, bcrypt, and React Router.

Welcome to **Chapter 6** of the **From Zero to Full Stack** series.

In the previous chapter, we deployed our Full-Stack Blog application using **Docker**, **GitHub Actions**, and **Render**, creating a professional CI/CD pipeline.

Now it's time to secure our application.

In this chapter, we'll implement a complete authentication system using **JSON Web Tokens (JWT)**. Users will be able to create accounts, securely log in, access protected resources, and interact with the application as authenticated users.

By the end of this chapter, our blog will evolve from a public application into a secure, production-ready Full-Stack application.

---

# 🎯 Objectives

By the end of this chapter, you will be able to:

- Understand Authentication vs Authorization.
- Understand how JWT works.
- Hash passwords using bcrypt.
- Create secure user accounts.
- Authenticate users.
- Generate JSON Web Tokens.
- Protect backend routes.
- Protect frontend pages.
- Implement login and signup.
- Manage authentication state in React.
- Send authenticated API requests.
- Build a secure authentication workflow.

---

# 🧠 What You'll Learn

## Authentication Fundamentals

- Authentication
- Authorization
- Stateless Authentication
- Session vs JWT
- Claims
- Access Tokens

---

## JWT

- JWT Structure
- Header
- Payload
- Signature
- Token Creation
- Token Verification
- Token Expiration
- Secure Token Storage

---

## Backend Authentication

- User Model
- Signup
- Login
- Password Hashing
- bcrypt
- jsonwebtoken
- Authentication Middleware
- Protected Routes

---

## Frontend Authentication

- React Router
- Login Page
- Signup Page
- Protected Routes
- Authentication Context
- Logout
- Authenticated Requests

---

## Security Best Practices

- Password Hashing
- Environment Variables
- Secret Keys
- Authorization Headers
- Token Expiration
- Secure Authentication Flow

---

# 🏗️ Project

In this chapter, we'll transform our Blog application into a secure platform.

Features include:

- User Registration
- User Login
- JWT Authentication
- Protected API Endpoints
- Protected Frontend Pages
- Logout
- Authenticated CRUD Operations

---

# 📚 Prerequisites

Before starting this chapter, you should have completed:

- ✅ Chapter 1 — Foundations
- ✅ Chapter 2 — Backend Fundamentals
- ✅ Chapter 3 — Backend Development
- ✅ Chapter 4 — Frontend Development
- ✅ Chapter 5 — DevOps

---

# 🛠️ Technologies

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken

## Frontend

- React
- React Router
- TanStack Query

---

# 📂 Project Structure

```text
from-zero-to-fullstack-ch6-authentication/

├── backend/
│   ├── src/
│   │   ├── db/
│   │   ├── services/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── ...
│
├── compose.yaml
└── README.md
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/XMAN-MHD/from-zero-to-fullstack-ch6-authentication.git
```

Enter the project

```bash
cd from-zero-to-fullstack-ch6-authentication
```

Start the application

```bash
docker compose up
```

Or run each application separately.

Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📝 Exercises

By the end of this chapter, you should be able to:

- Create a User model.
- Hash passwords.
- Register users.
- Authenticate users.
- Generate JWTs.
- Verify JWTs.
- Protect backend routes.
- Protect frontend routes.
- Manage authentication state.
- Send authenticated requests.

---

# 🎓 Skills Acquired

After completing this chapter, you will be able to:

- Design secure authentication systems.
- Build JWT-based authentication.
- Secure REST APIs.
- Protect React applications.
- Implement role-ready authentication architecture.
- Follow authentication best practices used in production.

---

# 🗺️ Learning Roadmap

## 🟢 Phase 1 — Foundations

- ✅ Chapter 1 — Foundations
- ✅ Chapter 2 — Backend Fundamentals
- ✅ Chapter 3 — Backend Development
- ✅ Chapter 4 — Frontend Development
- ✅ Chapter 5 — DevOps

---

## 🔵 Phase 2 — Production Applications

- ✅ Chapter 6 — Authentication
- ⏳ Chapter 7 — Server-Side Rendering
- ⏳ Chapter 8 — Search Engine Optimization
- ⏳ Chapter 9 — End-to-End Testing
- ⏳ Chapter 10 — Data Visualization

---

## 🟣 Phase 3 — Advanced Full Stack

- ⏳ Chapter 11 — GraphQL Backend
- ⏳ Chapter 12 — GraphQL Frontend
- ⏳ Chapter 13 — Real-Time Backend
- ⏳ Chapter 14 — Real-Time Frontend
- ⏳ Chapter 15 — Real-Time Persistence

---

## 🟠 Phase 4 — Next.js

- ⏳ Chapter 16 — Next.js Fundamentals
- ⏳ Chapter 17 — React Server Components
- ⏳ Chapter 18 — Advanced Next.js
- ⏳ Chapter 19 — Next.js Deployment

---

## 🔴 Phase 5 — Professional Software Engineering

- ⏳ Chapter 20 — Professional Full Stack

---

# ➡️ Next Chapter

## Chapter 7 — Server-Side Rendering

In the next chapter, we'll improve our application's performance and user experience by introducing **Server-Side Rendering (SSR)**. We'll learn how SSR works, why it's important, and how it helps deliver faster page loads while improving SEO.

---

# ⭐ Support

If this repository helps you in your learning journey, consider giving it a ⭐ on GitHub.

Happy coding! 🚀