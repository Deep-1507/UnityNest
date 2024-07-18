import { Footer } from "../components/Footer";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../components/UserDetails";

export const Dashboard = () => {

  
  
  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
      <Sidebar />
        </div>

      <div className="w-4/5 flex justify-between ">
      <UserDetails/>
      </div>
      </div>

      <Footer />
      
    </div>
  );
};


