import { useEffect, useState } from "react";
import axios from "axios";



export function UserDetails() {

  const [user,setUser] = useState([]);

  useEffect( () => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/api/v1/user/details",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    .then(response => {
      console.log("Response data: ", response.data);
      setUser(response.data.user);
    })
  },[])

    return <>
      
    {user ? (
        <User user={user} />
      ) : (
        <p>Loading user details...</p>
      )}

    </>
}

const User = ({ user }) => {
    return (
      <div className=" flex flex-col items-center w-full pt-16">
        <div className=" text-7xl font-bold">Welcome!</div>

        <div className="flex flex-col items-center mt-16 p-8 shadow-xl shadow-customGreen rounded-lg">
        <div className="text-4xl font-semibold  underline decoration-customGreen">User Details</div>
        <div className="flex flex-col justify-between text-justify pt-8 ">
        <p className="pt-4"><strong>UID:</strong> {user._id}</p>
        <p className="pt-4"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p className="pt-4"><strong>Username:</strong> {user.username}</p>
        <p className="pt-4"><strong>Position:</strong> {user.position}</p>
        <p className="pt-4"><strong>Position Seniority Index:</strong> {user.positionseniorityindex}</p>
        </div>
        
        </div>
       
      </div>
    );
  };
  