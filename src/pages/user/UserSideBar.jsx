import React from "react";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  return (
    <>
    <h1 className="text-[3rem] p-2 font-mono text-center items-center m-3">User Dashboard</h1>
      <nav className="m-5 bg-gray-400 border shadow-xl rounded-md w-[6%] p-2">
        <div className="p-3 shadow-md rounded-lg m-2 text-white cursor-pointer font-semibold bg-gray-400 hover:bg-gray-600" style={{border:"1px solid white"}}>
          <Link className="text-black hover:text-white no-underline" to={"/user-profile"}>
            <h1>Profile</h1>
          </Link>
        </div>
        <div className="p-3 shadow-md rounded-lg text-white cursor-pointer font-semibold m-2 bg-gray-400  hover:bg-gray-600" style={{border:"1px solid white"}}>
          <Link className=" text-black hover:text-white no-underline" to={"/user-orders"}>
            <h1>Orders</h1>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default UserSideBar;
