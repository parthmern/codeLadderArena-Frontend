/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loggedinUser, authToken } from "../recoil/atoms";


// export const verifyToken = async () => {
//     // Get Recoil set functions
//     const setLoggedinUser = useSetRecoilState(loggedinUser);
//     const setAuthToken = useSetRecoilState(authToken);

//     try {
//         // Make the request to verify the token
//         const response = await axios.get(verifyToken, {
//             withCredentials: true, // Include cookies in the request
//         });

//         // If verification succeeds, no further action is needed
//         console.log("Token verified successfully:", response.data);
//     } catch (error) {
//         console.error("Token verification failed:", error);

//         // Set Recoil states to null if verification fails
//         setLoggedinUser(null);
//         setAuthToken(null);

//         // Remove data from localStorage
//         localStorage.removeItem("userData");
//         localStorage.removeItem("token");
//     }
// };
