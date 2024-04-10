import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/Auth";
import QRCode from "qrcode.react";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [clienttoken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const getTotalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total = total + item.price;
    });

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };



  const removeItemFromCart = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    if (index > 1) {
      myCart.qty - 1;
    }
    myCart.splice(index, 1);
    setCart(myCart);
    // localStorage.setItem("cart", JSON.stringify(myCart));
    localStorage.removeItem("cart", JSON.stringify(myCart));
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // const handlePayment = async () => {
  //   setLoading(true);
  //   const { nonce } = await instance.requestPaymentMethod();
  //   const { data } = await axios.post(
  //     "http://localhost:8080/api/v1/product/braintree/payment",
  //     {
  //       nonce,
  //       cart,
  //     }
  //   );
  //   setLoading(false);
  //   localStorage.removeItem("cart");
  //   setCart([]);
  //   navigate("/user-orders");
  //   toast.success("Payment Completed Successfully");
  // };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/user-orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while processing your payment.");
      }
    }
  };

  return (
    <>
      {" "}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {cart.length > 0 ? (
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${localStorage.getItem("user")}`}
              </h1>
            ) : null}

            <h4 className="text-center p-5">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-9">
            {cart?.map((product) => (
              <>
                <div key={product._id} className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4">
                    <img
                      className="w-full"
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="px-6 py-4 m-5 ">
                      <div className="font-bold text-xl mb-2">
                        {product.name}
                      </div>
                      <p className="text-gray-700 text-base mb-2">
                        {product.description.substring(0, 30)}...
                      </p>
                      <p className="text-green-600 text-xl mb-2 font-bold">
                        ${product.price}
                      </p>

                      <button
                        className="btn btn-danger ms-1"
                        onClick={() => {
                          removeItemFromCart(product._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <div className="mt-4 mb-3 text-center items-center flex flex-col justify-center">
              <h4 className="mb-2 block">Scan to Checkout</h4>
              <QRCode
                className="text-center items-center flex justify-center"
                value="Your QR Code Data Here"
                size={150}
              />
            </div>
            <div className="bg-light p-3 rounded">
              <h4 className="text-[1.5rem] mb-3">Cart Summary</h4>
              <hr />
              <div className="mb-3">
                <p className="text-muted">Total:</p>
                <h4>{getTotalPrice()}</h4>
              </div>
            </div>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/user-profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          navigate("/login", { state: "/cart" });
                        }}
                      >
                        Please Login To Check Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          navigate("/user-profile");
                        }}
                      >
                        Update Address
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
              {!clienttoken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clienttoken,
                      paypal: {
                        flow: "checkout",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
