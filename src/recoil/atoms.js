import {atom, atomFamily, selector, selectorFamily} from "recoil";

export const loggedinUser = atom(
    {
        key : "userId",  
        default : null ,     
    }
)


