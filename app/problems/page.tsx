"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Search, Filter, CheckCircle, Clock, Star, Plus, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { CreateProblemForm } from "@/components/problems/create-problem-form"

interface Problem {
  id: number
  title: string
  difficulty: string
  category: string
  acceptance: string
  submissions: string
  solved?: boolean
  description: string
}

export default function ProblemsPage() {
  const { user, logout, token } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [problems, setProblems] = useState<Problem[]>([])
  const [customProblems, setCustomProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showCreateProblem, setShowCreateProblem] = useState(false)

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      const [problemsResponse, customProblemsResponse] = await Promise.all([
        fetch("/api/problems"),
        fetch("/api/problems/create")
      ])
      
      if (problemsResponse.ok) {
        const data = await problemsResponse.json()
        // Add solved status randomly for demo purposes
        const problemsWithSolvedStatus = data.problems.map((problem: Problem) => ({
          ...problem,
          solved: Math.random() > 0.5, // Random solved status for demo
        }))
        setProblems(problemsWithSolvedStatus)
      }
      
      if (customProblemsResponse.ok) {
        const customData = await customProblemsResponse.json()
        const customProblemsWithSolvedStatus = customData.problems.map((problem: Problem) => ({
          ...problem,
          solved: Math.random() > 0.5,
        }))
        setCustomProblems(customProblemsWithSolvedStatus)
      }
    } catch (error) {
      console.error("Error fetching problems:", error)
    } finally {
      setLoading(false)
    }
  }

  const allProblems = [...problems, ...customProblems]
  
  const filteredProblems = allProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty.toLowerCase() === difficultyFilter
    const matchesCategory = categoryFilter === "all" || problem.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900 text-green-300 border-green-700"
      case "Medium":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Hard":
        return "bg-red-900 text-red-300 border-red-700"
      default:
        return "bg-gray-800 text-gray-300 border-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Loading problems...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-2xl font-bold text-gray-300">
              ApexCode
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/problems" className="text-gray-300 font-medium">
              Problems
            </Link>
            <Link href="/contests" className="text-gray-300 hover:text-white transition-colors">
              Contests
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
              Leaderboard
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Problems</h1>
          <p className="text-gray-400">Solve coding challenges and improve your programming skills</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">
                    All Difficulties
                  </SelectItem>
                  <SelectItem value="easy" className="text-white hover:bg-gray-700">
                    Easy
                  </SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-gray-700">
                    Medium
                  </SelectItem>
                  <SelectItem value="hard" className="text-white hover:bg-gray-700">
                    Hard
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">
                    All Categories
                  </SelectItem>
                  <SelectItem value="array" className="text-white hover:bg-gray-700">
                    Array
                  </SelectItem>
                  <SelectItem value="string" className="text-white hover:bg-gray-700">
                    String
                  </SelectItem>
                  <SelectItem value="linked list" className="text-white hover:bg-gray-700">
                    Linked List
                  </SelectItem>
                  <SelectItem value="math" className="text-white hover:bg-gray-700">
                    Math
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <Card
              key={problem.id}
              className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:border-gray-600"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {problem.solved ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <Link
                        href={`/problems/${problem.id}`}
                        className="text-lg font-semibold text-white hover:text-gray-300 transition-colors truncate"
                      >
                        {problem.id}. {problem.title}
                      </Link>
                      <Badge variant="secondary" className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {problem.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-3 line-clamp-2">{problem.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Acceptance: {problem.acceptance}</span>
                      <span>Submissions: {problem.submissionCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button
                      asChild
                      className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                    >
                      <Link href={`/problems/${problem.id}`}>Solve</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card className="text-center py-12 bg-gray-800 border-gray-700">
            <CardContent>
              <p className="text-gray-400 text-lg">No problems found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setDifficultyFilter("all")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

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
          onSubmit={async (problemData) => {
            try {
              const response = await fetch("/api/problems/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(problemData),
              })

              if (response.ok) {
                const data = await response.json()
                setCustomProblems([...customProblems, data.problem])
                setShowCreateProblem(false)
                // Refresh to show the new problem
                window.location.reload()
              } else {
                const errorData = await response.json()
                console.error("Error creating problem:", errorData.error)
              }
            } catch (error) {
              console.error("Error creating problem:", error)
            }
          }}
          userId={user.id}
        />
      )}
    </div>
  )
}
