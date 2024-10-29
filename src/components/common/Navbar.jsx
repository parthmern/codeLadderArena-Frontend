import React from 'react';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userId as userIdAtom } from '../../recoil/atoms';


export const Navbar = () => {

    const userId = useRecoilValue(userIdAtom);

  return (
    <div className='w-full bg-[#05050a] text-white geist-sans h-[50px] flex items-center justify-between px-10'>
        <p className={`logoFont`}>CodeLadderArena</p>
        <p className='geist-sans'>Questions</p>
        <div>
            {
                userId ? (<p>{userId}</p>) : (<p>not login</p>)
            }
        </div>
    </div>
  )
}
