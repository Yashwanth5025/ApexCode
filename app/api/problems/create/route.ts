import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { withAuth, AuthenticatedRequest } from "@/lib/auth-middleware"

async function createProblemHandler(req: AuthenticatedRequest) {
  try {
    const body = await req.json()
    const { title, description, difficulty, category, examples, constraints, testCases } = body

    // Validate required fields
    if (!title || !description || !difficulty || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create new problem with all related data
    const newProblem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        category,
        acceptance: "0%",
        submissionCount: "0",
        likes: 0,
        dislikes: 0,
        createdBy: req.user!.userId,
        isCustom: true,
        examples: {
          create: examples.map((ex: any) => ({
            input: ex.input,
            output: ex.output,
            explanation: ex.explanation,
          })),
        },
        constraints: {
          create: constraints.map((constraint: string) => ({
            text: constraint,
          })),
        },
        testCases: {
          create: testCases.map((tc: any) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
          })),
        },
      },
      include: {
        examples: true,
        constraints: true,
        testCases: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    })

    return NextResponse.json(
      { problem: newProblem, message: "Problem created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating problem:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export const POST = withAuth(createProblemHandler)

export async function GET() {
  try {
    const customProblems = await prisma.problem.findMany({
      where: {
        isCustom: true,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ problems: customProblems })
  } catch (error) {
    console.error("Error fetching custom problems:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 