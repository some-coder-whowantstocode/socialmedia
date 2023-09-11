import { createContext, useCallback, useContext } from "react";
import axios from "axios";
// import { headerContext } from "../HeaderContext";
import { urlContext } from "../UrlContex";
import { useNavigate } from "react-router";
import { friendApiContext } from "./FriendContext";
import {Header} from "../../Utils/Header";


export const messageContext = createContext(null)


export const MessageProvider =(props)=>{

// const {header} = useContext(headerContext)
const {url} =useContext(urlContext)
const {getfriend} = useContext(friendApiContext)
const navigate = useNavigate()


    const getchats = useCallback(async () => {
        try {
          const getchaturl = `${url}/socialmedia/api/v1/getchat`;
          const header =  Header()
          const {data} = await axios.get(getchaturl, { headers: header });
          return data.chat
        } catch (err) {
          console.log(err);
        }
    },[])

    const getallmessages = useCallback(async (chatid) => {
        try{
            const allmessagesurl = `${url}/socialmedia/api/v1/allmessages/${chatid}`;
            let header = Header()
            const {data} = await axios.get(allmessagesurl, { headers: header });
    
              let messages = Array.from(data.messages);
    
              return messages
        }catch(error){
            console.log(error)
        }
      
    },[])

    const deletechat = useCallback( async(chatid)=>{
        const deletechaturl = `${url}/socialmedia/api/v1/deletechat`;
        try{
          
          const data = {
            id:chatid
          }
          let header = Header()
          await axios.post(deletechaturl,data,{headers:header});
          navigate('/messages')
        }catch(error){
          console.log(error)
        }
    },[])

    
  const getchatdetails = useCallback(async(chat,Idd)=>{
    try {
      const chaturl = `${url}/socialmedia/api/v1/getchatdetails/${chat}`
      let header = Header()
      const {data} = await axios.get(chaturl ,{headers:header})
 
      const users = Array.from(data.users);

      let friend = users.filter((i) => i != Idd);

       const {username} = await getfriend(friend[0]);
   
    return {
        'chatdetails':data,'chatname':username   }
    } catch (error) {
      console.log(error);
    }
  },[])

  
  const getlatestmessage = useCallback(async(chatdetails)=>{
    const {latestmessage} = chatdetails;
    if(latestmessage)
    {
        try{
            const msgurl = `${url}/socialmedia/api/v1/getmessage/${latestmessage}`
            const {data} = await axios.get(msgurl)
          
            return data.content
        }catch(error){
            console.log(error)
        }
    }
  },[])


  const Deletemessageforme =useCallback( async(id) => {
    try {
   
        const deleteformeurl = `${url}/socialmedia/api/v1/deleteforme/${id}`;
        let header = Header()
        let result = await axios.get(deleteformeurl,{headers:header});
        return result;
      } catch (error) {
        console.log(error);
      }
},[])



    

    return(
        <messageContext.Provider value={{getchats,getallmessages,deletechat,getchatdetails,getlatestmessage,Deletemessageforme}}>
            {props.children}
        </messageContext.Provider>
    )
}
