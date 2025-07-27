"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Code, Play, Send, CheckCircle, XCircle, Clock, ThumbsUp, MessageSquare } from "lucide-react"

const problemData = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  category: "Array",
  acceptance: "85%",
  submissions: "2.1M",
  likes: 1247,
  dislikes: 89,
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
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

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(defaultCode.python)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(defaultCode[language as keyof typeof defaultCode])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate running test cases
    setTimeout(() => {
      setTestResults([
        { input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]", passed: true },
        { input: "nums = [3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]", passed: true },
        { input: "nums = [3,3], target = 6", expected: "[0,1]", actual: "[0,1]", passed: true },
      ])
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 3000)
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Problem Description */}
          <div className="space-y-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/problems" className="text-purple-400 hover:underline">
                ← Back to Problems
              </Link>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-white">
                    {problemData.id}. {problemData.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={getDifficultyColor(problemData.difficulty)}>
                      {problemData.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {problemData.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
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
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-300">{problemData.description}</p>

                  <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Examples:</h3>
                  {problemData.examples.map((example, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
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
                  ))}

                  <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Constraints:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {problemData.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="h-full flex flex-col bg-gray-800 border-gray-700">
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
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 font-mono text-sm resize-none bg-gray-900 border-gray-600 text-gray-100 placeholder:text-gray-500"
                  placeholder="Write your solution here..."
                />

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
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>

                {/* Test Results */}
                {testResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-white">Test Results:</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {testResults.map((result, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-gray-700 rounded text-sm">
                          {result.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                          )}
                          <div className="flex-1 text-gray-300">
                            <p>
                              <strong className="text-white">Input:</strong> {result.input}
                            </p>
                            <p>
                              <strong className="text-white">Expected:</strong> {result.expected}
                            </p>
                            <p>
                              <strong className="text-white">Actual:</strong> {result.actual}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
