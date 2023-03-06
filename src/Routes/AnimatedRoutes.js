import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import PageNotFound from '../404/PageNotFound.js';
import Credits from '../Pages/credits/credits.js';
import AdminAuthentication from '../Pages/Admin_Authentication.js';
import Layout from '../Pages/Layout.js';
import useAuth from '../Hooks/AuthContext.js';
import MyAccount from '../Pages/MyAccount.js';
import PatientForm from '../Pages/Patient SubCollection/PatientForm';
import CaseForm from '../Pages/Case SubCollection/CaseForm';
import CaseProvider from '../Pages/Case SubCollection/CaseProvider';
import RouteData from './RouteData';
import Consult from '../Pages/Consult.js';
import { PatientProvider } from '../Pages/Patient SubCollection/PatientProvider.js';
import Recovery from '../Pages/Recovery.js';
import Loader from '../Pages/Loader';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { lazy, Suspense, useState, useEffect } from 'react';
import { GetRequest } from '../API/api.js';
import { User } from '../API/Paths.js';

const LoginPage = lazy(() => import('../Pages/Login'));
const RegisterPage = lazy(() => import('../Pages/Register'));

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user === null ? <Navigate to="/login" replace /> : <Outlet />;
};

const AnimatedRoute = () => {
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);
  const { setUser } = useAuth();

  const handleFetch = () => {
    GetRequest({ url: User })
      .then(res => {
        if (!res.data.status === 200) {
          throw new Error('Bad response', { cause: res });
        }
        setUser(res.data.data);
        navigate('/', { replace: true });
      })
      .catch(_ => {
        setUser(null);
      });
  };

  useEffect(() => {
    handleFetch();
    return () => setFetch(false);
  }, [fetch]);

  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/*"
              exact
              element={
                <>
                  <Layout>
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
                      <Route path="/MyAccount" element={<MyAccount />} />
                    </Routes>
                  </Layout>
                </>
              }
            />
            <Route path="/case-view" element={<Consult />} />
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
          </Route>

          {/* <Route path="/logins" element={<LoginDummy />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminAuthentication />} />
          {/* catch all */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/recovery" element={<Recovery />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoute;