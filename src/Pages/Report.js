import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Flex,
  useDisclosure,
  Grid,
  GridItem,
  Select,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

import { TitleColor, toastposition, toastvariant } from './Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import CustomModal from '../Components/CustomModal';
import TextFormController from '../Components/TextFormController';
import { TbFileReport } from 'react-icons/tb';
import { useToast } from '@chakra-ui/react';
import moment from 'moment';
import { PostRequest, GetRequest } from '../API/api';
import { Reports, Hospital, Specialization } from '../API/Paths';
import { StatusHandler } from '../Utils/StatusHandler';

const AddModal = ({
  isOpen,
  onClose,
  fetch,
  hospitalData,
  SpecializationData,
}) => {
  const title = 'Generate Report';
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  const [fromage, setFromage] = useState('');
  const [toage, setToage] = useState('');
  const [sex, setSex] = useState('');
  const [referringHospital, setreferringHospital] = useState('');
  const [servicetype, setServiceType] = useState('');
  const toast = useToast();

  const resetState = () => {
    setFromage('');
    setFromdate('');
    setTodate('');
    setToage('');
    setToage('');
    setSex('');
    setreferringHospital('');
    setServiceType('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (Number(fromage) >= Number(toage)) {
      toast({
        title:
          'To-Attribute on Age Range should be Greater than the From-Attribute  Example: 20 - 26',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    } else {
      let msg = '';
      let bodyForm = new FormData();
      bodyForm.append('FK_hospital_ID', referringHospital);
      bodyForm.append('FK_specializations_ID', servicetype);
      bodyForm.append('FK_user_ID', 1);
      bodyForm.append('report_AgeFrom', fromage);
      bodyForm.append('report_AgeTo', toage);
      bodyForm.append('report_DateFrom', fromdate);
      bodyForm.append('report_DateTo', todate);
      bodyForm.append('report_Sex', sex);

      PostRequest({ url: Report })
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response.', { cause: res });
          }

          onClose();
          resetState();
          fetch(true);
          toast({
            title: 'Report Generated',
            position: toastposition,
            variant: toastvariant,
            status: 'success',
            isClosable: true,
          });
        })
        .catch(err => {
          msg = StatusHandler(err);
        });
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={'Generate'}
      >
        <Text fontWeight={'bold'} color={'blue.700'} mb={2} fontSize={'15px'}>
          Date Range
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={'red.400'}>
              From :{' '}
              <Text color={'blue.400'}>
                {moment(fromdate).format('DD-MM-YYYY')}
              </Text>
            </Text>
            <TextFormController
              title={'From Date'}
              value={fromdate}
              setValue={setFromdate}
              isRequired={true}
              isType="fromdate"
              compare={moment().format('YYYY-MM-DD')}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={'red.400'}>
              To :{' '}
              <Text color={'blue.400'}>
                {moment(todate).format('DD-MM-YYYY')}
              </Text>
            </Text>
            <TextFormController
              title={'To Date'}
              value={todate}
              setValue={setTodate}
              isRequired={true}
              isType="todate"
              compare={fromdate}
            />
          </GridItem>
        </Grid>

        <Text
          fontWeight={'bold'}
          color={'blue.700'}
          fontSize={'15px'}
          mb={2}
          mt={2}
        >
          Age Range (0 - 0 Yrs Old)
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={'From'}
              value={fromage}
              setValue={setFromage}
              isRequired={true}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={'To'}
              value={toage}
              setValue={setToage}
              isRequired={true}
            />
          </GridItem>
        </Grid>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Sex</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder="- Please Select -"
            onChange={e => {
              setSex(e.target.value);
            }}
          >
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Service Type</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder="- Please Select -"
            onChange={e => {
              setServiceType(e.target.value);
            }}
          >
            {SpecializationData.map(row => {
              return (
                <option value={row.PK_specializations_ID}>
                  {row.specializations_Title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </CustomModal>
    </>
  );
};

const Report = () => {
  const [search, setSearch] = useState('');
  const [fetch, setFetch] = useState(false);
  const [reports, setReports] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SpecializationData, setSpecializationData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  const handleFetchReport = async () => {
    let msg = '';
    GetRequest({ url: Reports })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setReports(res.data.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  const serviceTypeData = async () => {
    let msg = '';
    GetRequest({ url: Specialization })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setSpecializationData(res.data.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    let msg2 = '';
    GetRequest({ url: Hospital })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setHospitalData(res.data.data);
      })
      .catch(err => {
        msg2 = StatusHandler(err);
      });
  };

  //check if theres a changes. then update the data
  useEffect(() => {
    handleFetchReport();
    serviceTypeData();
    setFetch(false);
  }, [fetch]);

  const Title = 'Report';

  const columns = [
    {
      Header: 'ID',
      accessor: 'report_No',
    },
    {
      Header: 'NAME',
      accessor: 'username',
    },
    {
      Header: 'DATE',
      accessor: 'created_at',
    },
    {
      Header: 'LAST MODIFIED',
      accessor: 'updated_at',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Flex color={TitleColor} columnGap={2}>
            <TbFileReport fontSize={40} fontWeight={'900'} ml={5} />
            <Text fontSize={30} color={TitleColor} fontWeight={'900'}>
              {Title}
            </Text>
          </Flex>

          <Box mt={'2rem'}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              SpecializationData={SpecializationData}
              hospitalData={hospitalData}
              data={reports}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
      <AddModal
        isOpen={isOpen}
        SpecializationData={SpecializationData}
        hospitalData={hospitalData}
        onClose={onClose}
        fetch={setFetch}
      />
    </>
  );
};

export default Report;
