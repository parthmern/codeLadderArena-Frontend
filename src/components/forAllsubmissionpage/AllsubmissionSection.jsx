import React, { useDebugValue, useEffect, useState } from 'react'
import { AllSubmissionHeader } from './AllsubmissionHeader'
import { loggedinUser } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { allSubmissionsUrl } from '../../utils/apiUrls';
import { SingleSubmissionCompo } from './SingleSubmissionCompo';
import { useNavigate } from 'react-router-dom';

export const AllsubmissionSection = () => {
    
    const {id : userId} = useRecoilValue(loggedinUser);
    console.log("userIduserIduserIduserIduserIduserIduserId",userId);

    const navigate = useNavigate();

    const [allSubmissions, setAllSubmissions] = useState(null);
    console.log(allSubmissions);

    async function fetchAllSubmissions() {
        try{
            const res = await axios.get(`${allSubmissionsUrl}/${userId}`);
        console.log(res);
        setAllSubmissions(res?.data?.reverse());
        }catch(error){
            console.log("error", error);
            
            navigate(0); 
        }
    }
    

    useEffect(()=>{
        console.log("userIduserIduserIduserIduserIduserIduserId",userId);
        if (userId) { 
            fetchAllSubmissions();
        }else{
            navigate(0); 
        }
    
    },[userId])


    return (
        <div>
            <AllSubmissionHeader />
    
            <div className='px-10 mt-10'>
                {allSubmissions && (
                    <>
                        {allSubmissions.map((submission, index) => {
                            //console.log(index, submission);
                            return (
                               <SingleSubmissionCompo submission={submission} number={index+1} />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
    
}
