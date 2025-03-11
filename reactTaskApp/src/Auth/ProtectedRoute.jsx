import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../Utils.jsx/utils";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users/verify-token`, {
          withCredentials: true,
        });

        if (response.data.userInfo) {
          setIsAuthenticated(true);
          setUser(response.data.userInfo);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading state while verifying authentication
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to unauthorized if the user is not a regular user
  if (!user || user.role !== "user") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if authenticated and role is "user"
  return children;
};

export default ProtectedRoute;
