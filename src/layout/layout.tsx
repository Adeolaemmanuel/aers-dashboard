import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserStorage from "../utils/storage/user";
import AppLayout from "./appLayout";
import AuthLayout from "./authLayout";
import { ToastContainer } from "react-toastify";

const Layout: React.FC<LayoutProps> = ({}) => {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    if (UserStorage.getIsAuth()) navigate("/dashboard");
    if (!UserStorage.getIsAuth()) navigate("/");
  }, [UserStorage.getIsAuth()]);

  return (
    <React.Fragment>
      {UserStorage.getIsAuth() && (
        <AppLayout>
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AppLayout>
      )}

      {!UserStorage.getIsAuth() && (
        <AuthLayout>
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthLayout>
      )}
    </React.Fragment>
  );
};
export default Layout;
