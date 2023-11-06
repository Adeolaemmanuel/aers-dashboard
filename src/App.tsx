import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./containers/auth/login";
import Layout from "./layout/layout";
import DashBoard from "./containers/app/dashboard";
import Questions from "./containers/app/questions";
import Users from "./containers/app/users";
import System from "./containers/app/system";
import Answers from "./containers/app/answers";
import useState from "./utils/state/state";

function App() {
  const { auth } = useState();
  

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: !auth,
          path: '/',
          element: <Login />,
        },
        {
          index: auth,
          path: '/dashboard',
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
