import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./components/theme-provider";

function MainApp() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<MainApp />);
