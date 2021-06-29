import React from "react";
import ReactDOM from "react-dom";
import "./feature/index.css";
import App from "./feature";
import { makeServer } from "./server";

makeServer({ environment: "development" });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
