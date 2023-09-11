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
  const [vis,setvis] = useState('invisible')
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
    console.log(msgs)
  }, [msgs]);


  useEffect(() => {
    try{
      console.log(location.state);
      let chat = location.state.chat;
      setchatid(chat._id);
      setchatname(location.state.name);
    }catch(error)
    {
      console.log(error)
    }
   
  }, [location.state]);

  useEffect(() => {

    chatid && getallmessages(chatid) .then(data=>setmsg(data))

  }, [chatid]);

  const handlenewmessage = useCallback((data) => {
    // console.log(data)
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
    let user  = await getfriend(id);
    // console.log(user.Email)
    socket.emit('user:join',{user:user.Email,room:chatid})
  }
  const navigate = useNavigate()
  const handleuserjoin =useCallback( async({room})=>{
    navigate(`/videochat/${room}`)
  },[navigate])

  useEffect(() => {
    socket.on("receive_message", handlenewmessage );
    socket.on("deleted_message", handledeletedmessage );
    socket.on('user:join',handleuserjoin)

    return ()=>{
      socket.off("receive_message", handlenewmessage );
      socket.off("deleted_message", handledeletedmessage );
      socket.off('user:join',handleuserjoin)
    }
  }, [socket]);

  const send = async () => {
    let content = msg.current.value;
    // console.log(content)
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




  return (
    <div className="flex relative">
      <div className=" max-[730px]:hidden">
      <Nav  />
      </div>
      
      <div className="grow w-rest z-10000 ">
       
        <div className="flex relative items-center justify-center bg-white h-9 shadow-lg  ">
        <NavLink
        to={'/messages'}
        className={'min-[731px]:hidden w-fit max-[730px]:absolute max-[730px]:top-2 max-[730px]:left-1'}
        >
        <BiArrowBack className="  " fontSize={'19px'}/>
        </NavLink>
          {chatname && chatname}
          <div className="absolute right-3 top-3">
          {/* <div className=' cursor-pointer ' onClick={()=>setvis(Changevis(vis))}><BsThreeDotsVertical/></div> */}
          <BsCameraVideoFill className=" cursor-pointer" onClick={handeljoincall}/>
          <div className={`bg-white border border-gray-400 rounded-md p-1 ${vis}`}>
            <div className={` text-red-500 cursor-pointer z-50`} onClick={()=>deletechat(chatid)}>delete</div>
          </div>
          </div>

        </div>
        <div className="flex flex-col w-full">
          {msgs.length > 0 && 
            msgs.map((m) =>
             <Singlemessage message={m} me={id} />
            )}
        </div>

        <div className="flex items-center fixed bottom-5 w-rest justify-center">
          <input
            className=" max-[730px]:w-screen max-[730px]:h-9  w-msg rounded-md focus:outline-none border border-black"
            onKeyDown={checksend}
            type="text"
            ref={msg}
          />
          <AiOutlineSend className=" cursor-pointer max-[730px]:absolute max-[730px]:right-2 " onClick={send} />
        </div>

        <div ref={pageref}></div>
      </div>
    </div>
  );
};

export default Chat;
