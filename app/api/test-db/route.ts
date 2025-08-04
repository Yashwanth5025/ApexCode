import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const problemCount = await prisma.problem.count()
    const userCount = await prisma.user.count()
    
    // Get a sample problem
    const sampleProblem = await prisma.problem.findFirst({
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

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      stats: {
        problemCount,
        userCount,
      },
      sampleProblem,
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 