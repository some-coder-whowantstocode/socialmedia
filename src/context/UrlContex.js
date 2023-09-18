import React, { useMemo } from "react";

export const urlContext = React.createContext(null);

export const UrlProvider = (props)=>{

// const url = useMemo(()=>"https://socialmedia-backend-2yn8.onrender.com",[])
// http://localhost:9310
    const url = useMemo(()=>"http://localhost:9310",[])

    return(
        <urlContext.Provider value={{url}}>
            {props.children}
        </urlContext.Provider>
    )
}