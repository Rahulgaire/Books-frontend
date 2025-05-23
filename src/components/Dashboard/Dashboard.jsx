import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./DAshNavbar";
import DashboardPage from "../../Page/DashboardPage";
import Addbooks from "./Addbooks";
import Order from "./Order"

function Dashbord() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* <Sidebar />  */}
        <main className="flex-1   min-h-screen">
          {/* Nested Routes */} 
          <Routes>

            <Route path="/" element={<DashboardPage />} />{" "}
            {/* Default dashboard page */}
            <Route path="/add" element={<Addbooks />} />
            <Route path="/order" element={<Order />} />
            {/* <Route path="/products" element={<AllProducts/>} /> */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default Dashbord;
