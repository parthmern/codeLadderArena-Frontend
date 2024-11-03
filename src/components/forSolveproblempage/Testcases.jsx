"use client"

import { useEffect, useState } from "react"
import { Button } from "../shadcn/ButtonVarients"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"
import { currentSubmissionWithProblemId } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { CheckCircle, XCircle } from "lucide-react"

export function Testcases({testCases, submissionRes}) {

    console.log("💚💚💚💚💚💚 submissionRes inside testcase=>>", submissionRes);

    const [cuuSubWithpId, setCuuSubWithpId] = useRecoilState(currentSubmissionWithProblemId);

    const [submissionResults, setSubmissionResults] = useState(null);

    useEffect(()=>{

        if(submissionRes){
          setSubmissionResults(submissionRes?.results);
        }

    }, [submissionRes]);

    console.log(testCases);

  const [cases, setCases] = useState(testCases);

  const [activeCase, setActiveCase] = useState(null);

  useEffect(()=>{
    setCases(testCases);
    setActiveCase(cases[0]?._id);
  }, [testCases])

//   const activeDetails = cases?.find(c => c?._id === activeCase) ;

  const [activeDetails,setActiveDetails] = useState(null);

  useEffect(()=>{
    setActiveDetails( cases?.find(c => c?._id === activeCase) );
    
  }, [activeCase]);

  console.log("activeDetails====>", activeDetails)

//   return (
//     <div className="dark h-full">
//       <div className="bg-[#0d1117] h-full text-gray-100">
//         <div className="container mx-auto px-4 py-2">
//           <h2 className="text-sm  font-bold mb-2">Test Cases</h2>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {cases.map((testCase,index) => (
//               <Button
              
//                 key={testCase._id}
//                 variant={activeCase === testCase._id ? "default" : "outline"}
//                 onClick={() => setActiveCase(testCase._id)}
//                 className={`text-gray-100 h-8 ${
//                   activeCase === testCase._id 
//                     ? "bg-blue-600 hover:bg-blue-700" 
//                     : "bg-gray-800 hover:bg-gray-700"
//                 }`}
//               >
//                 case{index+1}   
//               </Button>
//             ))}
//           </div>
//           {activeDetails && (
//             <Card className="bg-[#161b22] text-sm text-gray-100 border-gray-700">
//               <CardContent className=" flex flex-col p-2">
//                 <div>
//                   <strong className="text-blue-300">Input:</strong> {activeDetails.input}
//                 </div>
//                 <div>
//                   <strong className="text-blue-300">Output:</strong> {activeDetails.output}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )


    //console.log(submissionResults[cases.findIndex(c => c._id === activeCase)]);
    

    
  return (
    <div className="dark h-full">
      <div className="bg-[#0d1117] h-full text-gray-100">
        <div className="container mx-auto px-4 py-2">
          <h2 className="text-sm font-bold mb-2">Test Cases</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {cases.map((testCase, index) => (
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
                <span className="mr-2">Case {index + 1}</span>
                {submissionResults && submissionResults[index] && (
                  submissionResults[index].status === "SUCCESS" 
                    ? <CheckCircle className="w-4 h-4 text-green-500" />
                    : <XCircle className="w-4 h-4 text-red-500" />
                )}
              </Button>
            ))}
          </div>
          {activeDetails && (
            <Card className="bg-[#161b22] text-sm text-gray-100 border-gray-700">
              <CardContent className="flex flex-col p-2">
                <div>
                  <strong className="text-blue-300">Input:</strong> {activeDetails.input}
                </div>
                <div>
                  <strong className="text-blue-300">Output:</strong> {activeDetails.output}
                </div>
                {submissionResults && activeCase && (
                  <div>
                    <strong className="text-blue-300">Result:</strong> {
                      submissionResults[cases.findIndex(c => c._id === activeCase)]?.status || 'N/A'
                    }
                    {
                        submissionResults[cases.findIndex(c => c._id === activeCase)]?.output && submissionResults[cases.findIndex(c => c._id === activeCase)]?.status === "WA" && (

                       <>
                        <p className="text-red-500">Your output :  <span className="">{submissionResults[cases.findIndex(c => c._id === activeCase)]?.output}</span></p>
                        </>

                        )
                    }
                    {submissionResults[cases.findIndex(c => c._id === activeCase)]?.status  !== "SUCCESS" &&  submissionResults[cases.findIndex(c => c._id === activeCase)]?.status  !== "WA" && (
                      <div className="mt-2 text-xs text-red-400 whitespace-pre-wrap">
                        {submissionResults[cases.findIndex(c => c._id === activeCase)].output}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )

}