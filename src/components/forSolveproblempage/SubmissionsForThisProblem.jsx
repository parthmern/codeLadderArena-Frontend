import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSubmissionByUserAndProblemUrl } from '../../utils/apiUrls';
import { loggedinUser } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

export const SubmissionsForThisProblem = () => {

    const naviagte = useNavigate();

    const { problemId } = useParams();

    const { id: userId } = useRecoilValue(loggedinUser);

    const [submissionsForProblem, setSubmissionsForProblem] = useState(null);

    async function fetchSubmissionByUserAndProblem() {
        const res = await axios.get(`${getSubmissionByUserAndProblemUrl}/user/${userId}/problem/${problemId}`);

        console.log(res);

        setSubmissionsForProblem(res?.data?.reverse());

    }

    useEffect(() => {
        fetchSubmissionByUserAndProblem();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS':
                return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'FAILURE':
                return 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
            case 'WA':
                return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            default:
                return 'bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }
    }

    return (
        <div className='mt-6 h-full overflow-x-hidden'>
            {
                submissionsForProblem && (
                    submissionsForProblem.map((sub) => {
                        return (
                            <div onClick={()=>{
                                naviagte(`/submissionDetails/${sub?._id}`)
                            }} className='text-sm mb-4 flex cursor-pointer items-center justify-between p-4 border-b-[1px] hover:text-green-500 border-b-slate-50 hover:border-b-green-500 '>
                                <p className=''>{sub?._id}</p>
                                <div className=''>
                                <span className='px-2 ml-5 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                                    {sub?.language}
                                </span>
                                </div>
                                
                                <div className=''>
                                    <span className={`px-2 py-1 mr-2 rounded-full text-xs font-semibold ${getStatusColor(sub?.status)}`}>
                                        {sub?.status}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
