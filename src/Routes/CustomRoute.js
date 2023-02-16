import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Login from '../Pages/Login.js';
import Register from '../Pages/Register';
import PageNotFound from '../404/PageNotFound.js';
import ProtectedRoute from './protectedroute.js';
import Credits from '../Pages/credit/credits.js';
import AdminAuthentication from '../authentication/Admin_Authentication.js';
import Home from '../Pages/Home.js';
import useAuth from '../context/AuthContext.js';
import MyAccount from '../Pages/MyAccount.js';
import { PatientForm, CaseForm, CaseProvider } from '../Pages/Packages.js';
import RouteData from '../Routes/RouteData';
import Consult from '../Pages/Consult.js';
import { PatientProvider } from '../Pages/Patient SubCollection/PatientProvider.js';
import Recovery from '../Pages/Recovery.js';
import Loader from '../Loader';
import ProtectedAuthRoute from './protectedAuthRoute.js';

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

const RedirectAuth = ({ user }) => {
  const location = useLocation();

  if (!user || user.loggedIn === undefined) {
    return <Loader />;
  }

  if (user.loggedIn === true) {
    return <Navigate to="/h" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

const CustomRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<RedirectAuth user={user} />}>
        <Route path="/" element={<Layout />}></Route>
      </Route>
      {/* Secure Routes */}
      {/* </Route> */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route
          path="/h/*"
          element={
            <Home>
              <Routes>
                {RouteData.path.map(data => {
                  return (
                    <Route
                      key={data.index}
                      path={data.href}
                      element={data.element}
                    />
                  );
                })}
                <Route path="/case/case-data" element={<Consult />} />
                <Route
                  path="/case/form"
                  element={
                    <CaseProvider>
                      <CaseForm />
                    </CaseProvider>
                  }
                />
                <Route
                  path="/patients/form"
                  element={
                    <PatientProvider>
                      <PatientForm />
                    </PatientProvider>
                  }
                />
                <Route path="/MyAccount" element={<MyAccount />} />
              </Routes>
            </Home>
          }
        />
      </Route>

      {/* public authentication Routes */}
      <Route element={<ProtectedAuthRoute user={user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminAuthentication />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/recovery" element={<Recovery />} />
    </Routes>
  );
};

export default CustomRoute;
