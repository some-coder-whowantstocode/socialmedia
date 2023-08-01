import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AiOutlineSend } from "react-icons/ai";
import { NavLink, useSearchParams } from 'react-router-dom';
import Nav from './Nav';
import Url from '../Utils/Url';
import axios from 'axios';
import Header from '../Utils/Header';
import Authentication from '../Utils/Authentication';
import { io } from 'socket.io-client';

const socket = io.connect(`${Url}`)

const Chat = (chat) => {
    const msg = useRef()
    const pageref = useRef()
    const location = useLocation()
    const [chatname,setchatname] = useState()
    const [chatid,setchatid] = useState()
    const [msgs,setmsg] = useState([])
    const [id,setid] = useState()
    const navigate = useNavigate()
    
    
  useEffect(()=>{
    pageref.current.scrollIntoView({ behavior: "smooth" });

    const isauthenticated =async()=>{
      let a = await Authentication();
      if(a){
        console.log(a)
        setid(a.userId)
      }else{
        navigate('/login')
      }
    }
    isauthenticated()
  },[])



    useEffect(()=>{
        console.log(location.state)
        let chat = location.state.chat
        setchatid(chat._id)
        setchatname(location.state.name)
        console.log(location.state.name)
    },[location.state])

    useEffect(()=>{
        try{
            if(chatid){
                const getchat=async()=>{
                    const url = `${Url}/socialmedia/api/v1/allmessages/${chatid}`
                    let a = Header()
                    const msgs = await axios.get(url,{headers:a})
                    console.log(msgs)
                    let messages =Array.from(msgs.data.messages)
                    
                    console.log(messages)
                    setmsg(messages)
                }
        
                getchat()
            }
          
        }catch(error){
            console.log(error)
        }
      
    },[chatid])

    useEffect(()=>{
        console.log(msgs)
    },[msgs])

    useEffect(()=>{
        socket.on('recieve_message',(data)=>{
            console.log('message')
            setmsg([...msg,data])
        })
    },[socket])


    const send =async()=>{
       
       
        let content = msg.current.value
        msg.current.value = ''
        if(content !='' && chatid){
            socket.emit('send_message',{message:content})
            try{
                const data = {
                    content:content,
                    chat:chatid
                }
                let header = Header()
                const url = `${Url}/socialmedia/api/v1/sendmessage`
                let send = await axios.post(url,data,{headers:header})
                setmsg([...msgs,content])
                // console.log(send)
            }catch(error){

            }
        }
      
     
    }

    const checksend=async(event)=>{
        if(event.key === 'Enter'){
            send()
        }
    }
  return (
    <div className='flex'>
        <Nav/>
        <div className='grow' >
            <div className='flex items-center justify-center'>{chatname && chatname}</div>
            <div className='flex flex-col'>
            {
                msgs.length>0 && 
                msgs.map((m)=>(
                  

                    m.sender == id
                    ?
                    <div key={m._id} className=' self-end p-1 w-fit break-words min-w-10 bg-gray-300 m-1 rounded-lg'>{m.content}</div>
                    :
                    typeof(m)=='string' ?
                    <div className=' self-end p-1 w-fit min-w-10 max-w-xs bg-gray-300 m-1 rounded-lg'>{m}</div> 
                    :

                    <div key={m._id}>{m.content}</div>
                ))
            }
            </div>
           
            <div className='sticky bg-white flex items-center justify-center  bottom-0 grow'>

           <div className='flex items-center justify-center'>
           <input className='w-msg rounded-md border border-black' onKeyDown={checksend} type="text" ref={msg} />
            <AiOutlineSend className=' cursor-pointer' onClick={send}/>
           </div>
         
            </div>
        </div>
        <div ref={pageref}></div>
    </div>
  )
}

export default Chat
