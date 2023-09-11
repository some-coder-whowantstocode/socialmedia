import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Changevis from "../../Utils/Changevisibility";
import {socketContext} from '../../context/SocketContext'
import { authenticationContex } from "../../context/AutenticationContext";
import { messageContext } from "../../context/Api/MessageContext";



const Singlechat = ({ chat }) => {

  const {socket} = useContext(socketContext);
  const {deletechat,getchatdetails,getlatestmessage} = useContext(messageContext)
  const {checkauthentications} = useContext(authenticationContex)

  const [Idd, setid] = useState(null);
  const [chatname, setchatname] = useState(null);
  const [visiblitiy,setvisibiliy] = useState('invisible')
  const [chatdetails,setchatdetails] = useState(null)
  const [lastmessage,setlastmessage] = useState(null)



  useEffect(()=>{
    socket.on('recieve_message')
  },[socket])

 
  useEffect(()=>{
    checkauthentications()
    .then(data=>{
     setid(data.userId)
    })
    .catch(error=>console.log(error))
   },[])
 

  useEffect(()=>{
    if(chatdetails)
    {
      getlatestmessage(chatdetails)
      .then(data=> setlastmessage(data))
    
    }
  },[chatdetails])


  // useEffect(()=>{
  //   socket.on('receive_message',getchatdetails);
  //   return()=>{
  //     socket.off('receive_message',getcha);
  //   }
  // },[socket])

  useEffect(() => {
    if (Idd) {
     getchatdetails(chat,Idd)
     .then((data)=>{
      setchatdetails(data.chatdetails)
      setchatname(data.chatname)
     })
    }
   
  }, [ Idd]);
  return (
    <div className="border-2 max-[730px]:mx-0 border-gray h-fit flex items-center m-3 w-logbox">
      {chatname && (
        <div className={'flex justify-between items-center w-logbox '}>

       
        <NavLink to={"/chat"} className={' flex justify-between items-center w-logbox '} state={{ chat: chatdetails, name: chatname }}>
          
          <div className=" flex-col px-3 py-1">
          <p className=" text-md font-bold">{chatname}</p>
          <p className="flex">
          <p className=" pr-1">:</p>
          <p className=" text-gray-500">{lastmessage && lastmessage}</p>
          </p>
          </div>
         
         
        </NavLink>
        <div>
          <BsThreeDotsVertical className=" cursor-pointer" onClick={()=>setvisibiliy(Changevis)}/>
          <div className="relative ">
            <div className={`${visiblitiy} absolute top-0 right-0 border border-gray-400 bg-white `}>
            <p className={` text-red-500 cursor-pointer`} onClick={()=>deletechat(chat)}>delete</p>

            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Singlechat;
