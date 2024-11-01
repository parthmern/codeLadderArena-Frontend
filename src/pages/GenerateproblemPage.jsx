
import { useState } from 'react'
import { Button } from "../components/shadcn/ButtonVarients"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/shadcn/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/shadcn/Tabs"
import { Badge } from "../components/shadcn/Badge"
import { Input } from "../components/shadcn/Input"
import { Textarea } from "../components/shadcn/TextArea"
import { Label } from "../components/shadcn/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/shadcn/Select"
import ReactMarkdown from 'react-markdown'
import MDEditor from "@uiw/react-md-editor"
import MarkdownPreview from "@uiw/react-markdown-preview";


//GenerateproblemPage
// 

export function GenerateproblemPage() {
    const [problem, setProblem] = useState({
      title: "",
      description: "",
      difficulty: "easy",
      testCases: [{ input: "", output: "" }],
      codeStubs: [{ language: "JAVA", startSnippet: "", userSnippet: "", endSnippet: "" }],
      editorial: ""
    })
  
    const [showProblem, setShowProblem] = useState(false)
  
    const handleInputChange = (e, field) => {
      setProblem(prev => ({ ...prev, [field]: e.target.value }))
    }
  
    const handleMDChange = (value, field) => {
      setProblem(prev => ({ ...prev, [field]: value }))
    }
  
    const handleTestCaseChange = (index, field, value) => {
      setProblem(prev => ({
        ...prev,
        testCases: prev.testCases.map((tc, i) => i === index ? { ...tc, [field]: value } : tc)
      }))
    }
  
    const handleCodeStubChange = (index, field, value) => {
      setProblem(prev => ({
        ...prev,
        codeStubs: prev.codeStubs.map((cs, i) => i === index ? { ...cs, [field]: value } : cs)
      }))
    }
  
    const addTestCase = () => {
      setProblem(prev => ({ ...prev, testCases: [...prev.testCases, { input: "", output: "" }] }))
    }
  
    const addCodeStub = () => {
      setProblem(prev => ({ ...prev, codeStubs: [...prev.codeStubs, { language: "JAVA", startSnippet: "", userSnippet: "", endSnippet: "" }] }))
    }
  
    const removeTestCase = (index) => {
      setProblem(prev => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index)
      }))
    }
  
    const removeCodeStub = (index) => {
      setProblem(prev => ({
        ...prev,
        codeStubs: prev.codeStubs.filter((_, i) => i !== index)
      }))
    }
  
    const generateProblem = () => {
      setShowProblem(true)
    }
  
    return (
      <div className="geist-sans container mx-auto p-4">
        {!showProblem ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Generate Problem</CardTitle>
              <CardDescription>Fill in the details to create a new problem</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={problem.title} onChange={(e) => handleInputChange(e, 'title')} />
                </div>
                <div>
                  <Label htmlFor="description">Description (Markdown supported)</Label>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={problem.description}
                      onChange={(value) => handleMDChange(value, 'description')}
                      height={200}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={problem.difficulty} onValueChange={(value) => setProblem(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Test Cases</Label>
                  {problem.testCases.map((testCase, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <Input 
                        placeholder="Input" 
                        value={testCase.input} 
                        onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)} 
                      />
                      <Input 
                        placeholder="Output" 
                        value={testCase.output} 
                        onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)} 
                      />
                      <Button type="button" variant="destructive" onClick={() => removeTestCase(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" onClick={addTestCase} className="mt-2">Add Test Case</Button>
                </div>
                <div>
                  <Label>Code Stubs</Label>
                  {problem.codeStubs.map((codeStub, index) => (
                    <div key={index} className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <Select 
                          value={codeStub.language} 
                          onValueChange={(value) => handleCodeStubChange(index, 'language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CPP">CPP</SelectItem>
                            <SelectItem value="JAVA">JAVA</SelectItem>
                            <SelectItem value="PYTHON">PYTHON</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="destructive" onClick={() => removeCodeStub(index)}>Remove</Button>
                      </div>
                      <Input 
                        placeholder="Start Snippet" 
                        value={codeStub.startSnippet} 
                        onChange={(e) => handleCodeStubChange(index, 'startSnippet', e.target.value)} 
                      />
                      <Input 
                        placeholder="User Snippet" 
                        value={codeStub.userSnippet} 
                        onChange={(e) => handleCodeStubChange(index, 'userSnippet', e.target.value)} 
                      />
                      <Input 
                        placeholder="End Snippet" 
                        value={codeStub.endSnippet} 
                        onChange={(e) => handleCodeStubChange(index, 'endSnippet', e.target.value)} 
                      />
                    </div>
                  ))}
                  <Button type="button" onClick={addCodeStub} className="mt-2">Add Code Stub</Button>
                </div>
                <div>
                  <Label htmlFor="editorial">Editorial</Label>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={problem.editorial}
                      onChange={(value) => handleMDChange(value, 'editorial')}
                      height={200}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={generateProblem}>Generate Problem</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription>
                <Badge variant={problem.difficulty === 'easy' ? 'default' : problem.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {problem.difficulty}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description" className="w-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="testCases">Test Cases</TabsTrigger>
                  <TabsTrigger value="codeStubs">Code Stubs</TabsTrigger>
                  <TabsTrigger value="editorial">Editorial</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <MarkdownPreview source={problem.description} />
                </TabsContent>
                <TabsContent value="testCases">
                  <div className="space-y-2">
                    {problem.testCases.map((testCase, index) => (
                      <div key={index} className="p-2 border rounded">
                        <p><strong>Input:</strong> {testCase.input}</p>
                        <p><strong>Output:</strong> {testCase.output}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="codeStubs">
                  <div className="space-y-2">
                    {problem.codeStubs.map((stub, index) => (
                      <div key={index}>
                        <h3 className="font-bold">{stub.language}</h3>
                        <pre className="p-2 bg-gray-100 rounded overflow-x-auto">
                          <code>{stub.startSnippet}</code>
                          <code className="text-blue-600">{stub.userSnippet}</code>
                          <code>{stub.endSnippet}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="editorial">
                  <div data-color-mode="dark">
                    <MDEditor.Markdown source={problem.editorial} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setShowProblem(false)}>Edit Problem</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    )
  }