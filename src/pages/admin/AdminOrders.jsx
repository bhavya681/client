/*import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
// import moment from "moment";
import { Select } from "antd";
import AdminSideBar from "./AdminSideBar";
import toast from "react-hot-toast";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipping",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setchangeStatus] = useState("");
  const [order, setOrder] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  // const getOrders = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:8080/api/v1/product/allorders"
  //     );
  //     setOrder(data.orders);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/allorders"
      );
      setOrder(data); // Set data directly to order
    } catch (error) {
      toast.error(error);
    }
  };
  

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/orderstatus/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="row p-4">
        <div className="col-md-3">
          <AdminSideBar />
        </div>
        <div className="col-md-9">
          <h1 className="text-center text-3xl">All Orders</h1>
          {/* {order?.map((o, i) => {
            return (
              <>
                <div key={i} className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>

                        <td>
                          <Select
                            bordered={false}
                            onChange={(checked) =>
                              handleChangeStatus(o._id, checked)
                            }
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <>
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              </>
                            ))}
                          </Select>
                        </td>

                        <td>{o?.buyer?.name}</td>
                        <td>{o?.createdAt()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  {o?.products?.map((product) => (
                    <>
                      <div
                        key={product._id}
                        className="row mb-2 p-3 card flex-row"
                      >
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
                            <p className="text-gray-700 text-base mb-2">
                              {product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            );
          })} /}
  
  {order?.map((o, i) => {
  return (
    <>
      <div key={i} className="border shadow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Buyer</th>
              <th scope="col">Date</th>
              <th scope="col">Payment</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{i + 1}</td>

              <td>
                <Select
                  bordered={false}
                  onChange={(checked) =>
                    handleChangeStatus(o._id, checked)
                  }
                  defaultValue={o?.status}
                >
                  {status.map((s, i) => (
                    <Option key={i} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </td>

              <td>{o?.buyer?.name}</td>
              <td>{o?.createdAt()}</td>
              <td>{o?.payment.success ? "Success" : "Failed"}</td>
              <td>{o?.products.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        {o?.products?.map((product) => (
          <div
            key={product._id}
            className="row mb-2 p-3 card flex-row"
          >
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
                <p className="text-gray-700 text-base mb-2">
                  {product.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
})}


        </div>
      </div>
    </>
  );
};

export default AdminOrders;
*/

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import { Select } from "antd";
import AdminSideBar from "./AdminSideBar";
import toast from "react-hot-toast";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipping",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/allorders"
      );

      const fetchedOrders = data.orders;

      if (fetchedOrders && fetchedOrders.length > 0) {
        setOrders(fetchedOrders);
      } else {
        toast.error("No orders available");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message || "An error occurred while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/product/orderstatus/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="row p-4">
        <div className="col-md-3">
          <AdminSideBar />
        </div>
        <div className="col-md-9">
          <h1 className="text-center text-3xl">
            {orders.length > 0 ? "All Orders" : "No Orders"}
          </h1>

          <div className="border shadow mb-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <>
                    {order.products.map((product, index) => (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                           <Select
                              defaultValue={order?.status}
                              onChange={(e) =>
                                handleChangeStatus(product._id, e.target.value)
                              }
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select> 
                  
                          </td>
                          <td>{product?.buyer?.name ? "Tony" : "Charles"}</td>
                          <td>{product?.createdAt}</td>
                          <td>
                            {!product?.payment?.success ? "Success" : "Failed"}
                          </td>
                        </tr>
                      </>
                    ))}

                    <div className="row justify-content-center">
                      {order.products.map((item, index) => (
                        <>
                          <div key={index} className="col-md-4 mb-3">
                            <div className="card">
                              <img
                                className="card-img-top w-[300px] h-[200px] text-center items-center p-3 cursor-pointer"
                                src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                                alt={item.name}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">
                                  {item.description.substring(0, 30)}...
                                </p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    Price: ${item.price}
                                  </small>
                                </p>
                                <p className="card-text">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
