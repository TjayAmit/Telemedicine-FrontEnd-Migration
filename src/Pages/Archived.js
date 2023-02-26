import { Box, Text, Container, Flex } from '@chakra-ui/react';
import { TitleColor } from './Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { useState, useEffect } from 'react';
import { BsArchive } from 'react-icons/bs';
import useAuth from '../Hooks/AuthContext';
import { GetRequest } from '../API/api';
import { Case } from '../API/Paths';

const Archived = () => {
  const [msg, setMsg] = useState('');
  const [fetch, setFetch] = useState(true);
  const [cases, setCases] = useState([]);
  const { tableName, setTableName, search, setSearch } = useAuth();
  const Title = 'Archived Case';
  const handleClick = () => {};

  const columns = [
    {
      Header: 'ID',
      accessor: 'PK_cases_ID',
    },
    {
      Header: 'Case #',
      accessor: 'cases_No',
    },
    {
      Header: 'PATIENTS',
      accessor: 'patient',
    },
    {
      Header: 'Hospital',
      accessor: 'hospital_Name',
    },
    {
      Header: 'GENDER',
      accessor: 'patients_Gender',
    },
    {
      Header: 'SERVICE',
      accessor: 'specializations_Title',
    },
    {
      Header: 'STATUS',
      accessor: 'cases_status',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetch = () => {
    GetRequest({ url: Case })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const {
          data: { data },
        } = res;

        setCases(data);
      })
      .catch(err => {
        switch (err) {
          case 400:
            setMsg("Process can't complete. try again later.");
            break;
          case 401:
            setMsg('Un-Authorized.');
            break;
          case 404:
            setMsg('No record found.');
            break;
          default:
            setMsg("Can't process right now. try again later.");
            break;
        }
      });
  };

  const filtered = cases.filter(filter =>
    filter.cases_status !== 2
      ? null
      : filter.patient.toLowerCase().includes(search.toLowerCase()) ||
        filter.specializations_Title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        filter.patients_Gender.toLowerCase().includes(search.toLowerCase()) ||
        filter.patients_CivilStatus.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setTableName(Title);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 30000
    );

    if (tableName !== Title) {
      setTableName(Title);
    }

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
            handleClick={handleClick}
            setSearch={setSearch}
          />
        </Box>
      </Container>
    </>
  );
};

export default Archived;
