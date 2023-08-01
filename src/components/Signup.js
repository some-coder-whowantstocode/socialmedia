import React, { useRef, useState } from 'react'
import { useNavigate,Navigate,NavLink } from 'react-router-dom'
import axios from 'axios'
import Url from '../Utils/Url'

const Signup = () => {

    const [issignedup,setissignnedup] = useState(false)
    const [load,setload]=useState('invisible')
    const email = useRef()
    const password = useRef()
    const err = useRef()
    const name = useRef()

    const navigate = useNavigate()

    const sign =async()=>{
        err.current.innerText = ''
      
        try{
            const n = await name.current.value
         const e = await email.current.value
         const p = await password.current.value
         const data =  {
            username:n,
           Email:e,
           password:p
          }
          const headers ={
           'Content-Type':'text/json'
         }
       
         setload('visible')
         const login = await axios.post(`${Url}/socialmedia/api/v1/checkifexist`,data,headers)
         console.log(login)
         const {detail} = login.data
         console.log(detail)
         if(detail){
          // sessionStorage.setItem('name',login.data.user.name)
          // const token = await login.data.details.token
            // sessionStorage.setItem('sstoken',"Bearer "+token)
           
          navigate("/Dob",{state:{data:data,headers:headers}})
         }
         
        }catch(error){
         console.log(error)
         err.current.innerText = error.response.data ? error.response.data.msg : 'some error occured'
        }
    }

  return (
    <>
       <div className='logbox flex items-center justify-center h-screen flex-col'>
      <div className=" logcbox paddin h-logbox w-logbox flex items-center justify-center flex-col leading-relaxed border border-gray-400">
        <div className="font-cursive text-4xl">SocialMedia</div>
        <div className='logboxinfo my-2 px-5 text-lg font-semibold text-gray-400'>
        Signup to see photos and videos of your friends
        </div>
        <div className="toplogbox">
           
        <p>user name</p>
        <input required className='logemail border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' ref={name} type="text"/>
          <p>Email</p>
        <input required className='logemail border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' ref={email} type="email"/>
        <p>Password</p>
      <input required className='logemail border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' ref={password} type="password"/>
        </div>
        <p className='error text-red-600 ' ref={err}></p>

        <div className="bottomlogbox">
          <div className={`${load},"loading"`}></div>
        <button className='logsub my-4 bg-blue-600 text-white rounded w-ibox' onClick={sign}>Sign up</button>
        </div>
        <div className='flex items-center justify-center'> 
        <hr className='w-10 border border-gray'/>
        <p className='mx-2'>or</p>
        <hr className='w-10 border border-gray' />
      </div>
      <NavLink to={'/forgot'} className='text-blue-900 cursor-pointer font-semibold'>
        forgot password ?
      </NavLink>
      
   
      </div>
      <div  className=' border flex items-center justify-center my-3 border-gray-400 p-2 w-logbox'> 
      already have an account ?
        <NavLink to="/login" className={'navlink text-blue-900 font-semibold'}>Login</NavLink>

        </div>
    {
      issignedup && <Navigate to='/' />
    }
    </div>
    </>
  )
}

export default Signup
