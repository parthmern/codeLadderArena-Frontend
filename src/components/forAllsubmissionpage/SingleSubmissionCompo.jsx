import React from 'react'
import { useNavigate } from 'react-router-dom';

export const SingleSubmissionCompo = ({ submission, number }) => {

    console.log(submission);

    const { _id: submissionId, problemId, status, language } = submission;

    const naviagte = useNavigate();

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
        <div onClick={() => {
            console.log(submissionId);
            naviagte(`/submissionDetails/${submissionId}`);
        }} className='cursor-pointer geist-sans mb-5 hover:bg-[#d9edfe25] transition-all duration-200 p-3 flex items-center justify-between font-[100] border-[1px] border-gray-300 rounded-xl text-white'>

            <div>
                {`${number} |  ${problemId.title}`}
                <span className='px-2 ml-5 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    {language}
                </span>
            </div>

            <div className='overflow-hidden'>
                <span className={`px-2 py-1 mr-2 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status}
                </span>
            </div>

        </div>

    )
}
