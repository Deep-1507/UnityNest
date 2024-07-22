import { useNavigate } from "react-router-dom";
import { Inputbox } from "../components/Inputbox";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [userData, setUsersData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log("Response data: ", response.data);
        setUsersData(response.data.user);
      });
  }, []);

  useEffect(() => {
  if (userData.positionseniorityindex !== undefined) {
    axios
      .get("http://localhost:3000/api/v1/user/bulk", {
        params: {
          filter: filter,
          userPositionIndex: userData.positionseniorityindex,
          userid:userData._id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }
}, [filter, userData.positionseniorityindex]);

  return (
    <div>
      <div>Subordinates</div>

      <div>
        <Inputbox
          label={"Search the subordinate"}
          placeholder={"Enter firstname or lastname"}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      <div className="pt-8">
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border-4 p-4 hover:border-customGreen">
      <div className="flex">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-customGreen flex items-center justify-center">
            {user.firstName[0]}
          </div>
        </div>

        <div className="ps-8">
          <div>Id: {user._id}</div>
          <div>
            Name: {user.firstName} {user.lastName}
          </div>
          <div>Post: {user.position}</div>
          <div>Position Seniority: {user.positionseniorityindex}</div>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          label={"Assign Task"}
          onClick={() => {
            const name = encodeURIComponent(
              user.firstName + " " + user.lastName
            );
            navigate("/taskform?id=" + user._id + "&name=" + name);
          }}
        />
      </div>
    </div>
  );
}
