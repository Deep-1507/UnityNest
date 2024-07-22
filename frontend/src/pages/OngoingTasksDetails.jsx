import axios from "axios";
import { Inputbox } from "../components/Inputbox";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";

export function OngoingTasksDetails() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    position: "relative",
  };

  const imageStyle = {
    position: "absolute",
    zIndex: 1,
  };

  const spinnerStyle = {
    border: "16px solid #f3f3f3",
    borderTop: "16px solid #45EB49",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
    position: "absolute",
    zIndex: 0,
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        // Ensure the token is included correctly in the Authorization header
        const response = await axios.get(
          "http://localhost:3000/api/v1/task/ongoingtaskdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Correct format for the Authorization header
            },
          }
        );

        console.log("Response data: ", response.data);
        setTasks(response.data.tasks); // Adjust based on your API response structure
        setLoading(false);
      } catch (error) {
        // Access status code if available
        
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div style={spinnerContainerStyle}>
        <img
          src="../src/images/smallLogo.png"
          style={imageStyle}
          className="size-12 rounded-lg"
          alt=""
          srcset=""
        />
        <style>{keyframesStyle}</style>
        <div style={spinnerStyle} className="size-3"></div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 justify-between overflow-auto h-192 p-4">
          <h2 className="text-center font-bold text-xl">
            Tasks Assigned to you are as follows
          </h2>
          <div className="pt-14">
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <li key={task.taskid}>
                    <div className="flex justify-between border-4 p-4 hover:border-customGreen items-center">
                      <div>
                        <strong>Task ID:</strong> {task.taskid}
                        <br />
                        <strong>Assigned By:</strong> {task.taskassignedby}
                        <br />
                        <strong>Assigned To:</strong> {task.taskassignedto}
                        <br />
                        <strong>Assigned To Name:</strong>{" "}
                        {task.taskassignedtoname}
                        <br />
                        <strong>Task:</strong> {task.task}
                        <br />
                        <strong>Submission Date:</strong> {task.submissiondate}
                        <br />
                        <hr />
                      </div>
                      <div>
                        <Button
                          label={"Task Completed?"}
                          onClick={() =>
                            navigate(
                              `/tasksubmissionform?id=${task.taskid}&assignedbyid=${task.taskassignedby}&submissiondate=${task.submissiondate}`
                            )
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
