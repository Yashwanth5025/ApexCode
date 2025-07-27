"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Search, Filter, CheckCircle, Clock, Star } from "lucide-react"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: "85%",
    submissions: "2.1M",
    solved: true,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "67%",
    submissions: "1.8M",
    solved: false,
    description: "You are given two non-empty linked lists representing two non-negative integers.",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    acceptance: "58%",
    submissions: "1.5M",
    solved: true,
    description: "Given a string s, find the length of the longest substring without repeating characters.",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    acceptance: "42%",
    submissions: "890K",
    solved: false,
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    acceptance: "52%",
    submissions: "1.2M",
    solved: false,
    description: "Given a string s, return the longest palindromic substring in s.",
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    acceptance: "61%",
    submissions: "780K",
    solved: true,
    description: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows.",
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Easy",
    category: "Math",
    acceptance: "73%",
    submissions: "1.9M",
    solved: false,
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    acceptance: "28%",
    submissions: "1.1M",
    solved: false,
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
  },
]

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProblems = problems.filter((problem) => {
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {problem.solved ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-500" />
                      )}
                      <Link
                        href={`/problems/${problem.id}`}
                        className="text-lg font-semibold text-white hover:text-purple-400 transition-colors"
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
                    <p className="text-gray-400 mb-3">{problem.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Acceptance: {problem.acceptance}</span>
                      <span>Submissions: {problem.submissions}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
    </div>
  )
}
