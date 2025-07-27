"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, ThumbsUp, MessageSquare, Send } from "lucide-react"

interface ProblemData {
  id: number
  title: string
  difficulty: string
  category: string
  acceptance: string
  submissions: string
  likes: number
  dislikes: number
  description: string
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: string[]
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

export default function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
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
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/problems" className="text-purple-400 hover:underline flex items-center gap-1">
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
                    <span>Submissions: {problemData.submissions}</span>
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
                <div className="flex-shrink-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Link href={`/problems/${problemData.id}/solve`}>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Solution
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Problem Description */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
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
          <Card className="bg-gray-800 border-gray-700 mb-6">
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
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-white">Constraints</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {problemData.constraints.map((constraint, index) => (
                  <li key={index} className="text-lg">{constraint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Test Cases Preview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Test Cases</CardTitle>
              <p className="text-gray-400">These are the test cases your solution will be evaluated against</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {problemData.testCases.slice(0, 3).map((testCase, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-white">Input:</strong>
                        <p className="text-gray-300 mt-1">{testCase.input}</p>
                      </div>
                      <div>
                        <strong className="text-white">Expected Output:</strong>
                        <p className="text-gray-300 mt-1">{testCase.expectedOutput}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {problemData.testCases.length > 3 && (
                  <p className="text-gray-400 text-center text-sm">
                    ... and {problemData.testCases.length - 3} more test cases
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Solution Button (Bottom) */}
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <Link href={`/problems/${problemData.id}/solve`}>
                <Send className="w-5 h-5 mr-2" />
                Submit Your Solution
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

