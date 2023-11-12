import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM from 'react-dom' here
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";

import {createStore} from "redux"
import {Provider} from "react-redux"
import myReducers from "./context/reducers";
const root = document.getElementById("root"); // Remove ReactDOM.createRef, and directly select the root element
const myStore = createStore(myReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <Provider store={myStore}>
        <App />
        </Provider>
       
      </AnimatePresence>
    </Router>
  </React.StrictMode>,
  root // Specify the root element where you want to render the app
);
