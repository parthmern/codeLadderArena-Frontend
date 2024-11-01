import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../shadcn/Select"
import { Button } from '../shadcn/ButtonVarients';
import axios from 'axios';
import { submitProblemUrl } from '../../utils/apiUrls';

export const EditorComponent = ({ problemDetails }) => {

    console.log("problemDetails inside Edito=>", problemDetails);

    const [code, setCode] = useState(null);
    console.log(code);

    const [language, setLanguage] = useState("cpp");
    console.log(language);


    async function codeSubmission(){

        try{

            const res = await axios.post(submitProblemUrl, {
                code : code,
                userId : "123", 
                problemId : problemDetails?._id,
                language : language.toUpperCase()
            })

            console.log(res);

        }
        catch(error){

            console.log("eroror=>", error);
        }


    }

    useEffect(()=>{

        setCode(problemDetails?.codeStubs?.find(
            (stub) => stub?.language.toLowerCase() === language?.toLowerCase()
        )?.userSnippet );

        

    }, [problemDetails, language]);


    return (


        <div className='text-white geist-sans mt-16 ml-5 w-[45%] h-[85%] bg-[#05050a] flex flex-col border-[1px] border-[#d6ebfd30] rounded-xl p-5  '>

            <div className='text-black'>
                <Select defaultValue={language} onValueChange={(value)=>{setLanguage(value)}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="cpp">CPP</SelectItem>
                            <SelectItem value="python">PYTHON</SelectItem>
                            <SelectItem value="java">JAVA</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button onClick={()=>{
                    codeSubmission();
                }} >Submit</Button>

            </div>

            <div>
                {
                    code && (
                        <Editor
                height="90vh"
                defaultLanguage="cpp"
                defaultValue={code}
                theme="vs-dark"
                onChange={(newCode) => {
                    setCode(newCode);
                }}
                value={code}
            />
                    )
                }
            </div>

        </div>
    )
}
