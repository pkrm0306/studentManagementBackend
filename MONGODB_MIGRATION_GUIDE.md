# MongoDB Integration Guide - Step by Step

This guide will walk you through integrating MongoDB into your NestJS Student Management System.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration Changes](#configuration-changes)
4. [Code Changes Summary](#code-changes-summary)
5. [Testing the Integration](#testing-the-integration)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have:

- Node.js (v18 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

---

## 📦 Step 1: Install MongoDB Dependencies

Remove old MySQL/TypeORM dependencies and install MongoDB packages:

```bash
# Remove old dependencies
npm uninstall @nestjs/typeorm typeorm mysql2 uuid @types/uuid

# Install MongoDB dependencies
npm install @nestjs/mongoose mongoose
npm install --save-dev @types/mongoose
```

---

## ⚙️ Step 2: Update Environment Variables

Update your `.env` file to use MongoDB connection string:

```env
# MongoDB Configuration (Choose one option)

# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/student_management_db

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management_db?retryWrites=true&w=majority

# Option 3: MongoDB with Authentication
# MONGODB_URI=mongodb://username:password@localhost:27017/student_management_db?authSource=admin

# JWT Configuration (unchanged)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration (unchanged)
PORT=3000
NODE_ENV=development
```

---

## 🗄️ Step 3: Set Up MongoDB Database

### Option A: Local MongoDB Installation

1. **Install MongoDB** (if not already installed):
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**:
   ```bash
   # Windows (as Administrator)
   net start MongoDB

   # macOS/Linux
   mongod --dbpath /path/to/data/directory
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   # or
   mongo
   ```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred cloud provider and region

3. **Configure Database Access**:
   - Go to "Database Access"
   - Add a new database user
   - Set username and password

4. **Configure Network Access**:
   - Go to "Network Access"
   - Add IP Address (0.0.0.0/0 for development, specific IPs for production)

5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update `MONGODB_URI` in `.env` file

---

## 🔄 Step 4: Code Changes Summary

The following files have been updated:

### ✅ Updated Files:

1. **package.json** - Dependencies changed from TypeORM to Mongoose
2. **src/config/mongodb.config.ts** - New MongoDB configuration file
3. **src/app.module.ts** - Changed from TypeORM to MongooseModule
4. **All Entity Files** - Converted to Mongoose Schemas:
   - `src/auth/schemas/user.schema.ts`
   - `src/students/schemas/student.schema.ts`
   - `src/courses/schemas/course.schema.ts`
   - `src/enrollment/schemas/enrollment.schema.ts`

5. **All Service Files** - Updated to use Mongoose Models:
   - `src/auth/auth.service.ts`
   - `src/students/students.service.ts`
   - `src/courses/courses.service.ts`
   - `src/enrollment/enrollment.service.ts`

6. **All Module Files** - Updated to use MongooseModule:
   - `src/auth/auth.module.ts`
   - `src/students/students.module.ts`
   - `src/courses/courses.module.ts`
   - `src/enrollment/enrollment.module.ts`

### 📝 Key Changes:

- **UUID → ObjectId**: MongoDB uses ObjectId instead of UUID for document IDs
- **Repository Pattern → Model Pattern**: Changed from TypeORM repositories to Mongoose models
- **Relationships**: Changed from TypeORM relations to Mongoose populate
- **Timestamps**: MongoDB automatically handles `createdAt` and `updatedAt` with `timestamps: true`

---

## 🚀 Step 5: Install Dependencies and Run

```bash
# Install all dependencies
npm install

# Start the application
npm run start:dev
```

The application will automatically:
- Connect to MongoDB
- Create collections (tables) automatically when first document is inserted
- No need for manual database schema creation!

---

## 🧪 Step 6: Testing the Integration

### Test MongoDB Connection

1. **Start the application**:
   ```bash
   npm run start:dev
   ```

2. **Check console output** - You should see:
   ```
   [Nest] INFO [MongooseModule] Successfully connected to MongoDB
   Application is running on: http://localhost:3000
   ```

### Test API Endpoints

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create a student** (use token from login):
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

### Verify Data in MongoDB

**Using MongoDB Compass (GUI)**:
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using: `mongodb://localhost:27017`
3. Navigate to `student_management_db` database
4. View collections: `users`, `students`, `courses`, `enrollments`

**Using MongoDB Shell**:
```bash
mongosh
use student_management_db
db.students.find().pretty()
db.users.find().pretty()
```

---

## 🔍 Key Differences: TypeORM vs Mongoose

| Feature | TypeORM (MySQL) | Mongoose (MongoDB) |
|---------|----------------|-------------------|
| **ID Type** | UUID (string) | ObjectId |
| **ID Access** | `entity.id` | `document._id` or `document._id.toString()` |
| **Repository** | `@InjectRepository(Entity)` | `@InjectModel(Schema.name)` |
| **Find One** | `repository.findOne({ where: { id } })` | `model.findById(id)` |
| **Find All** | `repository.find()` | `model.find().exec()` |
| **Create** | `repository.create()` + `save()` | `model.create()` |
| **Update** | `Object.assign()` + `save()` | `Object.assign()` + `save()` |
| **Delete** | `repository.remove()` | `model.findByIdAndDelete()` |
| **Relations** | `relations: ['enrollments']` | `.populate('enrollments')` |
| **Timestamps** | `@CreateDateColumn()` | `timestamps: true` in schema |

---

## 🐛 Troubleshooting

### Issue 1: MongoDB Connection Failed

**Error**: `MongooseError: connect ECONNREFUSED`

**Solutions**:
- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in `.env` file
- Check MongoDB port (default: 27017)
- For MongoDB Atlas: Check network access settings

### Issue 2: Authentication Failed

**Error**: `MongoServerError: Authentication failed`

**Solutions**:
- Verify username and password in connection string
- Check database user permissions in MongoDB Atlas
- Ensure `authSource` parameter is correct

### Issue 3: Cannot Find Module '@nestjs/mongoose'

**Error**: `Cannot find module '@nestjs/mongoose'`

**Solution**:
```bash
npm install @nestjs/mongoose mongoose
npm install --save-dev @types/mongoose
```

### Issue 4: ObjectId Validation Error

**Error**: `Cast to ObjectId failed`

**Solution**:
- Ensure IDs are valid MongoDB ObjectIds (24 hex characters)
- Use `new Types.ObjectId(id)` when creating references
- Verify ID format in API requests

### Issue 5: Duplicate Key Error

**Error**: `E11000 duplicate key error`

**Solution**:
- MongoDB enforces unique indexes
- Check for duplicate email addresses or other unique fields
- Use MongoDB Compass to view and clean duplicate documents

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [NestJS Mongoose Module](https://docs.nestjs.com/techniques/mongodb)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

## ✅ Migration Checklist

- [ ] Installed MongoDB dependencies
- [ ] Updated `.env` file with MongoDB URI
- [ ] MongoDB server is running (local or Atlas)
- [ ] Removed old TypeORM dependencies
- [ ] All code files updated to use Mongoose
- [ ] Application starts without errors
- [ ] Can register/login users
- [ ] Can create students, courses, enrollments
- [ ] Data persists in MongoDB

---

## 🎉 Success!

Once you've completed all steps and tested the endpoints, your NestJS application is now fully integrated with MongoDB!

The application will automatically create collections and indexes as needed. No manual database setup required!

---

**Need Help?** Check the troubleshooting section or refer to the MongoDB/Mongoose documentation.
