import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axios from "axios";


export const InnerAppbar = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
  
    const handleLogout = () => {
      
     
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      enqueueSnackbar("Logout successful", { variant: "success" });

      setTimeout(() => {
        navigate("/signin");
      }, 1000);

      
    };

  return (
    <div className="flex justify-around shadow-lg items-center bg-customGreen">
      <a href="/home">
      <div className="rounded-lg">
        <img  className="h-20 w-56 p-4" src="../src/images/Logo.png" alt="ComapnyLogo" srcset="" />
      </div>
      </a>
      

      <div className=" flex justify-evenly items-center">
        <div className="pr-4 text-gray-900 hover:text-white hover:underline">Home</div>
        <div className="pr-4 text-gray-900 hover:text-white hover:underline">Features</div>
        <div className="pr-4 text-gray-900 hover:text-white hover:underline">Community</div>
        <div className="pr-4 text-gray-900 hover:text-white hover:underline">Blog</div>
        <div className="pr-4 text-gray-900 hover:text-white hover:underline">Pricing</div>
        </div>

        <div  className=" flex justify-evenly items-center">
        <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:animate-spin">
          {user.firstName ? user.firstName[0] : ''}
        </div>
        <div className="text-gray-900 py-8 pr-8 pl-4 text-lg underline hover:text-white">
          {user.firstName}  {user.lastName} 
        </div>

        <div className="pr-4 items-center">
  <button
    className="hover:ease-in duration-300 text-white bg-gray-900 rounded-lg p-4 transition-all"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
        </div>

        
      

    </div>
  );
};


