
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

import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import axios from 'axios'
import { createProblemUrl } from '../utils/apiUrls'

//GenerateproblemPage
// geist-sans


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

  const createNewProblem = async () =>{
    try{

      console.log(problem);

      const res = await axios.post(createProblemUrl, problem);
      console.log(res);


    }
    catch(error){
      console.log("Error=>", error);
    }
  }

  return (
    <div className="container geist-sans mx-auto p-4">
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
                    <Label>Start Snippet</Label>
                    <CodeMirror
                      value={codeStub.startSnippet}
                      height="100px"
                      theme={vscodeDark}
                      onChange={(value) => handleCodeStubChange(index, 'startSnippet', value)}
                    />
                    <Label>User Snippet</Label>
                    <CodeMirror
                      value={codeStub.userSnippet}
                      height="100px"
                      theme={vscodeDark}
                      onChange={(value) => handleCodeStubChange(index, 'userSnippet', value)}
                    />
                    <Label>End Snippet</Label>
                    <CodeMirror
                      value={codeStub.endSnippet}
                      height="100px"
                      theme={vscodeDark}
                      onChange={(value) => handleCodeStubChange(index, 'endSnippet', value)}
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
                <div className="space-y-4">
                  {problem.codeStubs.map((stub, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-bold">{stub.language}</h3>
                      <CodeMirror
                        value={`${stub.startSnippet}\n${stub.userSnippet}\n${stub.endSnippet}`}
                        height="200px"
                        theme={vscodeDark}
                        editable={false}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="editorial">
                <MarkdownPreview source={problem.editorial} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowProblem(false)}>Edit Problem</Button>
          </CardFooter>
          <Button onClick={()=>{
            console.log("creating new peoblem");
            createNewProblem();
          }} className="mx-auto w-full" variant={"destructive"} >Create New Problem</Button>

          <div>
            imp:
            - donot use "\n" in c+++ program while creating them u can use endl
            - avoid to use '' or "" anyhting in code and comments

          </div>

        </Card>
      )}
    </div>
  )
}