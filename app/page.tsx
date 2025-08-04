"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Code, TrendingUp, Plus, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { CreateProblemForm } from "@/components/problems/create-problem-form"

export default function HomePage() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showCreateProblem, setShowCreateProblem] = useState(false)
  const [customProblems, setCustomProblems] = useState<any[]>([])

  const handleCreateProblem = async (problemData: any) => {
    try {
      const response = await fetch("/api/problems/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      })

      if (response.ok) {
        const data = await response.json()
        setCustomProblems([...customProblems, data.problem])
        // Refresh the page to show the new problem
        window.location.reload()
      }
    } catch (error) {
      console.error("Error creating problem:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-2xl font-bold text-gray-300">
              ApexCode
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/problems" className="text-gray-300 hover:text-white transition-colors">
              Problems
            </Link>
            <Link href="/contests" className="text-gray-300 hover:text-white transition-colors">
              Contests
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/discuss" className="text-gray-300 hover:text-white transition-colors">
              Discuss
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowCreateProblem(true)}
                  className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Problem
                </Button>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowLogin(true)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setShowRegister(true)}
                  className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Master Competitive Programming
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sharpen your coding skills with challenging problems, compete with developers worldwide, and climb the
            leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
              asChild
            >
              <Link href="/problems">Start Solving</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
            >
              View Contests
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Code className="w-8 h-8 mx-auto text-gray-300" />
                <CardTitle className="text-2xl text-white">2,500+</CardTitle>
                <CardDescription className="text-gray-400">Coding Problems</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Users className="w-8 h-8 mx-auto text-gray-300" />
                <CardTitle className="text-2xl text-white">50K+</CardTitle>
                <CardDescription className="text-gray-400">Active Users</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Trophy className="w-8 h-8 mx-auto text-gray-300" />
                <CardTitle className="text-2xl text-white">1,200+</CardTitle>
                <CardDescription className="text-gray-400">Contests Held</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <TrendingUp className="w-8 h-8 mx-auto text-gray-300" />
                <CardTitle className="text-2xl text-white">95%</CardTitle>
                <CardDescription className="text-gray-400">Success Rate</CardDescription>
              </CardHeader>
            </Card>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Problems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:border-gray-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Two Sum</CardTitle>
                <Badge variant="secondary" className="bg-green-900 text-green-300 border-green-700">
                  Easy
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                Find two numbers in an array that add up to a target sum.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Acceptance: 85%</span>
                <span>Submissions: 2.1M</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:border-gray-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Binary Tree Traversal</CardTitle>
                <Badge variant="secondary" className="bg-yellow-900 text-yellow-300 border-yellow-700">
                  Medium
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                Implement inorder, preorder, and postorder traversal of a binary tree.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Acceptance: 67%</span>
                <span>Submissions: 890K</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:border-gray-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Graph Algorithms</CardTitle>
                <Badge variant="secondary" className="bg-red-900 text-red-300 border-red-700">
                  Hard
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                Solve complex graph problems using advanced algorithms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Acceptance: 42%</span>
                <span>Submissions: 340K</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Link href="/problems">View All Problems</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-xl font-bold text-gray-300">ApexCode</span>
              </div>
              <p className="text-gray-400">The ultimate platform for competitive programming and coding challenges.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/problems" className="hover:text-white transition-colors">
                    Problems
                  </Link>
                </li>
                <li>
                  <Link href="/contests" className="hover:text-white transition-colors">
                    Contests
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/discuss" className="hover:text-white transition-colors">
                    Discussions
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ApexCode. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <LoginForm
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false)
              setShowRegister(true)
            }}
          />
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <RegisterForm
            onClose={() => setShowRegister(false)}
            onSwitchToLogin={() => {
              setShowRegister(false)
              setShowLogin(true)
            }}
          />
        </div>
      )}

      {showCreateProblem && user && (
        <CreateProblemForm
          onClose={() => setShowCreateProblem(false)}
          onSubmit={handleCreateProblem}
          userId={user.id}
        />
      )}
    </div>
  )
}
