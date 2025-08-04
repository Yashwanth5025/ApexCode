import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Get specific problem with all related data
      const problem = await prisma.problem.findUnique({
        where: { id: parseInt(id) },
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

      if (!problem) {
        return NextResponse.json(
          { error: "Problem not found" },
          { status: 404 }
        )
      }

      return NextResponse.json({ problem })
    } else {
      // Get all problems
      const problems = await prisma.problem.findMany({
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

      return NextResponse.json({ problems })
    }
  } catch (error) {
    console.error("Error fetching problems:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 