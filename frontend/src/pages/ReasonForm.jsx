import { Inputbox } from "../components/Inputbox";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export const ReasonForm = () => {
  const [searchParams] = useSearchParams();
  const taskid = searchParams.get("id");
  const taskassignedbyid = searchParams.get("assignedbyid");
  const tasksubmissiondate = searchParams.get("submissiondate");
  const [missedTaskDetails, setMissedTaskDetails] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleReasonSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/v1/task/submitreason",
        {
          taskid,
          missedTaskDetails,
        },
        {
                headers: {
                  Authorization: `Bearer ${token}`, // Correct format for the Authorization header
                }
        }
      );

      enqueueSnackbar("Reason Submitted successfully", { variant: "success" });

      setTimeout(() => {
        navigate("/missedtasks");
      }, 1000);
    } catch (err) {
      setError(
        "Failed to submit task."
      );
      enqueueSnackbar(`Unable to submit the task`, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 justify-between overflow-auto h-192 p-4">
          <h2>You are submitting the reason for the task:</h2>
          <div className="flex justify-between pt-4">
            <div>
              {" "}
              <span className="font-bold">Task id:</span> {taskid}
            </div>
            <div>
              <span className="font-bold">Task was assigned by:</span>{" "}
              {taskassignedbyid}
            </div>
            <div>
              <span className="font-bold">
                Submission date of the task set was:
              </span>{" "}
              {tasksubmissiondate}
            </div>
          </div>
          <Inputbox
            label={"Describe in Detail the about the task completed:"}
            placeholder={"Enter the details here......"}
            onChange={(e) => setMissedTaskDetails(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Submit and Close the Task"}
              onClick={handleReasonSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
