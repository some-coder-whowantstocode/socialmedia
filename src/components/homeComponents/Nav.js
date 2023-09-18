import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiFillMessage, AiOutlineSearch } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import '../../stylesheets/nav.css'
import { authenticationContex } from "../../context/AutenticationContext";

const Nav = () => {

  const {checkauthentications} =useContext(authenticationContex)

  const [Idd, setid] = useState();

   
  useEffect(()=>{
    checkauthentications()
    .then(data=>{
     setid(data.userId)
    })
    .catch(error=>console.log(error))
   },[])
 
 
  



  return (
    <>
      <div className="  max-[730px]:w-screen max-[730px]:m-0  max-[730px]:flex max-[730px]:flex-row max-[730px]:h-fit max-[730px]:shadow-navshadow  max-[730px]:bottom-0 max-[730px]:justify-evenly fixed z-20 pl-4 pt-4 w-ibox flex-col  items-center justify-center h-screen ">
        <div className=" max-[730px]:hidden cursor-pointer text-4xl font-bold Alex mb-5 flex items-center justify-start">
          Social.ly
        </div>
        <div className="max-[730px]:w-fit cursor-pointer flex text-xl items-center justify-start mb-2">
          
          <NavLink to={"/"} className={'flex items-center justify-center'}>
            <AiFillHome className=" cursor-pointer mr-2" /> 
            <p className="max-[730px]:hidden">Home</p>
             </NavLink>
        </div>
        <div className=" cursor-pointer flex text-xl items-center justify-start mb-2">
          
          <NavLink to={"/messages"} className={'flex items-center justify-center'}>
            <AiFillMessage className="cursor-pointer mr-2" />
            <p className="max-[730px]:hidden">Messeges</p> 
            </NavLink>
        </div>

        <div className=" cursor-pointer flex text-xl items-center justify-start mb-2">
         
          <NavLink to={"/profile"} className={'flex items-center justify-center'}>
             <BsPersonCircle className="cursor-pointer mr-2" />
             <p className="max-[730px]:hidden">Profile</p> 
             </NavLink>
        </div>
        <div className=" cursor-pointer flex text-xl items-center justify-start mb-2">
         
          <NavLink to={"/search"} className={'flex items-center justify-center'}> 
          <AiOutlineSearch className="cursor-pointer mr-2" />
           <p className="max-[730px]:hidden">search</p> 
           </NavLink>
        </div>
        <div className=" cursor-pointer flex text-xl items-center justify-start mb-2">
         
          <NavLink to={"/friends"} className={'flex items-center justify-center'} state={{ id: Idd != undefined && Idd }}>
          <FaUserFriends className="cursor-pointer mr-2" />
          <p className="max-[730px]:hidden">friends</p>  
          </NavLink>
        </div>
      </div>
      <div className="max-[730px]:hidden pl-4 pt-4 w-ibox flex-col items-center justify-center h-screen border-r-2"></div>
    </>
  );
};

export default Nav;
