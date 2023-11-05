import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./containers/auth/login";
import Layout from "./layout/layout";
import DashBoard from "./containers/app/dashboard";
import Questions from "./containers/app/questions";
import Users from "./containers/app/users";
import System from "./containers/app/system";
import Answers from "./containers/app/answers";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/questions",
          element: <Questions />,
        },
        {
          path: "/system",
          element: <System />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/answers",
          element: <Answers />,
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={routes} />
    </React.Fragment>
  );
}

export default App;
