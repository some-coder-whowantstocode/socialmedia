import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/homeComponents/Nav";
import Defaultprofile from "../assets/di.jpg";
import { profileContext } from "../context/Api/ProfileContext";
import Load from "../Utils/Load";

const Profile = () => {
  const {getprofilephoto,imagetobase64,addphoto} = useContext(profileContext)
  const [source, setsrc] = useState(null);
  const [name, setname] = useState(null);
  const [load,setload]  = useState('visible')
  

  useEffect(() => {
    setname(sessionStorage.getItem("name"));
  }, []);

  const [pro, setpro] = useState(null);


  useEffect(()=>{
    console.log('src',source)
  },[source])


  
  useEffect(()=>{
    console.log('pro',pro)
  },[pro])


  useEffect(() => {
    if(name){
      setload('visible')
      getprofilephoto(name)
      .then(data =>{
        setpro(data);
        setload('invisible')
      })
      .catch(error=>{
        console.log(error)
        setload('invisible')
      })
    }
  }, [name]);

  // useEffect(() => {
  //   console.log(pro);
  // }, [pro]);


  useEffect(() => {
    if (source) {
        addphoto(source,name)
      
   
  }
  }, [source]);
  return (
    <div className="flex">
      <Nav />
      <div className="flex">
        <div className=" w-full p-4">
          <div className="flex">
            <input
              id="imginp"
              className="hidden"
              type="file"
              onChange={(e)=>{
                  imagetobase64(e)
                  .then(data=>setsrc(data))
                  .catch(error=>console.log(error))
                }}
              accept="image/*"
            />
            {
            pro ? (
              <img
                className=" cursor-pointer h-32 rounded-[50%] border w-32 bg-gray-400"
                src={pro}
                alt=""
              />
            ) : (
              <div className="flex items-center justify-center relative">
                <div className={`${load} absolute top-auto left-auto`}>
                <Load size={28}/>
                </div>
              <label htmlFor="imginp">
                
                <img
                  className=" cursor-pointer h-32 rounded-[50%] border w-32 bg-gray-400"
                  src={source ? source : Defaultprofile}
                  alt=""
                />
              </label>
              </div>
            )}

            <div className=" text-xl font-semibold">{name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
