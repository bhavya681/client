import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const getAllUsersData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/getAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (data.error) {
        console.log(error);
      } else {
        setUsers(data?.Users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <div>
        <AdminSideBar />
        <h1 className="text-3xl font-bold text-center mb-5">Admin Users</h1>
        <div className="flex justify-center m-5 p-4">
          <table className="table-auto border-collapse border border-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2">Name</th>
                <th className="border border-black px-4 py-2">Email</th>
                <th className="border border-black px-4 py-2">Address</th>
                <th className="border border-black px-4 py-2">Phone</th>
                <th className="border border-black px-4 py-2">Role</th>
                <th className="border border-black px-4 py-2">Answer</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border border-black px-4 py-2">{user.name}</td>
                  <td className="border border-black px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {user.address}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-black px-4 py-2">{user.role}</td>
                  <td className="border border-black px-4 py-2">
                    {user.answer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
