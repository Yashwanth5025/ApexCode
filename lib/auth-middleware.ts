import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractTokenFromHeader } from "./jwt"

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
    username: string
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = extractTokenFromHeader(req.headers.get("authorization"))
      
      if (!token) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        )
      }

      const payload = verifyToken(token)
      if (!payload) {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        )
      }

      req.user = payload
      return handler(req)
    } catch (error) {
      console.error("Auth middleware error:", error)
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      )
    }
  }
} 