import {
  Text,
  Box,
  Grid,
  GridItem,
  Container,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import '../Style/App.css';
import React, { useEffect, useState } from 'react';
import { TitleColor, toastposition, toastvariant } from './Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import TextFormController from '../Components/TextFormController';
import CustomModal from '../Components/CustomModal';
import { useToast } from '@chakra-ui/react';
import { FaRegHospital } from 'react-icons/fa';
import useAuth from '../Hooks/AuthContext';
import { GetRequest, PostRequest } from '../API/api';
import { Hospital } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler';

const AddModal = ({ isOpen, onClose, fetch }) => {
  const { url } = useAuth();
  const toast = useToast();
  const title = 'Hospital';
  const [hospital_Name, setHospital_Name] = useState('');
  const [hospital_Street, setHospital_Street] = useState('');
  const [hospital_Barangay, setHospital_Barangay] = useState('');
  const [hospital_City, setHospital_City] = useState('');

  const [hospital_url, setHospital_url] = useState('');
  const [hospital_imgPath, setHospital_imgPath] = useState('');
  const [hospital_FilePath, setHospital_FilePath] = useState('');
  const [loader, setloader] = useState(false);
  const [msg, setMsg] = useState('');

  const resetState = () => {
    setHospital_Name('');
    setHospital_Street('');
    setHospital_Barangay('');
    setHospital_City('');
    setHospital_url('');
    setHospital_imgPath('');
    setHospital_FilePath('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    let bodyFormData = new FormData();
    setloader(true);
    bodyFormData.append('hospital_Name', hospital_Name);
    bodyFormData.append('hospital_Street', hospital_Street);
    bodyFormData.append('hospital_Barangay', hospital_Barangay);
    bodyFormData.append('hospital_City', hospital_City);
    bodyFormData.append(
      'hospital_url',
      hospital_url === null ? url : hospital_url
    );
    bodyFormData.append('profile', hospital_FilePath);

    PostRequest({ url: Hospital }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }

        onClose();
        fetch(true);
        setloader(false);
        toast({
          title: 'Added Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        resetState();
      })
      .catch(err => {
        setMsg(StatusHandler(err));
        onClose();
        fetch(true);
        setloader(false);
        toast({
          title: 'file upload unsuccessfull!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
        resetState();
      });
  };

  const setLogo = path => {
    setHospital_imgPath(URL.createObjectURL(path.target.files[0]));
    setHospital_FilePath(path.target.files[0]);
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={true}
        isNew={true}
        btntitle={'Save'}
        logo={hospital_imgPath}
        setLogo={setLogo}
        loader={loader}
      >
        <TextFormController
          title={'Hospital name'}
          value={hospital_Name}
          setValue={setHospital_Name}
          isRequired={true}
        />
        <Text fontWeight={'bold'} mt={5}>
          Address
        </Text>
        <TextFormController
          title={'Street'}
          value={hospital_Street}
          setValue={setHospital_Street}
          isRequired={true}
        />
        <Grid templateColumns="repeat(2, 1fr)" mt={3} gap={5}>
          <GridItem w="100%">
            <TextFormController
              title={'Barangay'}
              value={hospital_Barangay}
              setValue={setHospital_Barangay}
              isRequired={true}
            />
          </GridItem>
          <GridItem w="100%">
            <TextFormController
              title={'City / Municipality'}
              value={hospital_City}
              setValue={setHospital_City}
              isRequired={true}
            />
          </GridItem>
        </Grid>
        <Text fontWeight={'bold'} mt={10}>
          Hospital Picture
        </Text>
      </CustomModal>
    </>
  );
};

const Hospitals = () => {
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  let duration = 0;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hospitals, setHospitals] = useState([]);
  const Title = 'Hospital';
  const [fetch, setFetch] = useState(false);

  const columns = [
    {
      Header: 'ID',
      accessor: 'PK_hospital_ID',
    },
    {
      Header: 'NAME',
      accessor: 'hospital_Name',
    },
    {
      Header: 'STREET',
      accessor: 'hospital_Street',
    },
    {
      Header: 'BARANGAY',
      accessor: 'hospital_Barangay',
    },
    {
      Header: 'CITY',
      accessor: 'hospital_City',
    },
    {
      Header: 'CREATED AT',
      accessor: 'created_at',
    },
    {
      Header: 'DATE UPDATE',
      accessor: 'updated_at',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchHospital = () => {
    GetRequest({ url: Hospital })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setHospitals(res.data.data);
      })
      .catch(err => {
        setMsg(StatusHandler(err));
      });
  };

  const hospitalJSONData = hospitals.filter(filter =>
    filter.hospital_Name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    handleFetchHospital();
    setFetch(false);
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <FaRegHospital fontSize={40} fontWeight={'900'} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={'900'}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={'2rem'}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={hospitalJSONData}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
      <AddModal isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Hospitals;
