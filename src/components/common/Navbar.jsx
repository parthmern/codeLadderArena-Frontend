import React from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { authToken, loggedinUser } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();

  const userId = useRecoilValue(loggedinUser);
  const token = useRecoilValue(authToken);
  console.log(userId, token);

  return (
    <div className="w-full absolute transparentBg z-[9999]  bg-[#05050a] text-white geist-sans h-[50px] flex items-center justify-between px-2 md:px-10">
      <p onClick={()=>{navigate("/")}} className={`logoFont cursor-pointer imgShadow hidden md:block md:text-xl `}>CodeLadderArena</p>
      <p onClick={()=>{navigate("/problems")}}  className="geist-sans cursor-pointer hover:text-blue-400 ">Problems</p>
      <p onClick={()=>{navigate("/allSubmissions")}}  className="geist-sans cursor-pointer hover:text-blue-400">My submissions</p>
      <div>
        {userId ? (
          <div className="flex gap-x-2"><CircleUser className="size-5" /><p>{userId.name}</p></div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            className="text-gray-900  hover:text-blue-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login 💚
          </button>
        )}
      </div>
    </div>
  );
};
