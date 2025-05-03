import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/reset.css";
import "./assets/styles/utilities.css";
import "./assets/styles/variables.css";
import "./assets/styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
