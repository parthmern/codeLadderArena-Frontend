import { House } from 'lucide-react'
import React from 'react'

export const LoginNavbar = () => {
  return (
    <div>
        <div className='cursor-pointer hover:text-blue-500 transition-all duration-200 text-[#f1f7feb5] geist-sans flex gap-x-2 items-center justify-start pl-5 mt-10'>
            < House className='size-4 ' />
            <p className=''> Home</p>
        </div>
    </div>
  )
}

