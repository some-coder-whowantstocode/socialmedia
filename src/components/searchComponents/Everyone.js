import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { authenticationContex } from "../../context/AutenticationContext";
import { profileContext } from "../../context/Api/ProfileContext";


const Everyone = (result) => {
  const { checkauthentications } = useContext(authenticationContex);
  const { getotherprofileimage } = useContext(profileContext);

  const [res, setres] = useState();
  const [me, setme] = useState();
  const [id, setid] = useState();

  useEffect(() => {
    setres(result.result);
    console.log(result.result);
  }, []);

  useEffect(() => {
    checkauthentications()
      .then((data) => {
        setid(data.userId);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setme(sessionStorage.getItem("name"));
  }, []);

  const [pro, setpro] = useState();

  useEffect(() => {
    if (res) {
      console.log(res);
      getotherprofileimage(res.username, null).then((data) => {
        setpro(data);
      });
    }
  }, [res]);

  return (
    <div>
      {res != undefined &&
        (res.username == me ? (
          <NavLink
            to={"/profile"}
            key={res._id}
            className="flex items-center justify-start max-[730px]:p-2 p-4 w-logbox my-5 ml-1 searchprof"
          >
            {pro ? (
            <img src={pro} className=" max-[730px]:h-6 max-[730px]:w-6 h-10 w-10 rounded-full searchprof " alt="" />

            ) : (
              <BsPersonCircle className=" max-[730px]:h-6 max-[730px]:w-6 h-10 w-10 rounded-full searchprof" />
            )}

            <p className="cursor-pointer">{res.username}</p>
          </NavLink>
        ) : (
          <NavLink
            to={"/anotherprofile"}
            key={res._id}
            state={{
              name: res.username,
              me: id && id,
              id: res._id,
              friends: res.friends,
            }}
            className="flex items-center justify-start max-[730px]:p-2 p-4 w-logbox my-5 ml-1 searchprof"
          >
            {pro ? (
              <img src={pro} className=" max-[730px]:h-6 max-[730px]:w-6  h-10 w-10 rounded-full searchprof " alt="" />
            ) : (
              <BsPersonCircle className=" max-[730px]:h-6 max-[730px]:w-6 h-10 w-10 rounded-full searchprof" />
            )}
            <p className="cursor-pointer ml-5 text-xl">{res.username}</p>
          </NavLink>
        ))}
    </div>
  );
};

export default Everyone;
