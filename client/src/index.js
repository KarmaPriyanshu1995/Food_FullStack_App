import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom' here
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"
const root = document.getElementById("root"); // Remove ReactDOM.createRef, and directly select the root element

ReactDOM.render(
    <React.StrictMode>
       <Router>
       <App />
       </Router>
    </React.StrictMode>,
    root // Specify the root element where you want to render the app
);
