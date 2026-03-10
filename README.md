# WorkZen

WorkZen is a **full-stack team task distribution system** built with the **MERN stack (MongoDB, Express, React, Node.js)**.

It enables teams to **manage projects, assign tasks, track progress, and collaborate efficiently** through a **Kanban-style task board**.

The system implements **secure authentication, role-based permissions, REST APIs, and real-time UI updates**, demonstrating how a modern production-style web application is built.

---

# Live Demo

*Later After Deployment*

---

# Key Features

## Authentication & Security
- JWT-based authentication
- Secure password hashing using **bcrypt**
- Protected routes
- Token verification middleware

## Role-Based Access Control

### Admin
- Create projects
- Assign project members
- Create and assign tasks
- Set task priority and deadlines

### Team Members
- View assigned tasks
- Update task status
- Track project progress

---

## Project Management
- Create multiple projects
- Assign members to projects
- Project-specific task boards
- Organized task distribution across teams

---

## Task Management
Each task includes:

- Title
- Description
- Assigned user
- Status tracking
- Priority level
- Deadline

---

## Kanban Task Board

Tasks are visually organized into three columns:

- Todo
- In Progress
- Done

Updating the task status automatically moves the task between columns.

---

## Real-Time UI Updates

Task updates reflect instantly in the UI without refreshing the page.

---

# Tech Stack

## Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- JSON Web Tokens (JWT)
- bcrypt

## Development Tools
- Git & GitHub
- MongoDB Atlas
- Postman
- VS Code

---

# Architecture Overview

WorkZen follows a **clean full-stack architecture** separating frontend and backend logic.

├── client/ # React Frontend
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── context
│ │ ├── pages
│ │ ├── layouts
│ │ └── App.jsx
│
├── server/ # Node.js Backend
│ ├── src
│ │ ├── controllers
│ │ ├── middleware
│ │ ├── models
│ │ ├── routes
│ │ └── config
│ │
│ └── server.js
│
├── .gitignore




---

# API Endpoints

## Authentication
POST /api/auth/register
POST /api/auth/login


## Projects

POST /api/projects
GET /api/projects
GET /api/projects/:id


## Tasks
POST /api/tasks
GET /api/tasks/project/:projectId
PATCH /api/tasks/:id


---

# Installation & Setup

## 1. Clone Repository

---

## 2. Backend Setup
cd server
npm install

Create a `.env` file inside the **server folder**.
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the backend server:
npm run dev


---

## 3. Frontend Setup

Open a new terminal.
cd client
npm install
npm run dev


---

# Screenshots

*(Add screenshots here after deployment)*


# Why This Project Matters

WorkZen demonstrates the ability to build a **production-style full-stack application** implementing:

- Secure authentication
- Role-based access control
- RESTful API architecture
- Database modeling with MongoDB
- State management in React
- Clean project structure

This project simulates a **real team workflow management system**, not just a simple CRUD application.

---

# Author

Name: **ANSH KHARE**

GitHub:  
https://github.com/ansh35

---
# License

This project is licensed under the MIT License.
