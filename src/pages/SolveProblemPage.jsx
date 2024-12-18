import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProblemViewer } from '../components/forSolveproblempage/ProblemViewer';
import axios from 'axios';
import { getSingleProblem, socketServiceUrl } from '../utils/apiUrls';
import { Navbar } from '../components/common/Navbar';
import { CreatingProblem } from '../components/forSolveproblempage/CreatingProblem';
import { EditorComponent } from '../components/forSolveproblempage/Editor';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { loggedinUser } from '../recoil/atoms';
import toast from 'react-hot-toast';

export const SolveProblemPage = () => {

  const userId = useRecoilValue(loggedinUser);

    const {problemId} = useParams();

    const [inSubmissionPhase, setInSubmissionPhase] = useState(false);

    const [problemDetails, setProblemDetails] = useState(null);

    const [submissionRes, setSubmissionRes] = useState(null);

    const [socketId, setSocketId] = useState();
    console.log("socketid=>", socketId);

    console.log(problemId);

    const fetchProblem = async (pId) =>{
      try{

        const res = await axios.get(`${getSingleProblem}/${pId}`);
        console.log(res?.data?.data);
        setProblemDetails(res?.data?.data);

        toast.success("Problem fetched", { duration: 1000 });

      }
      catch(error){
        console.log("error in getting problem=>", error);
        toast.error("Error in problem fetching");
      }
    }

    useEffect(()=>{
      fetchProblem(problemId);
    }, [problemId]);

    // ============================================================
    // ============================================================

    const SOCKET_SERVICE_URL = socketServiceUrl;
    const socket = useMemo(()=>{
      return io(SOCKET_SERVICE_URL,   {transports: ['websocket']})
    }, [])

    
  useEffect(()=>{
    
    console.log("useeff run");

    socket.on("connect", ()=>{
      console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅connected with id", socket.id);
      setSocketId(socket.id);
    })

    socket.emit('setUserId', userId?.id);

    socket.on("confirmSetUserId", (data)=>{
      console.log("💙 confirmSetUserId", data);
    })

    socket.on("submissionPayloadResponse", (data) => {
      console.log("❤️❤️❤️❤️❤️",data);
      setSubmissionRes(data);
      setInSubmissionPhase(false);
      toast.success("Got review ❤️", { duration: 1000 });
  })

    socket.on("emit", (data)=> {
      console.log(data);
    })

    // receving emitted from server
    

    return ()=>{
      socket.disconnect() ;
    }

  },[]);


  console.log("submissionRessubmissionRessubmissionRessubmissionRes",submissionRes);


    // ==============================================================
    //============================================================


  return (
    <div className='bg-black h-[100vh] pr-4 md:flex relative overflow-x-hidden'>

      <Navbar />

      <ProblemViewer markdown={problemDetails?.description} />

      <EditorComponent inSubmissionPhase={inSubmissionPhase} setInSubmissionPhase={setInSubmissionPhase} problemDetails={problemDetails} submissionRes={submissionRes} />

    </div>
  )
}
