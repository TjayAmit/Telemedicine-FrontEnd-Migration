import { Text, Flex, Box, Container } from '@chakra-ui/react';

import '../Style/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleColor } from '../Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { FaUserFriends } from 'react-icons/fa';
import { GetRequest } from '../API/api';
import { Patient } from '../API/Paths';
import { StatusHandler } from '../Utils/StatusHandler';

const Patient = () => {
  const [search, setSearch] = useState('');
  const [fetch, setFetch] = useState(false);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const Title = 'Patient';

  const handleClick = () => {
    navigate('/h/patients/form');
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'PK_patients_ID',
    },
    {
      Header: 'FIRST NAME',
      accessor: 'patients_FirstName',
    },
    {
      Header: 'MIDDLE NAME',
      accessor: 'patients_MiddleName',
    },
    {
      Header: 'LAST NAME',
      accessor: 'patients_LastName',
    },
    {
      Header: 'CONTACT',
      accessor: 'patients_Contact',
    },
    {
      Header: 'GENDER',
      accessor: 'patients_Gender',
    },

    {
      Header: 'DATE',
      accessor: 'created_at',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchPatient = async () => {
    let msg = '';

    GetRequest({ url: Patient })
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

  useEffect(() => {
    handleFetchPatient();
  }, [fetch]);

  const FilteredItem = patients.filter(
    x =>
      x.patients_FirstName.toLowerCase().includes(search.toLowerCase()) ||
      x.patients_MiddleName.toLowerCase().includes(search.toLowerCase()) ||
      x.patients_LastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <FaUserFriends fontSize={40} fontWeight={'900'} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={'900'}>
                {Title}
              </Text>
            </Flex>
          </Box>
          <Box mt={'2rem'}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={FilteredItem}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              handleClick={handleClick}
              isModal={false}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Patient;
