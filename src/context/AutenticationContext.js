import React, { createContext, useCallback, useContext } from "react";
import axios from "axios";
import { urlContext } from "./UrlContex";
import { useNavigate } from "react-router";

export const authenticationContex = createContext(null);



export const AuthenticationProvider =(props)=>{

    const navigate = useNavigate()

    const {url} = useContext(urlContext)

    const checkauthentications = useCallback(async()=>{
        try {
            const token = sessionStorage.getItem("sstoken");
            let authurl = `${url}/socialmedia/api/v1/auth/${token}`;
            let result = await axios.get(authurl);
            let res = result.data;
            if (token) {
                // console.log('authentication passed')
              return res;
            } else {
            //   return false;
            navigate('/login')
            }
          } catch (err) {
            console.log(err);
            navigate('/login')
          }
    },[sessionStorage.getItem('sstoken')])


    return(
        <authenticationContex.Provider value={{checkauthentications}}>
            {props.children}
        </authenticationContex.Provider>
    )
}