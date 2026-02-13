# Swagger API Documentation Setup Guide

## 📚 Complete Step-by-Step Guide

This guide will walk you through integrating Swagger (OpenAPI) documentation into your NestJS Student Management System.

---

## ✅ Step 1: Install Dependencies

Swagger dependencies have been installed:

```bash
npm install @nestjs/swagger
```

**Status**: ✅ Already completed

---

## ✅ Step 2: Configure Swagger in main.ts

Swagger has been configured in `src/main.ts` with:

- API Title: "Student Management System API"
- API Description: Comprehensive API documentation
- JWT Bearer Authentication support
- API Tags for organization
- Swagger UI at `/api` endpoint

**Status**: ✅ Already completed

---

## ✅ Step 3: Add Swagger Decorators

All controllers and DTOs have been updated with Swagger decorators:

### Controllers Updated:
- ✅ `src/auth/auth.controller.ts`
- ✅ `src/students/students.controller.ts`
- ✅ `src/courses/courses.controller.ts`
- ✅ `src/enrollment/enrollment.controller.ts`

### DTOs Updated:
- ✅ `src/auth/dto/register.dto.ts`
- ✅ `src/auth/dto/login.dto.ts`
- ✅ `src/students/dto/create-student.dto.ts`
- ✅ `src/students/dto/update-student.dto.ts`
- ✅ `src/courses/dto/create-course.dto.ts`
- ✅ `src/courses/dto/update-course.dto.ts`
- ✅ `src/enrollment/dto/create-enrollment.dto.ts`

**Status**: ✅ Already completed

---

## 🚀 Step 4: Start Your Application

```bash
npm run start:dev
```

---

## 🌐 Step 5: Access Swagger UI

Once your application is running, open your browser and navigate to:

```
http://localhost:3000/api
```

You'll see the Swagger UI interface with all your API endpoints documented!

---

## 📖 How to Use Swagger UI

### 1. **View All Endpoints**

Swagger UI displays all your API endpoints organized by tags:
- **Authentication** - Register and Login
- **Students** - Student CRUD operations
- **Courses** - Course CRUD operations
- **Enrollment** - Enrollment management

### 2. **Test Authentication Endpoints**

#### Register a User:
1. Click on **POST /auth/register**
2. Click **Try it out**
3. Fill in the request body:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
4. Click **Execute**
5. Copy the `accessToken` from the response

#### Login:
1. Click on **POST /auth/login**
2. Click **Try it out**
3. Fill in the request body:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
4. Click **Execute**
5. Copy the `accessToken` from the response

### 3. **Authorize with JWT Token**

1. Click the **Authorize** button (🔒) at the top right
2. Enter your JWT token (from login/register response)
3. Click **Authorize**
4. Click **Close**

Now all protected endpoints will automatically include the JWT token!

### 4. **Test Protected Endpoints**

After authorization, you can test any protected endpoint:

#### Create a Student:
1. Click on **POST /students**
2. Click **Try it out**
3. Fill in the request body:
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
4. Click **Execute**

#### Get All Students:
1. Click on **GET /students**
2. Click **Try it out**
3. Click **Execute**

---

## 🔑 Key Swagger Features

### 1. **JWT Authentication**

Swagger is configured with Bearer JWT authentication:
- Click **Authorize** button
- Enter your JWT token
- Token persists across requests (thanks to `persistAuthorization: true`)

### 2. **Request/Response Examples**

Each endpoint shows:
- Request body schema
- Response examples
- Status codes
- Error responses

### 3. **Try It Out**

- Test endpoints directly from Swagger UI
- See real-time responses
- No need for Postman or curl

### 4. **API Documentation**

- Automatic documentation generation
- Schema validation
- Type definitions

---

## 📝 Swagger Decorators Used

### Controller Decorators:
- `@ApiTags()` - Groups endpoints by tag
- `@ApiOperation()` - Describes the endpoint
- `@ApiResponse()` - Documents response types
- `@ApiBearerAuth()` - Enables JWT authentication
- `@ApiParam()` - Documents path parameters
- `@ApiBody()` - Documents request body

### DTO Decorators:
- `@ApiProperty()` - Documents required properties
- `@ApiPropertyOptional()` - Documents optional properties

---

## 🎯 Example: Complete API Flow

### Step 1: Register
```
POST /auth/register
Body: { "email": "user@example.com", "password": "password123" }
Response: { "accessToken": "eyJhbGci..." }
```

### Step 2: Authorize in Swagger
- Click **Authorize** button
- Paste the `accessToken`
- Click **Authorize**

### Step 3: Create Student
```
POST /students
Headers: Authorization: Bearer eyJhbGci...
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "class": "Grade 10",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Step 4: Create Course
```
POST /courses
Headers: Authorization: Bearer eyJhbGci...
Body: {
  "name": "Mathematics",
  "description": "Advanced Math Course",
  "durationMonths": 6
}
```

### Step 5: Enroll Student
```
POST /enrollment
Headers: Authorization: Bearer eyJhbGci...
Body: {
  "studentId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012"
}
```

---

## 🔧 Customization Options

### Change Swagger Path

Edit `src/main.ts`:
```typescript
SwaggerModule.setup('docs', app, document); // Change 'api' to 'docs'
```

### Add More API Info

Edit `src/main.ts`:
```typescript
const config = new DocumentBuilder()
  .setTitle('Student Management System API')
  .setDescription('Your custom description')
  .setVersion('1.0')
  .setContact('Your Name', 'https://yourwebsite.com', 'your@email.com')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .addServer('http://localhost:3000', 'Development server')
  .addServer('https://api.yourdomain.com', 'Production server')
  // ... rest of config
```

### Export OpenAPI JSON

Access the OpenAPI JSON specification at:
```
http://localhost:3000/api-json
```

You can use this JSON with:
- Postman
- Insomnia
- API clients
- Code generators

---

## 📱 Mobile/Alternative Access

### Swagger JSON Endpoint:
```
http://localhost:3000/api-json
```

### Swagger YAML Endpoint:
```
http://localhost:3000/api-yaml
```

---

## ✅ Verification Checklist

- [x] Swagger dependencies installed
- [x] Swagger configured in main.ts
- [x] All controllers have Swagger decorators
- [x] All DTOs have Swagger decorators
- [x] JWT authentication configured
- [x] API tags organized
- [x] Response examples added
- [x] Error responses documented

---

## 🎉 Success!

Your Swagger documentation is now live at:
```
http://localhost:3000/api
```

## 📚 Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)

---

## 🐛 Troubleshooting

### Swagger UI Not Loading
- Make sure the application is running: `npm run start:dev`
- Check the console for errors
- Verify the port is correct (default: 3000)

### JWT Token Not Working
- Make sure you copied the full token (including `eyJhbGci...`)
- Check if token has expired
- Try logging in again to get a fresh token

### Endpoints Not Showing
- Verify all controllers have `@ApiTags()` decorator
- Check that `@Controller()` decorator is present
- Restart the application

---

**Happy API Testing! 🚀**
