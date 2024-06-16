// import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./routes/root"; // Adjust the import path
import Cart from "./routes/cart"; // Adjust the import path
import "./index.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App; // Export the App component


ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
