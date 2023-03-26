import { Text, Flex, Box, Container } from '@chakra-ui/react';

import '../Style/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { GetRequest } from '../API/api';
import { Patient } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler';
import useAuth from '../Hooks/AuthContext';

const Patients = () => {
  const [fetch, setFetch] = useState(true);
  const [patients, setPatients] = useState([]);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { search, setSearch } = useAuth();
  const Title = 'Patient';

  const handleClick = () => {
    navigate('/patients/form');
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
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
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const { data } = res;

        setPatients(data);
      })
      .catch(err => {
        const { status, message } = err;

        switch (status) {
          case 400:
            setFeedback('Something went wrong!.');
            break;
          case 401:
            break;
          case 404:
            setFeedback('No data found');
            break;
          default:
            setFeedback("Can't complete task");
            break;
        }
      });
  };

  const filtered = patients.filter(
    filter =>
      filter.patients_FirstName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      filter.patients_MiddleName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      filter.patients_LastName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetchPatient();
      },
      fetch ? 0 : 30000
    );
    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            data={filtered}
            fetch={setFetch}
            search={search}
            setSearch={setSearch}
            handleClick={handleClick}
            isModal={false}
          />
        </Box>
      </Container>
    </>
  );
};

export default Patients;
