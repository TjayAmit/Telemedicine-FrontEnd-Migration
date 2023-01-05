import Dashboard from './Pages/Dashboard';
import Doctor from './Pages/Doctor.js';
import User from './Pages/User.js';
import Patient from './Pages/Patient';
import Case from './Pages/Case.js';
import Archived from './Pages/Archived';
import Hospital from './Pages/Hospital';
import Specialization from './Pages/Specialization';
import Report from './Pages/Report';
import HistoryLogs from './Pages/HistoryLogs';
import CustomModal from './Component/CustomModal';
import TextFormController from './Component/TextFormController.js';
import CustomTablePaginate from './Component/CustomTablePaginate.js';
import LogTableData from './Pages/ComponentData/LogTableData';

import {
  CaseData,
  SpecializationData,
} from './Pages/ComponentData/CaseData.js';

import CustomLineGraph from './Component/InteralDoctorGraph/CustomLineGraph.js';
import CustomPieGraph from './Component/InteralDoctorGraph/CustomPieGraph.js';

import ExternalDoctorLineGraph from './Component/ExternalDoctorGraph/ExternalDoctorLineGraph.js';
import ExternalDoctorPieGraph from './Component/ExternalDoctorGraph/ExternalDoctorPieGraph.js';

import {
  DashboardCardStructureData,
  DashboardCardData,
} from './Pages/ComponentData/DashboardCardData.js';

import CaseTable from './Component/CustomCaseTable';

import CustomModalDelete from './Component/CustomModalDelete.js';
import CaseMainView from './Component/CaseMainView';
import PatientForm from './Pages/Patient SubCollection/PatientForm';
import { CustomViewButton } from './Component/Modal/CustomViewModal';
import {
  CustomEditButton,
  CustomDeleteButton,
} from './Component/Modal/ActionModal.js';

import { CaseProvider } from './Pages/Case SubCollection/CaseProvider';
import CaseForm from './Pages/Case SubCollection/CaseForm';
import useCase from './Pages/Case SubCollection/CaseContext';

import { CustomSelection, CustomSelectionS } from './Component/CustomSelection';

import Credits from '../credits/credits';
const TitleColor = 'gray.600';
const toastvariant = 'top-accent';
const toastposition = 'top-center';

export {
  Archived,
  Case,
  CaseData,
  CaseForm,
  CaseMainView,
  CaseTable,
  Credits,
  CustomDeleteButton,
  CustomEditButton,
  CustomLineGraph,
  CustomModal,
  CustomModalDelete,
  CustomPieGraph,
  CaseProvider,
  CustomTablePaginate,
  CustomSelection,
  CustomSelectionS,
  CustomViewButton,
  Dashboard,
  DashboardCardData,
  DashboardCardStructureData,
  Doctor,
  ExternalDoctorLineGraph,
  ExternalDoctorPieGraph,
  HistoryLogs,
  Hospital,
  LogTableData,
  Patient,
  PatientForm,
  Report,
  Specialization,
  SpecializationData,
  TextFormController,
  User,
  useCase,
  TitleColor,
  toastvariant,
  toastposition,
};
