import { NextRequest, NextResponse } from "next/server"

interface SubmissionRequest {
  code: string
  language: string
  problemId: string
  testCases?: Array<{
    input: string
    expectedOutput: string
  }>
}

interface TestResult {
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  executionTime: number
  memoryUsed: number
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmissionRequest = await request.json()
    const { code, language, problemId, testCases } = body

    // Validate request
    if (!code || !language || !problemId) {
      return NextResponse.json(
        { error: "Missing required fields: code, language, problemId" },
        { status: 400 }
      )
    }

    // Mock test cases for now (in real implementation, these would come from database)
    const defaultTestCases = [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
    ]

    const casesToRun = testCases || defaultTestCases

    // Simulate code execution (in real implementation, this would use a code execution service)
    const results: TestResult[] = await Promise.all(
      casesToRun.map(async (testCase) => {
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

    const allPassed = results.every((result) => result.passed)
    const totalExecutionTime = results.reduce((sum, result) => sum + result.executionTime, 0)
    const maxMemoryUsed = Math.max(...results.map((result) => result.memoryUsed))

    const response = {
      success: true,
      problemId,
      language,
      results,
      summary: {
        totalTests: results.length,
        passedTests: results.filter((r) => r.passed).length,
        failedTests: results.filter((r) => !r.passed).length,
        allPassed,
        totalExecutionTime,
        maxMemoryUsed,
        status: allPassed ? "Accepted" : "Wrong Answer",
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 