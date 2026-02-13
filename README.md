# NestJS Student Management System

A complete NestJS-based Student Management System API with modular architecture, JWT authentication, and MongoDB integration.

## 🚀 Features

- **Authentication Module**: User registration and login with JWT tokens
- **Students Module**: Complete CRUD operations for student management
- **Courses Module**: Course management with full CRUD operations
- **Enrollment Module**: Manage student-course enrollments with relationships
- **JWT Authentication**: Secure API endpoints with JWT guards
- **MongoDB**: NoSQL database with Mongoose ODM
- **DTO Validation**: Request validation using class-validator
- **Error Handling**: Comprehensive error handling and response formatting

## 📁 Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── students/
│   ├── dto/
│   │   ├── create-student.dto.ts
│   │   └── update-student.dto.ts
│   ├── schemas/
│   │   └── student.schema.ts
│   ├── students.controller.ts
│   ├── students.service.ts
│   └── students.module.ts
├── courses/
│   ├── dto/
│   │   ├── create-course.dto.ts
│   │   └── update-course.dto.ts
│   ├── schemas/
│   │   └── course.schema.ts
│   ├── courses.controller.ts
│   ├── courses.service.ts
│   └── courses.module.ts
├── enrollment/
│   ├── dto/
│   │   └── create-enrollment.dto.ts
│   ├── schemas/
│   │   └── enrollment.schema.ts
│   ├── enrollment.controller.ts
│   ├── enrollment.service.ts
│   └── enrollment.module.ts
├── common/
│   ├── decorators/
│   │   └── public.decorator.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── transform.interceptor.ts
│   └── pipes/
│       └── validation.pipe.ts
├── config/
│   └── mongodb.config.ts
├── app.module.ts
└── main.ts
```

## 🛠️ Technology Stack

- **NestJS** (latest)
- **TypeScript** + ES6
- **Mongoose** + MongoDB
- **JWT** authentication
- **bcrypt** for password hashing
- **class-validator** + DTOs
- **ConfigModule** for environment variables

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```env
   # MongoDB Configuration
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/student_management_db
   
   # Or MongoDB Atlas (Cloud)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management_db

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Set up MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Start MongoDB service
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get connection string
   - Update `MONGODB_URI` in `.env` file
   
   **Note**: MongoDB will automatically create the database and collections when you first insert data. No manual database creation needed!

5. **Run the application**
   ```bash
   npm run start:dev
   ```

   The application will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication (Public)

- `POST /auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Students (Protected - Requires JWT)

- `POST /students` - Create a new student
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `PATCH /students/:id` - Update student
- `DELETE /students/:id` - Delete student

**Example Create Student:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "class": "Grade 10",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Courses (Protected - Requires JWT)

- `POST /courses` - Create a new course
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `PATCH /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

**Example Create Course:**
```json
{
  "name": "Mathematics",
  "description": "Advanced Mathematics Course",
  "durationMonths": 6
}
```

### Enrollment (Protected - Requires JWT)

- `POST /enrollment` - Enroll student into course
- `GET /enrollment/student/:studentId` - Get all courses for a student
- `GET /enrollment/course/:courseId` - Get all students in a course
- `DELETE /enrollment/:id` - Remove enrollment by ID
- `DELETE /enrollment/student/:studentId/course/:courseId` - Remove enrollment by student and course

**Example Create Enrollment:**
```json
{
  "studentId": "uuid-here",
  "courseId": "uuid-here"
}
```

## 🔐 Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Database Schema

### Users Collection
- `_id` (ObjectId - auto-generated)
- `email` (unique, indexed)
- `password` (hashed)
- `createdAt` (auto-generated)
- `updatedAt` (auto-generated)

### Students Collection
- `_id` (ObjectId - auto-generated)
- `name`
- `email` (unique, indexed)
- `age`
- `class`
- `phone`
- `address`
- `createdAt` (auto-generated)
- `updatedAt` (auto-generated)

### Courses Collection
- `_id` (ObjectId - auto-generated)
- `name`
- `description`
- `durationMonths`
- `createdAt` (auto-generated)
- `updatedAt` (auto-generated)

### Enrollments Collection
- `_id` (ObjectId - auto-generated)
- `studentId` (ObjectId reference to Student)
- `courseId` (ObjectId reference to Course)
- `enrollmentDate`
- `createdAt` (auto-generated)
- **Unique Index**: `{ studentId: 1, courseId: 1 }` (prevents duplicate enrollments)

## 🧪 Testing the API

### 1. Register a user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 3. Create a student (use token from login)
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "age":20,
    "class":"Grade 10",
    "phone":"1234567890",
    "address":"123 Main St"
  }'
```

## 🏗️ Development

- **Start development server**: `npm run start:dev`
- **Build for production**: `npm run build`
- **Start production**: `npm run start:prod`
- **Run linting**: `npm run lint`
- **Run tests**: `npm run test`

## 📦 Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## 🔒 Security Notes

- Change the `JWT_SECRET` in production
- Use strong passwords
- Enable HTTPS in production
- Regularly update dependencies
- Use environment variables for sensitive data

## 📄 License

MIT

## 👨‍💻 Author

Student Management System - Built with NestJS

---

**Happy Coding! 🚀**
