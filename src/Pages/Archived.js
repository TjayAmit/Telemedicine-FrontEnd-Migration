import { Box, Container, Flex } from '@chakra-ui/react';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { useState, useEffect } from 'react';
import useAuth from '../Hooks/AuthContext';
import { GetRequest } from '../API/api';
import { Case } from '../API/Paths';

const Archived = () => {
  const [msg, setMsg] = useState('');
  const [fetch, setFetch] = useState(true);
  const [cases, setCases] = useState([]);
  const { search, setSearch } = useAuth();
  const Title = 'Archived Case';
  const handleClick = () => {};

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Case #',
      accessor: 'case_number',
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
      accessor: 'sex',
    },
    {
      Header: 'SERVICE',
      accessor: 'specialization',
    },
    {
      Header: 'STATUS',
      accessor: 'case_status',
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
    filter.case_status === 2
      ? filter.case_number
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.patient.toLowerCase().includes(search.toLowerCase()) ||
        filter.specialization.toLowerCase().includes(search.toLowerCase()) ||
        filter.sex.toLowerCase().includes(search.toLowerCase())
      : null
  );

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

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 5]}>
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
