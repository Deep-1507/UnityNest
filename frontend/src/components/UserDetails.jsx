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
      <div className="grid grid-cols-1 w-full justify-between">
        <h1 className="grid text-center text-4xl font-Anton pt-10">Welcome!</h1>
        <h2 className="grid text-center text-xl font-Anton">User Details</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Position:</strong> {user.position}</p>
        <p><strong>Position Seniority Index:</strong> {user.positionseniorityindex}</p>
      </div>
    );
  };
  