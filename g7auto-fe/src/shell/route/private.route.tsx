import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/shell/redux/hooks";
import AccessDenied from "@/libs/components/access-denied";
import { AUTH_PATH } from "@/modules/auth/shell/auth.route";

interface Props { roles?: string[] }

const PrivateRoute = ({ roles }: Props) => {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to={AUTH_PATH.LOGIN} replace />;
  if (roles && roles.length > 0 && !roles.includes(user?.role ?? "")) return <AccessDenied />;

  return <Outlet />;
};

export default PrivateRoute;
