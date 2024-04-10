import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/product/get-product",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <AdminSideBar />
      <div>
      <h1 className="text-3xl text-center flex justify-center ">All Products</h1>
        <div className="grid grid-cols-5 gap-5 space-x-5 ">
       
          {products.map((product) => (
            <>
             <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} className="m-5 no-underline" style={{textDecoration:"none"}}>
              <div className="shadow-lg p-2 w-60 rounded-lg text-center items-center flex flex-col justify-center border">
           
                <h1 className="text-2xl font-mono text-black">
                  {product.name}
                </h1>
                <img
                  className="w-40 shadow-lg m-2 h-30 rounded-3xl shadow-gray-600 cursor-pointer p-2 transition-all ease-in-out hover:animate-bounce"
                  style={{ borderRadius: "30%" }}
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                />
                <div className="m-2 p-1 space-y-2">
                  <h2 className="font-mono p-2 text-start">
                    {product.description.slice(0, 30)}...
                  </h2>
                  <h2 className="font-mono text-lg text-green-600">
                    ${product.price}
                  </h2>
                  <h2 className="text-black font-sans text-lg">
                    Qty: {product.quantity}
                  </h2>
                  <p className="shadow-white bg-gray-100 text-black font-serif transition-all ease-linear hover:cursor-pointer">
                    {product.category.name}
                  </p>
                </div>
                <button className="text-white rounded-xl shadow-xl m-2 hover:bg-gray-900 font-mono bg-gray-700 p-2">
                  Add To Cart 🛒
                </button>
                <button className="text-white rounded-xl shadow-xl m-2 hover:bg-green-800 font-mono bg-green-600 p-2">
                  View Details
                </button>

              </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
