import {createContext, useContext, useMemo} from "react";
import { io } from "socket.io-client";
import { urlContext } from "./UrlContex";
// import Url from "../Utils/Url";


export const socketContext = createContext();

export const Psocketio =(props)=>{
    const {url} = useContext(urlContext)
  
    const socket = useMemo(
        ()=> io(url) 
        ,[]) 
    return(
        <socketContext.Provider value={{socket}}>
            {props.children}
        </socketContext.Provider>
    )
}
