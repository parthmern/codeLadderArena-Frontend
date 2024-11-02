"use client"

import { useEffect, useState } from "react"
import { Button } from "../shadcn/ButtonVarients"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"

export function Testcases({testCases}) {

    console.log(testCases);

  const [cases, setCases] = useState(testCases);

  const [activeCase, setActiveCase] = useState(cases[0]._id)

  useEffect(()=>{
    setCases(testCases);
  }, [testCases])

  const activeDetails = cases.find(c => c._id === activeCase)

  return (
    <div className="dark h-full">
      <div className="bg-[#0d1117] h-full text-gray-100">
        <div className="container mx-auto px-4 py-2">
          <h2 className="text-sm  font-bold mb-2">Test Cases</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {cases.map((testCase,index) => (
              <Button
              
                key={testCase._id}
                variant={activeCase === testCase._id ? "default" : "outline"}
                onClick={() => setActiveCase(testCase._id)}
                className={`text-gray-100 h-8 ${
                  activeCase === testCase._id 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                case{index+1}   
              </Button>
            ))}
          </div>
          {activeDetails && (
            <Card className="bg-[#161b22] text-sm text-gray-100 border-gray-700">
              <CardContent className=" flex flex-col p-2">
                <div>
                  <strong className="text-blue-300">Input:</strong> {activeDetails.input}
                </div>
                <div>
                  <strong className="text-blue-300">Output:</strong> {activeDetails.output}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}