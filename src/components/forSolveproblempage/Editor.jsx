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
import { Testcases } from './Testcases';
import { loggedinUser } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

export const EditorComponent = ({ problemDetails }) => {

    console.log("problemDetails inside Edito=>", problemDetails);

    const {id : userId} = useRecoilValue(loggedinUser);

    const [code, setCode] = useState(null);
    console.log(code);

    const [language, setLanguage] = useState("cpp");
    console.log(language);


    async function codeSubmission() {

        try {

            const res = await axios.post(submitProblemUrl, {
                code: code,
                userId: userId,
                problemId: problemDetails?._id,
                language: language.toUpperCase()
            })

            console.log(res);

        }
        catch (error) {

            console.log("eroror=>", error);
        }


    }

    useEffect(() => {

        setCode(problemDetails?.codeStubs?.find(
            (stub) => stub?.language.toLowerCase() === language?.toLowerCase()
        )?.userSnippet);



    }, [problemDetails, language]);


    return (


        <div className='text-white geist-sans mt-16 ml-5 w-[50%] h-[88%] bg-[#05050a] flex flex-col border-[1px] border-[#d6ebfd30] rounded-xl p-5  '>

            <div className='text-black geist-sans pb-4 flex w-full items-center justify-between '>
                <Select defaultValue={language} onValueChange={(value) => { setLanguage(value) }}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className="geist-sans" value="cpp">CPP</SelectItem>
                            <SelectItem className="geist-sans" value="python">PYTHON</SelectItem>
                            <SelectItem className="geist-sans" value="java">JAVA</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button className="h-8 bg-green-600" onClick={() => {
                    codeSubmission();
                }} >Submit</Button>

            </div>

            <div className=' overflow-x-hidden  h-full '>
                {
                    code && (
                        <Editor
                            className=' border-[1px]  border-[#d6ebfd30]  '
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

            <div className='h-[40vh] '>
                {
                    problemDetails && (
                        <Testcases testCases={problemDetails?.testCases} />
                    )
                }
            </div>

        </div>
    )
}
