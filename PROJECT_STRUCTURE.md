# Project Structure

```
studentMS/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── students/
│   │   ├── dto/
│   │   │   ├── create-student.dto.ts
│   │   │   └── update-student.dto.ts
│   │   ├── entities/
│   │   │   └── student.entity.ts
│   │   ├── students.controller.ts
│   │   ├── students.service.ts
│   │   └── students.module.ts
│   │
│   ├── courses/
│   │   ├── dto/
│   │   │   ├── create-course.dto.ts
│   │   │   └── update-course.dto.ts
│   │   ├── entities/
│   │   │   └── course.entity.ts
│   │   ├── courses.controller.ts
│   │   ├── courses.service.ts
│   │   └── courses.module.ts
│   │
│   ├── enrollment/
│   │   ├── dto/
│   │   │   └── create-enrollment.dto.ts
│   │   ├── entities/
│   │   │   └── enrollment.entity.ts
│   │   ├── enrollment.controller.ts
│   │   ├── enrollment.service.ts
│   │   └── enrollment.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   └── public.decorator.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   │
│   ├── config/
│   │   └── ormconfig.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.json
└── PROJECT_STRUCTURE.md
```

## Module Breakdown

### 🔐 Auth Module
- **Purpose**: User authentication and authorization
- **Features**: Registration, Login, JWT token generation
- **Public Routes**: `/auth/register`, `/auth/login`

### 👥 Students Module
- **Purpose**: Student management
- **Features**: CRUD operations for students
- **Protected Routes**: All routes require JWT authentication

### 📚 Courses Module
- **Purpose**: Course management
- **Features**: CRUD operations for courses
- **Protected Routes**: All routes require JWT authentication

### 📝 Enrollment Module
- **Purpose**: Student-Course enrollment management
- **Features**: 
  - Enroll students into courses
  - Get all courses for a student
  - Get all students in a course
  - Remove enrollments
- **Protected Routes**: All routes require JWT authentication

### 🛠️ Common Module
- **Guards**: JWT authentication guard
- **Filters**: Exception handling filters
- **Interceptors**: Response transformation
- **Pipes**: Validation pipes
- **Decorators**: Public route decorator

### ⚙️ Config Module
- **Purpose**: Application configuration
- **Features**: TypeORM database configuration
