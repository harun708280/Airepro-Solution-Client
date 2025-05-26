import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";




function MainApp() {
  return (
    <StrictMode>
      
      <RouterProvider router={router} />
      
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<MainApp />);
