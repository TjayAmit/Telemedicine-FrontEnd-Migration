import { createContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toastvariant, toastposition } from '../Packages';
import { GetRequest, PostRequest, PutRequest } from '../../API/api';
import { Patient, Specialization, Case } from '../../API/Paths';
import { StatusHandler } from '../../Utils/StatusHandler';

const CaseContext = createContext({});

export const CaseProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [sms, SetSms] = useState(null);

  const [FK_patients_ID, setFK_patients_ID] = useState('');
  const [FK_specializations_ID, setFK_specializations_ID] = useState('');
  const [cases_Temperature, setCases_Temperature] = useState('');
  const [cases_Respiratory, setCases_Respiratory] = useState('');
  const [cases_Heart, setCases_Heart] = useState('');
  const [cases_Blood, setCases_Blood] = useState('');
  const [cases_Oxygen, setCases_Oxygen] = useState('');
  const [cases_Weight, setCases_Weight] = useState('');
  const [cases_Height, setCases_Height] = useState('');
  const [cases_CC, setCases_CC] = useState('');
  const [cases_HPI, setCases_HPI] = useState('');
  const [cases_PMH, setCases_PMH] = useState('');
  const [cases_ROS, setCases_ROS] = useState('');
  const [cases_PE, setCases_PE] = useState('');
  const [cases_WI, setCases_WI] = useState('');
  const [cases_IMD, setCases_IMD] = useState('');
  const [cases_Reason, setCases_Reason] = useState('');
  const [cases_Remarks, setCases_Remarks] = useState('');
  const [PK_cases_ID, setPK_cases_ID] = useState('');

  const [status, setStatus] = useState(true);
  const [patients, setPatients] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const initiliazedPatients = async () => {
    let msg = '';
    GetRequest({ url: `${Patient}s` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setPatients(res.data.data);
        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  const initiliazedSpecializations = async () => {
    let msg = '';
    GetRequest({ url: `${Specialization}s` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }

        setSpecializations(res.data.data);
        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  const registerCase = async e => {
    e.preventDefault();

    if (FK_patients_ID === '') {
      toast({
        title: 'Error in Saving Case.',
        description: 'Please Select a Patient.',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } else {
      let msg = '';
      let bodyFormData = new FormData();

      selectedFiles.forEach((element, key) => {
        bodyFormData.append('attachments[]', element, key);
      });

      bodyFormData.append('FK_patients_ID', FK_patients_ID);
      bodyFormData.append('FK_specializations_ID', FK_specializations_ID);
      bodyFormData.append('cases_Temperature', cases_Temperature);
      bodyFormData.append('cases_Respiratory', cases_Respiratory);
      bodyFormData.append('cases_Heart', cases_Heart);
      bodyFormData.append('cases_Blood', cases_Blood);
      bodyFormData.append('cases_Oxygen', cases_Oxygen);
      bodyFormData.append('cases_Weight', cases_Weight);
      bodyFormData.append('cases_Height', cases_Height);
      bodyFormData.append('cases_CC', cases_CC);
      bodyFormData.append('cases_HPI', cases_HPI);
      bodyFormData.append('cases_PMH', cases_PMH);
      bodyFormData.append('cases_ROS', cases_ROS);
      bodyFormData.append('cases_PE', cases_PE);
      bodyFormData.append('cases_WI', cases_WI);
      bodyFormData.append('cases_IMD', cases_IMD);
      bodyFormData.append('cases_Reason', cases_Reason);
      bodyFormData.append('cases_Remarks', cases_Remarks);
      bodyFormData.append('FK_hospital_ID', 1);
      bodyFormData.append('FK_doctors_ID', 1);

      PostRequest({ url: Case }, bodyFormData)
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response.', { cause: res });
          }
          toast({
            title: 'Saved Successfully!',
            description: 'New Pending Case Saved',
            position: toastposition,
            variant: toastvariant,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });

          navigate('../../case');
        })
        .catch(err => {
          msg = StatusHandler(err);
          toast({
            title: 'Something went wrong!',
            description: '',
            position: toastposition,
            variant: toastvariant,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return;
        });
    }
  };

  const updateCase = async e => {
    e.preventDefault();
    let msg = '';
    let bodyFormData = new FormData();
    bodyFormData.append('PK_cases_ID', PK_cases_ID);
    bodyFormData.append('FK_patients_ID', FK_patients_ID);
    bodyFormData.append('FK_specializations_ID', FK_specializations_ID);
    bodyFormData.append('cases_Temperature', cases_Temperature);
    bodyFormData.append('cases_Respiratory', cases_Respiratory);
    bodyFormData.append('cases_Heart', cases_Heart);
    bodyFormData.append('cases_Blood', cases_Blood);
    bodyFormData.append('cases_Oxygen', cases_Oxygen);
    bodyFormData.append('cases_Weight', cases_Weight);
    bodyFormData.append('cases_Height', cases_Height);
    bodyFormData.append('cases_CC', cases_CC);
    bodyFormData.append('cases_HPI', cases_HPI);
    bodyFormData.append('cases_PMH', cases_PMH);
    bodyFormData.append('cases_ROS', cases_ROS);
    bodyFormData.append('cases_PE', cases_PE);
    bodyFormData.append('cases_WI', cases_WI);
    bodyFormData.append('cases_IMD', cases_IMD);
    bodyFormData.append('cases_Reason', cases_Reason);
    bodyFormData.append('cases_Remarks', cases_Remarks);
    bodyFormData.append('FK_hospital_ID', 1);
    bodyFormData.append('FK_doctors_ID', 1);

    PutRequest({ url: Case }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        toast({
          title: 'Updated Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        navigate('../../case');
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  useEffect(() => {
    if (status) {
      initiliazedPatients();
      initiliazedSpecializations();
      setStatus(false);
    }
  }, [status]);

  return (
    <CaseContext.Provider
      value={{
        FK_patients_ID,
        setFK_patients_ID,
        FK_specializations_ID,
        setFK_specializations_ID,
        cases_Temperature,
        setCases_Temperature,
        cases_Respiratory,
        setCases_Respiratory,
        cases_Heart,
        setCases_Heart,
        cases_Blood,
        setCases_Blood,
        cases_Oxygen,
        setCases_Oxygen,
        cases_Weight,
        setCases_Weight,
        cases_Height,
        setCases_Height,
        cases_CC,
        setCases_CC,
        cases_HPI,
        setCases_HPI,
        cases_PMH,
        setCases_PMH,
        cases_ROS,
        setCases_ROS,
        cases_PE,
        setCases_PE,
        cases_WI,
        setCases_WI,
        cases_IMD,
        setCases_IMD,
        cases_Reason,
        setCases_Reason,
        cases_Remarks,
        setCases_Remarks,
        registerCase,
        updateCase,
        patients,
        specializations,
        setPK_cases_ID,
        PK_cases_ID,
        fileLimit,
        setFileLimit,
        selectedFiles,
        setSelectedFiles,
        sms,
        SetSms,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export default CaseContext;
