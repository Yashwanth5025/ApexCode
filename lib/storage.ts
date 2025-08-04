// In-memory storage for when database is unavailable
interface User {
  id: string
  email: string
  username: string
  password: string
  createdAt: string
}

interface Problem {
  id: number
  title: string
  description: string
  difficulty: string
  category: string
  acceptance: string
  submissionCount: string
  likes: number
  dislikes: number
  createdBy: string
  isCustom: boolean
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: Array<{
    text: string
  }>
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

class InMemoryStorage {
  private users: Map<string, User> = new Map()
  private problems: Map<number, Problem> = new Map()
  private nextProblemId = 1

  // Users
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const id = `user-${Date.now()}`
    const user: User = {
      ...userData,
      id,
      createdAt: new Date().toISOString(),
    }
    this.users.set(id, user)
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find(user => user.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  // Problems
  async createProblem(problemData: Omit<Problem, 'id'>): Promise<Problem> {
    const problem: Problem = {
      ...problemData,
      id: this.nextProblemId++,
    }
    this.problems.set(problem.id, problem)
    return problem
  }

  async findProblemById(id: number): Promise<Problem | null> {
    return this.problems.get(id) || null
  }

  async getAllProblems(): Promise<Problem[]> {
    return Array.from(this.problems.values())
  }

  async getCustomProblems(): Promise<Problem[]> {
    return Array.from(this.problems.values()).filter(p => p.isCustom)
  }

  // Initialize with some default data
  async initialize() {
    // Create a test user
    await this.createUser({
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedpassword123',
    })

    // Create a test problem
    await this.createProblem({
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      difficulty: 'Easy',
      category: 'Array',
      acceptance: '85%',
      submissionCount: '2.1M',
      likes: 1500,
      dislikes: 50,
      createdBy: 'user-1',
      isCustom: false,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
        },
      ],
      constraints: [
        { text: '2 <= nums.length <= 104' },
        { text: '-109 <= nums[i] <= 109' },
        { text: '-109 <= target <= 109' },
      ],
      testCases: [
        { input: '[2,7,11,15]', expectedOutput: '[0,1]' },
        { input: '[3,2,4]', expectedOutput: '[1,2]' },
        { input: '[3,3]', expectedOutput: '[0,1]' },
      ],
    })
  }
}

export const inMemoryStorage = new InMemoryStorage()

// Initialize the storage
inMemoryStorage.initialize().catch(console.error) 