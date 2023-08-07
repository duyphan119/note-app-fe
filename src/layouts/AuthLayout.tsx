import { AuthProvider } from "@/context/AuthContext";
import { FC } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout: FC<Props> = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthLayout;
