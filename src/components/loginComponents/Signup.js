import React, { useContext, useRef, useState } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/login.css";
import { urlContext } from "../../context/UrlContex";
import { BiLoader } from "react-icons/bi";


const Signup = ({revcur,right}) => {

  const {url} = useContext(urlContext)

  const [issignedup, setissignnedup] = useState(false);
  const [load, setload] = useState(false);
  const email = useRef();
  const password = useRef();
  const err = useRef();
  const name = useRef();
  const navigate = useNavigate();

  const sign = async () => {
    err.current.innerText = "";

    try {
      setload(true)
      const n = await name.current.value;
      const e = await email.current.value;
      const p = await password.current.value;
      const data = {
        username: n,
        Email: e,
        password: p,
      };
      const headers = {
        "Content-Type": "text/json",
      };

      setload("visible");

      const login = await axios.post(
        `${url}/socialmedia/api/v1/checkifexist`,
        data,
        headers
      );
      const { detail } = login.data;
      if (detail) {
      
setload(false)
        navigate("/Dob", { state: { data: data, headers: headers } });
      }
    } catch (error) {
      setload(false)
      console.log(error);
      err.current.innerText = error.response
        ? error.response.data.msg
        : "some error occured";
    }
  };

  return (
    
      <div className=" ">
        <div className={` logcbox p-2  z-10 bg-gray-700 text-white loginboxes relative ${revcur} ${right}  h-logbox w-logbox max-[730px]:h-logboxp max-[730px]:w-logboxp flex items-center justify-center flex-col leading-relaxed `}>
          <div className="font-cursive text-4xl">Social.ly</div>
          <div className="logboxinfo my-2 px-5 text-lg font-semibold text-gray-400">
            Signup to see photos and videos of your friends
          </div>
          <div className="toplogbox">
            <p>user name</p>
            <input
              required
              className="logemail border h-ibox w-ibox text-black focus:bg-gray-200 focus:outline-none border-black"
              ref={name}
              type="text"
            />
            <p>Email</p>
            <input
              pattern="^.+@.+(\..+)+$" required
              className="logemail border h-ibox w-ibox text-black focus:bg-gray-200 focus:outline-none border-black"
              ref={email}
              type="email"
            />
            <p>Password</p>
            <input
              required
              className="logemail border h-ibox w-ibox text-black focus:bg-gray-200 focus:outline-none border-black"
              ref={password}
              type="password"
            />
          </div>
          <p className="error text-red-600 w-logbox h-10 flex justify-center" ref={err}></p>

          <div className="bottomlogbox">
           {
            load ?
            <BiLoader size={20} className="logsub my-4 bg-blue-600 text-white rounded w-ibox"/>            :
            <button
              className="logsub my-4 bg-blue-600 text-white rounded w-ibox"
              onClick={sign}
            >
              Sign up
            </button>
           }
            
          </div>
          <div className="flex items-center justify-center">
            <hr className="w-10 border border-gray" />
            <p className="mx-2">or</p>
            <hr className="w-10 border border-gray" />
          </div>
          <NavLink
            to={"/forgot"}
            className="text-white cursor-pointer font-semibold"
          >
            forgot password ?
          </NavLink>
        </div>
      
        {issignedup && <Navigate to="/" />}
      </div>
    
  );
};

export default Signup;
