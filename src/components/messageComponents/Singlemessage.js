import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { socketContext } from "../../context/SocketContext";
import { messageContext } from "../../context/Api/MessageContext";

const Singlemessage = ({ message, me }) => {
  const {socket} = useContext(socketContext)
  const {Deletemessageforme} = useContext(messageContext)
  const [m, setm] = useState(message);
  const [msgvis, setmsgvis] = useState("invisible");

  const changemsgoptionsvis = () => {
    msgvis == "invisible" ? setmsgvis("visible") : setmsgvis("invisible");
  };
  console.log(me)
  const deleteforme = async (id) => {
    const {data}= await Deletemessageforme(id);
   
    setm(data.msg.users);
    socket.emit("delete_message_for_me", { message: data });
  };

  return (
    <div>
      {m.sender == me ? (
        <div className=" relative self-end z-10  flex items-center flex-row-reverse group">
          <div
            key={m._id}
            className=" self-end p-1 w-fit break-words min-w-10 max-w-xs bg-gray-300  m-1 rounded-lg"
          >
            {m.content}
          </div>
          <BsThreeDotsVertical
            onClick={changemsgoptionsvis}
            className="  cursor-pointer hidden group-hover:block"
          />
          <div className={` ${msgvis} bg-gray-500 rounded-md p-1 text-white`}>
            <div className=" cursor-pointer" onClick={() => deleteforme(m._id)}>
              delete for me
            </div>
          </div>
        </div>
      ) : m.users && (
         
          <div className=" relative   flex items-center flex-row group">
            <div
              key={m._id}
              className=" self-start p-1 w-fit break-words min-w-10 max-w-xs  bg-blue-400 m-1 rounded-lg"
            >
              {m.content}
            </div>
            <BsThreeDotsVertical
              onClick={changemsgoptionsvis}
              className="  cursor-pointer hidden group-hover:block"
            />
            <div
              className={` ${msgvis} bg-gray-500 rounded-md p-1 text-white`}
            ></div>
          </div>
        )
      }
    </div>
  );
};

export default Singlemessage;
