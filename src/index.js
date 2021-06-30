import React from "react";
import ReactDOM from "react-dom";
import "./feature/index.css";
import Feature from "./feature";
import { makeServer } from "./server";

/**
 * Initialize Mirage mock server
 */
makeServer({ environment: "development" });

ReactDOM.render(
  <React.StrictMode>
    <Feature />
  </React.StrictMode>,
  document.getElementById("root")
);
