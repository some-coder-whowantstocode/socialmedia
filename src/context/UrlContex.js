import React, { useMemo } from "react";

export const urlContext = React.createContext(null);

export const UrlProvider = (props)=>{

const url = useMemo(()=>"https://socialmedia-backend-2yn8.onrender.com",[])

    return(
        <urlContext.Provider value={{url}}>
            {props.children}
        </urlContext.Provider>
    )
}