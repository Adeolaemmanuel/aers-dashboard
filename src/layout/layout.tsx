import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserStorage from "../utils/storage/user";
import AppLayout from "./appLayout";
import AuthLayout from "./authLayout";

const Layout: React.FC<LayoutProps> = ({}) => {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    if (!UserStorage.getIsAuth()) navigate("/");
    if (UserStorage.getIsAuth()) navigate("/dashboard");
  }, [UserStorage.getIsAuth()]);

  return (
    <React.Fragment>
      {UserStorage.getIsAuth() && (
        <AppLayout>
          <Outlet />
        </AppLayout>
      )}

      {!UserStorage.getIsAuth() && (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      )}
    </React.Fragment>
  );
};
export default Layout;
