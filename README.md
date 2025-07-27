# ApexCode Platform

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/yashwanths-projects-9721c2a0/v0-apex-code-platform)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/NyRXgcYbYBU)

## Overview

ApexCode is a competitive programming platform built with Next.js 15, TypeScript, and Tailwind CSS. It provides a modern interface for solving coding challenges with features like syntax highlighting, code execution, and problem management.

## Features

### ✅ Implemented Features
- **Modern UI**: Beautiful dark theme with purple/blue gradient branding
- **Monaco Editor**: Professional code editor with syntax highlighting and IntelliSense
- **Problem Management**: Browse and filter coding problems by difficulty and category
- **Code Execution**: Run and submit code with test case validation
- **API Backend**: RESTful API routes for problems, code execution, and submissions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔄 Current Implementation
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Components**: shadcn/ui component library
- **Code Editor**: Monaco Editor with support for Python, JavaScript, Java, and C++
- **API Routes**: 
  - `/api/problems` - Fetch problems with filtering
  - `/api/run` - Execute code with test cases
  - `/api/submit` - Submit solutions for evaluation
- **State Management**: React hooks for local state
- **Data**: Currently using mock data (ready for database integration)

### 🚀 Planned Features
- **Database Integration**: PostgreSQL/MongoDB for persistent data
- **User Authentication**: Sign up, login, and user profiles
- **Real Code Execution**: Docker-based code execution service
- **Leaderboards**: User rankings and statistics
- **Contests**: Timed coding competitions
- **Discussion Forums**: Community discussions for each problem
- **Progress Tracking**: User progress and solved problems history

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems?id=1` - Get specific problem
- `GET /api/problems?difficulty=easy&category=array` - Filter problems

### Code Execution
- `POST /api/run` - Run code with test cases
- `POST /api/submit` - Submit solution for evaluation

## Project Structure

```
app/
├── api/                    # API routes
│   ├── problems/          # Problem management
│   ├── run/              # Code execution
│   └── submit/           # Solution submission
├── problems/             # Problem pages
│   ├── page.tsx         # Problems list
│   └── [id]/            # Individual problem
├── layout.tsx           # Root layout
├── page.tsx            # Landing page
└── globals.css         # Global styles

components/
└── ui/                 # Reusable UI components
    ├── monaco-editor.tsx # Code editor component
    └── ...              # Other shadcn/ui components
```

## Deployment

Your project is live at:

**[https://vercel.com/yashwanths-projects-9721c2a0/v0-apex-code-platform](https://vercel.com/yashwanths-projects-9721c2a0/v0-apex-code-platform)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/NyRXgcYbYBU](https://v0.dev/chat/projects/NyRXgcYbYBU)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Contributing

This is a competitive programming platform designed to help developers improve their coding skills. Feel free to contribute by:

- Adding new problems
- Improving the UI/UX
- Enhancing the code execution engine
- Adding new features

## License

This project is licensed under the MIT License.
