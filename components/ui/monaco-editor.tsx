"use client"

import { useRef } from "react"
import Editor, { OnMount, OnChange } from "@monaco-editor/react"

interface MonacoEditorProps {
  value: string
  onChange?: (value: string) => void
  language?: string
  theme?: "vs-dark" | "vs-light" | "hc-black"
  height?: string
  readOnly?: boolean
  placeholder?: string
}

export function MonacoEditor({
  value,
  onChange,
  language = "javascript",
  theme = "vs-dark",
  height = "400px",
  readOnly = false,
  placeholder = "Write your code here...",
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    
    // Set placeholder text
    if (value === "") {
      editor.setValue(placeholder)
      editor.getModel()?.setEOL(monaco.editor.EndOfLineSequence.LF)
    }
  }

  const handleEditorChange: OnChange = (value, event) => {
    if (onChange && value !== placeholder) {
      onChange(value || "")
    }
  }

  return (
    <div className="border border-gray-600 rounded-md overflow-hidden">
      <Editor
        height={height}
        defaultLanguage={language}
        language={language}
        theme={theme}
        value={value || placeholder}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          wordWrap: "on",
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: true,
          useTabStops: false,
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          trimAutoWhitespace: true,
          largeFileOptimizations: true,
          suggest: {
            insertMode: "replace",
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          parameterHints: {
            enabled: true,
          },
          hover: {
            enabled: true,
          },
          contextmenu: true,
          mouseWheelZoom: true,
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
      />
    </div>
  )
} 