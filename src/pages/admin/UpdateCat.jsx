import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCat = () => {
  const params = useParams();
  const id = localStorage.getItem("update_cat");
  const slug = params.slug;
  const [details, setDetails] = useState("");
  const getSlugCategory = async (slug) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/category/single-category/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      setDetails(data.categories);
      console.log(details);
      if (data.success) {
        toast.success("Successfully Get Category");
      } else {
        toast.error("Category Failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const updateCategory = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/category/update-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ name:details, slug: details }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Successfully Updated");
      } else {
        toast.error("Updation Failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getSlugCategory();
  }, [slug]);
  return (
    <>
      <div className="text-center w-[10%] space-y-5 m-5">
        <h1 className="text-2xl font-mono font-bold">Manage CATEGORY</h1>
        <div className="flex flex-col justify-center m-3 space-y-4">
          <input
            type="text"
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            className="p-2 border-black"
            value={details}
            placeholder="Enter Name"
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-800 font-mono"
            onClick={() => {
              updateCategory(id);
            }}
          >
            Create Category
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateCat;
