import {
  FaUsers,
  FaUserFriends,
  FaHospitalUser,
  FaRegHospital,
} from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserMd } from 'react-icons/fa';
import { BsArchive } from 'react-icons/bs';
import { GiSkills } from 'react-icons/gi';
import { TbFileReport } from 'react-icons/tb';
import { RiFileListFill } from 'react-icons/ri';

import Dashboard from '../Pages/Dashboard';
import Doctors from '../Pages/Doctor';
import Users from '../Pages/User';
import Patients from '../Pages/Patient';
import Cases from '../Pages/Case';
import Archived from '../Pages/Archived';
import Hospitals from '../Pages/Hospital';
import Specializations from '../Pages/Specialization';
import Report from '../Pages/Report';
import HistoryLogs from '../Pages/HistoryLogs';

const RouteData = {
  path: [
    {
      index: 1,
      icon: <MdSpaceDashboard />,
      href: '/',
      label: 'Dashboard',
      element: <Dashboard />,
      superadmin: true,
      admin: true,
      doctor: true,
      edoctor: true,
      staff: true,
    },
    {
      index: 2,
      icon: <FaUserMd />,
      href: '/doctors',
      label: 'Doctors',
      element: <Doctors />,
      superadmin: true,
      admin: true,
      doctor: false,
      edoctor: false,
      staff: false,
    },
    {
      index: 3,
      icon: <FaUsers />,
      href: '/users',
      label: 'Users',
      element: <Users />,
      superadmin: true,
      admin: false,
      doctor: false,
      edoctor: false,
      staff: false,
    },
    {
      index: 4,
      icon: <FaUserFriends />,
      href: '/patients',
      label: 'Patients',
      element: <Patients />,
      superadmin: false,
      admin: false,
      doctor: false,
      edoctor: true,
      staff: false,
    },
    {
      index: 5,
      icon: <FaHospitalUser />,
      href: '/case',
      label: 'Active Case',
      element: <Cases />,
      superadmin: false,
      admin: true,
      doctor: true,
      edoctor: true,
      staff: true,
    },
    {
      index: 6,
      icon: <BsArchive />,
      href: '/archived',
      label: 'Archived',
      element: <Archived />,
      superadmin: false,
      admin: true,
      doctor: true,
      edoctor: true,
      staff: true,
    },
    {
      index: 7,
      icon: <FaRegHospital />,
      href: '/hospital',
      label: 'Hospital',
      element: <Hospitals />,
      superadmin: true,
      admin: true,
      doctor: false,
      edoctor: false,
      staff: false,
    },
    {
      index: 8,
      icon: <GiSkills />,
      href: '/specialization',
      label: 'Specialization',
      element: <Specializations />,
      superadmin: true,
      admin: true,
      doctor: false,
      edoctor: false,
      staff: false,
    },
    {
      index: 9,
      icon: <TbFileReport />,
      href: '/report',
      label: 'Report',
      element: <Report />,
      superadmin: true,
      admin: false,
      doctor: false,
      edoctor: false,
      staff: false,
    },
    {
      index: 10,
      icon: <RiFileListFill />,
      href: '/history-logs',
      label: 'History Logs',
      element: <HistoryLogs />,
      superadmin: true,
      admin: false,
      doctor: false,
      edoctor: false,
      staff: false,
    },
  ],
};

export default RouteData;
