import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      <h1 className="text-[3rem] p-2 font-mono text-center items-center m-3">
        Admin Dashboard
      </h1>
      <nav className="m-5 bg-gray-400 border shadow-xl rounded-md w-[7%] p-2">
        <div
          className="p-3 shadow-md rounded-lg m-2 text-white cursor-pointer font-semibold bg-gray-400 hover:bg-gray-600"
          style={{ border: "1px solid white" }}
        >
          <Link
            className="text-black hover:text-white no-underline"
            to={"/create-category"}
          >
            <h1>Create Category</h1>
          </Link>
        </div>
        <div
          className="p-3 shadow-md rounded-lg text-white cursor-pointer font-semibold m-2 bg-gray-400  hover:bg-gray-600"
          style={{ border: "1px solid white" }}
        >
          <Link
            className=" text-black hover:text-white no-underline"
            to={"/admin-products"}
          >
            <h1>Products</h1>
          </Link>
        </div>
        <div
          className="p-3 shadow-md rounded-lg text-white cursor-pointer font-semibold m-2 bg-gray-400  hover:bg-gray-600"
          style={{ border: "1px solid white" }}
        >
          <Link
            className=" text-black hover:text-white no-underline"
            to={"/create-products"}
          >
            <h1>Create Products</h1>
          </Link>
        </div>
        <div
          className="p-3 shadow-md rounded-lg text-white cursor-pointer font-semibold m-2 bg-gray-400  hover:bg-gray-600"
          style={{ border: "1px solid white" }}
        >
          <Link
            className=" text-black hover:text-white no-underline"
            to={"/admin-orders"}
          >
            <h1>Orders</h1>
          </Link>
        </div>
        <div
          className="p-3 shadow-md rounded-lg text-white cursor-pointer font-semibold m-2 bg-gray-400  hover:bg-gray-600"
          style={{ border: "1px solid white" }}
        >
          <Link
            className=" text-black hover:text-white no-underline"
            to={"/admin-users"}
          >
            <h1>Users</h1>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AdminSideBar;
