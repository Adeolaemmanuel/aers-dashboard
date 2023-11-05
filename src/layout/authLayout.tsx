import React from "react";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="w-full h-screen">{children}</div>;
};
export default AuthLayout;
