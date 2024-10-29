import React from 'react'
import { useNavigate } from 'react-router-dom';

export const SingleQue = ({ prop: { _id: id, title, difficulty }, number }) => {

    console.log(title);

    const naviagte = useNavigate();

  return (
    <div onClick={()=>{
        console.log(id);
        naviagte(`/solve/${id}`);
    }} className='cursor-pointer geist-sans mb-5 hover:bg-[#d9edfe25] transition-all duration-200 p-3 flex items-center justify-between font-[100] border-[1px] border-gray-300 rounded-xl text-white'>

        <div> 
            {`${number} |  ${title}`}
        </div>
        <div className='overflow-hidden'>
        <span className={`px-2 py-1 mr-2 rounded-full text-xs font-semibold
                    ${difficulty === 'easy' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {difficulty}
                  </span>
        </div>

    </div>
  )
}
