import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cart";

const ProductDeatils = () => {
  const params = useParams();

  const [realtedProducts, setRelatedProducts] = useState([]);

  const [products, setProducts] = useState({});

  const getDeatiledProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProducts(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      toast.error(error);
    }
  };

  const getRelatedProducts = async (pid, cid) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setRelatedProducts(data?.products);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getDeatiledProducts();
  }, [params?.slug]);

  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <h1 className="text-center items-center font-serif mx-[50%] m-2 p-3 text-[5rem]">
        Product Details
      </h1>
      <hr />
      <div className="flex flex-col container product-details text-center items-center">
        <div className="col-md-6 cursor-pointer flex justify-center items-center text-center">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${products._id}`}
            alt={products.name}
            className=" object-contain object-center card-img-top w-80 h-[22rem] rounded-[50%] flex items-center p-3 my-15 cursor-pointer transition-all ease-out hover:animate-bounce"
            height="300"
            width="350px"
          />
        </div>
        <div className="col-md-6 product-details-info cursor-pointer">
          <hr />
          <div className="flex justify-center flex-col space-y-8 border rounded-lg p-4">
            <h1 className="text-4xl">{products.name}</h1>
            <h2 className="text-3xl">{products.description}...</h2>
            <h6 className="text-2xl font-mono text-green-800">
              Price:{" "}
              {products?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6 className="text-2xl font-mono">
              Category: {products?.category?.name}
            </h6>
            <button
              onClick={() => {
                const updatedCart = [...cart, products];
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast.success("Item Successfully Added To Cart");
              }}
              className="btn btn-secondary mt-4 text-2xl font-bold rounded-2xl shadow-2xl"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-[3rem] text-center m-3 font-mono">
        {realtedProducts?.length > 0 ? (
          <span className="text-green-700">Similar Products</span>
        ) : (
          <span className="text-red-500">No Similar Products Found</span>
        )}
      </h1>

      <>
        <div className="flex justify-center text-center items-center p-1 m-1 ">
          <div className="flex justify-center items-center space-x-5 m-1 p-1 cursor-pointer">
            {realtedProducts.map((product) => (
              <div key={product._id} className="max-w-xs">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-56 object-contain object-center"
                  />
                  <div className="p-4">
                    <h1 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h1>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-green-500 font-semibold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => {
                          const updatedProduct = [...cart, product];
                          setCart(updatedProduct);
                          localStorage.setItem("cart", updatedProduct);
                          toast.success("Item Successfully Added To Cart");
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default ProductDeatils;
