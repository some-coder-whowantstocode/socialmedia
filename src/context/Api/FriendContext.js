import { createContext, useCallback, useContext } from "react";
import { urlContext } from "../UrlContex";
import axios from "axios";
// import { headerContext } from "../HeaderContext";
import { useNavigate } from "react-router";
import {Header} from "../../Utils/Header";


export const friendApiContext = createContext(null);

export const FriendApiProvider =(props)=>{

    const {url} = useContext(urlContext)
    // const {header} = useContext(headerContext)
    const navigate = useNavigate()


    const getfriend = useCallback( async (id) => {
        try{
            const findfriendurl = `${url}/socialmedia/api/v1/find/${id}`;
            const {data} = await axios.get(findfriendurl);
            return data
        }catch(error){
            console.log(error)
        }
      
    },[])

    const Findfriends = useCallback( async (id) => {
        try {
          const findfriendsurl = `${url}/socialmedia/api/v1/friends/${id}`;
      
          const {data} = await axios.get(findfriendsurl);
          return data;
        } catch (error) {
          console.log(error);
        }
    },[])


    const Addfriend= useCallback( async(id)=> {
        try {
          const addfriendurl = `${url}/socialmedia/api/v1/addfriend`;
        //   console.log(id)
          const data = {
            friend: id,
          };
        //   console.log(data)
        let header = Header()
          let request = await axios.post(addfriendurl, data, { headers: header });
        //   console.log(request)
          let friends = request?.data?.friend.friends;
          return friends;
        } catch (error) {
          console.log(error);
          return []
        }
    },[])


    const Removefriend = useCallback( async(id) =>{
        try {
            const removefriendurl = `${url}/socialmedia/api/v1/removefriend`;
            // console.log(id)
            const data = {
              friend: id,
            };
            // console.log(data)
            let header = Header()
            let request = await axios.post(removefriendurl, data, { headers: header });
            // console.log(request)
            let friends = request?.data?.friend.friends;
            
            return friends;
          } catch (error) {
            console.log(error);
          }
    },[])



    const msgfriend= useCallback(async(id,name)=>{
      const chatwithfriendurl = `${url}/socialmedia/api/v1/chatwithfriend`
    //   console.log(a)
      const data={
        friend:id
      }
    //   console.log(data)
      try{
        let header = Header()
        const d =await axios.post(chatwithfriendurl,data,{headers:header})
        // console.log(d)
        navigate('/chat',{state: {chat: d.data.chat, name: name}})
  
      }catch(error){
        console.log(error)
      }
  
    },[])
      


    return(
        <friendApiContext.Provider value={{getfriend,Findfriends,Addfriend,Removefriend,msgfriend}}>
            {props.children}
        </friendApiContext.Provider>
    )
}