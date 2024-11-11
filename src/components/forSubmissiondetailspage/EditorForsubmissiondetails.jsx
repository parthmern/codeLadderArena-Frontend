import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";

import { TestcasesForSubmissionDetails } from './TestcasesForsubmissiondetails';



export const EditorForsubmissiondetails = ({ submissionDetails }) => {

    console.log("submissionDetails inside Edito=>", submissionDetails, submissionDetails?.language);

    const [code, setCode] = useState(null);
    console.log(code);


    

    // useEffect(() => {

    //     setCode(problemDetails?.codeStubs?.find(
    //         (stub) => stub?.language.toLowerCase() === language?.toLowerCase()
    //     )?.userSnippet);



    // }, [problemDetails, language]);


    return (


        <div className='text-white geist-sans mt-16 ml-5 md:w-[50%] h-[88%] bg-[#05050a] flex flex-col border-[1px] border-[#d6ebfd30] rounded-xl p-5  '>

            <div className='text-black geist-sans pb-4 flex w-full items-center justify-between '>
               <p className='bg-white px-2 py-1 rounded-md '>{submissionDetails?.language}</p>

                
            </div>

            <div className=' overflow-x-hidden  h-full '>
                {
                    submissionDetails && (
                        <Editor
                            className=' border-[1px]  border-[#d6ebfd30]  '
                            defaultLanguage={submissionDetails?.language?.toLowerCase()}
                            defaultValue={submissionDetails?.code}
                            theme="vs-dark"
                            onChange={(newCode) => {
                                setCode(newCode);
                            }}
                            value={code}
                        />
                    )
                }
            </div>

            <div className='h-[40vh] '>
                {
                    submissionDetails?.problemId && (
                        <TestcasesForSubmissionDetails submissionRes={submissionDetails?.result} testCases={submissionDetails?.problemId?.testCases} />
                    )
                }
            </div>

        </div>
    )
}
