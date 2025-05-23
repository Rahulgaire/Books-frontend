import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Page/Home";
import Shop from "./Page/Shop";
import About from "./Page/About";
import Contact from "./Page/Contact";
import Footer from "./components/Footer";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./Page/Cart";
import { Toaster } from "react-hot-toast";
// Custom wrapper to use useLocation inside BrowserRouter
const AppRoutes = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");
    const user = JSON.parse(localStorage.getItem("User"));

  return (
    <>
      {!isDashboard && !isAuthPage && <Navbar />}
       <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route path="/" element={<Home />} />
        {/* <Route path="/services" element={<ProtectedRoute element={<Shop />} />} /> */}
        <Route path="/services" element={user?.role === 'admin'|| user?.role ==='user'   ?  <Shop />:<Navigate to='/login' replace/> } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/cart" element={user?.role === 'admin'|| user?.role ==='user'   ?  <Cart />:<Navigate to='/login' replace/>}/>
        <Route path="/dashboard/*" element={ user?.role !== 'admin' ? <Navigate to='/login' replace/> : <Dashboard/>} />
      </Routes>
      {!isDashboard && !isAuthPage && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
export default App;