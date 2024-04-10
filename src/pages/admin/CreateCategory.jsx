import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const createCategory = async () => {

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/category/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ name, slug: name }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Successfully Created Category");
      } else {
        toast.success("Category Creation Failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/category/get-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
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
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error("Error while deleting");
      } else {
        toast.success("Successfully Deleted");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex my-10">
        <AdminSideBar />
        <div className="text-center w-[10%] space-y-5 m-5">
          <h1 className="text-2xl font-mono font-bold">Manage CATEGORY</h1>
          <div className="flex flex-col justify-center m-3 space-y-4">
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="p-2 border-black"
              value={name}
              placeholder="Enter Name"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-800 font-mono"
              onClick={() => {
                createCategory();
              }}
            >
              Create Category
            </button>
          </div>
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          <table className="border-black rounded-lg p-2 ">
            <thead
              className="p-3 m-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  style={{ borderBottom: "1px solid black", margin: "2px" }}
                >
                  <td>{category.name}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-700 p-2 rounded-lg text-white cursor-pointer"
                        onClick={() => {
                          localStorage.setItem("update_cat", category._id);
                        }}
                      >
                        <Link to={`/update-category/${category.slug}`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="bg-red-500 rounded-lg p-2 text-white cursor-pointer"
                        onClick={() => {
                          deleteCategory(category._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
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

export default CreateCategory;
