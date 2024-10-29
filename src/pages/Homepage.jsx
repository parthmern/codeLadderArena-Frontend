import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { Spotlight } from '../components/accernity/Spotlight'
import { HeroSection } from '../components/forHomepage/HeroSection'
import { AbstractImgOne } from '../components/forHomepage/AbstractImgOne'

export const Homepage = () => {
  return (
    <div className='bg-black h-[100vh] '>
        <Navbar />
        <Spotlight />
        <HeroSection />
        <AbstractImgOne />
    </div>
  )
}
