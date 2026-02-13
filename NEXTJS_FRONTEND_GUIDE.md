# Next.js Frontend Development Guide
## Student Management System - Frontend Implementation

This guide will walk you through building a complete Next.js frontend for your Student Management System API.

---

## 📋 Table of Contents

1. [Project Setup](#1-project-setup)
2. [Project Structure](#2-project-structure)
3. [Technology Stack](#3-technology-stack)
4. [Step-by-Step Implementation](#4-step-by-step-implementation)
5. [Key Features to Build](#5-key-features-to-build)
6. [API Integration](#6-api-integration)
7. [Authentication Flow](#7-authentication-flow)
8. [State Management](#8-state-management)
9. [UI Components](#9-ui-components)
10. [Routing Structure](#10-routing-structure)
11. [Best Practices](#11-best-practices)

---

## 1. Project Setup

### Step 1: Create Next.js Project

```bash
npx create-next-app@latest student-management-frontend
```

**Options to select:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes (recommended for styling)
- ✅ App Router: Yes (Next.js 13+ App Router)
- ✅ src/ directory: Yes
- ✅ Import alias: Yes

### Step 2: Navigate to Project

```bash
cd student-management-frontend
```

### Step 3: Install Additional Dependencies

```bash
# HTTP Client
npm install axios

# Form Handling & Validation
npm install react-hook-form @hookform/resolvers zod

# State Management (choose one)
npm install zustand
# OR
npm install @tanstack/react-query

# UI Component Library (choose one)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast
# OR use a complete library
npm install shadcn-ui
# OR
npm install @mui/material @emotion/react @emotion/styled

# Date Handling
npm install date-fns

# Icons
npm install lucide-react
# OR
npm install react-icons

# JWT Token Handling
npm install js-cookie
npm install @types/js-cookie --save-dev
```

---

## 2. Project Structure

```
student-management-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/        # Protected routes group
│   │   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   │   ├── students/
│   │   │   │   ├── page.tsx    # List students
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx # Student details/edit
│   │   │   │   └── new/
│   │   │   │       └── page.tsx # Create student
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   └── enrollments/
│   │   │       └── page.tsx
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home/landing page
│   │   └── api/                # API routes (if needed)
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── students/
│   │   │   ├── StudentList.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   ├── StudentCard.tsx
│   │   │   └── StudentTable.tsx
│   │   ├── courses/
│   │   │   ├── CourseList.tsx
│   │   │   ├── CourseForm.tsx
│   │   │   └── CourseCard.tsx
│   │   └── enrollments/
│   │       ├── EnrollmentList.tsx
│   │       └── EnrollmentForm.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts       # Axios instance
│   │   │   ├── auth.ts         # Auth API calls
│   │   │   ├── students.ts     # Student API calls
│   │   │   ├── courses.ts      # Course API calls
│   │   │   └── enrollments.ts  # Enrollment API calls
│   │   ├── utils/
│   │   │   ├── token.ts        # JWT token handling
│   │   │   ├── validation.ts   # Validation schemas
│   │   │   └── helpers.ts     # Helper functions
│   │   └── store/
│   │       ├── authStore.ts    # Auth state (Zustand)
│   │       └── studentStore.ts # Student state (optional)
│   ├── hooks/
│   │   ├── useAuth.ts          # Auth hook
│   │   ├── useStudents.ts      # Students hook
│   │   ├── useCourses.ts       # Courses hook
│   │   └── useEnrollments.ts  # Enrollments hook
│   ├── types/
│   │   ├── auth.ts
│   │   ├── student.ts
│   │   ├── course.ts
│   │   └── enrollment.ts
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
├── .env.local                  # Environment variables
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 3. Technology Stack

### Core
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **React 18+** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS
- **CSS Modules** (optional) - Component-scoped styles

### HTTP & API
- **Axios** - HTTP client
- **React Query** (optional) - Server state management

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### State Management
- **Zustand** - Lightweight state management
- **React Context** (for auth)

### UI Components
- **Radix UI** - Headless UI components
- **shadcn/ui** (recommended) - Pre-built components
- **Lucide React** - Icons

### Utilities
- **date-fns** - Date formatting
- **js-cookie** - Cookie management

---

## 4. Step-by-Step Implementation

### Phase 1: Project Foundation (Week 1)

#### Day 1-2: Setup & Configuration
1. ✅ Create Next.js project
2. ✅ Install dependencies
3. ✅ Configure Tailwind CSS
4. ✅ Set up environment variables (.env.local)
5. ✅ Create folder structure
6. ✅ Configure TypeScript paths

#### Day 3-4: API Client Setup
1. Create Axios instance (`lib/api/client.ts`)
   - Base URL configuration
   - Request interceptor (add JWT token)
   - Response interceptor (handle errors)
   - Error handling

2. Create API service files:
   - `lib/api/auth.ts`
   - `lib/api/students.ts`
   - `lib/api/courses.ts`
   - `lib/api/enrollments.ts`

#### Day 5-7: Authentication System
1. Create auth types (`types/auth.ts`)
2. Create token utilities (`lib/utils/token.ts`)
3. Create auth store (`lib/store/authStore.ts`)
4. Create auth hook (`hooks/useAuth.ts`)
5. Build login page (`app/(auth)/login/page.tsx`)
6. Build register page (`app/(auth)/register/page.tsx`)
7. Create auth forms (`components/auth/LoginForm.tsx`, `RegisterForm.tsx`)

### Phase 2: Core Features (Week 2-3)

#### Week 2: Students Module
1. Create student types (`types/student.ts`)
2. Create student API (`lib/api/students.ts`)
3. Create student hook (`hooks/useStudents.ts`)
4. Build student list page (`app/(dashboard)/students/page.tsx`)
5. Build create student page (`app/(dashboard)/students/new/page.tsx`)
6. Build edit student page (`app/(dashboard)/students/[id]/page.tsx`)
7. Create student components:
   - `StudentList.tsx`
   - `StudentForm.tsx`
   - `StudentTable.tsx`
   - `StudentCard.tsx`

#### Week 3: Courses & Enrollments
1. Create course types (`types/course.ts`)
2. Create course API (`lib/api/courses.ts`)
3. Build course pages and components
4. Create enrollment types (`types/enrollment.ts`)
5. Create enrollment API (`lib/api/enrollments.ts`)
6. Build enrollment pages and components

### Phase 3: UI/UX Enhancement (Week 4)

1. Create reusable UI components
2. Add loading states
3. Add error handling
4. Add success/error notifications
5. Implement responsive design
6. Add data tables with pagination
7. Add search and filters

---

## 5. Key Features to Build

### Authentication Features
- ✅ Login page
- ✅ Register page
- ✅ Protected routes (middleware)
- ✅ Logout functionality
- ✅ Token refresh (optional)
- ✅ Remember me (optional)

### Students Module
- ✅ List all students (table/card view)
- ✅ Create new student (form)
- ✅ View student details
- ✅ Edit student
- ✅ Delete student (with confirmation)
- ✅ Search students
- ✅ Filter by class/age
- ✅ Pagination

### Courses Module
- ✅ List all courses
- ✅ Create new course
- ✅ View course details
- ✅ Edit course
- ✅ Delete course
- ✅ Search courses

### Enrollment Module
- ✅ Enroll student in course
- ✅ View all enrollments
- ✅ View student's courses
- ✅ View course's students
- ✅ Remove enrollment
- ✅ Enrollment statistics

### Dashboard
- ✅ Overview statistics
- ✅ Recent activities
- ✅ Quick actions
- ✅ Charts/graphs (optional)

---

## 6. API Integration

### Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_TIMEOUT=10000
```

### Axios Client Setup

**File: `lib/api/client.ts`**

Key points:
- Base URL from environment variable
- Request interceptor: Add JWT token to headers
- Response interceptor: Handle 401 (unauthorized) → redirect to login
- Error handling: Show toast notifications
- Timeout configuration

### API Service Pattern

**Example: `lib/api/students.ts`**

Functions to create:
- `getAllStudents()` - GET /students
- `getStudentById(id)` - GET /students/:id
- `createStudent(data)` - POST /students
- `updateStudent(id, data)` - PATCH /students/:id
- `deleteStudent(id)` - DELETE /students/:id

---

## 7. Authentication Flow

### Login Flow
1. User enters email/password
2. Submit form → call `/auth/login`
3. Store JWT token in cookie/localStorage
4. Update auth state
5. Redirect to dashboard

### Protected Routes
1. Create middleware (`middleware.ts`)
2. Check for JWT token
3. Validate token (optional: verify with backend)
4. Redirect to login if no token
5. Allow access if token exists

### Logout Flow
1. Clear JWT token
2. Clear auth state
3. Redirect to login

### Token Management
- Store in httpOnly cookie (more secure)
- OR localStorage (easier, less secure)
- Add to Authorization header: `Bearer <token>`
- Handle token expiration

---

## 8. State Management

### Option 1: Zustand (Recommended)

**Auth Store Example:**
- `user` - Current user object
- `token` - JWT token
- `isAuthenticated` - Boolean
- `login()` - Login action
- `logout()` - Logout action
- `checkAuth()` - Verify auth status

**Student Store (Optional):**
- `students` - List of students
- `selectedStudent` - Currently selected student
- `loading` - Loading state
- `fetchStudents()` - Fetch action
- `addStudent()` - Add action
- `updateStudent()` - Update action
- `deleteStudent()` - Delete action

### Option 2: React Query

- Use `@tanstack/react-query` for server state
- Automatic caching
- Background refetching
- Optimistic updates

### Option 3: Context API

- Create AuthContext
- Create StudentContext
- Wrap app with providers

---

## 9. UI Components

### Reusable Components to Build

1. **Button**
   - Variants: primary, secondary, danger
   - Sizes: sm, md, lg
   - Loading state
   - Disabled state

2. **Input**
   - Text, email, number, password
   - Label
   - Error message
   - Icon support

3. **Card**
   - Header, body, footer
   - Shadow variants

4. **Modal/Dialog**
   - Open/close state
   - Backdrop
   - Close button

5. **Table**
   - Sortable columns
   - Pagination
   - Row selection
   - Responsive

6. **Form Components**
   - Form wrapper
   - Form field
   - Form error
   - Form label

7. **Toast/Notification**
   - Success, error, warning, info
   - Auto-dismiss
   - Position options

8. **Loading Spinner**
   - Full page loader
   - Button loader
   - Inline loader

---

## 10. Routing Structure

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Register page

### Protected Routes (Require Auth)
- `/dashboard` - Main dashboard
- `/students` - Student list
- `/students/new` - Create student
- `/students/[id]` - Student details/edit
- `/courses` - Course list
- `/courses/new` - Create course
- `/courses/[id]` - Course details/edit
- `/enrollments` - Enrollment list

### Route Groups
- `(auth)` - Authentication routes
- `(dashboard)` - Protected dashboard routes

---

## 11. Best Practices

### Code Organization
- ✅ Keep components small and focused
- ✅ Separate concerns (UI, logic, API)
- ✅ Use TypeScript for type safety
- ✅ Create reusable hooks
- ✅ Extract constants

### Performance
- ✅ Use Next.js Image component
- ✅ Implement code splitting
- ✅ Use React.memo for expensive components
- ✅ Lazy load heavy components
- ✅ Optimize API calls (caching)

### Security
- ✅ Never expose API keys in client code
- ✅ Use httpOnly cookies for tokens (if possible)
- ✅ Validate all inputs
- ✅ Sanitize user inputs
- ✅ Implement CSRF protection (if needed)

### User Experience
- ✅ Show loading states
- ✅ Handle errors gracefully
- ✅ Provide feedback (toasts)
- ✅ Implement optimistic updates
- ✅ Add confirmation dialogs for destructive actions
- ✅ Make forms accessible
- ✅ Responsive design

### Code Quality
- ✅ Use ESLint
- ✅ Use Prettier
- ✅ Write meaningful component names
- ✅ Add comments for complex logic
- ✅ Follow Next.js conventions

---

## 📝 Implementation Checklist

### Setup Phase
- [ ] Create Next.js project
- [ ] Install dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up environment variables
- [ ] Create folder structure
- [ ] Configure TypeScript paths

### API Integration
- [ ] Create Axios client
- [ ] Set up request/response interceptors
- [ ] Create auth API service
- [ ] Create students API service
- [ ] Create courses API service
- [ ] Create enrollments API service

### Authentication
- [ ] Create auth types
- [ ] Create token utilities
- [ ] Create auth store/hook
- [ ] Build login page
- [ ] Build register page
- [ ] Create protected route middleware
- [ ] Implement logout

### Students Module
- [ ] Create student types
- [ ] Create student hook
- [ ] Build student list page
- [ ] Build create student page
- [ ] Build edit student page
- [ ] Build student components
- [ ] Add search/filter
- [ ] Add pagination

### Courses Module
- [ ] Create course types
- [ ] Create course hook
- [ ] Build course pages
- [ ] Build course components

### Enrollment Module
- [ ] Create enrollment types
- [ ] Create enrollment hook
- [ ] Build enrollment pages
- [ ] Build enrollment components

### UI Components
- [ ] Create Button component
- [ ] Create Input component
- [ ] Create Card component
- [ ] Create Modal component
- [ ] Create Table component
- [ ] Create Toast component
- [ ] Create Loading component

### Polish
- [ ] Add error handling
- [ ] Add loading states
- [ ] Add success notifications
- [ ] Implement responsive design
- [ ] Add accessibility features
- [ ] Optimize performance
- [ ] Test all features

---

## 🚀 Quick Start Commands

```bash
# Create project
npx create-next-app@latest student-management-frontend

# Install dependencies
npm install axios react-hook-form @hookform/resolvers zod zustand date-fns js-cookie lucide-react

# Install dev dependencies
npm install @types/js-cookie --save-dev

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📚 Recommended Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Axios Documentation](https://axios-http.com/)

---

## 🎯 Next Steps

1. **Start with Setup**: Create the project and install dependencies
2. **Build API Client**: Set up Axios with interceptors
3. **Implement Auth**: Build login/register pages first
4. **Create Dashboard**: Build the main layout and navigation
5. **Build Students Module**: Start with CRUD operations
6. **Add Courses & Enrollments**: Complete the remaining modules
7. **Polish UI**: Add loading states, error handling, and styling
8. **Test Everything**: Test all features thoroughly

---

**Good luck building your frontend! 🚀**

Remember: Start small, build incrementally, and test as you go!
