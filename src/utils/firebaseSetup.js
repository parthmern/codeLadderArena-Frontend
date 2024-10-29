import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAT2MowkSfRPZlb63nMipw6aYaGouYZFPY",
    authDomain: "codeladderarena.firebaseapp.com",
    projectId: "codeladderarena",
    storageBucket: "codeladderarena.appspot.com",
    messagingSenderId: "158442463082",
    appId: "1:158442463082:web:e42e8212bc9b43a634cf13",
    measurementId: "G-RTBT8295GN"
};

// project-158442463082

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;


