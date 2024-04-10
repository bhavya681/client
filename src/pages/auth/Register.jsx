import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const handleRegsiter = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          answer
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success("Successfully Login");
        console.log("Successfull");
        navigate("/login");
      } else {
        toast.error("Error While Signup");
        console.log("Error While Signup");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <>
      <div className="min-h-[50rem] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Register
          </h2>
          <form
            className="space-y-4"
            onSubmit={
              handleRegsiter
            } 
          >
            <div>
              <label className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Name"
              />
            </div>
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
                placeholder="Enter Email address"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="sr-only">Phone Number</label>
              <input
                name="phone"
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <textarea
                row={80}
                cols={46}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                className="p-2 border rounded-xl shadow-lg  placeholder-gray-500"
                placeholder="Enter Your Address"
              />
            </div>
            <div>
              <label className="text-xl text-center mx-5 font-mono text-black">
                Enter your favourite UFC fighter?
              </label>
              <input
                id="answer"
                name="answer"
                type="text"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                value={answer}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Your Answer"
              />
            </div>

            <div>
              <button
                type="sumbit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Already have a account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Signup to existing account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
