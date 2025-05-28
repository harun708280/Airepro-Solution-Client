import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext.jsx";






function MainApp() {
  return (
    <StrictMode>
       <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<MainApp />);
