// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/Auth";
// import UserSideBar from "./UserSideBar";

// const UserOrders = () => {
//   const { auth } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   // const getOrders = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       "http://localhost:8080/api/v1/product/orders"
//   //     );
//   //     // Assuming response.data contains an array of orders
//   //     setOrders(response.data.orders.products);
//   //   } catch (error) {
//   //     toast.error(error.message || "An error occurred while fetching orders");
//   //   }
//   // };

//   const getOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/v1/product/orders", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("auth-token"),
//         },
//       });
//       const data = await res.json();

//       if (data.success) {
//         // Map over orders and add a products array to each order
//         const updatedOrders = data.orders.map(order => ({
//           ...order,
//           products: order.products.map(product => ({
//             ...product
//           }))
//         }));
//         setOrders(updatedOrders);
//       } else {
//         throw new Error("Failed to fetch orders");
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred while fetching orders");
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   return (
//     <>
//       <div className="flex flex-row">
//         <div className="flex flex-col">
//           <UserSideBar />
//         </div>
//         <div className="p-3 m-2">
//           <h1 className="text-3xl font-semibold m-5 text-center">All Orders</h1>
//           {orders.length === 0 && <h1>No Orders Found</h1>}
//           {orders.map((order, index) => (
//             <div key={index} className="border shadow">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Buyer</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">Payment</th>
//                     <th scope="col">Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{index + 1}</td>
//                     <td>{order?.status}</td>
//                     <td>{order?.buyer?.name}</td>
//                     {/* Assuming moment is imported */}
//                     <td>{moment(order?.createdAt).fromNow()}</td>
//                     <td>{order?.payment?.success ? "Success" : "Failed"}</td>
//                     <td>{order?.products.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div>
//                 {order?.products?.map((product) => (
//                   <div key={product._id} className="row mb-2 p-3 card flex-row">
//                     <div className="col-md-4">
//                       <img
//                         className="w-full"
//                         src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
//                         alt={product.name}
//                         width={"100px"}
//                         height={"100px"}
//                       />
//                     </div>
//                     <div className="col-md-8">
//                       <div className="px-6 py-4 m-5 ">
//                         <div className="font-bold text-xl mb-2">
//                           {product.name}
//                         </div>
//                         <p className="text-gray-700 text-base mb-2">
//                           {product.description.substring(0, 30)}...
//                         </p>
//                         <p className="text-green-600 text-xl mb-2 font-bold">
//                           ${product.price}
//                         </p>
//                         <p className="text-gray-700 text-base mb-2">
//                           {product.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserOrders;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserSideBar from "./UserSideBar";
import moment from "moment"; // Import moment library

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/product/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();

      // If the response is successful, update the structure of orders
      const updatedOrders = data.orders.map((order) => ({
        ...order,
        // Map over products array of each order and update the structure if necessary
        products: order.products.map((product) => ({
          ...product,
          // Add any additional modifications to product structure if needed
        })),
      }));
      // Set the updated orders state
      setOrders(updatedOrders);
    } catch (error) {
      // Catch any errors that occur during the process and display them
      console.error("Error fetching orders:", error);
      toast.error(error.message || "An error occurred while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <UserSideBar />
        </div>
        <div className="p-3 m-2">
          <h1 className="text-3xl font-semibold m-5 text-center">All Orders</h1>
          {orders.length === 0 && <h1>No Orders Found</h1>}
          <div className="border shadow">
            {/* Render order details here */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Image</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <>
                    {order.products.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <td>{productIndex + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.shipping ? "true" : "false"}</td>
                        <td>
                          <img
                            className="w-[190px] h-[200px] rounded-2xl"
                            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                          />
                        </td>
                        <td>{product?.payment?.transaction?.statusHistory.map((s)=>s.user)}</td>
                        <td>{product.buyer?.name}</td>
                        <td>{moment(product.createdAt).fromNow()}</td>
                        <td>{product.payment?.success ? "Failed" : "Success"}</td>
                        <td>{product?.payment?.transaction?.status}</td>
                      </tr>
                    ))}
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

export default UserOrders;

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/Auth";
// import UserSideBar from "./UserSideBar";
// import moment from "moment"; // Import moment library

// const UserOrders = () => {
//   const { auth } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   const getOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/v1/product/orders", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("auth-token"),
//         },
//       });
//       const data = await res.json();

//       // If the response is successful, update the structure of orders
//       const updatedOrders = data.orders.map((order) => ({
//         ...order,
//         // Map over products array of each order and update the structure if necessary
//         products: order.products.map((product) => ({
//           ...product,
//           // Add any additional modifications to product structure if needed
//         })),
//       }));
//       // Set the updated orders state
//       setOrders(updatedOrders);
//     } catch (error) {
//       // Catch any errors that occur during the process and display them
//       console.error("Error fetching orders:", error);
//       toast.error(error.message || "An error occurred while fetching orders");
//     }
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-row">
//         <div className="flex flex-col">
//           <UserSideBar />
//         </div>
//         <div className="p-3 m-2">
//           <h1 className="text-3xl font-semibold m-5 text-center">All Orders</h1>
//           {orders.length === 0 && <h1>No Orders Found</h1>}
//           <div className="border shadow">
//             {/* Render order details here */}
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Product Name</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Category</th>
//                   <th scope="col">Shipping</th>
//                   <th scope="col">Image</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Buyer</th>
//                   <th scope="col">Date</th>
//                   <th scope="col">Payment</th>
//                   <th scope="col">Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, index) => (
//                   <>
//                     {order.products.map((product, productIndex) => (
//                       <tr key={productIndex}>
//                         <td>{productIndex + 1}</td>
//                         <td>{product.name}</td>
//                         <td>{product.price}</td>
//                         <td>{product.category}</td>
//                         <td>{product.shipping ? "true" : "false"}</td>
//                         <td>
//                           <img
//                             className="w-[190px] h-[200px] rounded-2xl"
//                             src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
//                           />
//                         </td>

//                         <td>{product.status}</td>
//               <td>{product.buyer?.name}</td>
//               <td>{moment(product.createdAt).fromNow()}</td>
//               <td>{product.payment?.transaction?.success ? "Success" : "Failed"}</td>
//               <td>{product.products.length}</td>
//                       </tr>
//                     ))}
//                   </>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserOrders;
