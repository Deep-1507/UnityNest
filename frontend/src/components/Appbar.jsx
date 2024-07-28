import { useNavigate } from "react-router-dom"
export const Appbar = () => {

  const navigate = useNavigate();
  
  return (
    <div className="flex justify-around shadow-lg items-center bg-customGreen">
      <a href="/home">
      <div className="rounded-lg">
        <img  className="h-20 w-56 p-4" src="../src/images/Logo.png" alt="ComapnyLogo" srcset="" />
      </div>
      </a>

      <div className=" flex justify-evenly items-center">
        <div className="pr-4 hover:text-white hover:underline">Home</div>
        <div className="pr-4 hover:text-white hover:underline">Features</div>
        <div className="pr-4 hover:text-white hover:underline">Community</div>
        <div className="pr-4 hover:text-white hover:underline">Blog</div>
        <div className="pr-4 hover:text-white hover:underline">Pricing</div>
        <div className="pr-4 items-center border-2 rounded-xl bg-gray-900 text-white hover:text-white hover:border-gray-900">
          <button className="grid grid-rows-1 grid-flow-col gap-1  rounded-lg p-4" onClick={ () => {
            navigate("/signup")
          }}>
            <div>
              Register Now
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};
