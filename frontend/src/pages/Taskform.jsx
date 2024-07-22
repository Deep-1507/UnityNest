import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Inputbox } from "../components/Inputbox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "notistack";

function getUserIdFromToken() {
 
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.id || decodedToken.userId;

    return userId;
  }

  return null;
}

export function Taskform() {
  const [searchParams] = useSearchParams();
  const subordinateid = searchParams.get("id");
  const name = searchParams.get("name");
  const [task, setTask] = useState("");
  const [submissiondate, setSubmissionDate] = useState("");
  const [userid, setUserId] = useState("");
  
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 justify-between overflow-auto h-192 p-4">
          <div className="text-center font-bold text-xl">Task form</div>

          <div>Assigning task to:</div>
          <div className="flex justify-between  items-center pt-4">
            <div className="w-12 h-12 rounded-full bg-customGreen flex items-center justify-center">
              {name ? name[0].toUpperCase() : ""}
            </div>
            <div className="">{name}</div>
            <div>{subordinateid}</div>
          </div>
          <div className="pt-4">
            <div className="">
              <input
                type="text"
                required
                oninvalid="this.setCustomValidity('Please enter your username.')"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                placeholder="Enter the detailed description of the task....."
                h
                className="border-2 w-full p-4 text-lg hover:border-4 hover:border-customGreen"
              />
            </div>

            <div className="pt-4 pb-4">
              <input
                type="date"
                required
                oninvalid="this.setCustomValidity('Please enter your username.')"
                name=""
                id=""
                onChange={(e) => {
                  setSubmissionDate(e.target.value);
                }}
                className="border-2 w-full p-4 text-lg hover:border-4 hover:border-customGreen"
              />
            </div>

            <Button
              label={"Submit!"}
              onClick={() => {
                axios.post(
                  "http://localhost:3000/api/v1/task/assigntask",
                  {
                    userid,
                    subordinateid,
                    name,
                    task,
                    submissiondate,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );

                // enqueueSnackbar("Task Assigned successfully", { variant: "success" });

              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
