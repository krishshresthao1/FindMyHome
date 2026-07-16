import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/inter";
import "./index.css";
import { PropertyProvider } from "./context/PropertyContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PropertyProvider>
      <App />
    </PropertyProvider>
  </StrictMode>,
);
