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

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const AdminGraphs = () => {
  ///** Dashboard display for Admin or head doctor, Internal doctor and navigator or doctor secretary */
  ///** Data will be use case with specializations */
  return (
    <Grid templateColumns={['repeat(6, 1fr)']}>
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
        <CustomLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
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
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
        <CustomLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
        <CustomPieGraph />
      </GridItem>
    </Grid>
  );
};

const ExternalGraphs = () => {
  return (
    <Grid templateColumns={['repeat(6, 1fr)']}>
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
        <ExternalDoctorLineGraph />
      </GridItem>
      <GridItem colSpan={['6', '6', '6', '3']} width={'100%'}>
        <ExternalDoctorPieGraph />
      </GridItem>
    </Grid>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const queryClient = new QueryClient();

  const Title = 'Dashboard Overview';

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
      <QueryClientProvider client={queryClient}>
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
