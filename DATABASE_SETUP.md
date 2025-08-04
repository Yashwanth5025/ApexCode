# Database Setup Instructions

## Prerequisites
- Supabase account with a PostgreSQL database
- Connection string: `postgresql://postgres:Yashwanth1290@db.kdwmyjwuoapdtipfsqhh.supabase.co:5432/postgres`

## Setup Steps

### 1. Environment Configuration
The `.env` file should contain:
```
DATABASE_URL="postgresql://postgres:Yashwanth1290@db.kdwmyjwuoapdtipfsqhh.supabase.co:5432/postgres?sslmode=require"
```

### 2. Database Schema
The Prisma schema is defined in `prisma/schema.prisma` with the following models:
- `User` - User accounts
- `Problem` - Coding problems
- `Example` - Problem examples
- `Constraint` - Problem constraints
- `TestCase` - Problem test cases
- `Submission` - User submissions

### 3. Manual Database Setup (if Prisma push fails)

If you encounter connection issues with Prisma, you can manually create the tables using the SQL script:

1. Connect to your Supabase database using a PostgreSQL client
2. Run the SQL commands from `scripts/setup-db.sql`

### 4. Testing the Connection

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test the database connection:
   ```bash
   curl http://localhost:3000/api/test-db
   ```

3. Test the problems API:
   ```bash
   curl http://localhost:3000/api/problems
   ```

### 5. Authentication

The app includes:
- User registration: `POST /api/auth/register`
- User login: `POST /api/auth/login`
- Problem creation: `POST /api/problems/create`

### 6. Features

✅ **Dark Theme**: Pure black background with professional coding aesthetic
✅ **Authentication**: User registration and login with database storage
✅ **Problem Creation**: Users can create custom problems with examples, constraints, and test cases
✅ **Problem Solving**: Integrated code editor with test execution
✅ **Database Integration**: All data stored in PostgreSQL via Supabase

### 7. Test User

A test user is created with:
- Email: `test@example.com`
- Username: `testuser`
- Password: `hashedpassword123`

### 8. Troubleshooting

If you encounter database connection issues:

1. Check your Supabase connection string
2. Ensure SSL is enabled (`?sslmode=require`)
3. Verify your Supabase database is active
4. Try the manual SQL setup if Prisma fails

### 9. Development

To run the application:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` 