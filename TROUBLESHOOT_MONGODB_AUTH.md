# Troubleshooting MongoDB Atlas Authentication Error

## 🔴 Error: "bad auth : authentication failed"

This error means MongoDB Atlas cannot authenticate with the provided credentials.

## ✅ Step-by-Step Fix

### Step 1: Verify Your MongoDB Atlas Password

1. Go to MongoDB Atlas Dashboard
2. Click **Database Access** (left sidebar)
3. Find the user **PR-Test**
4. Click **Edit** on that user
5. **Reset the password** if you're not sure what it is
6. Copy the new password

### Step 2: Update Your `.env` File

Open `D:\Node\studentMS\.env` and update the connection string:

**Current format:**
```env
MONGODB_URI=mongodb+srv://PR-Test:YOUR_PASSWORD_HERE@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD_HERE` with your actual password**

### Step 3: URL-Encode Special Characters

If your password contains special characters, you MUST URL-encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |
| ` ` (space) | `%20` |

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Connection string: `mongodb+srv://PR-Test:MyP%40ss%23123@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority`

### Step 4: Verify Username

Make sure the username in your connection string matches exactly:
- Username: `PR-Test` (case-sensitive)

### Step 5: Check Database User Permissions

1. Go to **Database Access** in MongoDB Atlas
2. Ensure user **PR-Test** has:
   - **Atlas admin** role, OR
   - **Read and write to any database** role

### Step 6: Test Connection String Format

Your connection string should look like this:
```
mongodb+srv://USERNAME:PASSWORD@cluster0.wlnk8po.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Important:**
- No spaces in the connection string
- Password must be URL-encoded if it has special characters
- Database name is `student_management_db`

### Step 7: Alternative - Test with MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Try connecting with the same credentials
3. If it works in Compass but not in your app, the issue is with URL encoding

## 🔧 Quick Fix Script

If you want to quickly test, you can temporarily hardcode the connection string in `src/app.module.ts`:

```typescript
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    // Temporarily hardcode for testing
    const uri = 'mongodb+srv://PR-Test:YOUR_ENCODED_PASSWORD@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority';
    return {
      uri,
      retryWrites: true,
      w: 'majority',
    };
  },
  inject: [ConfigService],
}),
```

**Remember to remove this and use .env file after testing!**

## 📝 Common Mistakes

1. ❌ **Not URL-encoding special characters**
2. ❌ **Using wrong username** (case-sensitive)
3. ❌ **Using old/incorrect password**
4. ❌ **Extra spaces in connection string**
5. ❌ **Missing database name in connection string**

## ✅ Correct Example

If your password is `Test@123#Pass`:

**Step 1:** URL-encode: `Test%40123%23Pass`

**Step 2:** Connection string:
```
mongodb+srv://PR-Test:Test%40123%23Pass@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

**Step 3:** In `.env` file:
```env
MONGODB_URI=mongodb+srv://PR-Test:Test%40123%23Pass@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

## 🎯 Next Steps

1. Reset your MongoDB Atlas password if unsure
2. URL-encode any special characters
3. Update `.env` file
4. Restart your application: `npm run start:dev`
5. You should see: `Successfully connected to MongoDB`
