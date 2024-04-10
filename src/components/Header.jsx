import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const isAdmin = localStorage.getItem("auth");

  const getAllCategories = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/category/get-category",
        {
          method: "GET",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <nav className="flex justify-between bg-gray-200 shadow-xl rounded-lg">
        <Link className="navbar-brand" to="/">
          <h1 className="p-2 ml-2 pl-2 my-2 text-2xl transition-all ease-in-out hover:ml-20 hover:animate-ping font-mono">
            CyberMart🛒
          </h1>
        </Link>
        <div className="flex justify-between mx-4 p-3 space-x-7 text-center items-center ">
          <Link to={"/"}>
            <h1 className="hover:text-red-600 text-2xl text-black">Home</h1>
          </Link>

          <div className="bg-gray-200 p-1 rounded-md">
            <select
              onChange={(e) => {
                window.location.href = e.target.value;
              }}
              className="p-2 rounded-xl bg-gray-100 cursor-pointer  hover:text-black text-xl text-gray-600 font-sans "
            >
              <option value={"/"}>Select Category</option>
              <option value={"/categories"}>All Categories</option>
              {categories?.map((c) => (
                <>
                  <option key={c.name} value={`/category/${c.slug}`}>
                    {c.name}
                  </option>
                </>
              ))}{" "}
            </select>
          </div>

          {isAdmin === "Admin" ? (
            <>
              <Link to={"/admin/dashboard"}>
                <h1 className="hover:text-red-600 text-2xl text-black">
                  Admin DashBoard
                </h1>
              </Link>
            </>
          ) : isAdmin === "User" ? (
            <>
              <Link to={"/user/dashboard"}>
                <h1 className="hover:text-red-600 text-2xl text-black">
                  User DashBoard
                </h1>
              </Link>
            </>
          ) : null}
          {localStorage.getItem("auth-token") ? (
            <>
              <Link
                to={"/login"}
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("auth");
                  localStorage.removeItem("cart");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                <h1 className="hover:text-red-600 text-2xl text-black">
                  Logout
                </h1>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <h1 className="hover:text-red-600 text-2xl text-black">
                  Login
                </h1>
              </Link>
              <Link to={"/register"}>
                <h1 className="hover:text-red-600 text-black  text-2xl">
                  Register
                </h1>
              </Link>
            </>
          )}

          <Link to={"/cart"}>
            <h1 className="hover:text-red-600 text-black  text-2xl">Cart</h1>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
