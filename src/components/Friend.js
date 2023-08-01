import React, { useEffect, useState } from 'react'
import Url from '../Utils/Url'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Friend = (id) => {
    const [person,setperson] = useState({})
    useEffect(()=>{
        try{

            const getfriend=async()=>{
                console.log(id)
                const url = `${Url}/socialmedia/api/v1/find/${id.id}`
                let result = await axios.get(url)
                console.log(result)
                setperson(result.data)
            }
            getfriend()
        }catch(error){
            console.log(error)
        }
        // console.log(id)
     
      
    },[id])
  return (
    <div className='flex-col'>
        {
            person && <div >
                <NavLink to={'/anotherprofile'} state={{name:person.username,id:person._id}} >{person.username}</NavLink>
            </div>
        }
    </div>
  )
}

export default Friend
