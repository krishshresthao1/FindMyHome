import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

import "@fontsource/inter";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";

import "./index.css";
import { PropertyProvider } from "./context/PropertyContext";
import "react-toastify/dist/ReactToastify.css";


console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
