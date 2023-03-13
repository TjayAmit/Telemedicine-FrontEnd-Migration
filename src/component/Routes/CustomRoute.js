import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Login from '../authentication/Login.js';
import Register from '../authentication/Register';
import PageNotFound from '../404/PageNotFound.js';
import ProtectedRoute from './protectedroute.js';
import Credits from '../credits/credits.js';
import AdminAuthentication from '../authentication/Admin_Authentication.js';
// import ProtectedAuthRoute from "./protectedAuthRoute.js";
import Home from '../dashboard/Home.js';
import useAuth from '../context/AuthContext.js';
import MyAccount from '../dashboard/Pages/MyAccount.js';
import { PatientForm, CaseForm, CaseProvider } from '../dashboard/Packages.js';
import RouteData from '../Routes/RouteData';
import Consult from '../dashboard/Pages/Consult.js';
import { PatientProvider } from '../dashboard/Pages/Patient SubCollection/PatientProvider.js';
import Recovery from '../dashboard/Pages/Recovery.js';
import Loader from '../Loader';
import ProtectedAuthRoute from './protectedAuthRoute.js';
import Maintainance from '../dashboard/Pages/Maintainance.js';

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
      <Route path="/" element={<Maintainance />} />
      {/* <Route element={<RedirectAuth user={user} />}>
        <Route path="/" element={<Layout />}></Route>
      </Route> */}
      {/* Secure Routes */}
      {/* </Route> */}
      {/* <Route element={<ProtectedRoute user={user} />}>
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
      </Route> */}

      {/* public authentication Routes */}
      {/* <Route element={<ProtectedAuthRoute user={user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminAuthentication />} />
      </Route> */}

      {/* catch all */}
      {/* <Route path="*" element={<PageNotFound />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/recovery" element={<Recovery />} /> */}
    </Routes>
  );
};

export default CustomRoute;
