import axios from "axios";
import React from "react"
import Url from "./Url";
const Authentication=async()=>{
try{
   const token =  sessionStorage.getItem('sstoken');
   let url = `${Url}/socialmedia/api/v1/auth/${token}`
   let result = await axios.get(url)
   let res = result.data
   console.log(res)
   if(token){
    return res
   }else{
    return false
   }
}
catch(err){
   console.log(err)
   return false
}
  
}


export default Authentication
