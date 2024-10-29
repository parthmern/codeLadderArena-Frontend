import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/common/Navbar'
import { getProblems } from '../utils/apiUrls'
import axios from 'axios';
import { ProblemHeader } from '../components/forProblempage/ProblemHeader';
import { SingleQue } from '../components/forProblempage/SingleQue';

export const Problemspage = () => {

    const [allProblems, setAllProblems] = useState(null);
    

    const fetchData = async () =>{
        console.log("fetching problems");
        
        try{
            const res = await axios.get(getProblems);
            console.log(res);
            setAllProblems(res?.data?.data);
        }
        catch(error){
            console.log("Error->", error);
        }
    }

    useEffect(()=>{

        fetchData();

    }, [])

  return (
    <div className='bg-black h-[100vh] relative overflow-x-hidden '>
        <Navbar />
        <ProblemHeader />
        <div className='p-5'>
            {
                allProblems && (
                    <>
                    {
                        allProblems.map((problem, index)=>{
                            return(
                                <SingleQue prop={problem} number={index+1} />
                            )
                        })
                    }
                    </>
                )
            }
        </div>
    </div>
  )
}
