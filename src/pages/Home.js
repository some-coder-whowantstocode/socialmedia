import React, { useContext, useEffect } from "react";
import Nav from "../components/homeComponents/Nav";
import { authenticationContex } from "../context/AutenticationContext";

const Home = () => {

  const {checkauthentications} = useContext(authenticationContex)
  
  useEffect(()=>{
    checkauthentications()
   
   },[])
 
  return (
    <div>
      <Nav />
    </div>
  );
};

export default Home;
