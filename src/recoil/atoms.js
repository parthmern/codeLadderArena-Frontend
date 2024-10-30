import {atom, atomFamily, selector, selectorFamily} from "recoil";

const getUserDataFromLocalStorage = () => {
    try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if (userData && Date.now() < userData.expirationTime) {
            return userData.value;
        } else {
            localStorage.removeItem("userData"); // Remove expired user data
            return null;
        }
    } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData"); // Remove corrupted data
        return null;
    }
};

const getTokenFromLocalStorage = () => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));

        if (tokenData && Date.now() < tokenData.expirationTime) {
            return tokenData.value;
        } else {
            localStorage.removeItem("tokenData"); // Remove expired token
            return null;
        }
    } catch (error) {
        console.error("Error parsing tokenData from localStorage:", error);
        localStorage.removeItem("tokenData"); // Remove corrupted data
        return null;
    }
};

export const loggedinUser = atom({
    key: "loggedinUser",
    default: getUserDataFromLocalStorage() || null,
});

export const authToken = atom({
    key: "authToken",
    default: getTokenFromLocalStorage() || null,
});

