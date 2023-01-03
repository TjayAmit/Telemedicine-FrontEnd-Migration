import { createContext, useState, useEffect } from 'react';
import { HospitalNameGetRequest } from '../api/Hospital_Request';
import { SpecializationNameGetRequest } from '../api/Specialization_Request';
import {
  LoginRequest,
  SigninRequest,
  RegisterRequest,
  RegisterAdminRequest,
  RegisterStaffRequest,
} from '../api/Authentication_Request';
import api from '../api/api';
import { UserAllGetRequest } from '../api/User_Request';
import { CaseGetRequest } from '../api/Case_Request';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [authException, setAuthException] = useState('Error');
  const [user, setUser] = useState(null);
  ///CHART Data
  const [chartDat, setChartDat] = useState([]);



  ///CHART Data
  const [chartDat, setChartDat] = useState([]);

  const [hospitals, setHospital] = useState({});
  const [specializations, setSpecialization] = useState({});
  const [fetch, setFetch] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpassword, setVPassword] = useState('');

  //DOCTORS PROFILE
  const [doctors_FirstName, setDoctors_FirstName] = useState('');
  const [doctors_LastName, setDoctors_LastName] = useState('');
  const [FK_specializations_ID, setFK_specializations_ID] = useState({});
  const [FK_hospital_ID, setFK_hospital_ID] = useState({});
  const [isErrorFN, setIsErrorFN] = useState(false);
  const [isErrorL, setIsErrorLN] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorVP, setIsErrorVP] = useState(false);

  const [caseLength, setCaseLength] = useState([0]);

  const [cases, setCases] = useState([]);
  const [fetchCase, setFetchCase] = useState(false);

  const url =
    'https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg';

  const getHospitals = async () => {
    try {
      const res = await HospitalNameGetRequest({ params: {} });

      if (res.status === 200) {
        setHospital(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

<<<<<<< HEAD

  const getChartData = async () => {
    try {
      const res = await api.get("/api/getCaseData")
      console.log(res.data);
      if (res.status === 200) {
        setChartDat(res.data)
=======
  const getChartData = async () => {
    try {
      const res = await api.get('/api/getCaseData');
      if (res.status === 200) {
        setChartDat(res.data);
>>>>>>> main
      }
    } catch (e) {
      console.log(e);
    }
<<<<<<< HEAD
  }
=======
  };
>>>>>>> main

  const getspecializations = async () => {
    try {
      const res = await SpecializationNameGetRequest({ params: {} });

      if (res.status === 200) {
        setSpecialization(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('password', password);

      const res = await LoginRequest(bodyFormData);

      if (res.data.status === 404) {
        throw Error(res.data.error);
      }

      if (res.data.status === 401) {
        return 'warning';
      }

      if (res.data.status === 200) {
        const userProfileData = res.data.data;

        setUser(userProfileData);
        console.log(user);
        sessionStorage.setItem('token', userProfileData['token']);

        return 'success';
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };


  //////CASE DATA for dashboard
  const GetCaseData = async () => {
    try {
      const data = await api.get("api/getCaseData");
      return data;
    }
    catch (err) {
      console.log(err);
      return err.message;
    }
  }

  const signin = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('password', password);

      const res = await SigninRequest(bodyFormData);

      if (res.data.status === 404) {
        throw Error(res.data.error);
      }

      if (res.data.status === 401) {
        return 'warning';
      }

      if (res.data.status === 200) {
        const userProfileData = res.data.data;

        setUser(userProfileData);
        sessionStorage.setItem('token', userProfileData['token']);

        return 'success';
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  const register = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      bodyFormData.append('profile', url);
      bodyFormData.append('profile_FirstName', doctors_FirstName);
      bodyFormData.append('profile_LastName', doctors_LastName);
      bodyFormData.append('FK_hospital_ID', FK_hospital_ID);
      bodyFormData.append(
        'FK_specializations_ID',
        FK_hospital_ID === '1' ? FK_specializations_ID : null
      );

      let userProfileData = await RegisterRequest(bodyFormData);

      if (userProfileData.data.status === 404) {
        throw Error(userProfileData.data.error);
      }

      if (userProfileData.data.status === 200) {
        return 'success';
      }
    } catch (err) {
      return err.message;
    }
  };

  const registerAdminDoctor = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      bodyFormData.append('profile', url);
      bodyFormData.append('profile_FirstName', doctors_FirstName);
      bodyFormData.append('profile_LastName', doctors_LastName);
      bodyFormData.append('FK_specializations_ID', FK_specializations_ID);

      let userProfileData = await RegisterAdminRequest(bodyFormData);

      if (userProfileData.data.status === 404) {
        throw Error(userProfileData.data.error);
      }

      if (userProfileData.data.status === 200) {
        return 'success';
      }
    } catch (err) {
      return err.message;
    }
  };

  const registerStaff = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append('name', name);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      bodyFormData.append('profile', url);
      bodyFormData.append('profile_FirstName', doctors_FirstName);
      bodyFormData.append('profile_LastName', doctors_LastName);

      const userProfileData = await RegisterStaffRequest(bodyFormData);

      if (userProfileData.data.status === 404) {
        throw Error(userProfileData.data.error);
      }

      console.log(userProfileData);

      if (userProfileData.data.status === 200) {
        return 'success';
      }
    } catch (err) {
      return err.message;
    }
  };

  const requestSanctumCSRF = async () => {
    await api.get('sanctum/csrf-cookie');
  };

  useEffect(() => {
    requestSanctumCSRF();
    if (fetch) {
      setFetch(false);
      getHospitals();
      getspecializations();
    }
  }, [fetch]);

  const resetState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setVPassword('');
    setFK_specializations_ID('');
    setFK_hospital_ID('');
  };

  const [firstCall, setFirstCall] = useState(true);

  const checkValidation = async () => {
    try {
      if (sessionStorage.getItem('token') !== null) {
        const res = await UserAllGetRequest();
        setUser(res.data.data);
        return;
      }
      setUser({
        loggedIn: false,
      });
    } catch (e) {
      if (user === null) {
        setUser({
          loggedIn: false,
        });
      }
    }
  };

  useEffect(() => {
    if (user === null && firstCall === true) {
      setFirstCall(false);
      setTimeout(() => checkValidation(), [200]);
    }
  }, [firstCall]);

  const handleFetchCase = async () => {
    const res = await CaseGetRequest();

    if (res.data.status === 200) {
      setCases(res.data.data);
    }
  };

  useEffect(() => {
    setFetchCase(false);
    handleFetchCase();
  }, [fetchCase]);

  return (
    <DataContext.Provider
      value={{
        authException,
        setAuthException,
        email,
        setEmail,
        password,
        setPassword,
        vpassword,
        setVPassword,
        user,
        setUser,
        doctors_FirstName,
        setDoctors_FirstName,
        doctors_LastName,
        setDoctors_LastName,
        name,
        setName,
        isErrorFN,
        setIsErrorFN,
        isErrorL,
        setIsErrorLN,
        isErrorEmail,
        setIsErrorEmail,
        isErrorPassword,
        setIsErrorPassword,
        isErrorVP,
        setIsErrorVP,
        login,
        register,
        resetState,
        hospitals,
        specializations,
        FK_hospital_ID,
        setFK_hospital_ID,
        FK_specializations_ID,
        setFK_specializations_ID,
        signin,
        registerAdminDoctor,
        registerStaff,
        url,
        caseLength,
        setCaseLength,
        cases,
        setCases,
        fetchCase,
        setFetchCase,
        chartDat,
<<<<<<< HEAD
        getChartData
=======
        getChartData,
>>>>>>> main
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
