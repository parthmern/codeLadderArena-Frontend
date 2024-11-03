import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { AllsubmissionSection } from '../components/forAllsubmissionpage/AllsubmissionSection'

export const AllSubmissionPage = () => {
  return (
    <div className='bg-black h-[100vh] relative overflow-x-hidden '>

        <Navbar />

        <AllsubmissionSection />

    </div>
  )
}
