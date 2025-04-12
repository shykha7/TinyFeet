import React, { useState } from "react";
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
import ProtectedRoute from "./Components/ProtectedRoute";
import { createContext } from "react";



export const ContextCreate = createContext()

function App() {
const [conCart,setConcat] = useState(0)
const ProviderValue = {conCart,setConcat}
  return (
    <>
    <ContextCreate.Provider value={ProviderValue}>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/products" element={<ProductCard/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>   
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/navigate/:id" element={<Navigating/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/payment/:id" element={<Payment/>}></Route>
      <Route path="/orderhistory" element={<Orderhistory/>}></Route>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute> }></Route>
      <Route path="/admin/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
      <Route path="/admin/users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>   
     
    </Routes>
    </ContextCreate.Provider>
   
    <ToastContainer/>
    </>
  );
}

export default App;
