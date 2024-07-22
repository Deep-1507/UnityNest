import { Inputbox } from "../components/Inputbox";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { Users } from "../components/Users";


export const Assigntask = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    

    return (
        <div>
            <InnerAppbar />

            <div className="flex w-full">
                <div className="w-1/5">

                    <Sidebar />
                </div>
                <div className="w-4/5 justify-between overflow-auto h-192">
                  <Users/>
                </div>

            </div>
            <Footer />

        </div>
    );
};

