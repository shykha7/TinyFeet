import React from "react";
import { Route, Routes } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import SignUp from "./Pages/signup";
import Home from "./Pages/Home";
import ProductCard from "./Pages/Productcard";
import Login from "./Pages/Login";
import Navigating from "./Pages/Navigating";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import Orderhistory from "./Pages/Orderhistory";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Products";
import Users from "./Admin/Users";





function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/products" element={<ProductCard/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>   
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/navigate/:id" element={<Navigating/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/payment/:id" element={<Payment/>}></Route>
      <Route path="/orderhistory" element={<Orderhistory/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/admin/products" element={<Products/>}/>
      <Route path="/admin/users" element={<Users/>}/>
    
       
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
