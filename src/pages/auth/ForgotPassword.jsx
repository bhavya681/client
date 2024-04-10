import { set } from "mongoose";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassowrd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newpassword, email, answer }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Password Successfully Changed");
        navigate("/login");
      } else {
        toast.error("Error while changing password");
      }
    } catch (error) {
      toast.error(error);
      conseol.log(error);
    }
  };
  return (
    <>
      <div className="min-h-[50rem] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Password Reset
          </h2>
          <form className="space-y-4" onSubmit={handleForgotPassowrd}>
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <label>
                <span className="text-xl text-center mx-1 font-mono">
                  {" "}
                  Enter Your Favourite UFC Fighter?
                </span>
              </label>
              <input
                name="Answer"
                type="text"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                value={answer}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Answer"
              />
            </div>
            <div>
              <label className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newpassword}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Password
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
