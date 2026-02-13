# Quick Start: MongoDB Integration

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure MongoDB Connection

Create/Update `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/student_management_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

**OR use MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Run Application
```bash
npm run start:dev
```

That's it! 🎉

---

## 📝 What Changed?

### Dependencies
- ❌ Removed: `@nestjs/typeorm`, `typeorm`, `mysql2`
- ✅ Added: `@nestjs/mongoose`, `mongoose`

### Code Changes
- **Entities → Schemas**: All `entities/` folders now contain `schemas/`
- **TypeORM → Mongoose**: All services use Mongoose models
- **UUID → ObjectId**: IDs are now MongoDB ObjectIds
- **Repository → Model**: Changed from repositories to models

### File Structure
```
Before (TypeORM):          After (Mongoose):
entities/                  schemas/
  user.entity.ts    →        user.schema.ts
  student.entity.ts →        student.schema.ts
```

---

## 🔑 Key Differences

| TypeORM (MySQL) | Mongoose (MongoDB) |
|----------------|-------------------|
| `user.id` | `user._id.toString()` |
| `repository.findOne()` | `model.findById()` |
| `repository.save()` | `model.create()` or `document.save()` |
| `relations: ['enrollments']` | `.populate('enrollments')` |

---

## ✅ Verify It Works

1. **Check connection**: Look for `Successfully connected to MongoDB` in console
2. **Test register**: `POST /auth/register`
3. **Test login**: `POST /auth/login`
4. **Create student**: `POST /students` (with JWT token)

---

## 📚 Full Documentation

See `MONGODB_MIGRATION_GUIDE.md` for detailed step-by-step instructions.
