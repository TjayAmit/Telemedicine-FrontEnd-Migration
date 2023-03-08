import {
  Box,
  Button,
  Flex,
  Text,
  Grid,
  GridItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SelectionHospital,
  SelectionSpecialization,
} from '../Components/CustomSelection';
import { PostRequest } from '../API/api';
import { Auth } from '../API/Paths';
import AuthBackground from '../Components/AuthModule/AuthBackground';
import AuthHeader from '../Components/AuthModule/AuthHeader';
import AuthFooter from '../Components/AuthModule/AuthFooter';
import useAuth from '../Hooks/AuthContext';
import { useLocation } from 'react-router-dom';
import { IoMdSad, IoMdClose } from 'react-icons/io';
import { MdNoAccounts } from 'react-icons/md';
import { CustomFormController } from '../Components/customs';

const Feedback = props => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={props.success ? 'green' : 'red'}>
          {props.title}
        </ModalHeader>
        <ModalBody>
          <Text>{props.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={props.success ? 'teal' : 'grey'}
            color={props.success ? 'white' : 'orange'}
            _hover={{
              bg: props.success ? 'teal' : 'grey',
              color: props.success ? 'white' : 'orange',
            }}
            _active={{
              bg: props.success ? 'teal' : 'grey',
              color: props.success ? 'white' : 'orange',
            }}
            onClick={props.handleClose}
          >
            <Text>{props.success ? 'Go to Login' : 'Close'}</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AccountRegistration = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUser, password } = useAuth();

  const [feedbackTitle, setFeedBackTitle] = useState('');
  const [feedbackDescription, setFeedBackDescription] = useState('');

  const [message, setMessage] = useState(state.message);
  console.log(state);

  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [hospital, setHospital] = useState('');
  const [specialization, setSpecialization] = useState('');

  const [emailExc, setEmailExc] = useState('');
  const [passExc, setPassExc] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(state);

  const resultFeedBack = () => {
    setTimeout(() => {
      setLoading(false);
      onOpen();
    }, [200]);
  };

  const closeModal = () => {
    onClose();
    if (success) {
      navigate('login', { replace: true });
    }
  };

  const navigateAuthorize = e => {
    e.preventDefault();
    navigate('/', { replace: true });
  };

  const resetState = () => {
    setFname('');
    setMname('');
    setLname('');
  };

  const handleUserInformation = async e => {
    e.preventDefault();
    setLoading(true);

    let bodyForm = new FormData();
    bodyForm.append('id', state.id);
    bodyForm.append('firstname', fname);
    bodyForm.append('middlename', mname);
    bodyForm.append('lastname', lname);
    bodyForm.append('hospital', hospital);
    bodyForm.append('specialization', specialization);
    bodyForm.append('password', state.password);

    PostRequest({ url: `${Auth}/account` }, bodyForm)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        resetState();
        setSuccess(true);
        console.log(res);
        setFeedBackTitle('Registered successfully');
        setFeedBackDescription('Please wait for account approval.');
        resultFeedBack();
      })
      .catch(err => {
        let msg = '';
        console.log(err);

        setSuccess(false);
        setFeedBackTitle('Something went wrong!.');
        setFeedBackDescription(msg);
        resultFeedBack();
      });
  };

  return (
    <>
      <Feedback
        title={feedbackTitle}
        description={feedbackDescription}
        onClose={onClose}
        handleClose={closeModal}
        isOpen={isOpen}
        success={success}
      />
      <Box
        w={'100%'}
        h={'100vh'}
        bg={'rgba(0,0,0,0.1)'}
        position={'absolute'}
        backgroundImage={'linear-gradient(#B0F3F1,#FFCFDF)'}
      >
        <Box
          w={'60%'}
          h={'70%'}
          left={'50%'}
          top={'50%'}
          transform="translate(-50%, -50%)"
          position={'absolute'}
          boxShadow={'2xl'}
          rounded={15}
          overflow={'hidden'}
        >
          <Grid
            templateRows={'repeat(1, 1fr)'}
            templateColumns="repeat(12, 1fr)"
          >
            <GridItem rowSpan={1} colSpan={7}>
              <AuthBackground />
            </GridItem>
            <GridItem colSpan={5}>
              <Box w={'100%'} h={'100%'} bg={'whiteAlpha.600'}>
                <Flex
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  pl={10}
                  pt={8}
                  pr={10}
                  pb={3}
                  h={'70vh'}
                >
                  <AuthHeader title={'User information'} />
                  {message === '' ? null : (
                    <Box w={'100%'}>
                      <Box
                        float="right"
                        maxWidth={'200px'}
                        color="white"
                        display="flex"
                        columnGap={2}
                        bg="red"
                        opacity={0.8}
                        p={2}
                        borderRadius={15}
                        alignItems="center"
                        mt={5}
                      >
                        <MdNoAccounts fontSize={20} />
                        <Box maxWidth={'200px'} textAlign="start">
                          <Text fontWeight={700}>{message}</Text>
                        </Box>
                        <Box w="green" zIndex={99}>
                          <Text
                            bg="transparent"
                            fontSize={20}
                            _hover={{ cursor: 'pointer' }}
                            onClick={() => {
                              setFeedBackDescription('');
                            }}
                          >
                            <IoMdClose color={'white'} />
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={message === '' ? '2rem' : '0'}
                  >
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={fname}
                      setValue={setFname}
                      placeholder={'First name'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={mname}
                      setValue={setMname}
                      placeholder={'Middle name'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={lname}
                      setValue={setLname}
                      placeholder={'Last name'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <SelectionHospital
                      value={hospital}
                      setValue={setHospital}
                      mt={5}
                    />
                    {hospital === '1' ? (
                      <SelectionSpecialization
                        value={specialization}
                        setValue={setSpecialization}
                        mt={5}
                      />
                    ) : null}
                    <Button
                      isLoading={loading}
                      loadingText={'Saving'}
                      mt={14}
                      bg={'teal'}
                      color={'white'}
                      _hover={{ bg: 'teal' }}
                      onClick={e => handleUserInformation(e)}
                    >
                      <Text>Save</Text>
                    </Button>
                  </Box>
                  <AuthFooter />
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AccountRegistration;
