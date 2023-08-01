import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Findfriends from '../Utils/Findfriends'
import Friend from './Friend'
import Nav from './Nav'

const Friends = () => {
    const location = useLocation()
    const [friends,setfriends] = useState([])

    useEffect(()=>{
        try{
            const getfriends =async()=>{
                let res = await Findfriends(location.state.id)
                console.log(res)
                setfriends(res)
            }
            getfriends()
            // console.log(location.state)
        }catch(error){
            console.log(error)
        }
       
    },[location.state])


    useEffect(()=>{
        friends.map((friend)=>{
            console.log(friend)
        })
    },[friends])

    
  return (
    <div className='flex'>
        <Nav/>
        <div className='flex-col'>
      {
      friends && friends.length>0 ?
      friends.map((friend)=>(
        <div key={friend}>
            <Friend id={friend}/>
        </div>
      ))
      :
      <div>no friends</div>
      }
      </div>
    </div>
  )
}

export default Friends
