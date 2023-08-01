import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Authentication from '../Utils/Authentication'
import Nav from './Nav'

const Home = () => {

  const navigate = useNavigate()
  useEffect(()=>{
    const isauthenticated =async()=>{
      let a = await Authentication();
      if(a){
        console.log(a)
      }else{
        navigate('/login')
      }
    }
    isauthenticated()
  },[])
  return (
    <div>
    <Nav/>
    </div>
  )
}

export default Home
