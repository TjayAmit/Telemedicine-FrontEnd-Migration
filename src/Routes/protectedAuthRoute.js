import { Navigate, useLocation, Outlet } from "react-router-dom";
import Loader from "../Loader";

const ProtectedAuthRoute = ({ user }) => {
  const location = useLocation();

  if (!user || user.loggedIn === undefined) {
    return <Loader />;
  }

  if (user.loggedIn === true) {
    return <Navigate to="/h" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;
