import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import {AiOutlineSearch} from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import axios from 'axios';
import Url from '../Utils/Url';
import { NavLink } from 'react-router-dom';


const Search = () => {
    const [result,setresult]=useState([])
    const [me,setme] = useState()

    const search =async(event)=>{
        console.log(event.target.value)
        let val = event.target.value;
        try{
                if(val != ''){
                    let result = await axios.get(`${Url}/socialmedia/api/v1/search/${val}`)
                    console.log(result)
                    
                    setresult(result.data)
                }
        }catch(error){
            console.log(error)
        }
       
    }


    useEffect(()=>{
        setme(sessionStorage.getItem('name'))
    })
  return (
    <div className='flex'>
      <Nav/>
      <div>
      <div className='flex'>
        <input type="text" onChange={search} className='border border-gray w-logbox h-10 outline-none'/>
        <AiOutlineSearch/>
      </div>
      {
        result.length>0&& result.map((res)=>(
            res.username == me ? 
            <NavLink to={'/profile'}  className='flex items-center justify-start '>
                <BsPersonCircle className='cursor-pointer'/>
                <p className='cursor-pointer'>{res.username}</p>
            </NavLink>
            :
            <NavLink to={'/anotherprofile'} state={{name:res.username,id:res._id}} className='flex items-center justify-start '>
            <BsPersonCircle className='cursor-pointer'/>
            <p className='cursor-pointer'>{res.username}</p>
        </NavLink>
        ))
      }
       </div>
    </div>
  )
}

export default Search
