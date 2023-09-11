import React from 'react'
import { BiLoader } from "react-icons/bi";

const Load = ({size}) => {
  return (
    
      <BiLoader className=' animate-spin-slow duration-40' fontSize={size}/>
  )
}

export default Load
