// Problem-related types
export interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  acceptance: string
  submissions: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: string[]
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

export interface ProblemListItem extends Omit<Problem, 'examples' | 'constraints' | 'testCases'> {
  solved?: boolean
}

// Code execution types
export interface TestCase {
  input: string
  expectedOutput: string
}

export interface TestResult {
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  executionTime: number
  memoryUsed: number
  error?: string
}

export interface RunRequest {
  code: string
  language: string
  testCases: TestCase[]
}

export interface RunResponse {
  success: boolean
  language: string
  results: TestResult[]
  summary: {
    totalTests: number
    passedTests: number
    failedTests: number
    totalExecutionTime: number
    maxMemoryUsed: number
  }
  timestamp: string
}

export interface SubmissionRequest {
  code: string
  language: string
  problemId: string
  testCases?: TestCase[]
}

export interface SubmissionResponse {
  success: boolean
  problemId: string
  language: string
  results: TestResult[]
  summary: {
    totalTests: number
    passedTests: number
    failedTests: number
    allPassed: boolean
    totalExecutionTime: number
    maxMemoryUsed: number
    status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Runtime Error"
  }
  timestamp: string
}

// User-related types (for future implementation)
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  rating?: number
  solvedProblems: number[]
  joinDate: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  avatar?: string
  rating: number
  rank: number
  solvedProblems: number
  totalSubmissions: number
  joinDate: string
  lastActive: string
}

// Contest types (for future implementation)
export interface Contest {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  duration: number // in minutes
  problems: number[]
  participants: string[]
  isActive: boolean
  isUpcoming: boolean
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 