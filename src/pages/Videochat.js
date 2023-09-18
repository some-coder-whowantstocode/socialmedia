import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { socketContext } from "../context/SocketContext";
import peer from "../services/Peer";
import { FcCamera, FcEndCall } from "react-icons/fc";
import Dj from "../assets/di.jpg";
import { useNavigate, useParams } from "react-router";
import {authenticationContex} from '../context/AutenticationContext'
import { BsCameraVideo , BsCameraVideoOff } from "react-icons/bs";
import Calling from "../components/messageComponents/Calling";

const Videochat = () => {
  const { socket } = useContext(socketContext);
  const [remotesocketid, setremotesocketid] = useState(null);
  const [mystream, setmystream] = useState();
  const [remotestream, setremotesream] = useState();
  const [iscaller, setcaller] = useState(false);
  const [isreciever, setreciever] = useState(false);
  const [isincall, setincall] = useState(false);
  const ls = useRef();
  const rs = useRef();
  const endbutton = useRef();
  const [me,setme] = useState(null)
  const {checkauthentications} = useContext(authenticationContex)
  const [endcall,setendcall] = useState(false);
  const [camera,setcamera] = useState(false);
  const [mice,setmice] = useState(false)

// if user is first then make him the caller and wait for the other user to join
  
  useEffect(()=>{
    // setremotesocketid(id)
    setcaller(true);
   
    checkauthentications()
    .then((data)=>{
      const {name} = data
      setme(name)
    })
    .catch(error=>console.log(error))
  },[])

// first get usermedia when user enters the call 

  useEffect(()=>{
      
      const getusermedia =async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        })
        setmystream(stream)
      }
   
      getusermedia()
  },[])

  useEffect(()=>{

    let timer =setTimeout(() => {
      if(!isincall)
      {
        handlecallcut()
      }
    }, 10000);

    return ()=> clearTimeout(timer)
  },[isincall])

// when user joins send them offer to create connection

  const handleuserjoin = useCallback(async ({ user, socketid }) => {
    try{

      setremotesocketid(socketid);
      setincall(true)
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: socketid, offer });
    }catch(error){
      console.log(error)
    }
    
  }, []);

// when the 2nd user joins he gets the offer from the first user and sends answer 

  const handleincomingcall = useCallback(
    async ({ from, offer }) => {
      try{

        setcaller(false)
        setincall(true)
        setremotesocketid(from);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setmystream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
        setreciever(true);
      }catch(error){
        console.log(error)
      }
      },
    [socket]
  );

// when the connection between two users is established send the streams 

  const sendStreams = useCallback(async () => {
    try{
    if (mystream && mystream != undefined  ) {
        
        const senders = peer.peer.getSenders();
        
        for (const track of mystream.getTracks()) {
          const senderExists = senders.some((sender) => sender.track === track);
          if (!senderExists) {
            await new Promise((resolve, reject) => {
              const sender = peer.peer.addTrack(track, mystream);
              if (sender) {
                resolve();
              } else {
                reject(new Error("Failed to add track to sender."));
              }
            });
          }
          setincall(true);
        }
      } else {
        
        const localstream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        for (const track of localstream.getTracks()) {
          peer.peer.addTrack(track, mystream);
        }
      }
    }catch(error){
      console.log(error)
    }
    }, [mystream]);

// when get answer from the second user make send streams

  const handlecallaccepted = useCallback(
    
    async ({ from, ans }) => {
      try{

        setincall(true)
        await peer.setLocalDescription(ans);
        sendStreams();
      }catch(error){
        console.log(error)
      }
      // }
    },
    [sendStreams]
  );

// negotiation handeling-----------------------------------

  const handlenegoneeded = useCallback(async () => {
    try{

      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remotesocketid });
    }catch(error){
      console.log(error)
    }
    }, [remotesocketid, socket]);
    
    useEffect(() => {
      try{

        peer.initializepeer();
        if (peer.peer) {
          peer.peer.addEventListener("negotiationneeded", handlenegoneeded);
          
          return () => {
            peer.peer.removeEventListener("negotiationneeded", handlenegoneeded);
          };
        }
      }catch(error){
        console.log(error)
      }
  }, [handlenegoneeded]);

  const handlenegoincomming = useCallback(
    async ({ from, offer }) => {
      try{

        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
      }catch(error){
        console.log(error)
      }
    },
    [socket]
  );

  const handlenegofinal = useCallback(async ({ from, ans }) => {
    try{
      await peer.setLocalDescription(ans);

    }catch(error){
      console.log(error)
    }
  }, []);

// --------------------------------


  const handleTrack =useCallback( async (ev) => {
    try{

      const Remotestream = ev.streams;
      setremotesream(Remotestream[0]);
    }catch(error){
      console.log(error)
    }
  },[])

  useEffect(() => {
    peer.peer.addEventListener("track", handleTrack);

    return () => {
      peer.peer.removeEventListener("track", handleTrack);
    };
  }, []);

