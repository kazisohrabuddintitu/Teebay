import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Main from "./layout/Main";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AuthPorviders from "./providers/AuthPorviders";
import PrivateRoute from "./component/routes/PrivateRoute";
import MyProduct from "./component/MyProduct/MyProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/myproducts",
        element: <MyProduct></MyProduct>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthPorviders>
      <RouterProvider router={router} />
    </AuthPorviders>
  </React.StrictMode>
);
