import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { urlContext } from "../../context/UrlContex";
import { BiLoader } from "react-icons/bi";

const Dob = () => {
  const err = useRef();

  const {url} = useContext(urlContext)
  const [load,setload] = useState(false)
  const [yearlist, setyearlist] = useState([]);
  const [mon, setmon] = useState();
  const [selyear, setselyear] = useState();
  const [dates, setdates] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [header, setheders] = useState();
  const [data, setdata] = useState();
  const [curdate, setcurdate] = useState();

  useEffect(()=>{
    const d = new Date();
    let a  = d.getDate()
    let b = d.getFullYear()
    let c = d.getMonth()
    console.log(a,b,c)
    setcurdate(a)
    setselyear(b)
    setmon(c)
  },[])

  let location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setheders(location.state.headers);
    setdata(location.state.data);
  }, [location.state]);

  const sign = async (req, res) => {
    err.current.innerText = "";
    try {
      setload(true)
      let today = new Date();
      
        let dat = data;
        let headers = header;
        let date = new Date(selyear, mon, curdate);
        dat.dob = date;
        console.log(date)

        const register = await axios.post(
          `${url}/socialmedia/api/v1/register`,
          dat,
          headers
        );
        console.log(register)
        let token = register.data?.jwttoken;
        console.log(token)
        sessionStorage.setItem("name", register.data.username);
        sessionStorage.setItem("sstoken", "Bearer " + token);
        navigate("/");
      setload(false)
    } catch (error) {
      setload(false)
      console.log(error)
      let m =  error?.response?.data
      if( m?.msg )
      {
        err.current.innerText = m.msg 
      }else{
        err.current.innerText = m.message

      }

      // err.current.innerText = err.response.data ? err.response.data.msg : 'something went wrong.'
    }
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    setselyear(year);
    let years = Array.from(new Array(50), (val, index) => year - index);
    setyearlist(years);
    const month = new Date().getMonth();
    setmon(month);
    const date = new Date(year, month, 1);
    let dates = new Array(0);
    while (date.getMonth() === month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }

    setdates(dates);
  }, []);

  useEffect(() => {
    let year = Number(selyear);
    const date = new Date(year, mon, 1);
    let dates = new Array(0);
    while (date.getMonth() == mon) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    setdates(dates);
  }, [mon, selyear]);

  function handlemonth(event) {
    setmon(Number(event.target.value));
  }

  function handleyear(event) {
    setselyear(Number(event.target.value));
  }

  function handledate(event) {
    setcurdate(Number(event.target.value));
  }

  return (
    <div>
      <div className="flex items-center justify-center h-full w-full flex-col">
        <div className="flex bg-gray p-10 items-center justify-center border  border-gray-400 flex-col w-logbox h-logbox mt-3">
          <img
            className="h-32 "
            src="https://th.bing.com/th/id/R.75fe9d2cd0225f916b48ad830c7f2c83?rik=OGwrl3C1doR3Aw&riu=http%3a%2f%2fclipart-library.com%2fimg1%2f1248578.jpg&ehk=upjNdkDykds5C9dbRQNapRHkkmk35AYx5huaRq5gZLs%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
          <div className=" text-sm font-bold m-4">Add Your Birthday</div>
          <div className="text-sm mb-2">
            This won't be part of your public profile.
          </div>
          <div>
            <select
              name=""
              className=" focus:outline-none border-2 text-gray-500 mr-2 h-10 rounded border-gray"
              value={mon}
              onChange={handlemonth}
              id=""
            >
              {months.map((month) => (
                <option value={`${months.indexOf(month)}`}>{month}</option>
              ))}
            </select>
            <select
              name=""
              onChange={handledate}
              className=" focus:outline-none text-gray-500 border-2 mr-2 h-10 rounded border-gray"
              id=""
            >
              {Array.isArray(dates) &&
                dates.map((date) => <option value={date}>{date}</option>)}
            </select>
            <select
              name=""
              className=" focus:outline-none text-gray-500 border-2 h-10 rounded border-gray"
              value={selyear}
              onChange={handleyear}
              id=""
            >
              {Array.isArray(yearlist) &&
                yearlist.map((year) => (
                  <option value={`${year}`}>{year}</option>
                ))}
            </select>
          </div>
          <div ref={err} className=" text-sm text-red-600"></div>
          <div className="text-xs p-3 text-gray-400">
            You need to enter the day you were born
          </div>
          <div className="text-xs  text-gray-400">
            Use your own birthday, even if this account is for a business, a
            pet, or something else
          </div>
          {

          load ? 
          
          <div
          onClick={sign}
          className=" bg-blue-600 text-white w-ibox h-ibox rounded my-3"
        >
          please wait
        </div>
          :
          <button
            onClick={sign}
            className=" bg-blue-600 text-white w-ibox h-ibox rounded my-3"
          >
            Next
          </button>
          }
          <NavLink
            className={"text-blue-700 font-bold hover:text-black"}
            to={"/login"}
          >
            Go Back
          </NavLink>
        </div>
        <div className=" border flex items-center justify-center my-3 border-gray-400 p-2 w-logbox">
          already have an account ?
          <NavLink
            to="/login"
            className={"navlink text-blue-900 font-semibold"}
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dob;
