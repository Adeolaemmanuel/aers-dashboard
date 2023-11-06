import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserStorage from "../utils/storage/user";
import AppLayout from "./appLayout";
import AuthLayout from "./authLayout";
import { ToastContainer } from "react-toastify";
import useState from "../utils/state/state";

const Layout: React.FC<LayoutProps> = ({}) => {
  const navigate = useNavigate();
  const { auth } = useState();

  React.useLayoutEffect(() => {
    if (auth) navigate("/dashboard");
    if (!auth) navigate("/");
  }, [auth]);

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
    </React.Fragment>
  );
};
export default Layout;
