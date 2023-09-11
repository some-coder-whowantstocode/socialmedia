import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../stylesheets/login.css";
import { Navigate, NavLink } from "react-router-dom";
import Signup from "../components/loginComponents/Signup";
import Load from "../Utils/Load";
import { urlContext } from "../context/UrlContex";
import { headerContext } from "../context/HeaderContext";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const err = useRef();
  const {url} = useContext(urlContext)
  const {header} = useContext(headerContext)

  const [isloggedin, setisloggedin] = useState(false);
  const [load, setLoad] = useState("invisible");
  const [cur,setcur] = useState('visible');
  const [revcur,setrevcur] = useState('invisible');
  const [move,setmove] = useState('one');
  const [moveright,setmoveright] = useState('right')
  const [color,setcolor] = useState('red-600')
 
  const loge = async () => {
    err.current.innerText = "";
    console.log(email.current.value);
    console.log(password.current.value);
    try {
      const e = await email.current.value;
      const p = await password.current.value;
      const data = {
        Email: e,
        password: p,
      };
      // const headers = {
      //   "Content-Type": "text/json",
      // };
      setLoad("visible");

      const login = await axios.post(
        `${url}/socialmedia/api/v1/login`,
        data,
        {headers:header}
      );
      console.log(login);
      sessionStorage.setItem("name", login.data.user.name);
      const { token } = login.data;
      if (token) {
        console.log(token)
        sessionStorage.setItem("sstoken", "Bearer " + token);
        setLoad("invisible");

        setisloggedin(true);
      }
    } catch (error) {
      setLoad("invisible");
      console.log(error.response);
      if (error.response) {
        err.current.innerText = error.response.data.msg;
      } else {
        err.current.innerText = error.message;
      }
    }
  };

  useEffect(() => {
    console.log(load);
  }, [load]);



  const changecurrent =()=>{
    cur == 'invisible' ? setcur('visible') : setcur('invisible')
    revcur == 'invisible' ? setrevcur('visible') : setrevcur('invisible')
    color == 'blue-600' ? setcolor('red-600') :setcolor('blue-600')
    move == "one" ? setmove('another') :setmove('one')
    moveright == "anotherone" ? setmoveright('right') :setmoveright('anotherone')
  }

  return (
    <div className={`logbox max-w-screen overflow-hidden flex items-center justify-center h-screen w-screen transition duration-1s flex-col bg-${color} w-auto`}>
      <div className="flex  items-center justify-center max-[730px]:flex-col max-[730px]:h-screen w-auto">
      <div className={`logcbox z-10 bg-gray-700  loginboxes ${cur}  ${move}  relative  h-logbox w-logbox max-[730px]:h-logboxp max-[730px]:w-logboxp flex items-center justify-center flex-col leading-relaxed`}>
        
        <div className=" font-cursive text-4xl">social.ly</div>
        <div className="toplogbox">
          <p>Email</p>
          <input
            className="logemail border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black"
            ref={email}
            type="email"
          />
          <p>Password</p>
          <input
            className="logpass text-black  border h-ibox w-ibox focus:bg-gray-200 focus:outline-none border-black"
            ref={password}
            type="password"
          />
        </div>
        <div
          className="error text-red-600 flex items-center justify-center "
          ref={err}
        ></div>
        <div className="bottomlogbox">
          <div className={`${load} , loading`}></div>
{
  load === 'invisible' ?
  <button
  className={`logsub my-6 bg-red-600 text-white rounded w-ibox`}
  onClick={loge}
>
  Login
</button>
:

<button
className={`logsub my-6 bg-${color} flex items-center justify-center text-white rounded w-ibox`}
>
<Load size={20}/>
</button>
}
         
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-20 border border-gray" />
          or
          <hr className="w-20 border border-gray" />
        </div>
        <NavLink
          to={"/forgot"}
          className="text-white cursor-pointer font-semibold"
        >
          forgot password ?
        </NavLink>
      </div>
     
     
      <Signup
       revcur={revcur} 
      right={moveright}/>
      </div>
    
      <div className=" max-[730px]:flex-col max-[730px]:h-conp max-[730px]:w-conp max-[730px]:justify-between absolute z-0 top-50% left-50% w-con h-con flex justify-center bg-opacity-30 items-center  bg-gray-200 ">
      <div className={` ${cur}q flex items-center justify-center border-none my-3 max-[730px]:my-0 w-logbox `}>
      already have an account?
        <NavLink
        //  to="/signup"
        onClick={changecurrent}
         className={`navlink changecurrent text-gray-300 font-semibold`}
         >
          signin
        </NavLink>
      </div>
   
      <div className={` ${cur}p flex items-center justify-center border-none my-3 max-[730px]:my-0 max-[730px]:p-0 p-2 w-logbox`}>
       
         don't have an account?
        <NavLink
        //  to="/signup"
        onClick={changecurrent}
         className={`navlink changecurrent  text-gray-300  font-semibold`}
         >
          signup
        </NavLink>
      </div>
      </div>
      {isloggedin && <Navigate to="/" />}
    </div>
  );
};

export default Login;
