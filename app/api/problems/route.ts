import { NextRequest, NextResponse } from "next/server"

interface Problem {
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

// Mock data - in real implementation, this would come from a database
const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: "85%",
    submissions: "2.1M",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
    ],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "67%",
    submissions: "1.8M",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros",
    ],
    testCases: [
      { input: "[2,4,3], [5,6,4]", expectedOutput: "[7,0,8]" },
      { input: "[0], [0]", expectedOutput: "[0]" },
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const difficulty = searchParams.get("difficulty")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredProblems = problems

    // Filter by ID if provided
    if (id) {
      const problem = problems.find((p) => p.id === parseInt(id))
      if (!problem) {
        return NextResponse.json({ error: "Problem not found" }, { status: 404 })
      }
      return NextResponse.json({ problem })
    }

    // Filter by difficulty
    if (difficulty && difficulty !== "all") {
      filteredProblems = filteredProblems.filter(
        (p) => p.difficulty.toLowerCase() === difficulty.toLowerCase()
      )
    }

    // Filter by category
    if (category && category !== "all") {
      filteredProblems = filteredProblems.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search term
    if (search) {
      filteredProblems = filteredProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      problems: filteredProblems,
      total: filteredProblems.length,
    })
  } catch (error) {
    console.error("Problems API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 