import { useState, useEffect } from 'react';
import { Box, Text, Container, Flex } from '@chakra-ui/react';
import { TitleColor } from '../Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { RiFileListFill } from 'react-icons/ri';
import { Log } from '../API/Paths';
import { StatusHandler } from '../Utils/StatusHandler';
import { GetRequest } from '../API/api';

const HistoryLogs = () => {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState([]);
  const [fetch, setFetch] = useState(true);

  const Title = 'History Logs';

  const handleFetchLogs = async () => {
    let msg = '';
    GetRequest({ url: Log })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setLogs(res.dat.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  useEffect(() => {
    setFetch(false);
    handleFetchLogs();
  }, [fetch]);

  const columns = [
    {
      Header: 'ID',
      accessor: 'PK_logs_ID',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Table Name',
      accessor: 'table_Name',
    },
    {
      Header: 'Request Type',
      accessor: 'method_type',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <RiFileListFill fontSize={40} fontWeight={'900'} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={'900'}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={'2rem'}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={logs}
              search={search}
              setSearch={setSearch}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HistoryLogs;
