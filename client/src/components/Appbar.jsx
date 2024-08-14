import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Appbar = ({nav,setNav}) => {
    console.log(nav);
    const [user,setUser]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        async function getUser(){
            const user=await axios.get('http://localhost:3000/api/v1/account/username',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setUser(user.data);
        }
        getUser();
    },[])

    function navBar(){
        console.log("im being clicked");
        setNav((nav)=>!nav);
    }

    function logout(){
        localStorage.clear();
        navigate('../signin');
    }

    return (
        <div className="bg-slate-400 flex justify-between shadow h-14 items-center px-5 font-semibold text-xl">
          <div className="">PayFlow</div>
          <div className="flex items-center relative">
            <div className="relative">
              <div
                onClick={navBar}
                className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11"
              >
                {user[0]}
              </div>
              {nav && (
                <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg p-2">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
      
}

