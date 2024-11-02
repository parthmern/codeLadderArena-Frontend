import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProblemViewer } from '../components/forSolveproblempage/ProblemViewer';
import axios from 'axios';
import { getSingleProblem } from '../utils/apiUrls';
import { Navbar } from '../components/common/Navbar';
import { CreatingProblem } from '../components/forSolveproblempage/CreatingProblem';
import { EditorComponent } from '../components/forSolveproblempage/Editor';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { loggedinUser } from '../recoil/atoms';

export const SolveProblemPage = () => {

  const userId = useRecoilValue(loggedinUser);

    const {problemId} = useParams();

    const [problemDetails, setProblemDetails] = useState(null);

    const [socketId, setSocketId] = useState();
    console.log("socketid=>", socketId);

    console.log(problemId);

    const fetchProblem = async (pId) =>{
      try{

        const res = await axios.get(`${getSingleProblem}/${pId}`);
        console.log(res?.data?.data);
        setProblemDetails(res?.data?.data);


      }
      catch(error){
        console.log("error in getting problem=>", error);
      }
    }

    useEffect(()=>{
      fetchProblem(problemId);
    }, [problemId]);

    // ============================================================
    // ============================================================

    const socket = useMemo(()=>{
      return io("http://localhost:4001",   {transports: ['websocket']})
    }, [])

    
  useEffect(()=>{
    
    console.log("useeff run");

    socket.on("connect", ()=>{
      console.log("connected with id", socket.id);
      setSocketId(socket.id);
    })

    socket.emit('setUserId', userId?.id);

    socket.on("confirmSetUserId", (data)=>{
      console.log("💙 confirmSetUserId", data);
    })

    socket.on("submissionPayloadResponse", (data) => {
      console.log("❤️❤️❤️❤️❤️",data);
  })

    socket.on("emit", (data)=> {
      console.log(data);
    })

    // receving emitted from server
    

    return ()=>{
      socket.disconnect() ;
    }

  },[]);
  
  



    // ==============================================================
    //============================================================


  return (
    <div className='bg-black h-[100vh] flex relative overflow-x-hidden'>

      <Navbar />

      <ProblemViewer markdown={problemDetails?.description} />

      <EditorComponent problemDetails={problemDetails} />

    </div>
  )
}
