import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Defaultprofile from '../assets/di.jpg'

const Profile = () => {
    const[source,setsrc] = useState()
    const [name,setname] = useState()

    useEffect(()=>{
        setname(sessionStorage.getItem('name'))
    },[])

    function change (event){
        console.log(event.target.files)
        if(event.target.files[0]){
            let image = event.target.files[0]
            const reader = new FileReader();
            reader.onload = function(event){
                setsrc(event.target.result)
            }
            reader.readAsDataURL(image)
        }else{
            setsrc(Defaultprofile)
        }
      
    }
  return (
    <div className='flex'>
      <Nav/>
      <div className='flex'>
      <div className=' w-full p-4'>
        <div className='flex'>
        <input id='imginp' className='hidden' type="file" onChange={change} accept='image/*' />
        <label htmlFor="imginp">
        <img className=' cursor-pointer h-32 rounded-[50%] border w-32 bg-gray-400' src={source ? source :Defaultprofile} alt="" />
        </label>
        <div className=' text-xl font-semibold'>{name}</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Profile
