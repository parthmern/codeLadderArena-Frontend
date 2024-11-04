import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <RecoilRoot>
    <App />
    <Toaster containerClassName="geist-sans text-sm" />
  </RecoilRoot>
  </BrowserRouter>
  
);
