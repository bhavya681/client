import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    getAllCategories();
  }, []);
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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("shipping", shipping);
      formData.append("photo", photo);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      if(data.success){
        navigate("/admin-products");
        toast.success(data.success);
      }else{
        toast.error(data.error);
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
    Create Product
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
        <option value="">Select Category</option>
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
      {photo && (
        <div className="m-5 border rounded-lg p-2">
          <img src={URL.createObjectURL(photo)} alt="Product Photo" />
        </div>
      )}
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
      onClick={handleCreate}
      className="m-3 bg-gray-700 font-mono hover:bg-gray-500 text-white font-bold p-2 rounded-lg shadow-3xl cursor-pointer"
    >
      Create Product
    </button>
  </div>
</div>
    </>
  );
};

export default CreateProduct;


