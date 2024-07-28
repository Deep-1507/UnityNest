import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPersonCircleQuestion } from "react-icons/fa6";

export const Home = () => {
  const navigate = useNavigate();
 const customGray = "#111827";

  return (
    <div>
      <Appbar />
      <div className="flex justify-between py-16 shadow-xl">
        <div className=" w-1/2 ps-8">
          <span className="text-customGreen font-extrabold text-9xl">
            Team Management
          </span>{" "}
          <br />
          <span className="text-gray-900 font-extrabold text-9xl">
            Made Easy
          </span>{" "}
          <br />
          <div className="pt-4">
            <button
              className="bg-customGreen px-8 py-4 rounded-xl text-white font-semibold hover:text-gray-900"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up Today!
            </button>
          </div>
        </div>
        <div className="pr-16 pt-4">
          <img src="../src/images/illustration.png" alt="" srcset="" />
        </div>
      </div>

      {/* <div className="bg-gray-300 h-1 px-92"></div> */}

      <div className="text-5xl text-center pt-16 pb-16">
        Manage your entire community in a single system <br />
      </div>

      <div className="text-center text-4xl font-thin underline decoration-customGreen text-gray-600">
        Salient Features
      </div>

      <div className="grid grid-rows-1 grid-flow-col gap-4 p-8">
        <div className="flex flex-col items-center shadow-md rounded-lg shadow-customGreen p-4">
          <div>
            <FaPeopleGroup className="drop-shadow-xl size-16" />
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold text-xl">Seamless Collaboration</div>
            <div className="text-gray-600 text-center">
              Our platform is designed to make teamwork effortless. With
              real-time collaboration tools, intuitive task management, and
              seamless communication features, your team can stay connected and
              productive from anywhere. Simplify your workflow and focus on what
              truly matters—achieving your goals.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center shadow-md rounded-lg shadow-customGreen p-4">
          <div>
            <FaUserCheck className="size-16" />
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold text-xl">User-Friendly Interface</div>
            <div className="text-gray-600 text-center">
              Experience the power of advanced management features tailored to
              your team's needs. From detailed project tracking to automated
              reminders and robust reporting, our platform equips you with
              everything you need to stay on top of your tasks. Enhance
              productivity and ensure no detail is overlooked with our
              comprehensive suite of tools.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center shadow-md rounded-lg shadow-customGreen p-4">
          <div>
            <FaTools className="size-16" />
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold text-xl ">Advanced Features</div>
            <div className="text-gray-600 text-center">
              Experience the power of advanced management features tailored to
              your team's needs. From detailed project tracking to automated
              reminders and robust reporting, our platform equips you with
              everything you need to stay on top of your tasks. Enhance
              productivity and ensure no detail is overlooked with our
              comprehensive suite of tools
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 py-16 my-16 bg-gray-200">
        <div className="text-7xl font-extrabold text-gray-900">
          WHY CHOOSE US?
        </div>
        <div className="grid grid-flow-col gap-16 pt-16 items-center">
          <div>
            <img
              src="../src/images/Logo.png"
              alt=""
              srcset=""
              className="rounded-xl shadow-lg shadow-customGreen "
            />
          </div>

          <div className="px-12 text-gray-600 text-lg">
            Choosing our team management platform means opting for seamless
            collaboration, powerful and customizable tools, and exceptional
            support. Our user-friendly interface ensures that everyone on your
            team can easily navigate and make the most of our advanced features,
            designed to streamline your workflow and boost productivity. With a
            focus on security and reliability, you can trust that your data is
            safe and accessible whenever you need it. Experience a new level of
            team efficiency and success with our dedicated solutions tailored to
            meet your unique needs.
          </div>
        </div>
      </div>

      <div className="p-8 pb-40">
        <div className="text-7xl font-thin text-gray-900 text-center">
          Why You'll Love Our Platform
        </div>

        <div className="grid grid-rows-1 grid-flow-col gap-4 p-8 px-16 items-center">
          <div className="relative flex flex-col justify-center">
            <img
              src="../src/images/collaboration.jpg"
              alt=""
              className="rounded-xl h-76"
            />
            <div
              className="absolute inset-x-0 bottom-4 px-4"
              style={{ top: "22rem" }}
            >
              <p className="bg-white bg-opacity-80 shadow-xl rounded-lg p-4">
                Our platform fosters seamless collaboration by providing
                real-time communication tools and integrated task management
                features. This ensures that every team member stays in sync,
                reduces miscommunication, and allows for efficient project
                execution. With everything in one place, your team can focus on
                what matters most—delivering outstanding results.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center">
            <img
              src="../src/images/collaboration.jpg"
              alt=""
              className="rounded-xl h-76"
            />
            <div
              className="absolute inset-x-0 bottom-4 px-4"
              style={{ top: "22rem" }}
            >
              <p className="bg-white bg-opacity-80 shadow-xl rounded-lg p-4">
                We understand that every team has unique workflows and
                processes. That’s why our platform offers advanced customization
                options, allowing you to personalize dashboards, task fields,
                and project views. Whether you’re managing a small team or a
                large organization, our tools can be tailored to meet your
                specific requirements, enhancing productivity and efficiency.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center">
            <img
              src="../src/images/collaboration.jpg"
              alt=""
              className="rounded-xl h-76"
            />
            <div
              className="absolute inset-x-0 bottom-4 px-4"
              style={{ top: "22rem" }}
            >
              <p className="bg-white bg-opacity-80 shadow-xl rounded-lg p-4">
                Our platform fosters seamless collaboration by providing
                real-time communication tools and integrated task management
                features. This ensures that every team member stays in sync,
                reduces miscommunication, and allows for efficient project
                execution. With everything in one place, your team can focus on
                what matters most—delivering outstanding results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 pt-8 mt-16 p-16 grid grid-rows-1 grid-flow-col gap-4">

        <div>

     
        <div>
          <div className="text-7xl font-semibold text-gray-900 ">
            Questions?
          </div>
          <div className="text-7xl  text-customGreen pt-4">
Get in touch with us!
          </div>
        </div>
        <div className="pt-8">
          <label htmlFor="Query" className="text-xl">Enter your query:</label> <br />
          <textarea 
  id="Query" 
  className="w-1/2 h-40 mt-4 border-2 border-customGreen p-2" 
  placeholder="I have questions/issue regarding....."
></textarea> 
          <br />
          <label htmlFor="email" className="text-xl">Enter your mail-id:</label> <br />
          <input type="email" name="" placeholder="deependrakumar15072003@gmail.com" id="email" className="border-2 mt-4 border-customGreen w-1/2 h-10" />
        <div className="w-40 pt-8">

        <button
              className="bg-gray-900 hover:bg-customGreen px-8 py-4 rounded-xl text-white font-semibold hover:text-gray-900"
              
            >
              Send!
            </button>
  
        </div>
        </div>
        </div>

        <div>
        <FaPersonCircleQuestion className="size-80 mt-32" style={{ color: customGray }}  />
        </div>

       
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};
