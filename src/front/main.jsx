import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./store/authContext";
import AppRoutes from "./routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);