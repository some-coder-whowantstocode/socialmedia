import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate} from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Nav from "../homeComponents/Nav";
import axios from "axios";
import Changevis from "../../Utils/Changevisibility";
import { BiArrowBack } from "react-icons/bi";
import Singlemessage from "./Singlemessage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { socketContext } from "../../context/SocketContext";
import notification from '../../assets/notification.mp3'
import { urlContext } from "../../context/UrlContex";
import { authenticationContex } from "../../context/AutenticationContext";
// import { headerContext } from "../../context/HeaderContext";
import { messageContext } from "../../context/Api/MessageContext";
import { Header } from "../../Utils/Header";
import { BsCameraVideoFill } from "react-icons/bs";
import { friendApiContext } from "../../context/Api/FriendContext";
import Videochat from "../../pages/Videochat";



const Chat = () => {
  
  const {checkauthentications} = useContext(authenticationContex)
  const {getallmessages,deletechat} = useContext(messageContext)
  const {socket} =  useContext(socketContext)
  const {getfriend} = useContext(friendApiContext)
  const {url} = useContext(urlContext)
  const msg = useRef();
  const pageref = useRef();
  const [id, setid] = useState();
  const [chatname, setchatname] = useState();
  const [chatid, setchatid] = useState();
  const [msgs, setmsg] = useState([]);
  const [vis,setvis] = useState('invisible');
  const [remotesocketid,setremotesocketid] = useState(null)
  const location = useLocation();



  useEffect(()=>{
    checkauthentications()
    .then(data=>{
     setid(data.userId)
    })
    .catch(error=>console.log(error))
   },[])


  useEffect(() => {
    pageref.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);


  useEffect(() => {
    try{
      let chat = location.state.chat;
      setchatid(chat._id);
      setchatname(location.state.name);
    }catch(error)
    {
    }
   
  }, [location.state]);

  useEffect(() => {

    chatid && getallmessages(chatid) .then(data=>setmsg(data))

  }, [chatid]);

  const handlenewmessage = useCallback((data) => {
   let {message} = data;
   let d = message.data
    setmsg((msgs) => [...msgs, d]);
    new Audio(notification).play()
  } ,[])

  const handledeletedmessage = useCallback((data) => {
    let {message} = data;
    let d = message.data.msg;
    
    setmsg((msgs) => msgs.map((m) => m._id === d._id ? {...m, users: d.users} : m));
  }

  ,[])

  const handeljoincall=async()=>{
    if(id){
      let user  = await getfriend(id);
      socket.emit('user:join',{user:user.Email,room:chatid})
    }
    
  }

  const navigate = useNavigate()
  const handleuserjoin =useCallback( async({room})=>{
    navigate(`/videochat/${room}`)
  },[navigate])

  // const handleuserjoin = useCallback(async({user,socketid})=>{
  

  //   setremotesocketid(socketid)
  // },[])

  const handlepong = (data)=>{
    socket.emit('pong', {beat: 1});
  }

  useEffect(() => {
    socket.on("receive_message", handlenewmessage );
    socket.on("deleted_message", handledeletedmessage );
    socket.on('user:join',handleuserjoin)
    socket.on('ping', handlepong);
    // socket.on('user:joined',handleuserjoin)


    return ()=>{
      socket.off("receive_message", handlenewmessage );
      socket.off("deleted_message", handledeletedmessage );
      socket.off('user:join',handleuserjoin)
    socket.off('ping', handlepong);
    // socket.off('user:joined',handleuserjoin)

    }
  }, [socket]);

  const send = async () => {
    let content = msg.current.value;
    msg.current.value = "";
    if (content != "" && chatid) {
      try {
        const data = {
          content: content,
          chat: chatid,
        };
        const sendmessageurl = `${url}/socialmedia/api/v1/sendmessage`;
        const header = Header()
        let send = await axios.post(sendmessageurl, data, { headers: header });
        
        socket.emit("send_message", { message: send });
        setmsg([...msgs, send.data]);
      } catch (error) {}
    }
  };

  const checksend = async (event) => {
    if (event.key === "Enter") {
      send();
    }
  };



  // for video call



  // 




  return (
    <div className="flex relative">
      <div className=" max-[730px]:hidden">
      <Nav  />
      </div>
      
      <div className="grow w-rest">
       
        <div className="flex fixed top-0 items-center z-50 max-[730px]:w-screen w-rest justify-center bg-white h-9 shadow-lg  ">
        <NavLink
        to={'/messages'}
        className={'min-[731px]:hidden  max-[730px]:absolute max-[730px]:top-2 max-[730px]:left-1'}
        >
        <BiArrowBack className=" absolute left-0 z-50" fontSize={'19px'}/>
        </NavLink>
          {chatname && chatname}
          <div className="absolute right-3 top-3">
          {/* <div className=' cursor-pointer ' onClick={()=>setvis(Changevis(vis))}><BsThreeDotsVertical/></div> */}
          <BsCameraVideoFill onClick={handeljoincall} className=" cursor-pointer min-[750px]:mr-5" />
          {/* <Videochat/> */}
          {/* <div className={`bg-white border border-gray-400 rounded-md p-1 ${vis}`}>
            <div className={` text-red-500 cursor-pointer z-50`} onClick={()=>deletechat(chatid)}>delete</div>
          </div> */}
          </div>

        </div>
        <div className="flex flex-col w-full">
          {msgs.length > 0 && 
            msgs.map((m) =>
             <Singlemessage message={m} me={id} />
            )}
        </div>

        <div className="flex items-center fixed bottom-5 min-[750px]:w-rest z-50 justify-center  max-[730px]:left-0">
          <input
            className=" max-[730px]:w-Mesg max-[730px]:h-9  w-msg rounded-md focus:outline-none border border-black"
            onKeyDown={checksend}
            type="text"
            ref={msg}
          />
          <AiOutlineSend className=" cursor-pointer max-[730px]:absolute max-[730px]:right-2  z-50" onClick={send} />
        </div>

        <div ref={pageref}></div>
      </div>
    </div>
  );
};

export default Chat;
