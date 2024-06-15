import * as React from "react";
// import App from './App.tsx'
// import Cart from './Cart.tsx'
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "jotai";
import Root from "./routes/root";
import Cart from "./routes/cart"
import ErrorPage from "./error-page";
const router = createBrowserRouter([
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

const container = document.getElementById("root");
if (container!== null) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}

export default App;

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider>
//       <App />
//       <Cart />
//     </Provider>
//   </React.StrictMode>
// );

