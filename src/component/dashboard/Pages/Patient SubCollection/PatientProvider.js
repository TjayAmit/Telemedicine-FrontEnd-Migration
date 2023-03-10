import { createContext, useState } from "react";
import {
  PatientPostRequest,
  PatientPutRequest,
} from "../../../api/Patient_Request";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { toastposition, toastvariant } from "../../Packages";

const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [PK_patients_ID, setPK_patients_ID] = useState("");
  const [patients_FirstName, setPatients_FirstName] = useState("");
  const [patients_MiddleName, setPatients_MiddleName] = useState("");
  const [patients_LastName, setPatients_LastName] = useState("");
  const [patients_Contact, setPatients_Contact] = useState("");
  const [patients_Gender, setPatients_Gender] = useState("");
  const [patients_Birthday, setPatients_Birthday] = useState("");
  const [patients_CivilStatus, setPatients_CivilStatus] = useState("");
  const [patients_Religion, setPatients_Religion] = useState("Unknown");
  const [patients_BirthPlace, setPatients_BirthPlace] = useState("");
  const [patients_Street, setPatients_Street] = useState("");
  const [patients_Barangay, setPatients_Barangay] = useState("");
  const [patients_City, setPatients_City] = useState("");
  const [patients_Ethnicity, setPatients_Ethnicity] = useState("");
  const [patients_Dialect, setPatients_Dialect] = useState("");
  const [FK_doctors_ID, setFK_doctors_ID] = useState("");
  const [guardians_Name, setGuardians_Name] = useState("");
  const [guardians_Relationship, setGuardians_Relationship] = useState("");
  const [guardians_ContactNo, setGuardians_ContactNo] = useState("");

  const [registerStatus, setRegisterStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const registerPatient = async (e) => {
    e.preventDefault();
    try {
      setRegisterStatus(true);
      let bodyFormData = new FormData();
      bodyFormData.append("patients_FirstName", patients_FirstName);
      bodyFormData.append("patients_MiddleName", patients_MiddleName);
      bodyFormData.append("patients_LastName", patients_LastName);
      bodyFormData.append("patients_Contact", patients_Contact);
      bodyFormData.append("patients_Gender", patients_Gender);
      bodyFormData.append("patients_Birthday", patients_Birthday);
      bodyFormData.append("patients_CivilStatus", patients_CivilStatus);
      bodyFormData.append("patients_Religion", patients_Religion);
      bodyFormData.append("patients_BirthPlace", patients_BirthPlace);
      bodyFormData.append("patients_Street", patients_Street);
      bodyFormData.append("patients_Barangay", patients_Barangay);
      bodyFormData.append("patients_City", patients_City);
      bodyFormData.append("patients_Ethnicity", patients_Ethnicity);
      bodyFormData.append("patients_Dialect", patients_Dialect);
      bodyFormData.append("FK_doctors_ID", null);
      bodyFormData.append("guardians_Name", guardians_Name);
      bodyFormData.append("guardians_Relationship", guardians_Relationship);
      bodyFormData.append("guardians_ContactNo", guardians_ContactNo);

      const response = await PatientPostRequest(bodyFormData);
      if (response.status === 200) {
        setRegisterStatus(false);
        navigate("/h/patients");
        toast({
          title: "Added Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      }
      setRegisterStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      setUpdateStatus(true);
      let bodyFormData = new FormData();
      bodyFormData.append("PK_patients_ID", PK_patients_ID);
      bodyFormData.append("patients_FirstName", patients_FirstName);
      bodyFormData.append("patients_MiddleName", patients_MiddleName);
      bodyFormData.append("patients_LastName", patients_LastName);
      bodyFormData.append("patients_Contact", patients_Contact);
      bodyFormData.append("patients_Gender", patients_Gender);
      bodyFormData.append("patients_Birthday", patients_Birthday);
      bodyFormData.append("patients_CivilStatus", patients_CivilStatus);
      bodyFormData.append("patients_Religion", patients_Religion);
      bodyFormData.append("patients_BirthPlace", patients_BirthPlace);
      bodyFormData.append("patients_Street", patients_Street);
      bodyFormData.append("patients_Barangay", patients_Barangay);
      bodyFormData.append("patients_City", patients_City);
      bodyFormData.append("patients_Ethnicity", patients_Ethnicity);
      bodyFormData.append("patients_Dialect", patients_Dialect);
      bodyFormData.append("FK_doctors_ID", null);

      const res = await PatientPutRequest(bodyFormData);

      if (res.status === 200) {
        setUpdateStatus(false);
        navigate("/h/patients");
        toast({
          title: "Updated Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      }
      setUpdateStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        PK_patients_ID,
        setPK_patients_ID,
        patients_FirstName,
        setPatients_FirstName,
        patients_MiddleName,
        setPatients_MiddleName,
        patients_LastName,
        setPatients_LastName,
        patients_Contact,
        setPatients_Contact,
        patients_Gender,
        setPatients_Gender,
        patients_Birthday,
        setPatients_Birthday,
        patients_CivilStatus,
        setPatients_CivilStatus,
        patients_Religion,
        setPatients_Religion,
        patients_BirthPlace,
        setPatients_BirthPlace,
        patients_Street,
        setPatients_Street,
        patients_Barangay,
        setPatients_Barangay,
        patients_City,
        setPatients_City,
        patients_Ethnicity,
        setPatients_Ethnicity,
        patients_Dialect,
        setPatients_Dialect,
        FK_doctors_ID,
        setFK_doctors_ID,
        guardians_Name,
        setGuardians_Name,
        guardians_Relationship,
        setGuardians_Relationship,
        guardians_ContactNo,
        setGuardians_ContactNo,
        registerPatient,
        updatePatient,
        registerStatus,
        updateStatus,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
