import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Friend from "../components/friendComponents/Friend";
import Nav from "../components/homeComponents/Nav";
import { friendApiContext } from "../context/Api/FriendContext";

const Friends = () => {

  const {Findfriends} = useContext(friendApiContext)

  const location = useLocation();
  const [friends, setfriends] = useState([]);

  useEffect(() => {

    Findfriends(location.state.id)
    .then(data=> setfriends(data))

  }, [location.state]);

  // useEffect(() => {
  //   friends.map((friend) => {
  //     console.log(friend);
  //   });
  // }, [friends]);

  return (
    <div className="flex">
      <Nav />
      <div className="flex flex-wrap items-start justify-start">
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend}>
              <Friend id={friend} />
            </div>
          ))
        ) : (
          <div>no friends</div>
        )}
      </div>
    </div>
  );
};

export default Friends;
