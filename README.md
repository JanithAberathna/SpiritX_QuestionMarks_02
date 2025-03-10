Spirit11

Overview

This project is built using React (Vite) + JavaScript for the frontend, Node.js & Express.js for the backend, and MongoDB Atlas for the database. It includes authentication using bcrypt for password hashing and JWT tokens for secure user sessions.

Guidelines For Stage

Set up the environment following the instructions below.
Ensure all dependencies are installed correctly.
The project should be tested on the specified framework versions.
Follow the database setup instructions carefully to avoid misconfigurations.
Maintain consistency in code styling and follow best practices.
Instructions to Run the Project

Prerequisites

Node.js (v16+ recommended)
MongoDB Atlas account
Git
Any preferred code editor (e.g., VS Code)
Steps to Run

Clone the repository git clone https://github.com/your-repo-name.git cd your-repo-name

Install Dependencies

Backend Setup cd Server npm install

Frontend Setup cd Client npm install

Start the Server
cd Server npm start By default, the backend runs on http://localhost:3001

Start the Frontend
cd Client npm run dev By default, the frontend runs on http://localhost:5173

Assumptions Made During Development

Users are required to provide a unique username for registration.
Passwords are securely hashed before storage.
JWT tokens are used for authentication and authorization.
The frontend and backend run separately on different ports.
MongoDB Atlas is used as the cloud database for ease of deployment.
Additional Features Implemented

Secure Authentication: Password hashing using bcrypt JWT-based authentication
Environment variables for secure configurations
CORS enabled for frontend-backend communication
