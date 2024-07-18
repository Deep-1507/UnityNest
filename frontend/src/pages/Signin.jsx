import { Button } from "../components/Button";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();


  return (
    <div className="inline-grid grid-cols-2 gap-4 h-screen w-screen items-center">
      <div className="m-28">
        <img src="../src/images/Logo.png" alt="Logo" />
      </div>
      <div className="bg-gray-100 h-screen px-24 pt-40">
        <div className="text-3xl font-bold text-center">
          <h1>Welcome Back!</h1>
        </div>
        {/* {error && <div className="text-red-500 text-center">{error}</div>} Display error */}
        <Inputbox
          label={"Username"}
          placeholder={"name@gmail.com"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Inputbox
          label={"Password"}
          placeholder={"123456"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="pt-8">
          <Button label={"Login to your Account"} onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });

            //is this even needed in sign in page as token to sirf signup min milta hai
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")} }/>
          <button
            type="button"
            className="w-full text-black bg-gray-100 border-2 border-black hover:border-4 hover:border-customGreen focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
