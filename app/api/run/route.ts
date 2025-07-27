import { NextRequest, NextResponse } from "next/server"

interface RunRequest {
  code: string
  language: string
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

interface RunResult {
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  executionTime: number
  memoryUsed: number
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RunRequest = await request.json()
    const { code, language, testCases } = body

    // Validate request
    if (!code || !language || !testCases || testCases.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: code, language, testCases" },
        { status: 400 }
      )
    }

    // Simulate code execution for each test case
    const results: RunResult[] = await Promise.all(
      testCases.map(async (testCase) => {
        // Simulate execution time
        const executionTime = Math.random() * 100 + 10 // 10-110ms
        const memoryUsed = Math.random() * 50 + 10 // 10-60MB
        
        // Mock successful execution for now
        const actualOutput = testCase.expectedOutput
        const passed = true

        return {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput,
          passed,
          executionTime: Math.round(executionTime),
          memoryUsed: Math.round(memoryUsed),
        }
      })
    )

    const response = {
      success: true,
      language,
      results,
      summary: {
        totalTests: results.length,
        passedTests: results.filter((r) => r.passed).length,
        failedTests: results.filter((r) => !r.passed).length,
        totalExecutionTime: results.reduce((sum, result) => sum + result.executionTime, 0),
        maxMemoryUsed: Math.max(...results.map((result) => result.memoryUsed)),
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Run error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 