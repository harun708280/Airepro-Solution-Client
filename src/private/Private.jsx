import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">Loading...</p>
      </div>
    </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to="/login" state={location.pathname}>
        {" "}
      </Navigate>
    </div>
  );
};

export default Private;
