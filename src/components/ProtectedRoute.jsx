import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  // Redirect to login if no token is found
  console.log(user)
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default ProtectedRoute;