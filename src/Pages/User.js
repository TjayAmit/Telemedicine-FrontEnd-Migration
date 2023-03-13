import {
  Text,
  Box,
  Grid,
  GridItem,
  Container,
  useDisclosure,
  Flex,
  useToast,
  Center,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import '../Style/App.css';
import React, { useState, useEffect } from 'react';
import { TitleColor, toastposition, toastvariant } from './Packages';
import { CustomFormController } from '../Components/customs';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import CustomModal from '../Components/CustomModal';
import { FaUsers } from 'react-icons/fa';
import useAuth from '../Hooks/AuthContext';
import { SelectionSpecialization } from '../Components/CustomSelection';
import { GetRequest } from '../API/api';
import { Specialization, User } from '../API/Paths';

const AddModal = ({ isOpen, onClose, fetch, users }) => {
  const title = 'New Doctor';
  const toast = useToast();
  const [exist, setExist] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    doctors_FirstName,
    setDoctors_FirstName,
    doctors_LastName,
    setDoctors_LastName,
    name,
    setName,
    isErrorFN,
    isErrorEmail,
    isErrorPassword,
    resetState,
    registerAdminDoctor,
    FK_specializations_ID,
    setFK_specializations_ID,
  } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    const validate = users.filter(x => x.email === email);

    if (validate.length >= 1) {
      setExist(true);
      toast({
        title: 'Email Already Exist!',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    } else {
      setLoader(true);
      const res = await registerAdminDoctor();

      if (res !== 'success') {
        toast({
          title: 'Something went wrong',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
      }

      if (res === 'success') {
        onClose();
        toast({
          title: 'New admin created',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        resetState();
        fetch(true);
      }
      setLoader(false);
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
        btntitle={'Save'}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 2 , 1fr)`}
          templateColumns={`repeat( 2 , 1fr)`}
          gap={2}
          overflow={'hidden'}
        >
          <GridItem rowSpan={2} colSpan={[2, 1]}>
            <CustomFormController
              isSignup={true}
              title={'First name'}
              type={'Text'}
              value={doctors_FirstName}
              placeholder={`Enter First Name `}
              setValue={setDoctors_FirstName}
              errorMessage={`First name is required.`}
              isError={isErrorFN}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={'1px solid #e0e0e0'}
                >
                  <Center>
                    <FaUserAlt color="#1f894c" size={15} />
                  </Center>
                </Box>
              }
            />
            <CustomFormController
              isSignup={true}
              title={'Last name'}
              type={'Text'}
              value={doctors_LastName}
              placeholder={`Enter Last name`}
              setValue={setDoctors_LastName}
              errorMessage={`Last name is required.`}
              isError={isErrorPassword}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={'1px solid #e0e0e0'}
                >
                  <Center>
                    <FaLock color="#1f894c" size={15} />
                  </Center>
                </Box>
              }
            />
            <SelectionSpecialization
              title={'Specialization'}
              value={FK_specializations_ID}
              setValue={setFK_specializations_ID}
              mt={5}
            />
          </GridItem>
          <GridItem rowSpan={3} colSpan={[2, 1]}>
            <CustomFormController
              isSignup={true}
              title={'Email'}
              type={'email'}
              value={email}
              placeholder={'Enter email'}
              setValue={setEmail}
              errorMessage={'Email is required.'}
              isError={isErrorEmail}
              children={<MdEmail color="#1f894c" />}
            />
            <CustomFormController
              isSignup={true}
              title={'Username'}
              type={'text'}
              value={name}
              placeholder={'Enter username'}
              setValue={setName}
              errorMessage={'Username is required.'}
              isError={isErrorEmail}
              children={<FaUserAlt color="#1f894c" />}
            />
            <CustomFormController
              isSignup={true}
              title={'Password'}
              type={'password'}
              value={password}
              placeholder={'Enter password'}
              setValue={setPassword}
              errorMessage={'Password is required.'}
              isError={isErrorPassword}
              children={<FaLock color="#1f894c" />}
            />
          </GridItem>
        </Grid>
      </CustomModal>
    </>
  );
};

const Users = () => {
  const [user, setUser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SpecializationData, setSpecializationData] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { search, setSearch } = useAuth();
  const [feedback, setFeedback] = useState('');
  const Title = 'User';

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'PROFILE',
      accessor: 'profile',
    },
    {
      Header: 'NAME',
      accessor: 'fullname',
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
    },
    {
      Header: 'ROLE',
      accessor: 'role',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetchUser = async () => {
    GetRequest({ url: `${User}s` })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
        const { status } = err;
        switch (status) {
          case 400:
            setFeedback("Can't complete request. try again later.");
            break;
          case 404:
            setFeedback('No record.');
            break;
          default:
            setFeedback("Can't process request. try again later.");
            break;
        }
      });
  };

  const serviceTypeData = async () => {
    GetRequest({ url: Specialization })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setSpecializationData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const userJSONData = users.filter(filter =>
    filter.fullname.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    serviceTypeData();
    handleFetchUser();
    setFetch(false);
  }, [fetch]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetchUser();
      },
      fetch ? 0 : 30000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={5} p={[0, 0, 2, 3]}>
          <CustomTablePaginate
            title={'Admin Doctor'}
            columns={columns}
            data={userJSONData}
            search={search}
            setSearch={setSearch}
            onOpen={onOpen}
            isModal={true}
          />
        </Box>
      </Container>

      <AddModal
        users={user}
        fetch={fetch}
        SpecializationData={SpecializationData}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Users;
