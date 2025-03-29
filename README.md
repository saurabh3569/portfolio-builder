# MERN Stack Portfolio Project

## Introduction

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) portfolio management application that allows users to create and manage their portfolio, including education, experience, projects, skills, and social links.

## Features

- **User Authentication:** Secure login and registration system
- **Portfolio Management:** Add, update, and delete portfolio details
- **Education & Experience Tracking:** Manage education and work experience
- **Projects & Skills:** Showcase projects and skills
- **Social Links Integration:** Add social media links
- **Contact Form:** Allow users to send messages
- **REST API with JWT Authentication**
- **Swagger API Documentation**
- **Bootstrap for Styling**

## Tech Stack

### Frontend:

- React.js
- Bootstrap

### Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Validation Middleware
- Swagger API Documentation
- Helmet, CORS, Compression for security and performance

## Installation

### Prerequisites:

- Node.js installed
- MongoDB installed and running

### Steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/saurabh3569/portfolio.git
   cd your-repo
   ```
2. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
3. Create a `.env` file in the server directory and add:
   ```sh
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_ACCESS_EXPIRATION_MINUTES=300
   JWT_REFRESH_EXPIRATION_DAYS=30
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. Install frontend dependencies:
   ```sh
   cd ../client
   npm install
   ```
6. Create a `.env` file in the client directory and add:
   ```sh
   REACT_APP_API_URL=http://localhost:5000/v1
   ```
7. Start the frontend:
   ```sh
   npm start
   ```

## Running with Docker

### Prerequisites:

- Docker installed
- Docker Compose installed

### Steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/saurabh3569/portfolio.git
   cd your-repo
   ```
2. Create `.env` files for both backend and frontend as described in the installation steps.
3. Start the application using Docker Compose:
   ```sh
   docker-compose up --build
   ```
4. The application will be accessible at:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`
   - MongoDB: `mongodb://localhost:27017`

## API Endpoints

- **Authentication:** `/v1/auth/register`, `/v1/auth/login`
- **User Management:** `/v1/user`
- **Portfolio:** `/v1/portfolio`
- **Education:** `/v1/education`
- **Experience:** `/v1/experience`
- **Projects:** `/v1/project`
- **Skills:** `/v1/skill`
- **Social Links:** `/v1/social-link`
- **Contact:** `/v1/contact`

## Running in Production

To deploy the application, configure environment variables and use tools like **PM2** for backend and **Vercel/Netlify** for frontend deployment.

## License

This project is licensed under the MIT License.
