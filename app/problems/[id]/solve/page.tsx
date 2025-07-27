"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonacoEditor } from "@/components/ui/monaco-editor"
import { Code, Play, Send, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react"

interface ProblemData {
  id: number
  title: string
  difficulty: string
  category: string
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

export default function SolvePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(defaultCode.python)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [problemData, setProblemData] = useState<ProblemData | null>(null)
  const [loading, setLoading] = useState(true)

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
        <div className="text-white">Loading...</div>
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ApexCode
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/problems" className="text-purple-400 font-medium">
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
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Problem Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Link 
                href={`/problems/${resolvedParams.id}`}
                className="text-purple-400 hover:underline flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Problem
              </Link>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-white">
                  {problemData.id}. {problemData.title}
                </h1>
                <p className="text-gray-400">{problemData.difficulty} • {problemData.category}</p>
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Code Editor */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col bg-gray-800 border-gray-700 min-h-[600px]">
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
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 min-h-[500px]">
                    <MonacoEditor
                      value={code}
                      onChange={setCode}
                      language={languageMap[selectedLanguage as keyof typeof languageMap]}
                      theme="vs-dark"
                      height="500px"
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
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isSubmitting ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isSubmitting ? "Submitting..." : "Submit Solution"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Results Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader>
                  <CardTitle className="text-white">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {testResults.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Run your code to see test results</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
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
      </div>
    </div>
  )
} 