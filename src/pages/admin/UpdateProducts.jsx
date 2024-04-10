/*
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const UpdateProducts = () => {
  const params = useParams();
  const slug = params.slug;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    getSlugData();
  }, []);
  const getSlugData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setId(data.product._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? 1 : 0);
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  });
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      setCategories(data.categories);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("shipping", shipping);
      photo && formData.append("photo", photo);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      if (data.success) {
        navigate("/admin-products");
        toast.success("Successfully Updated");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`,{
        headers:{
          "auth-token":localStorage.getItem("auth-token")
        }
      });
      if(data.success){
        toast.success(data.success);
      }else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <AdminSideBar />
      <div>
        <h1 className="text-4xl text-black font-mono text-center">
          Update Product
        </h1>
        <div className="flex flex-col justify-center text-center items-center m-3">
          <label className="text-2xl font-mono">Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="m-2 rounded-lg p-2"
            style={{ border: "2px solid black" }}
          />
          <label className="text-2xl font-mono">Description:</label>
          <textarea
            className="m-2 p-3 rounded-lg"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={30}
            style={{ border: "2px solid black" }}
          ></textarea>

          <label className="text-2xl font-mono">Category</label>
          <div className="p-2 m-3 flex justify-center">
            <select
              className="p-2 shadow-lg cursor-pointer shadow-black rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="select category">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col m-2">
            <div className="flex flex-col">
              <label className="text-2xl font-mono">
                {photo ? photo.name : "Upload Product Image:"}
              </label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="flex p-1 m-1 ml-3 bg-gray-400 text-black text-lg w-60 font-sans cursor-pointer shadow-xl shadow-black rounded-2xl justify-center"
                accept="image/*"
              />
            </div>

            <div className="m-5 border rounded-lg p-2">
              {photo ? (
                <div className="text-center items-center rounded-md m-auto flex justify-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="w-350%]  rounded-lg  h-[16rem]"
                  />
                </div>
              ) : (
                <>              
                  <div className="text-center items-center rounded-md m-auto flex justify-center">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="Product Photo"
                      className="w-350%]  rounded-lg  h-[16rem]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <label className="text-2xl font-mono">Price:</label>
          <input
            type="text"
            className="m-2 rounded-lg p-2"
            style={{ border: "2px solid black" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
          <label className="text-2xl font-mono">Quantity:</label>
          <input
            type="text"
            className="m-2 rounded-lg p-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ border: "2px solid black" }}
            placeholder="Enter Quantity"
          />
          <label className="text-2xl font-mono">Select Shipping:</label>
          <div className="p-2 m-3 flex justify-center">
            <select
              className="p-2 shadow-lg cursor-pointer shadow-black rounded-lg"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="Select Quantity">Select Quantity</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <button
            onClick={handleUpdate}
            className="m-3 bg-gray-700 font-mono hover:bg-gray-500 text-white font-bold p-2 rounded-lg shadow-3xl cursor-pointer"
          >
            Update Product
          </button>
          <button
            onClick={handleDelete}
            className="m-3 bg-red-600 font-mono hover:bg-gray-500 text-white font-bold p-2 rounded-lg shadow-3xl cursor-pointer"
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProducts;
*/

import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProducts = () => {
  const params = useParams();
  const slug = params.slug;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    getSlugData();
  }, []);
  const getSlugData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setId(data.product._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? 1 : 0);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("price", price);
      photo && formData.append("photo", photo);
      formData.append("shipping", shipping);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      if (data.error) {
        toast.error("Error While Updation");
      } else {
        toast.success("Successfully Updated");
        navigate("/admin-products");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`,{
          headers:{
            "auth-token":localStorage.getItem("auth-token")
          }
        }
      );
      if (data.success) {
        toast.success("Successfully Deleted");
        navigate("/admin-products");
      } else {
        toast.error("Deletion Failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <AdminSideBar />
      <div>
        <h1 className="text-4xl text-black font-mono text-center">
          Update Product
        </h1>
        <div className="flex flex-col justify-center text-center items-center m-3">
          <label className="text-2xl font-mono">Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="m-2 rounded-lg p-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{ border: "2px solid black" }}
          />
          <label className="text-2xl font-mono">Description:</label>
          <textarea
            className="m-2 p-3 rounded-lg"
            placeholder="Enter Description"
            rows={5}
            cols={30}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{ border: "2px solid black" }}
          ></textarea>

          <label className="text-2xl font-mono">Category</label>
          <div className="p-2 m-3 flex justify-center">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="p-2 shadow-lg cursor-pointer shadow-black rounded-lg"
            >
              <option value="select category">Select Category</option>
              {categories.map((c) => (
                <>
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="flex flex-col m-2">
            <div className="flex flex-col">
              <label className="text-2xl font-mono">
                {photo ? photo.name : "Upload Photo"}
              </label>
              <input
                type="file"
                className="flex p-1 m-1 ml-3 bg-gray-400 text-black text-lg w-60 font-sans cursor-pointer shadow-xl shadow-black rounded-2xl justify-center"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                }}
                accept="image/*"
              />
            </div>

            <div className="m-5 border rounded-lg p-2">
              <div className="text-center items-center rounded-md m-auto flex justify-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="w-350%]  rounded-lg  h-[16rem]"
                  />
                ) : (
                  <>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="Product Photo"
                      className="w-350%]  rounded-lg  h-[16rem]"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <label className="text-2xl font-mono">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="m-2 rounded-lg p-2"
            style={{ border: "2px solid black" }}
            placeholder="Enter Price"
          />
          <label className="text-2xl font-mono">Quantity:</label>
          <input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="text"
            className="m-2 rounded-lg p-2"
            style={{ border: "2px solid black" }}
            placeholder="Enter Quantity"
          />
          <label className="text-2xl font-mono">Select Shipping:</label>
          <div className="p-2 m-3 flex justify-center">
            <select
              value={shipping}
              onChange={(e) => {
                setShipping(e.target.value);
              }}
              className="p-2 shadow-lg cursor-pointer shadow-black rounded-lg"
            >
              <option value="Select Quantity">Select Quantity</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <button
            onClick={handleUpdate}
            className="m-3 bg-gray-700 font-mono hover:bg-gray-500 text-white font-bold p-2 rounded-lg shadow-3xl cursor-pointer"
          >
            Update Product
          </button>
          <button
            onClick={handleDelete}
            className="m-3 bg-red-600 font-mono hover:bg-gray-500 text-white font-bold p-2 rounded-lg shadow-3xl cursor-pointer"
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProducts;
