import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authenticationContex } from "../../context/AutenticationContext";
import { friendApiContext } from "../../context/Api/FriendContext";
import Defaultimage from '../../assets/di.jpg'
import { profileContext } from "../../context/Api/ProfileContext";


const Friend = (id) => {

  const {checkauthentications} = useContext(authenticationContex);
  const {getfriend} = useContext(friendApiContext)
  const {getotherprofileimage} = useContext(profileContext)

  const [person, setperson] = useState({});
  const [me, setme] = useState(null);
  const [pro,setpro] = useState(Defaultimage);
  useEffect(() => {
    getfriend(id.id).then(data=>setperson(data))
  }, [id]);

  
  useEffect(()=>{
   checkauthentications()
   .then(data=>{
    setme(data.userId)
   })
   .catch(error=>console.log(error))
  },[])

  useEffect(()=>{
    if(person.username ) getotherprofileimage(person.username,null).then(data=>setpro(data))
  },[person])

 

  return (
    <div className="flex-col">
      {person && (
        <div
        className={` h-24 w-64 card m-5`}
        >
          <NavLink
            to={"/anotherprofile"}
            state={{
              name: person.username,
              me: me,
              id: person._id,
              friends: person.friends,
            }}
            className={'flex items-center h-full w-full'}
          >
            <img src={pro} className=" h-20 w-20 rounded-full" alt="" />
            <p className="ml-3 font-semibold">{person.username}</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Friend;
