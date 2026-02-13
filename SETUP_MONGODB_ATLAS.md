# MongoDB Atlas Setup Instructions

## 🔧 Step-by-Step Configuration

### Step 1: Create Your `.env` File

Create a `.env` file in the root directory of your project (`D:\Node\studentMS\.env`).

### Step 2: Configure MongoDB Atlas Connection String

Copy the following template to your `.env` file and replace the placeholders:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://PR-Test:YOUR_PASSWORD_HERE@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Step 3: Replace Placeholders

1. **Replace `YOUR_PASSWORD_HERE`** with your actual MongoDB Atlas database user password (for user `PR-Test`)
2. **Database Name**: The connection string includes `student_management_db` as the database name. MongoDB Atlas will create this database automatically when you first insert data.

**Example** (if your password is `MySecurePass123`):
```env
MONGODB_URI=mongodb+srv://PR-Test:MySecurePass123@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

### Step 4: Important Notes

⚠️ **Password Encoding**: If your password contains special characters, you may need to URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`

**Example**: If your password is `P@ssw0rd#123`, it should be `P%40ssw0rd%23123`

### Step 5: Verify MongoDB Atlas Network Access

Make sure your IP address is whitelisted in MongoDB Atlas:

1. Go to MongoDB Atlas Dashboard
2. Click on **Network Access** (left sidebar)
3. Click **Add IP Address**
4. For development, you can add `0.0.0.0/0` (allows all IPs - **use only for development**)
5. For production, add your specific IP address

### Step 6: Test the Connection

Run your application:

```bash
npm run start:dev
```

You should see:
```
[Nest] INFO [MongooseModule] Successfully connected to MongoDB
Application is running on: http://localhost:3000
```

## 🔍 Troubleshooting

### Connection Timeout Error

**Error**: `MongooseServerSelectionError: connect ETIMEDOUT`

**Solution**: 
- Check your internet connection
- Verify IP address is whitelisted in MongoDB Atlas
- Check firewall settings

### Authentication Failed

**Error**: `MongoServerError: Authentication failed`

**Solution**:
- Verify username is correct: `PR-Test`
- Verify password is correct (check for typos)
- URL-encode special characters in password
- Ensure database user has proper permissions

### Connection String Format

Make sure your connection string follows this format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

## ✅ Your Current Configuration

- **Username**: `PR-Test`
- **Cluster**: `cluster0.wlnk8po.mongodb.net`
- **Database Name**: `student_management_db` (will be created automatically)

## 🎉 Success!

Once configured correctly, your NestJS application will automatically:
- Connect to MongoDB Atlas
- Create the database and collections when you first insert data
- Handle all database operations seamlessly
