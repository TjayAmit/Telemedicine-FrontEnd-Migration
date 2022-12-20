import { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Container, Text, Flex } from '@chakra-ui/react';
import { MdSpaceDashboard } from 'react-icons/md';
import DashboardCard from '../Component/DashboardCard';
import useAuth from '../../context/AuthContext';
import {
  DashboardCardStructureData,
  CustomLineGraph,
  CustomPieGraph,
  TitleColor,
  ExternalDoctorLineGraph,
  ExternalDoctorPieGraph,
} from '../Packages.js';

import { PatientGetCardRequest } from '../../api/Patient_Request';
import { HospitalGetCardRequest } from '../../api/Hospital_Request';
import { CaseGetCardRequest } from '../../api/Case_Request';
import { DoctorGetCardRequest } from '../../api/Doctor_Request';

const AdminGraphs = () => {
  ///** Dashboard display for Admin or head doctor, Internal doctor and navigator or doctor secretary */
  ///** Data will be use case with specializations */
  return (
    <Grid templateColumns={['repeat(6, 1fr)']}>
      <GridItem colSpan={['6', '6', '6', '4']} width={'100%'}>
        <CustomLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '2']} width={'100%'}>
        <CustomPieGraph />
      </GridItem>
    </Grid>
  );
};

const InternalDoctorGraphs = () => {
  ///** Dashboard display for Admin or head doctor, Internal doctor and navigator or doctor secretary */
  ///** Data will be use case with specializations */
  return (
    <Grid templateColumns={['repeat(6, 1fr)']} mt={10}>
      <GridItem colSpan={['6', '6', '6', '4']} width={'100%'}>
        <CustomLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '2']} width={'100%'}>
        <CustomPieGraph />
      </GridItem>
    </Grid>
  );
};

const ExternalGraphs = () => {
  return (
    <Grid templateColumns={['repeat(6, 1fr)']}>
      <GridItem colSpan={['6', '6', '6', '4']} width={'100%'}>
        <ExternalDoctorLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '2']} width={'100%'}>
        <ExternalDoctorPieGraph />
      </GridItem>
    </Grid>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  const Title = 'Dashboard Overview';

  const [patientCard, setPatientCard] = useState([]);
  const [mountPatient, setMountPatient] = useState(true);

  const [doctorCard, setDoctorCard] = useState([]);
  const [mountDoctor, setMountDoctor] = useState(true);

  const [hospitalCard, setHospitalCard] = useState([]);
  const [mountHospital, setMountHospital] = useState(true);

  const [caseCard, setCaseCard] = useState([]);
  const [mountCase, setMountCase] = useState([]);

  const handleFetchPatientCard = async () => {
    const res = await PatientGetCardRequest();

    if (res.data.status === 200) {
      setPatientCard({
        value: res.data.data[0].value,
        subValue: res.data.subdata[0].value,
      });
    }
  };

  const handleFetchDoctorCard = async () => {
    const res = await DoctorGetCardRequest();

    if (res.data.status === 200) {
      setDoctorCard({
        value: res.data.data[0].value,
        subValue: res.data.subdata[0].value,
      });
    }
  };

  const handleFetchHospitalCard = async () => {
    const res = await HospitalGetCardRequest();

    if (res.data.status === 200) {
      setHospitalCard({
        value: res.data.data[0].value,
      });
    }
  };

  const handleFetchCaseCard = async () => {
    const res = await CaseGetCardRequest();

    if (res.data.status === 200) {
      setCaseCard({
        value: res.data.data[0].value,
        subValue: res.data.subdata[0].value,
      });
    }
  };

  useEffect(() => {
    //FETCH PATIENTS IF ROLE IS EXTERNAL
    if (mountPatient) {
      handleFetchPatientCard();
    }

    return () => {
      setMountPatient(false);
    };
  }, [mountPatient]);

  useEffect(() => {
    //FETCH PATIENTS IF ROLE IS SUPER ADMIN OR ADMIN
    if (mountHospital) {
      handleFetchHospitalCard();
    }

    return () => {
      setMountHospital(false);
    };
  }, [mountHospital]);

  useEffect(() => {
    //FETCH PATIENTS IF ROLE IS STAFF, INTERNAL OR EXTERNAL DOCTOR
    if (mountCase) {
      handleFetchCaseCard();
    }

    return () => {
      setMountCase(false);
    };
  }, [mountCase]);

  useEffect(() => {
    //FETCH PATIENTS IF ROLE IS SUPER ADMIN OR ADMIN
    if (mountDoctor) {
      handleFetchDoctorCard();
    }

    return () => {
      setMountDoctor(false);
    };
  }, [mountDoctor]);

  const handleCardBaseRole = title => {
    if (title === 'Total Hospitals') {
      return user.user_role !== 'External Doctor' ? true : false;
    }
    if (title === 'Total Doctors') {
      return user.user_role !== 'External Doctor' ? true : false;
    }
    if (title === 'Total Patients') {
      return user.user_role === 'External Doctor' ||
        user.user_role === 'Super Admin'
        ? true
        : false;
    }
    return true;
  };

  return (
    <>
      <Box>
        <Box p={5} mt={7}>
          <Flex color={TitleColor} columnGap={2}>
            <MdSpaceDashboard fontSize={35} fontWeight={'900'} ml={5} />
            <Text fontSize={25} color={TitleColor} fontWeight={'900'}>
              {Title}
            </Text>
          </Flex>
        </Box>

        <Container maxW={'container.xxl'} mt={'2rem'} mb={'4rem'}>
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(6, 1fr)',
              'repeat(12, 1fr)',
            ]}
            gap={5}
          >
            {DashboardCardStructureData.map(data => {
              return handleCardBaseRole(data.title) === true ? (
                <GridItem
                  key={data.title}
                  colSpan={user.user_role === 'External Doctor' ? 6 : 3}
                  width={'100%'}
                >
                  <DashboardCard
                    data={data}
                    value={
                      data.title === 'Total Hospitals'
                        ? hospitalCard
                        : data.title === 'Total Doctors'
                        ? doctorCard
                        : data.title === 'Total Patients'
                        ? patientCard
                        : caseCard
                    }
                  />
                </GridItem>
              ) : null;
            })}
          </Grid>
        </Container>
        {user.user_role === 'Super Admin' ? (
          <AdminGraphs />
        ) : user.user_role === 'Admin' ||
          user.user_role === 'Internal Doctor' ||
          user.user_role === 'Staff' ? (
          <InternalDoctorGraphs />
        ) : (
          <ExternalGraphs />
        )}
      </Box>
    </>
  );
};

export default Dashboard;
