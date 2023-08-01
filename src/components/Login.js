import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/login.css'
import { Navigate,NavLink } from 'react-router-dom';
import Url from '../Utils/Url';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const err = useRef();

    const[isloggedin,setisloggedin] = useState(false)
    const[load,setLoad]=useState('invisible')
  

    const loge =async()=>{
      err.current.innerText = ''
       console.log( email.current.value)
       console.log(password.current.value)
       try{
        const e = await email.current.value
        const p = await password.current.value
        const data =  {
          Email:e,
          password:p
         }
         const headers ={
          'Content-Type':'text/json'
        }
        setLoad('visible')

        const login = await axios.post(`${Url}/socialmedia/api/v1/login`,data,headers)
        console.log(login)
        const {token} = login.data
        if(token){
          // console.log(details)
          sessionStorage.setItem('name',login.data.user.name)
          sessionStorage.setItem('sstoken',"Bearer "+token)
          setLoad('invisible')
         
          setisloggedin(true)
        }
        
       }catch(error){
        setLoad('invisible')
        console.log(error.response)
        if(error.response){
          err.current.innerText = error.response.data.msg

        }else{
          err.current.innerText = error.message
        }
       }
     
    }

    useEffect(()=>{
      console.log(load)
    
    },[load])

  return (
    <div className='logbox flex items-center justify-center h-screen flex-col'>
      <div className="logcbox paddin h-logbox w-logbox flex items-center justify-center flex-col leading-relaxed border border-gray-400">
        <div className=" font-cursive text-4xl">socialmedia</div>
        <div className="toplogbox">
          
          <p>Email</p>
        <input className='logemail border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' ref={email} type="email"/>
        <p>Password</p>
       <input className='logpass  border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' ref={password} type="password"/>
        </div>
        <div className='error text-red-600 flex items-center justify-center ' ref={err}></div>
        <div className="bottomlogbox">
       <div className={`${load} , loading`}></div>
    
        <button className='logsub my-6 bg-blue-600 text-white rounded w-ibox' onClick={loge}>Login</button>
        </div>
      <div className='flex items-center justify-center'> 
        <hr className='w-20 border border-gray'/>
        or
        <hr className='w-20 border border-gray' />
      </div>
      <NavLink to={'/forgot'} className='text-blue-900 cursor-pointer font-semibold'>
        forgot password ?
      </NavLink>
      </div>
      <div className=' border flex items-center justify-center my-3 border-gray-400 p-2 w-logbox'> 
      don't have an account?
        <NavLink to="/signup" className={'navlink text-blue-900 font-semibold'}>signup</NavLink>

        </div>
    {
      isloggedin && <Navigate to='/' />
    }

    </div>
  )
}

export default Login
