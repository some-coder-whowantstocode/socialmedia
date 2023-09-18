import React from 'react'
import { BsPhone, BsTelephone } from 'react-icons/bs'

const Calling = () => {
  return (
    <div className=' bg-gray-500 h-screen w-screen'>
      <BsTelephone size={40} className=' absolute top-[50%] right-[50%] h-16 w-16 bottom-24 p-1 bg-green-500 rounded-full  animate-call'/>
    </div>
  )
}

export default Calling
