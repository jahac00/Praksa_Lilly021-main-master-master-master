import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {Store} from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </React.StrictMode>
);
