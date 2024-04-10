import React, { useContext, useEffect, useState } from "react";
import UserSideBar from "./UserSideBar";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(()=>{
console.log(auth);
  },[])

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("auth-token")
        },
        body: JSON.stringify({ name, email, address, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setAuth({ ...auth, user: data.updatedUser });
        toast.success("Successfully Updated User Data");
      } else {
        toast(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <UserSideBar />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleUpdate}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-blue-700 text-white text-center items-center"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
