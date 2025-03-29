# MERN Stack Portfolio Project

## Introduction

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) portfolio management application that enables users to create and manage their portfolio, including education, experience, projects, skills, and social links.

## Features

- **User Authentication:** Secure login and registration system using JWT.
- **Portfolio Management:** Add, update, and delete portfolio details.
- **Education & Experience Tracking:** Manage education and work experience.
- **Projects & Skills:** Showcase projects and skills with descriptions.
- **Social Links Integration:** Add social media links.
- **Contact Form:** Allows users to send messages securely.
- **REST API with JWT Authentication.**
- **Swagger API Documentation for easy API testing.**
- **Bootstrap for responsive UI.**
- **Redis for rate limiting and preventing abuse on contact forms.**
- **Security Enhancements:** Implemented Helmet, CORS, and Compression.

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
- Helmet, CORS, and Compression for security and performance
- **Redis for rate limiting**

## Installation

### Prerequisites:

- Node.js installed
- MongoDB installed and running
- Redis installed and running

### Steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/saurabh3569/portfolio.git
   cd portfolio
   ```

2. **Install backend dependencies:**

   ```sh
   cd server
   yarn install
   ```

3. **Create a `.env` file** in the `server` directory and add:

   ```sh
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_ACCESS_EXPIRATION_MINUTES=300
   JWT_REFRESH_EXPIRATION_DAYS=30
   REDIS_DOCKER=redis
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_URL=your_redis_url (for production)
   ```

4. **Start the backend server:**

   ```sh
   yarn dev
   ```

5. **Install frontend dependencies:**

   ```sh
   cd ../client
   yarn install
   ```

6. **Create a `.env` file** in the `client` directory and add:

   ```sh
   REACT_APP_API_URL=http://localhost:5000/v1
   ```

7. **Start the frontend:**
   ```sh
   yarn start
   ```

## Running with Docker

### Prerequisites:

- Docker installed
- Docker Compose installed

### Steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/saurabh3569/portfolio.git
   cd portfolio
   ```
2. **Create `.env` files** for both backend and frontend as described above.
3. **Start the application using Docker Compose:**
   ```sh
   docker-compose up --build
   ```
4. The application will be accessible at:
   - **Backend:** `http://localhost:5000`
   - **Frontend:** `http://localhost:3000`
   - **MongoDB:** `mongodb://localhost:27017`
   - **Redis:** `redis://localhost:6379`

## API Endpoints

| Feature             | Endpoint                              |
| ------------------- | ------------------------------------- |
| **Authentication**  | `/v1/auth/register`, `/v1/auth/login` |
| **User Management** | `/v1/user`                            |
| **Portfolio**       | `/v1/portfolio`                       |
| **Education**       | `/v1/education`                       |
| **Experience**      | `/v1/experience`                      |
| **Projects**        | `/v1/project`                         |
| **Skills**          | `/v1/skill`                           |
| **Social Links**    | `/v1/social-link`                     |
| **Contact**         | `/v1/contact`                         |

## Rate Limiting

To prevent abuse, **Redis-based rate limiting** has been implemented for the contact form API (`/v1/contact`). If too many requests are made in a short period, additional requests will be temporarily blocked.

## Running in Production

To deploy the application:

- **Backend:** Use **PM2** for process management.
- **Frontend:** Deploy using **Vercel, Netlify, or any hosting service**.
- **Environment Variables:** Configure variables correctly for production.

## License

This project is licensed under the **MIT License**.
