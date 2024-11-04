import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/common/Navbar'
import { getProblems } from '../utils/apiUrls'
import axios from 'axios';
import { ProblemHeader } from '../components/forProblempage/ProblemHeader';
import { SingleQue } from '../components/forProblempage/SingleQue';
import toast from 'react-hot-toast';

export const Problemspage = () => {

    const [allProblems, setAllProblems] = useState(null);
    

    const fetchData = async () =>{
        console.log("fetching problems");

        var toastId = toast.loading("Fetching problems");
        
        try{
            const res = await axios.get(getProblems);
            console.log(res);
            setAllProblems(res?.data?.data);
            toast.success("Problem fetched", {duration: 1000});
        }
        catch(error){
            console.log("Error->", error);
            toast.error("Error in problem fetching");
        }

        toast.dismiss(toastId);
    }

    useEffect(()=>{

        fetchData();

    }, [])

  return (
    <div className='bg-black h-[100vh] relative overflow-x-hidden '>
        <Navbar />
        <ProblemHeader />
        <div className='p-10'>
            {
                allProblems && (
                    <>
                    {
                        allProblems.map((problem, index)=>{
                            return(
                                <SingleQue key={index} prop={problem} number={index+1} />
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
