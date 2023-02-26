import { Box, Grid, GridItem, Container, Text, Flex } from '@chakra-ui/react';
import { MdSpaceDashboard } from 'react-icons/md';
import DashboardCard from '../Components/DashboardCard';
import useAuth from '../Hooks/AuthContext';
import { DashboardCardStructureData } from './ComponentData/DashboardCardData';
import ExternalDoctorLineGraph from '../Components/ExternalDoctorGraph/ExternalDoctorLineGraph';
import ExternalDoctorPieGraph from '../Components/ExternalDoctorGraph/ExternalDoctorPieGraph';
import CustomLineGraph from '../Components/InteralDoctorGraph/CustomLineGraph';
import CustomPieGraph from '../Components/InteralDoctorGraph/CustomPieGraph';
import { TitleColor } from './Packages.js';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useEffect } from 'react';

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
  const { user, setTableName } = useAuth();
  const queryClient = new QueryClient();

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

  const handleTitle = () => {
    setTableName('Dashboard');
  };

  useEffect(() => {
    handleTitle();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Box mt={10}>
          <Container maxW={'container.xxl'} mt={'2rem'} mb={'1rem'}>
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
                    colSpan={
                      user.user_role === 'External Doctor'
                        ? 6
                        : user.user_role === 'Internal Doctor' ||
                          user.user_role === 'Admin'
                        ? 4
                        : 3
                    }
                    width={'100%'}
                  >
                    <DashboardCard cardData={data} />
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
      </QueryClientProvider>
    </>
  );
};

export default Dashboard;
