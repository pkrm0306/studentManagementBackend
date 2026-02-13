# 🔧 Fix MongoDB Authentication Error

## Error: "bad auth : authentication failed"

This means your MongoDB Atlas password is either incorrect or needs URL encoding.

---

## ✅ Quick Fix Steps

### Step 1: Get Your MongoDB Atlas Password

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **Database Access** (left sidebar)
3. Find user **PR-Test**
4. Click **Edit** → **Edit Password**
5. **Reset the password** if you're not sure what it is
6. Copy the new password

### Step 2: Encode Your Password

**Option A: Use the Helper Script** (Recommended)

```bash
node encode-password.js "YourPasswordHere"
```

This will show you the encoded password and full connection string.

**Option B: Manual Encoding**

If your password contains special characters, encode them:

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

### Step 3: Update Your `.env` File

Open `D:\Node\studentMS\.env` and update:

```env
MONGODB_URI=mongodb+srv://PR-Test:ENCODED_PASSWORD_HERE@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

Replace `ENCODED_PASSWORD_HERE` with your encoded password.

### Step 4: Verify Network Access

1. Go to MongoDB Atlas → **Network Access**
2. Make sure your IP is whitelisted (or add `0.0.0.0/0` for development)

### Step 5: Restart Application

```bash
npm run start:dev
```

You should see:
```
[Nest] INFO [MongooseModule] Successfully connected to MongoDB
```

---

## 🔍 Common Issues

### Issue 1: Password Has Special Characters

**Solution:** Always URL-encode special characters using the helper script or manual encoding table above.

### Issue 2: Wrong Username

**Solution:** Make sure username is exactly `PR-Test` (case-sensitive)

### Issue 3: Password Not Encoded

**Solution:** Even if your password doesn't have special characters, try encoding it anyway using:
```bash
node encode-password.js "YourPassword"
```

### Issue 4: Extra Spaces

**Solution:** Make sure there are NO spaces in your connection string in `.env` file.

---

## 📝 Example

**If your password is:** `Test@123#Pass`

**Step 1:** Run encoding script:
```bash
node encode-password.js "Test@123#Pass"
```

**Step 2:** Copy the output connection string to `.env`:
```env
MONGODB_URI=mongodb+srv://PR-Test:Test%40123%23Pass@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority
```

**Step 3:** Restart app:
```bash
npm run start:dev
```

---

## ✅ Success Indicators

When it works, you'll see:
- ✅ `Successfully connected to MongoDB`
- ✅ `Application is running on: http://localhost:3000`
- ✅ No authentication errors

---

## 🆘 Still Not Working?

1. **Double-check password** in MongoDB Atlas Dashboard
2. **Reset password** in MongoDB Atlas and try again
3. **Verify username** is exactly `PR-Test`
4. **Check Network Access** in MongoDB Atlas
5. **Try the connection string** in MongoDB Compass first to verify it works