// when the user want to leave the call or the other user left the call
  
  const handlecallcut =async() => {
      socket.emit('user:leave',{user:me,room:remotesocketid})
     setendcall(true)
  }


  useEffect(()=>{
    try{

      if(endcall)
      {
        let stream = mystream;
        if(stream)
        {
          
          peer.initializepeer()
          stream.getTracks().forEach((track) => {
            track.stop();
            
            const sender = peer.peer.getSenders().find((s) => s.track === track);
            if (sender) {
          peer.peer.removeTrack(sender);
        }
      });
      
      socket.emit('cam:turn:off',{to:remotesocketid})
      
      mystream && setmystream(null);
      if(ls.current)
      {
        ls.current.srcObject = null
        ls.current.poster = Dj
      }
    }
    handleremotecamoff();
    peer.closepeer();
    peer.initializepeer();
    navigate(-1);
  }
}catch(error){
  console.log(error)
}
  },[endcall])

// turn the other user camera off


  const handleremotecamoff =useCallback(()=>{
    try{

    // if(remotestream)
    // {
      setremotesream(null)
      if(rs.current) {
        rs.current.srcObject = null
        rs.current.poster = Dj
      }
    // }
   
    }catch(error)
    {
      console.log(error)
    }
  },[])

  useEffect(() => {
    socket.on("user:joined", handleuserjoin);
    socket.on("call:incoming", handleincomingcall);
    socket.on("call:accepted", handlecallaccepted);
    socket.on("peer:nego:needed", handlenegoincomming);
    socket.on("peer:nego:final", handlenegofinal);
    socket.on('user:left',handlecallcut);
    socket.on('cam:off',handleremotecamoff);

    return () => {
      socket.off("user:joined", handleuserjoin);
      socket.off("call:incoming", handleincomingcall);
      socket.off("call:accepted", handlecallaccepted);
      socket.off("peer:nego:needed", handlenegoincomming);
      socket.off("peer:nego:final", handlenegofinal);
      socket.off('user:left',handlecallcut);
      socket.on('cam:off',handleremotecamoff);

    };
  }, [
    socket,
    handleuserjoin,
    handleincomingcall,
    handlecallaccepted,
    handlenegoincomming,
    handlenegofinal,
    
    handleremotecamoff
  ]);


//turn my camera off



  const handlecam = async () => {
    camera ? setcamera(false) : setcamera(true)
  };

  useEffect(()=>{
    try{

   
    if(camera)
    {
      
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream=>{
        stream.getTracks().forEach((track) => {
          track.enabled = true;
          // Add the track to the peer connection
          peer.peer.addTrack(track, stream);
        });
        setmystream(stream);
      })
      
    }
    else{
      let stream = mystream;
      if(stream)
      {
      
      peer.initializepeer()
      stream.getTracks().forEach((track) => {
        track.stop();
        
        const sender = peer.peer.getSenders().find((s) => s.track === track);
        if (sender) {
          peer.peer.removeTrack(sender);
        }
      });
  
      socket.emit('cam:turn:off',{to:remotesocketid})
    
        setmystream(null);
        ls.current.srcObject = null
        ls.current.poster = Dj
    }
    }
  }catch(error){
    console.log(error)
  }
  },[camera])

 

  const navigate = useNavigate();

  useEffect(() => {
    remotestream != null && rs.current && (
      rs.current.srcObject = remotestream
    )
  }, [remotestream]);

  useEffect(() => {
    mystream != null && ls.current && (
      ls.current.srcObject = mystream
    )
  }, [mystream]);

  return (
    <div>
      {
        iscaller && !isincall ?
        <Calling/>
        :
        <>
      {isincall && (
        <FcEndCall
          className=" cursor-pointer absolute rounded-full bg-opacity-70 p-2 bg-gray-400 right-[50%] z-50 bottom-24 "
          size={45}
          onClick={handlecallcut}
        />
      )}
      {isincall && (
        <>
          {camera ? <BsCameraVideoOff size={40} className=" cursor-pointer p-2 absolute rounded-full bg-opacity-70 bg-gray-400 max-[700px]:right-[41%] max-[500px]:right-[39%] max-[px]350:right-[36%] right-[43%] z-50 bottom-24" onClick={handlecam}/> : <BsCameraVideo size={40} className=" cursor-pointer p-2 absolute rounded-full bg-opacity-70 bg-gray-400 max-[700px]:right-[41%] max-[500px]:right-[39%] max-[px]350:right-[36%] right-[43%] z-50 bottom-24" onClick={handlecam}/>}
        </>
      )}
      {
        <video
          autoPlay
          poster={Dj}
          className=" absolute bottom-10 right-0 h-36 w-conp bg-gray-700"
          muted
          playsInline
          ref={ls}
        />
      }
      {
        <video
          autoPlay
          poster={Dj}
          playsInline
          muted
          className="h-cam w-screen bg-black "
          ref={rs}
        />
      }
        </>
      }
    </div>
  );
};

export default Videochat;
