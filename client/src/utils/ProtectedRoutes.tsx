import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import auth from "./auth"; // Adjust the path to your actual auth module

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = auth.loggedIn();
  console.log(isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
