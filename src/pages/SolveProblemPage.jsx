import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProblemViewer } from '../components/forSolveproblempage/ProblemViewer';
import axios from 'axios';
import { getSingleProblem } from '../utils/apiUrls';
import { Navbar } from '../components/common/Navbar';
import { CreatingProblem } from '../components/forSolveproblempage/CreatingProblem';

export const SolveProblemPage = () => {

    const {problemId} = useParams();

    const [problemDetails, setProblemDetails] = useState(null);

    console.log(problemId);

    const fetchProblem = async (pId) =>{
      try{

        const res = await axios.get(`${getSingleProblem}/${pId}`);
        console.log(res?.data?.data);
        setProblemDetails(res?.data?.data);


      }
      catch(error){
        console.log("error in getting problem=>", error);
      }
    }

    useEffect(()=>{

      fetchProblem(problemId);
      

    }, [problemId]);


  return (
    <div className='bg-black h-[100vh] relative overflow-x-hidden'>

      <Navbar />

      <ProblemViewer markdown={problemDetails?.description} />

      <CreatingProblem />

    </div>
  )
}
