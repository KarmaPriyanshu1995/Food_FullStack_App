import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM from 'react-dom' here
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
const root = document.getElementById("root"); // Remove ReactDOM.createRef, and directly select the root element

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </Router>
  </React.StrictMode>,
  root // Specify the root element where you want to render the app
);
