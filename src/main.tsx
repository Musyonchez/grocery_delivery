// import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./components/Item/GroceryList"; 
import Cart from "./routes/cart"; 
import "./index.css";

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

export default App; 

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
