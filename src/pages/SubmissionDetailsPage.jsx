import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/common/Navbar'
import { ProblemViewer } from '../components/forSolveproblempage/ProblemViewer'
import { EditorComponent } from '../components/forSolveproblempage/Editor'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {submissionDetailsUrl} from "../utils/apiUrls"

export const SubmissionDetailsPage = () => {

    const {submissionId} = useParams();

    const [submissionDetails, setSubmissionDetails] = useState(null);

    async function fetchSubmissionDetails(){

        try{

            const res = await axios(`${submissionDetailsUrl}/${submissionId}`);

            console.log(res);

            setSubmissionDetails(res?.data);
            

        }
        catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{

        fetchSubmissionDetails();

    }, [submissionId])



  return (
    <div className='bg-black h-[100vh] flex relative overflow-x-hidden'>

      <Navbar />

      <ProblemViewer markdown={submissionDetails?.problemId?.description} />

      {/* <EditorComponent problemDetails={problemDetails} submissionRes={submissionRes} /> */}

    </div>
  )
}
