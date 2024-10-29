import React from 'react'
import { LoginNavbar } from '../components/forLoginpage/LoginNavbar'
import { LoginSection } from '../components/forLoginpage/LoginSection'
import { Meteors } from '../components/magicui/Meteors'


export const Loginpage = () => {
  return (
    <div className='bg-black h-[100vh] relative overflow-x-hidden '>
        <LoginNavbar />
        <LoginSection />
        <div > 
            <Meteors />
        </div>
    </div>
  )
}
