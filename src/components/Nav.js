import React, { useEffect, useState } from 'react'
import { AiFillHome,AiFillMessage,AiOutlineSearch} from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import Authentication from '../Utils/Authentication';

const Nav = () => {
  const [Idd,setid] =useState()

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


  return (
    <>
    <div className=' fixed z-20 pl-4 pt-4 w-ibox flex-col items-center justify-center h-screen border-r-2'>
      <div className=' cursor-pointer text-4xl font-bold Alex mb-5 flex items-center justify-start'>Socialmedia</div>
      <div className=' cursor-pointer flex text-xl items-center justify-start mb-2'>
        <AiFillHome className=' cursor-pointer mr-2'/>
      <NavLink to={'/'}>Home</NavLink>

      </div>
      <div className=' cursor-pointer flex text-xl items-center justify-start mb-2'>
        <AiFillMessage className='cursor-pointer mr-2'/>
      <NavLink to={'/messages'}>Messeges</NavLink>

      </div>

      <div className=' cursor-pointer flex text-xl items-center justify-start mb-2'>
        <BsPersonCircle className='cursor-pointer mr-2'/>
      <NavLink to={'/profile'}>Profile</NavLink>

      </div>
      <div className=' cursor-pointer flex text-xl items-center justify-start mb-2'>
        <AiOutlineSearch className='cursor-pointer mr-2'/>
      <NavLink to={'/search'}>search</NavLink>

      </div>
      <div className=' cursor-pointer flex text-xl items-center justify-start mb-2'>
        <FaUserFriends className='cursor-pointer mr-2'/>
      <NavLink to={'/friends'} state={{id:Idd!= undefined&& Idd}}>friends</NavLink>

      </div>
    </div>
    <div className=' pl-4 pt-4 w-ibox flex-col items-center justify-center h-screen border-r-2'></div>

    </>
  )
}

export default Nav
