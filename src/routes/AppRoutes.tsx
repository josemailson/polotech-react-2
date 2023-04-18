import { createBrowserRouter } from "react-router-dom";
import ListView from "screens/ListView";
import Login from "screens/Login";
import Register from "screens/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <ListView />,
    },
  ]);