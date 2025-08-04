"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
  onSwitchToRegister: () => void
  onClose: () => void
}

export function LoginForm({ onSwitchToRegister, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        onClose()
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-gray-300 hover:text-white text-sm"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 