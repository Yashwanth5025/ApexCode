"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, X } from "lucide-react"

interface TestCase {
  input: string
  expectedOutput: string
}

interface CreateProblemFormProps {
  onClose: () => void
  onSubmit: (problemData: any) => Promise<void>
  userId: string
}

export function CreateProblemForm({ onClose, onSubmit, userId }: CreateProblemFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("Easy")
  const [category, setCategory] = useState("Array")
  const [examples, setExamples] = useState([{ input: "", output: "", explanation: "" }])
  const [constraints, setConstraints] = useState([""])
  const [testCases, setTestCases] = useState<TestCase[]>([{ input: "", expectedOutput: "" }])
  const [loading, setLoading] = useState(false)

  const addExample = () => {
    setExamples([...examples, { input: "", output: "", explanation: "" }])
  }

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const updateExample = (index: number, field: string, value: string) => {
    const newExamples = [...examples]
    newExamples[index] = { ...newExamples[index], [field]: value }
    setExamples(newExamples)
  }

  const addConstraint = () => {
    setConstraints([...constraints, ""])
  }

  const removeConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index))
  }

  const updateConstraint = (index: number, value: string) => {
    const newConstraints = [...constraints]
    newConstraints[index] = value
    setConstraints(newConstraints)
  }

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }])
  }

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index))
  }

  const updateTestCase = (index: number, field: string, value: string) => {
    const newTestCases = [...testCases]
    newTestCases[index] = { ...newTestCases[index], [field]: value }
    setTestCases(newTestCases)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const problemData = {
        title,
        description,
        difficulty,
        category,
        examples: examples.filter(ex => ex.input && ex.output),
        constraints: constraints.filter(c => c.trim()),
        testCases: testCases.filter(tc => tc.input && tc.expectedOutput),
        createdBy: userId
      }

      await onSubmit(problemData)
      onClose()
    } catch (error) {
      console.error("Error creating problem:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Create New Problem</CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  placeholder="Problem title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-white">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Easy" className="text-white hover:bg-gray-700">Easy</SelectItem>
                      <SelectItem value="Medium" className="text-white hover:bg-gray-700">Medium</SelectItem>
                      <SelectItem value="Hard" className="text-white hover:bg-gray-700">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Array" className="text-white hover:bg-gray-700">Array</SelectItem>
                      <SelectItem value="String" className="text-white hover:bg-gray-700">String</SelectItem>
                      <SelectItem value="Linked List" className="text-white hover:bg-gray-700">Linked List</SelectItem>
                      <SelectItem value="Math" className="text-white hover:bg-gray-700">Math</SelectItem>
                      <SelectItem value="Tree" className="text-white hover:bg-gray-700">Tree</SelectItem>
                      <SelectItem value="Graph" className="text-white hover:bg-gray-700">Graph</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                placeholder="Problem description..."
                required
              />
            </div>

            {/* Examples */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-white">Examples</Label>
                <Button type="button" onClick={addExample} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Example
                </Button>
              </div>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Example {index + 1}</span>
                      {examples.length > 1 && (
                        <Button type="button" onClick={() => removeExample(index)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-gray-300 text-sm">Input</Label>
                        <Input
                          value={example.input}
                          onChange={(e) => updateExample(index, "input", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          placeholder="Input"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Output</Label>
                        <Input
                          value={example.output}
                          onChange={(e) => updateExample(index, "output", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          placeholder="Output"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Explanation</Label>
                        <Input
                          value={example.explanation}
                          onChange={(e) => updateExample(index, "explanation", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          placeholder="Explanation"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-white">Constraints</Label>
                <Button type="button" onClick={addConstraint} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Constraint
                </Button>
              </div>
              <div className="space-y-2">
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={constraint}
                      onChange={(e) => updateConstraint(index, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      placeholder="Constraint"
                    />
                    {constraints.length > 1 && (
                      <Button type="button" onClick={() => removeConstraint(index)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Test Cases */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-white">Test Cases</Label>
                <Button type="button" onClick={addTestCase} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Test Case
                </Button>
              </div>
              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Test Case {index + 1}</span>
                      {testCases.length > 1 && (
                        <Button type="button" onClick={() => removeTestCase(index)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-300 text-sm">Input</Label>
                        <Input
                          value={testCase.input}
                          onChange={(e) => updateTestCase(index, "input", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          placeholder="Input"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Expected Output</Label>
                        <Input
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          placeholder="Expected Output"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Problem...
                  </>
                ) : (
                  "Create Problem"
                )}
              </Button>
              <Button type="button" onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 