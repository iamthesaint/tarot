import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "./auth"; // Adjust the path to your actual auth module

const ProtectedRoute: React.FC = ({ children }) => {
  const isLoggedIn = auth.loggedIn();
  console.log(isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
