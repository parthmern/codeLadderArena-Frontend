/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
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
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedinUser, authToken } from "../recoil/atoms";
import { verifyToken } from '../utils/apiUrls'

export const Homepage = () => {

  const [user, setLoggedinUser] = useRecoilState(loggedinUser);
  const [token, setAuthToken] =  useRecoilState(authToken);

  async function verifyTokenFunc() {

    try {
        // Make the request to verify the token
        const response = await axios.get(verifyToken, {
            withCredentials: true, // Include cookies in the request
        });

        // If verification succeeds, no further action is needed
        console.log("Token verified successfully:", response.data);
    } catch (error) {
        console.error("Token verification failed:", error);

        // Set Recoil states to null if verification fails
        setLoggedinUser(null);
        setAuthToken(null);

        // Remove data from localStorage
        localStorage.removeItem("userData");
        localStorage.removeItem("tokenData");
    }
};

  useEffect(()=>{
    if(token) {
      console.log("cheking tokne", token);
      verifyTokenFunc();
    }
  }, [])


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
        <div className='absolute  z-[99999] pb-10 w-[100%] mx-auto px-auto'>
          <HeroVideoDialogBox />
          <VideoImgOne />
          <VideoImgTwo />
        </div>
        
    </div>
  )
}
