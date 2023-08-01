import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Url from '../Utils/Url'
import Header from '../Utils/Header'
import axios from 'axios'
import Singlechat from './Singlechat'

const Messages = () => {

    const [chats,setchats] = useState([])

    useEffect(()=>{
        const getchats =async()=>{
            try{
                const url = `${Url}/socialmedia/api/v1/getchat`
                let header = Header()
                const results = await axios.get(url,{headers:header})
                console.log(results)
                setchats(results.data.chat)
            }catch(err){
                console.log(err)
            }
          
        }
        getchats()
       
    },[])

    useEffect(()=>{
        console.log(chats)
    },[chats])


  return (
    <div className='flex'>
      <Nav/>
     
      <div>
        {
            chats && chats.length>0 ?
            chats.map((chat)=>(
                <Singlechat chat={chat}/>
            ))
            :
            <div></div>
        }
      </div>
    </div>
  )
}

export default Messages
