"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonacoEditor } from "@/components/ui/monaco-editor"
import { Code, ThumbsUp, MessageSquare, Play, Send, CheckCircle, XCircle, Clock, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

interface ProblemData {
  id: number
  title: string
  difficulty: string
  category: string
  acceptance: string
  submissionCount: string
  likes: number
  dislikes: number
  description: string
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: Array<{
    text: string
  }>
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

interface TestResult {
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  executionTime: number
  memoryUsed: number
  error?: string
}

const defaultCode = {
  python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
}

const languageMap = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp",
}

export default function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { user, logout } = useAuth()
  const [problemData, setProblemData] = useState<ProblemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(defaultCode.python)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    fetchProblemData()
  }, [resolvedParams.id])

  const fetchProblemData = async () => {
    try {
      const response = await fetch(`/api/problems?id=${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        setProblemData(data.problem)
      } else {
        console.error("Failed to fetch problem data")
      }
    } catch (error) {
      console.error("Error fetching problem data:", error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(defaultCode[language as keyof typeof defaultCode])
  }

  const handleRunCode = async () => {
    if (!problemData) return

    setIsRunning(true)
    setTestResults([])

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          testCases: problemData.testCases.slice(0, 2), // Run first 2 test cases
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTestResults(data.results)
      } else {
        console.error("Failed to run code")
      }
    } catch (error) {
      console.error("Error running code:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!problemData) return

    setIsSubmitting(true)
    setTestResults([])

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problemId: resolvedParams.id,
          testCases: problemData.testCases,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTestResults(data.results)
        
        // Show success message if all tests passed
        if (data.summary.allPassed) {
          alert("🎉 Congratulations! All test cases passed!")
        }
      } else {
        console.error("Failed to submit code")
      }
    } catch (error) {
      console.error("Error submitting code:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading problem...</div>
      </div>
    )
  }

  if (!problemData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Problem not found</div>
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

      <div className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/problems" className="text-gray-300 hover:text-white hover:underline flex items-center gap-1">
            ← Back to Problems
          </Link>
        </div>

        {/* Problem Header */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl text-white mb-3">
                  {problemData.id}. {problemData.title}
                </CardTitle>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className={getDifficultyColor(problemData.difficulty)}>
                    {problemData.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {problemData.category}
                  </Badge>
                </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                    <span>Acceptance: {problemData.acceptance}</span>
                    <span>Submissions: {problemData.submissionCount}</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{problemData.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Discuss</span>
                    </div>
                  </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Problem Description */}
          <div className="space-y-6">
            {/* Problem Description */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Problem Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-300 text-lg leading-relaxed">
                    {problemData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problemData.examples.map((example, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Example {index + 1}:</h4>
                      <div className="space-y-2">
                        <p className="text-gray-300">
                          <strong className="text-white">Input:</strong> {example.input}
                        </p>
                        <p className="text-gray-300">
                          <strong className="text-white">Output:</strong> {example.output}
                        </p>
                        <p className="text-gray-300">
                          <strong className="text-white">Explanation:</strong> {example.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Constraints */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {problemData.constraints.map((constraint, index) => (
                    <li key={index} className="text-lg">{constraint.text}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Code Editor and Test Results */}
          <div className="space-y-6">
            {/* Code Editor */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Code Editor</CardTitle>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="python" className="text-white hover:bg-gray-700">
                        Python
                      </SelectItem>
                      <SelectItem value="javascript" className="text-white hover:bg-gray-700">
                        JavaScript
                      </SelectItem>
                      <SelectItem value="java" className="text-white hover:bg-gray-700">
                        Java
                      </SelectItem>
                      <SelectItem value="cpp" className="text-white hover:bg-gray-700">
                        C++
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[400px]">
                  <MonacoEditor
                    value={code}
                    onChange={setCode}
                    language={languageMap[selectedLanguage as keyof typeof languageMap]}
                    theme="vs-dark"
                    height="400px"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    {isRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  >
                    {isSubmitting ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Run your code to see test results</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-700 rounded text-sm">
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 text-gray-300 min-w-0">
                          <p className="truncate">
                            <strong className="text-white">Test {index + 1}:</strong> {result.passed ? "Passed" : "Failed"}
                          </p>
                          {!result.passed && (
                            <>
                              <p className="text-xs mt-1">
                                <strong className="text-white">Expected:</strong> {result.expectedOutput}
                              </p>
                              <p className="text-xs">
                                <strong className="text-white">Actual:</strong> {result.actualOutput}
                              </p>
                              {result.error && (
                                <p className="text-xs text-red-400">
                                  <strong>Error:</strong> {result.error}
                                </p>
                              )}
                            </>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {result.executionTime}ms • {result.memoryUsed}MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
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
    </div>
  )
}

