import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { Spotlight } from '../components/accernity/Spotlight'
import { HeroSection } from '../components/forHomepage/HeroSection'
import { AbstractImgOne } from '../components/forHomepage/AbstractImgOne'
import { AbstractImgTwo } from '../components/forHomepage/AbstractImgTwo'

export const Homepage = () => {
  return (
    <div className='bg-black overflow-x-hidden relative h-[100vh] '>
        <Navbar />
        <Spotlight className={"right-0 mr-0"} />
        <HeroSection />
        <AbstractImgOne />
        <AbstractImgTwo />
    </div>
  )
}
