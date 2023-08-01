import React, { useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import Url from '../Utils/Url'
import axios from 'axios'

const Forgotpass = () => {
    const errore = useRef()
    const [email,setemail] =useState()
    const [username,setusername] = useState()

    const sign =async()=>{
        try{
            errore.current.innertext ='hi'
            let e = email;
            let n = username;
                const data =  {
                    username:n,
                   Email:e,
                  }
                  const headers ={
                   'Content-Type':'text/json'
                 }
                 const url = `${Url}/socialmedia/api/v1/forgotpassword`
                 let dat = await axios.post(url,data,headers)
                 window.location.replace(dat.data.link)
                 console.log(dat.data.link)
        }catch(err){
            // console.log(err)
            if(err.response){
              
                errore.current.textContent =err.response.data.msg ?err.response.data.msg:  err.response.data 
            }
            else{
               
                errore.current.textContent = err.message
            }
        }
       

    }

    
    function handlename(event){
        setusername(event.target.value)
    }
  
    function handleemail(event){
        setemail(event.target.value)
    }
  return (
    <div>
       <div className="flex items-center justify-center h-full w-full flex-col">
        <div className='flex bg-gray p-10 items-center justify-center border  border-gray-400 flex-col w-logbox h-logbox mt-3'>
        <img className='h-24' src='https://th.bing.com/th/id/OIP.rLmz6Nq4KnvPUb34z_SuGgHaHa?pid=ImgDet&rs=1'/>    
        <div className='flex items-center justify-center text-l my-2 font-bold'>Trouble logging in?</div>
        <div className='flex items-center justify-center text-sm text-gray-400'>Enter your email and username and we'll send you a link to get back into your account.</div>
        <div>
       <p>user name</p>
        <input onChange={handlename} type="email" className='border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black' />
        <p>Email</p>
        <input onChange={handleemail} type="text" className='border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black'/>
       </div>
      
        <div ref={errore} className=' text-sm text-red-600'></div>
        <button onClick={sign} className=' bg-blue-600 text-white w-ibox h-ibox rounded my-3'>send</button>
        <div className='flex items-center justify-center'> 
        <hr className='w-20 border border-gray'/>
        or
        <hr className=' w-20 border border-gray' />
      </div>
        <NavLink className={' font-semibold hover:text-black'} to={'/signup'}>Create new account</NavLink>
      
        </div>
        <div  className=' border flex items-center justify-center my-3 border-gray-400 p-2 w-logbox'> 
      already have an account ?
        <NavLink to="/login" className={'navlink text-blue-900 font-semibold'}>Login</NavLink>

        </div>
      </div>
    </div>
  )
}

export default Forgotpass
