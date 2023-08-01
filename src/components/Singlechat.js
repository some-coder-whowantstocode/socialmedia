import React, { useEffect, useState } from 'react'
import Url from '../Utils/Url'
import { useNavigate } from 'react-router'
import Authentication from '../Utils/Authentication'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Singlechat = ({chat}) => {

    const [Idd,setid] =useState()
    const [chatname,setchatname] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
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
        if(Idd){
            const getdata=async()=>{
                let users = Array.from(0)
                users.push(...chat.users)
                
                let friend = users.filter((i)=>i!=Idd)
                console.log(friend)
                const url = `${Url}/socialmedia/api/v1/find/${friend[0]}`
                let f = await axios.get(url)
                console.log(f)
                setchatname(f.data.username)
            }
          getdata()
        }
       
    },[chat,Idd])
  return (
    <div className='border-2 border-gray h-10 flex items-center m-3 w-logbox'>
        {
            chatname && <NavLink to={'/chat'} state={{chat:chat,name:chatname}}>{chatname}</NavLink>
        }
      
    </div>
  )
}

export default Singlechat
