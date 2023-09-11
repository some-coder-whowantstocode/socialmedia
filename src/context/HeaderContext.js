import React, { createContext, useEffect, useMemo, useState } from "react";

export const headerContext = createContext(null)


export const HeaderProvider = (props) => { 
  
    const header = {
      'Content-Type': 'application/json',
      'authorization': sessionStorage.getItem('sstoken')
    }
  
    return (
      <headerContext.Provider value={{ header }}>
        {props.children}
      </headerContext.Provider>
    );
  };
  