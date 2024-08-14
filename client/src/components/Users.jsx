import { useEffect, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ({handleClick}) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Use the token directly from localStorage
        }
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="px-10" onClick={handleClick}>
      <div className="font-bold text-xl">Users</div>
      <input
        className="mt-4 px-4 py-1 rounded-2xl outline-2 outline-gray-300 outline w-full"
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder="Search For Contacts"
      />
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center font-medium border border-gray-300 rounded-xl m-4">
      <div className="pl-4 flex items-center">
        <div className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11">
          <div className=""> {user.firstName[0]}</div>
        </div>
        <div className="pl-4">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="w-40 flex justify-center items-center text-sm pb-5">
        <ButtonComponent
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          text={"Send Money"}
        />
      </div>
    </div>
  );
}
