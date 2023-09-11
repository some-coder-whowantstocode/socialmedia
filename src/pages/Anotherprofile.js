import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Nav from "../components/homeComponents/Nav";
import Defaultprofile from "../assets/di.jpg";
import Load from "../Utils/Load";
import { profileContext } from "../context/Api/ProfileContext";
import { friendApiContext } from "../context/Api/FriendContext";

const Anotherprofile = () => {
  const { Addfriend, Removefriend, msgfriend } = useContext(friendApiContext);
  const { getotherprofileimage } = useContext(profileContext);
  const location = useLocation();
  const [name, setname] = useState();
  const [friends, setfriends] = useState([]);
  const [id, setid] = useState();
  const [me, setme] = useState();
  const [load, setload] = useState("invisible");
  const [iload, setiload] = useState("invisible");

  useEffect(() => {
    console.log(friends);
  }, [friends]);

  // another user data

  useEffect(() => {
    setname(location.state.name);
    setid(location.state.id);
    let a = location.state.friends;
    console.log(a);
    setfriends(a);
    setme(location.state.me);
    console.log(location.state);
  }, [location.state]);

  const [pro, setpro] = useState();

  useEffect(() => {
    
      if (name) {
        setiload("visible");
        getotherprofileimage(name, null)
        .then((url) => {
          setpro(url);
          setiload("invisible");
        })
        .catch(error=>{
          console.log(error)
        })
      }
  }, [name]);

  return (
    <div className="flex">
      <Nav />
      <div className="flex  p-4">
        <div className="flex w-full ">
          {/* <input id='imginp' className='hidden' type="file" onChange={change} accept='image/*' /> */}
          <div className="flex items-center justify-center h-32 relative">
            <div className={`${iload} absolute left-auto top-auto`}>
              <Load size={23} />
            </div>
            <label htmlFor="imginp">
              <img
                className=" cursor-pointer h-32 rounded-[50%] border w-32 bg-gray-400"
                src={pro ? pro : Defaultprofile}
                alt=""
              />
            </label>
          </div>

          <div className=" text-xl font-semibold mr-1">{name}</div>
          {friends.length != 0 ? (
            friends.find((element) => element === me) ? (
              <div>
                <div className=" cursor-pointer h-9 m-4 py-1 px-2 text-blue-500">
                  friend
                </div>
                <div
                  onClick={() => msgfriend(id, name)}
                  className=" cursor-pointer h-9 ml-0 m-4 py-1 px-2 text-blue-500"
                >
                  message
                </div>

                <div
                  className=" cursor-pointer h-fit w-fit py-1 px-2 bg-red-500"
                  onClick={() => {
                    setload("visible");
                    Removefriend(id).then((data) => {
                      setfriends(data);
                      setload("invisible");
                    });
                  }}
                >
                  {load == "visible" ? (
                    <Load size={"19px"} className={`${load}`} />
                  ) : (
                    <p>unfriend</p>
                  )}
                </div>
              </div>
            ) : (
              <div
                className=" cursor-pointer h-9 py-1 px-2 w-fit min-w-10 bg-blue-500"
                onClick={() => {
                  setload("visible");
                  Addfriend(id).then((data) => {
                    setfriends(data);
                    setload("invisible");
                  });
                }}
              >
                {load == "visible" ? (
                  <Load className={`${load}`} size={"19"} />
                ) : (
                  <div>add friend</div>
                )}
              </div>
            )
          ) : (
            <div
              className=" cursor-pointer h-fit w-fit py-1 px-2 bg-blue-500"
              onClick={() => {
                setload("visible");
                Addfriend(id).then((data) => {
                  setfriends(data);
                  setload("invisible");
                });
              }}
            >
              {load == "visible" ? (
                <Load size={"19px"} className={`${load}`}></Load>
              ) : (
                <p>add friend</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anotherprofile;
