import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { Spotlight } from '../components/accernity/Spotlight'
import { HeroSection } from '../components/forHomepage/HeroSection'
import { AbstractImgOne } from '../components/forHomepage/AbstractImgOne'
import { AbstractImgTwo } from '../components/forHomepage/AbstractImgTwo'
import { StarImgOne } from '../components/forHomepage/StarImgOne'
import { StarImgTwo } from '../components/forHomepage/StarImgTwo'
import { HeroVideoDialogBox } from '../components/magicui/HeroVideoDialog'
import { StarImgThree } from '../components/forHomepage/StarImgThree'
import { VideoImgOne } from '../components/forHomepage/VideoImgOne'
import { VideoImgTwo } from '../components/forHomepage/VideoImgTwo'

export const Homepage = () => {
  return (
    <div className='bg-black overflow-x-hidden relative h-[100vh] '>
        <Navbar />
        <Spotlight className={"right-0 mr-0"} />
        <HeroSection />
        <AbstractImgOne />
        <AbstractImgTwo />
        <StarImgOne />
        <StarImgTwo />
        <StarImgThree />
        <div className='absolute z-[99999] pb-10 w-[100%] mx-auto px-auto'>
          <HeroVideoDialogBox />
          <VideoImgOne />
          <VideoImgTwo />
        </div>
        
    </div>
  )
}
