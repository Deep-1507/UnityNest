import { Button } from "../components/Button";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
        

  const navigate = useNavigate();

    return (
      <div className="inline-grid grid-cols-2 gap-4 h-screen w-screen items-center">
        <div className="m-28">
            <img src="../src/images/Logo.png" alt="Logo" srcset=""  />
        </div>

        <div className= "bg-gray-100 h-screen px-24 pt-28">
            <div className="text-3xl font-bold text-center">
                <h1>Create New Account?</h1>
            </div>
            <Inputbox label={"Username"}  placeholder={"name@gmail.com"} onChange={e => {
            setUsername(e.target.value);
        }}/>
            <Inputbox label={"First Name"} placeholder={"Deependra"}   onChange={e => {
           setFirstname(e.target.value);
        }}/>
            <Inputbox label={"Last Name"} placeholder={"Kumar"} onChange={e => {
            setLastname(e.target.value);
        }}/>
            <Inputbox label={"Password"} placeholder={"123456"}  onChange={e => {
            setPassword(e.target.value);
        }}/>
            <div className="pt-8">
            <Button label={"Create Account"} onClick={ async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password,
              },
            {
              headers:{
                "Content-Type":"application/json",
              },
            });

            console.log(response);
            

              localStorage.setItem("token", response.data.token)
              alert("Signup Successfull");
              navigate("/dashboard")
            }} />
            </div>
        </div>

       
      </div>
    );
  };
  