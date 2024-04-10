/*

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params?.slug) getCategoriesProducts();
  }, [params?.slug]);

  const getCategoriesProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProducts(data?.products);
      console.log(data.products);
      setCategory(data?.category);
    } catch (error) {
      toast.error(error);
    }
  };

  const navigate = useNavigate();

  const handleViewDetails = (slug) => {
    navigate(`/product/details/${slug}`);
  };

  return (
    <>
      <div className="m-5 p-3 flex flex-col items-center h-[40rem]">
        <h1 className="text-2xl font-bold mb-4">Category: {category.name}</h1>

        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Products Found: {products.length}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer shadow-gray-500"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-full h-56 object-contain object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-mono">
                    ${product.price}
                  </span>
                  <button className="text-white font-bold bg-green-600 font-mono px-4 py-2 rounded-lg shadow-lg">
                    Add To Cart
                  </button>
                </div>
                <div className="flex my-3 mx-6 text-center ">
                  <button
                    onClick={() => {
                      handleViewDetails(product.slug);
                    }}
                    className="text-black font-semibold bg-yellow-400 font-mono px-4 py-2 rounded-lg shadow-lg"
                  >
                    View Deatils
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;


*/

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/Cart";

const Category = () => {
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  const params = useParams();
  const { slug } = params;

  const [products, setProdcuts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductswithCategory = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/product-category/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProdcuts(data.products);
      setCategory(data.category);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProductswithCategory();
  });

  const getProductDetails = (slug) => {
    navigate(`/product/details/${slug}`);
  };

  return (
    <>
      <div className="m-5 p-3 flex flex-col items-center h-[40rem]">
        <h1 className="text-2xl font-bold mb-4">Category: {category.name}</h1>

        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Products Found: {products.length}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
          {products?.map((product) => (
            <div className="bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer shadow-gray-500">
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-full h-56 object-contain object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-mono">
                    {product.description}
                  </span>
                </div>

                <div className="flex justify-center text-center items-center">
                  <button
                    className="text-white font-bold bg-green-600 font-mono hover:bg-green-800 px-4 py-2 rounded-lg shadow-lg"
                    onClick={() => {
                      const updatedProduct = [...cart, product];
                      setCart(updatedProduct);
                      localStorage.setItem("cart", updatedProduct);
                      toast.success("Item Successfully Added To Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>

                <div className="flex justify-center my-3 mx-6 items-center text-center ">
                  <button
                    className="text-black font-semibold bg-yellow-400 font-mono px-4 py-` hover:bg-yellow-700 rounded-lg p-2 shadow-lg"
                    onClick={() => {
                      getProductDetails(product.slug);
                    }}
                  >
                    View Deatils
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
