import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="352717482347-8hlfvv3jolraiv5gcdsho9gu8o3f2uae.apps.googleusercontent.com">
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
