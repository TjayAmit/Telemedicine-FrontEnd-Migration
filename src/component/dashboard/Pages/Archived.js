import { Box, Text, Container, Flex } from '@chakra-ui/react';
import { CustomTablePaginate, TitleColor } from '../Packages';
import { useState, useEffect } from 'react';
import { BsArchive } from 'react-icons/bs';
import { CaseGetRequest } from '../../api/Case_Request';

const Archived = () => {
  const [search, setSearch] = useState('');
  const [cases, setCases] = useState([]);
  const [fetch, setFetch] = useState(false);
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

  const handleFetchCase = async () => {
    const res = await CaseGetRequest();

    if (res.data.status === 200) {
      setCases(res.data.data);
    }
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
    handleFetchCase();
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <BsArchive fontSize={40} fontWeight={'900'} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={'900'}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={'2rem'}>
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
        </Box>
      </Container>
    </>
  );
};

export default Archived;
