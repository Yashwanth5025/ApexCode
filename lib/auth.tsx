"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  email: string
  username: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, username: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")
    
    if (storedToken && userData) {
      try {
        setUser(JSON.parse(userData))
        setToken(storedToken)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        return true
      } else {
        const errorData = await response.json()
        console.error("Login failed:", errorData.error)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        return true
      } else {
        const errorData = await response.json()
        console.error("Registration failed:", errorData.error)
        return false
      }
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 