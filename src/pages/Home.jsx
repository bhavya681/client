import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Checkbox } from "antd";
import image1 from "../assets/banner1.jpg";
import image2 from "../assets/banner2.jpg";
import image3 from "../assets/banner3.jpg";
import image4 from "../assets/banner4.jpg";
import image5 from "../assets/banner5.jpg";
import image6 from "../assets/banner6.jpg";
import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/product/product-list/${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/category/get-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getTotal = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/product/product-count",
        {
          metthod: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setTotal(data.total);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/v1/product/product-list/${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      false;
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setProducts([...products, ...data.products]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const higherToLowerPrice = () => {
    const newProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(newProducts);
  };

  const lowerToHighterPrice = () => {
    const newProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(newProducts);
  };

  const filterProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked }),
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      let filtered = all.filter((p) => p !== id);
      all = filtered;
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProducts();
  }, [checked.length]);

  const images = [image1, image2, image3, image4, image5, image6];

  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <div className="m-3">
        <div className="">
          <div>
            <div className=" rounded-lg flex">
              {/* Left side filter section */}
              <div className="mr-10 bg-[#FFFFFF] p-1">
                <div>
                  <h1 className="text-2xl font-sans text-black font-bold">
                    Get All Categories
                  </h1>
                  <br></br>
                  <div className="flex flex-col text-2xl font-semi-bold  bg-gray-400">
                    {categories.map((c) => (
                      <Checkbox
                        onClick={(e) => {
                          handleFilter(e.target.checked, c._id);
                        }}
                        key={c._id}
                        value={c._id}
                        className="text-2xl font-mono p-1 m-1 text-center shadow-2xl rounded-xl bg-gray-400 shadow-black"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                          padding: "1px",
                        }}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
                <br />
                <hr className="border"></hr>
                <br></br>
                <div>
                  <h1 className="text-2xl font-sans text-black font-bold">
                    Get Filter of Price
                  </h1>
                  <div className="flex flex-col my-4">
                    <button
                      style={{ width: "190px" }}
                      className="flex justify-center mx-2 mt-2 text-xl font-bold w-[120px] rounded-lg shadow-xl my-1 text-white hover:bg-gray-600 p-1 bg-gray-500"
                      onClick={higherToLowerPrice}
                    >
                      Higher to Lower Price
                    </button>
                    <button
                      style={{ width: "190px" }}
                      className="flex justify-center mx-2 mt-2 text-xl font-bold w-[120px] rounded-lg shadow-xl my-1 text-white hover:bg-gray-600 p-1 bg-gray-500"
                      onClick={lowerToHighterPrice}
                    >
                      Lower to Higher Price
                    </button>
                  </div>
                  <button
                    className="flex justify-center mx-2 mt-4 text-2xl w-[180px] rounded-lg shadow-xl my-2 text-white hover:bg-red-600 p-2  bg-red-500 mb-5"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              <div className="bg-black w-full h-full m-1 shadow-xl rounded-md p-4 relative my-4">
                <div className="flex overflow-x-auto justify-center">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    className="w-full custom-carousel m-2 p-2"
                  >
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="h-full rounded-md w-full"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <h1 className="text-center text-4xl text-white p-3 font-mono shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  BOGO Bonanza: Buy One, Get One Today!
                </h1>
              </div>
            </div>

            <SearchForm />

            <div className="grid grid-cols-5 gap-5 space-x-5">
              {products.map((product) => (
                <>
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
                    <button
                      onClick={() => {
                        const updatedCart = [...cart, product];
                        setCart(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        toast.success("Item Successfully Added To Cart");
                      }}
                      className="text-white rounded-xl shadow-xl m-2 hover:bg-gray-900 font-mono bg-gray-700 p-2"
                    >
                      Add To Cart 🛒
                    </button>
                    <button
                      className="text-white rounded-xl shadow-xl m-2 hover:bg-green-800 font-mono bg-green-600 p-2"
                      onClick={() => {
                        navigate(`/product/details/${product.slug}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="m-2 p-3 text-center items-center">
            {products && products.length < total && (
              <>
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <img
                      src={
                        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHVneWswZW14ZGdoaW1vbGZuZmJ0NTdoa21ndjFjcDUyc3JrOGZpbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif"
                      }
                      alt="loading"
                    />
                  ) : (
                    "Load More"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
