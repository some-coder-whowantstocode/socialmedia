import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/homeComponents/Nav";
import Singlechat from "../components/messageComponents/Singlechat";
import { messageContext } from "../context/Api/MessageContext";

const Messages = () => {

  const {getchats} = useContext(messageContext)


  const [chats, setchats] = useState([]);

  useEffect(() => {
    getchats()
    .then(data=>setchats(data))
  }, []);

 
  return (
    <div className="flex">
      <Nav />

      <div>
        {chats && chats.length > 0 ? (
          chats.map((chat) => <Singlechat chat={chat} />)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Messages;
