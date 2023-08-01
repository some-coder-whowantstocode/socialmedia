import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Nav from './Nav'
import Defaultprofile from '../assets/di.jpg'
import Url from '../Utils/Url'
import axios from 'axios'
import Header from '../Utils/Header'

const Anotherprofile = () => {
    const location = useLocation()
    const[name,setname] = useState()
    const[id,setid] = useState()

    useEffect(()=>{
    setname(location.state.name)
    setid(location.state.id)
    },[location.state])

    const addfriend=async(id)=>{
        try{
            const url = `${Url}/socialmedia/api/v1/addfriend`
           const data={
             friend:id
            }
            let a = await Header()
            console.log(a)
             let request =await axios.post(url,data,{headers:a})
             console.log(request)
        }catch(error){
            console.log(error)
        }
     
    }
  return (
    <div className='flex'>
      <Nav/>
      <div className=' w-full p-4'>
        <div className='flex'>
        {/* <input id='imginp' className='hidden' type="file" onChange={change} accept='image/*' /> */}
        <label htmlFor="imginp">
        <img className=' cursor-pointer h-32 rounded-[50%] border w-32 bg-gray-400' src={Defaultprofile} alt="" />
        </label>
        <div className=' text-xl font-semibold'>{name}</div>
        <div className=' cursor-pointer h-9 m-4 py-1 px-2 bg-blue-500' onClick={()=>addfriend(id)}>add friend</div>
        </div>
      </div>
    </div>
  )
}

export default Anotherprofile
