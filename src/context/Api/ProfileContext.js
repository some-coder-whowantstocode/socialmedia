import { createContext, useCallback, useContext, useState } from "react";
import { urlContext } from "../UrlContex";
// import { headerContext } from "../HeaderContext";
import axios from "axios";
import {Header} from "../../Utils/Header";


export const profileContext = createContext(null);

export const ProfileProvider = (props)=>{

  const [val,setval] = useState()

    const {url} = useContext(urlContext)
    // const {header} = useContext(headerContext)

    const getprofilephoto = useCallback( async (name) => {
        try {
          const src = sessionStorage.getItem("profileimage");
          if (src) {
            return src
          } else {
            if (name) {
              const getprofileimageurl = `${url}/socialmedia/api/v1/getprofilephoto`;
              const details = {
                name: name,
              };
              const data = await axios.post(getprofileimageurl, details);
            
              if(data.data.chunk){
                  sessionStorage.setItem("profileimage", data.data.chunk);
                  return data.data.chunk
              }
                

            }
          }
        } catch (error) {
            console.log(error);
        }
    },[])


    const getotherprofileimage = useCallback(async(name, id) => {
        try {
          const obj = {};
          if (id) {
            obj.id = id;
          }
          if (name) {
            obj.name = name;
          }
      
          const getimageurl = `${url}/socialmedia/api/v1/getprofilephoto`;
      
          const {data} = await axios.post(getimageurl, obj);
        //   console.log(re);
          return  data.chunk;
        } catch (error) {
          console.log(error);
        }
      },[])

    const imagetobase64 = useCallback((event)=> {
        // console.log(event.target.files)
        try {
    
                if (event.target.files[0]) {
                  const image = event.target.files[0];
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve(reader.result);
                    };
                    reader.onerror = (error) => {
                      reject(error);
                    };
                    reader.readAsDataURL(image);
                  });
    
                }
         
        } catch (error) {
          console.log(error);
        }
    },[])

    const addphoto = useCallback( async (source,name) => {
        try {
        const addprofileimageurl = `${url}/socialmedia/api/v1/addprofilephoto`;
        const data = {
          image: source,
          name: name,
        };
        let header = Header()
        const res = await axios.post(addprofileimageurl, data, { headers: header });
        sessionStorage.setItem('profileimage',source)
        // console.log(res);
      } catch (error) {
        console.log(error.response.data);
      }
    },[])

    const searchprofiles = useCallback(async (event) => {
      const {value} = event.target;
      try {
        if (value != "") {
          const {data} = await axios.get(`${url}/socialmedia/api/v1/search/${value}`);
          setval(value)

          return data
        }
        else{
          return []
        }
      } catch (error) {
        console.log(error);
      }
    }
      
    ,[val])


    return(
        <profileContext.Provider value={{getprofilephoto,imagetobase64,addphoto,getotherprofileimage,searchprofiles}}>
            {props.children}
        </profileContext.Provider>
    )
}
