import React from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { loggedinUser } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();

  const userId = useRecoilValue(loggedinUser);
  console.log(userId);

  return (
    <div className="w-full absolute transparentBg z-[9999]  bg-[#05050a] text-white geist-sans h-[50px] flex items-center justify-between px-10">
      <p className={`logoFont imgShadow text-xl `}>CodeLadderArena</p>
      <p className="geist-sans">Questions</p>
      <div>
        {userId ? (
          <div className="flex gap-x-2"><CircleUser className="size-5" /><p>{userId.displayName}</p></div>
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
