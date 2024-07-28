import axios from "axios";
import { Inputbox } from "../components/Inputbox";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { jsPDF } from "jspdf";

export function TotalTasksDetails() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);

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
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log("Response data: ", response.data);
        setUser(response.data.user);
      });
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        // Ensure the token is included correctly in the Authorization header
        const response = await axios.get(
          "http://localhost:3000/api/v1/task/totaltasksassigned",
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

  const getBackgroundColor = (status, submissionDate) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format

    if (status === 0 && submissionDate < currentDate) {
      return "bg-red-600";
    } else if (status === 2) {
      return "bg-yellow-400";
    } else if (status === 0 && submissionDate >= currentDate) {
      return "";
    } else if (status === 1) {
      return "bg-customGreen";
    }

    return ""; // Default background color
  };

  const getFontColor = (status, submissionDate) => {
    const backgroundColor = getBackgroundColor(status, submissionDate);

    switch (backgroundColor) {
      case "bg-red-600":
        return "#FF0000"; // Red
      case "bg-yellow-400":
        return "#FF9900"; // Yellow
      case "bg-customGreen":
        return "#00FF00"; // Green
      default:
        return "#000000"; // Default to black if no background color
    }
  };

  const getStatus = (status, submissionDate) => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (status === 0 && submissionDate >= currentDate) {
      return "Task is Ongoing";
    } else if (status === 0 && submissionDate < currentDate) {
      return "Task Missed and Reason is not provided";
    } else if (status === 2) {
      return "Task Missed and Reason was provided";
    } else if (status === 1) {
      return "Task Completed";
    }
  };

  const loadImageAsBase64 = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Set the initial position for the text
    let yPosition = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Function to add a new page if the current yPosition exceeds the page height
    const addNewPage = () => {
      doc.addPage();
      yPosition = 10;
    };

    // Function to check if the task details fit on the current page
    const checkIfTaskFitsOnPage = (task) => {
      const lineHeight = 10; // Height of each line
      const linesNeeded = 8; // Number of lines needed for one task (adjust as needed)
      const spaceNeeded = linesNeeded * lineHeight;
      return yPosition + spaceNeeded <= pageHeight - 10; // Adjust for margin
    };

    // Function to calculate the height of the task details section
    const getTaskSectionHeight = () => {
      const lineHeight = 10; // Height of each line
      const linesNeeded = 8; // Number of lines needed for one task (adjust as needed)
      return linesNeeded * lineHeight;
    };

    // Add title
    loadImageAsBase64("../src/images/Header.png", (base64Image) => {
      const imgWidth = 190; // Adjust the width as needed
      const imgHeight = 40; // Adjust the height as needed
      doc.addImage(base64Image, "JPEG", 10, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 5; // Adjust yPosition after the image

      doc.setDrawColor(0); // Set line color to black
      doc.line(10, yPosition, doc.internal.pageSize.width - 10, yPosition);
      yPosition += 10; // Add space after the line

      doc.setFontSize(18); // Increase font size for title
      doc.setFont("helvetica", "bold"); // Make title bold

      const title = "Tasks Report";
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pageWidth - titleWidth) / 2; // Center alignment

      doc.text(title, titleX, yPosition);
      yPosition += 5;

      doc.setDrawColor(0); // Set line color to black
      doc.line(10, yPosition, doc.internal.pageSize.width - 10, yPosition);
      yPosition += 5; // Add space after the line

      doc.setFont("helvetica", "bold");
      doc.text("Id:", 15, yPosition + 10);
      doc.setFont("helvetica", "normal");
      doc.text(` ${user._id}`, doc.getTextWidth("Id:") + 17, yPosition + 10);

      yPosition += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Username:", 15, yPosition + 10);
      doc.setFont("helvetica", "normal");
      doc.text(
        ` ${user.username}`,
        doc.getTextWidth("Username:") + 17,
        yPosition + 10
      );

      yPosition += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Name:", 15, yPosition + 10);
      doc.setFont("helvetica", "normal");
      doc.text(
        ` ${user.firstName} ${user.lastName}`,
        doc.getTextWidth("Name:") + 17,
        yPosition + 10
      );

      yPosition += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Post:", 15, yPosition + 10);
      doc.setFont("helvetica", "normal");
      doc.text(
        ` ${user.position}`,
        doc.getTextWidth("Post:") + 17,
        yPosition + 10
      );

      yPosition += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Position Level:", 15, yPosition + 10);
      doc.setFont("helvetica", "normal");
      doc.text(
        ` ${user.positionseniorityindex}`,
        doc.getTextWidth("Position Level:") + 17,
        yPosition + 10
      );

      yPosition += 20;

      doc.setDrawColor(0); // Set line color to black
      doc.line(10, yPosition, doc.internal.pageSize.width - 10, yPosition);
      yPosition += 10; // Add space after the line

      tasks.forEach((task) => {
        // Check if the task details fit on the current page, if not add a new page
        if (!checkIfTaskFitsOnPage(task)) {
          addNewPage();
        }

        // Calculate the height of the task section
        // const taskSectionHeight = getTaskSectionHeight();

        // Draw the border around the task details section
        // doc.rect(10, yPosition, doc.internal.pageSize.width - 20, taskSectionHeight);

        const status = `${getStatus(task.status, task.submissiondate)}`;
        const fontColor = getFontColor(task.status, task.submissiondate);

        doc.setFont("helvetica", "bold");
        doc.text("Task ID:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          ` ${task.taskid}`,
          doc.getTextWidth("Task ID:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Submission Date:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          `  ${task.submissiondate}`,
          doc.getTextWidth("Submission Date:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Task Status:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(fontColor);
        doc.text(
          `  ${status}`,
          doc.getTextWidth("Task Status:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        doc.setTextColor("black");
        doc.setFont("helvetica", "bold");
        doc.text("Assigned By:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          `  ${task.taskassignedby}`,
          doc.getTextWidth("Assigned By:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        // doc.setFont("helvetica", "bold");
        // doc.text("Assigned To:", 15, yPosition + 10);
        // doc.setFont("helvetica", "normal");
        // doc.text(
        //   `  ${task.taskassignedto}`,
        //   doc.getTextWidth("Assigned To:") + 17,
        //   yPosition + 10
        // );

        // yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Task:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          `  ${task.task}`,
          doc.getTextWidth("Task:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Submission Date:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          `  ${task.submissiondate}`,
          doc.getTextWidth("Submission Date:") + 17,
          yPosition + 10
        );

        yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Submitted Details of the Task:", 15, yPosition + 10);
        doc.setFont("helvetica", "normal");
        doc.text(
          `  ${task.message}`,
          doc.getTextWidth("Submitted Details of the Task:") + 20,
          yPosition + 10
        );

        yPosition += 20; // Add more space between different tasks

        // Draw a line after the task details
        doc.setDrawColor(0); // Set line color to black
        doc.line(10, yPosition, doc.internal.pageSize.width - 10, yPosition);
        yPosition += 10; // Add space after the line
      });

      const filename = `${user.firstName} ${user.lastName}_Tasks_Report.pdf`;
      // Save the PDF
      doc.save(filename);
    });
  };

  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 justify-between overflow-auto h-192 p-4">
          <div></div>

          <div className="text-center pt-10 text-3xl font-semibold">
            Total Tasks Assigned to you are as follows
          </div>
          <div className="pt-8 flex justify-center cursor-pointer">
            <button onClick={generateReport}>
              <div
                href="#"
                class="flex items-center p-4 px-8 text-white bg-gray-700  rounded-lg hover:bg-gray-100 hover:text-black group border-2 border-black"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Generate Report
                </span>
              </div>
            </button>
          </div>

          <div className="pt-14 border-none">
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <li key={task.taskid}>
                    <div
                      className={`flex justify-between border-4 p-4 hover:border-customGreen items-center ${getBackgroundColor(
                        task.status,
                        task.submissiondate
                      )}`}
                    >
                      <div>
                        <strong>Task ID:</strong> {task.taskid}
                        <br />
                        <strong>Status:</strong>{" "}
                        {getStatus(task.status, task.submissiondate)}
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
                        <strong>
                          Details provided by you for the task:
                        </strong>{" "}
                        {task.message}
                        <hr />
                      </div>
                      {/* <div>
                        <Button
                          label={"Task Completed?"}
                          onClick={() =>
                            navigate(
                              `/tasksubmissionform?id=${task.taskid}&assignedbyid=${task.taskassignedby}&submissiondate=${task.submissiondate}`
                            )
                          }
                        />
                      </div> */}
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
