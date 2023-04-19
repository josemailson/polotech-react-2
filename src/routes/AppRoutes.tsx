import { createBrowserRouter } from "react-router-dom";
import ListView from "screens/ListView";
import Login from "screens/Login";
import Register from "screens/Register";
import AuthRoute from "./AuthRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthRoute><ListView /></AuthRoute>,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);