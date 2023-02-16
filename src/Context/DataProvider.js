import { createContext, useState, useEffect } from 'react';
import { GetRequest, PostRequest } from '../API/api';
import { Auth } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler';
import { Sanctum } from '../API/Paths';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [authException, setAuthException] = useState('Error');
  const [user, setUser] = useState(null);
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

  const getChartData = async () => {
    let msg = '';
    Get({ url: '/api/getCaseData' })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setChartDat(res.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  const login = async () => {
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('password', password);

    PostRequest({ url: `${Auth}/signin` }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const json = res.data.data;
        sessionStorage.setItem('token', json['token']);
        setUser(json);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    return msg;
  };

  const signin = async () => {
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('password', password);

    Post({ url: `${Auth}/login` }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const json = res.data.data;

        setUser(json);
        sessionStorage.setItem('token', json['token']);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    return msg;
  };

  const register = async () => {
    let msg = '';
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

    PostRequest({ url: `${Auth}/signup` }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
    return msg;
  };

  const registerAdminDoctor = async () => {
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('profile', url);
    bodyFormData.append('profile_FirstName', doctors_FirstName);
    bodyFormData.append('profile_LastName', doctors_LastName);
    bodyFormData.append('FK_specializations_ID', FK_specializations_ID);

    PostRequest({ url: 'api/signup1' }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    return msg;
  };

  const registerStaff = async () => {
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('profile', url);
    bodyFormData.append('profile_FirstName', doctors_FirstName);
    bodyFormData.append('profile_LastName', doctors_LastName);

    PostRequest({ url: 'api/signup2' }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
    return msg;
  };

  const requestSanctumCSRF = async () => {
    GetRequest({ url: Sanctum })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.');
        }

        console.log('success.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    requestSanctumCSRF();
    if (fetch) {
      setFetch(false);
      // getHospitals();
      // getspecializations();
    }
  }, [fetch]);

  const resetState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setVPassword('');
    setDoctors_FirstName('');
    setDoctors_LastName('');
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

    if (user !== null && user.loggedIn === true) {
      handleFetchCase();
    }
  }, [fetchCase, user]);

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
        getChartData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
