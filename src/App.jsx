import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import E404 from "./pages/E404";
import Cart from "./pages/Cart";
import Help from "./pages/Help";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashBoard from "./pages/user/UserDashBoard";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProducts from "./pages/admin/CreateProducts";
import { AuthContext } from "./context/Auth";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserOrders from "./pages/user/UserOrders";
import UserProfile from "./pages/user/UserProfile";
import UpdateCat from "./pages/admin/UpdateCat";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import UpdateProducts from "./pages/admin/UpdateProducts";
import Srch from "./components/Srch";
import ProductDeatils from "./pages/ProductDeatils";


const App = () => {
  
  const isAdmin = localStorage.getItem("auth");
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<Category />} />

          {isAdmin === "Admin" ? (
            <>
              <Route
                path="/admin/dashBoard"
                element={
                  <ProtectedRoute>
                    <AdminDashBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-category"
                element={
                  <ProtectedRoute>
                    <CreateCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-products"
                element={
                  <ProtectedRoute>
                    <CreateProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-products"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
                <Route
                path="/dashboard/admin/product/:slug"
                element={
                  <ProtectedRoute>
                    <UpdateProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-users"
                element={
                  <ProtectedRoute>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/update-category/:slug"}
                element={
                  <ProtectedRoute>
                    <UpdateCat />
                  </ProtectedRoute>
                }
              />
            </>
          ) : isAdmin === "User" ? (
            <>
              <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
            </>
          ) : (
            <></>
          )}
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/details/:slug" element={<ProductDeatils />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Srch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<E404 />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
  );
};

export default App;

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};
