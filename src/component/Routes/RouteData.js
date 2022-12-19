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

import {
  Dashboard,
  Doctor,
  User,
  Patient,
  Case,
  Archived,
  Hospital,
  Specialization,
  Report,
  HistoryLogs,
} from '../dashboard/Packages';

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
      element: <Doctor />,
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
      element: <User />,
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
      element: <Patient />,
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
      element: <Case />,
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
      element: <Hospital />,
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
      element: <Specialization />,
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
