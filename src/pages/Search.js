import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/homeComponents/Nav";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Url from "../Utils/Url";
import Everyone from "../components/searchComponents/Everyone";
import { profileContext } from "../context/Api/ProfileContext";
import Load from "../Utils/Load";

const Search = () => {
  const [result, setresult] = useState([]);
  // const [id,setid] = useEffect()
  const {searchprofiles} = useContext(profileContext)
  const [load,setload] = useState('invisible')

  // const [pro, setpro] = useState();

  // useEffect(() => {
  //   console.log(pro);
  // }, [pro]);

  return (
    <div className="flex ">
      <Nav />
      <div >
        <div className="flex relative h-14">
          <input
            type="text"
            onChange={(e)=>{
              setload('visible')
              searchprofiles(e)
              .then(data=>{
                setresult(data)
                setload('invisible')
              })
            }}
            className=" max-[730px]:w-screen max-[730px]:top-1 max-[730px]:h-10 max-[730px]:text-lg  min-[730px]:text-xl pl-2  border border-gray w-rest min-[730px]:h-14 outline-none searchprof "
          />
          <div className="absolute right-0 top-2 max-[730px]:top-0  ">
          {/* <AiOutlineSearch className="   max-[730px]:absolute max-[730px]:right-4 max-[730px]:top-3 " fontSize={'20px'} /> */}
          </div>
        </div>
       
        <div className={`${load}`} >
        {<Load size={20} />}
        </div>
        { result.map((res) => <Everyone result={res} />)}
      </div>
    </div>
  );
};

export default Search;
