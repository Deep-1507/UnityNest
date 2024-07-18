import { useNavigate } from "react-router-dom"
export const InnerAppbar = () => {
  return (
    <div className="flex justify-around shadow-lg items-center  bg-customGreen">
      <div className="rounded-lg">
        <img  className="h-20 w-56 p-4" src="../src/images/Logo.png" alt="ComapnyLogo" srcset="" />
      </div>

      <div className=" flex justify-evenly items-center text-white ">
        <div className="pr-4 hover:text-black text-lg">Home</div>
        <div className="pr-4 hover:text-black text-lg">Features</div>
        <div className="pr-4 hover:text-black text-lg">Community</div>
        <div className="pr-4 hover:text-black text-lg">Blog</div>
        <div className="pr-4 hover:text-black text-lg">Pricing</div>
        <div className="pr-4 items-center">
          <button className="grid grid-rows-1 grid-flow-col gap-1 bg-gray-900 rounded-lg p-4">
            <div>
              Logout
            </div> 
          </button>
        </div>
      </div>

    </div>
  );
};
