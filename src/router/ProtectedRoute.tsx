import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

const ProtectedRoute: FC<Props> = () => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
