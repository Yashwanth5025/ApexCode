import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, username } = body

    // Validate required fields
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { user: userWithoutPassword, token, message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 