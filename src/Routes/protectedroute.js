import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../Pages/Loader';

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user === null) {
    return <Loader />;
  }

  if (user !== null && user.loggedIn === true) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
