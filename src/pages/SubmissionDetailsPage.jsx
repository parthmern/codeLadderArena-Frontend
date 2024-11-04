import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/common/Navbar'
import { ProblemViewer } from '../components/forSolveproblempage/ProblemViewer'
import { EditorComponent } from '../components/forSolveproblempage/Editor'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {submissionDetailsUrl} from "../utils/apiUrls"
import { EditorForsubmissiondetails } from '../components/forSubmissiondetailspage/EditorForsubmissiondetails'
import toast from 'react-hot-toast'

export const SubmissionDetailsPage = () => {

    const {submissionId} = useParams();

    const [submissionDetails, setSubmissionDetails] = useState(null);

    console.log("==============================================submissionDetails", submissionDetails);

    async function fetchSubmissionDetails(){

        try{

            const res = await axios(`${submissionDetailsUrl}/${submissionId}`);

            console.log(res);

            setSubmissionDetails(res?.data);

            toast.success("Got submission details", { duration: 1000 });
            

        }
        catch(error){
            console.log(error);

            toast.error("Error in submission details");
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
      <EditorForsubmissiondetails  submissionDetails={submissionDetails}  />

    </div>
  )
}
