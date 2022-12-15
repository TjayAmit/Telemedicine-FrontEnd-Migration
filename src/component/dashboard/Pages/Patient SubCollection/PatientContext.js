import { useContext } from "react";
import PatientProvider from "./PatientProvider";

const usePatient = () => {
  return useContext(PatientProvider);
};
  
export default usePatient;
