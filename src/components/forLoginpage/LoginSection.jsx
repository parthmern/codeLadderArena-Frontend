/* eslint-disable no-unused-vars */
import React from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import auth from "../../utils/firebaseSetup";
import { useRecoilState } from "recoil";
import { loggedinUser, authToken } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUser } from "../../utils/apiUrls";
import toast from "react-hot-toast";

export const LoginSection = () => {

  const [user, setUser] = useRecoilState(loggedinUser);
  const [token, setToken] =  useRecoilState(authToken);

  console.log("user=>", user, token);
  const navigate = useNavigate();

  const setUserDataAndTokenInLocalStorage = (user, token) => {
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    const userData = { 
        value: user, 
        expirationTime 
    };
    
    const tokenData = { 
        value: token, 
        expirationTime 
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("tokenData", JSON.stringify(tokenData));

    console.log("JSON.parse(localStorage.getItem", JSON.parse(localStorage.getItem("userData")) );
};


    async function loginHandler() {
        console.log("login btn clicked");
        console.log("user=>", user);

        
        var toastId = toast.loading("Authenticating ...", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

        try{
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        console.log("==>", result);
        const { displayName, email:mail } = result.user;

        

        const res = await axios.post(authUser, {
          name : displayName,
          email : mail
        }, { withCredentials: true });

        console.log("authenticaton done", res);

        // console.log(res?.data?.token);

        // localstorageSetterFunction
        // localStorage.setItem("userData", JSON.stringify(res?.data?.user));
        // localStorage.setItem("token", JSON.stringify(res?.data?.token));
        const {email, name, _id:id} = res?.data?.user;
        setUserDataAndTokenInLocalStorage({email, name, id}, res?.data?.token);

        setUser(res?.data?.user);
        setToken(res?.data?.token);
        navigate("/problems");
        
        }catch(error){
            console.log("error", error);
            toast.error("rregister failed");
        }

        toast.dismiss(toastId);

    }

  return (
    <div className="text-white geist-sans flex flex-col gap-y-5 h-[80%] items-center justify-center">
      <p className="text-[30px] "> Login to CodeLadderArena </p>

      <div className="p-2" onClick={loginHandler}>
        <button
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
