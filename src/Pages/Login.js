import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { LoginHeader, CustomFormController } from '../Components/customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/AuthContext.js';
import {
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Center,
  Text,
  useToast,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import AuthBackground from '../Components/AuthModule/AuthBackground.js';
import AuthHeader from '../Components/AuthModule/AuthHeader.js';
import AuthFooter from '../Components/AuthModule/AuthFooter.js';
import { Auth } from '../API/Paths.js';
import { PostRequest } from '../API/api';
import '../Style/auth.css';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdSad, IoMdClose } from 'react-icons/io';

const Feedback = props => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size={'md'} color={'#103c23'}>
            {props.header}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text>{props.feedback}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            w={'100%'}
            h={'2.5rem'}
            bg={'primary.900'}
            _hover={{
              bg: 'primary.900',
            }}
            _active={{
              bg: 'primary.900',
            }}
            onClick={() => props.onClose()}
          >
            <Text color={'white'}>Close</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ExceptionDisplay = props => {
  return props.msg === '' ? null : (
    <Box display="flex" justifyContent={'end'}>
      <Box
        maxW={'14rem'}
        pl={4}
        pt={2}
        pr={4}
        pb={2}
        rounded={8}
        display="flex"
        justifyContent={'space-between'}
        alignItems="center"
        columnGap={3}
        color="red"
      >
        <Text fontSize={13} fontWeight={500}>
          {props.msg}
        </Text>
        <Box _hover={{ cursor: 'pointer' }} onClick={() => props.setMsg('')}>
          <IoCloseSharp fontSize={22} />
        </Box>
      </Box>
    </Box>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackDescription, setFeedBackDescription] = useState('');
  const [emailExc, setEmailExc] = useState('');
  const [passExc, setPassExc] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [msg, setMsg] = useState('');
  const approval =
    'Your account still pending. You can contact ZCMC Telemedicine Doctors to request of account approval.';

  const [header, setHeader] = useState('');
  const [feedback, setFeedback] = useState('');

  const { setUser } = useAuth();

  console.log('login');

  const handleReset = () => {
    setName('');
    setPassword('');
  };

  const handleSignin = async e => {
    e.preventDefault();
    setLoading(true);

    let form = new FormData();
    form.append('name', name);
    form.append('password', password);

    PostRequest({ url: `${Auth}/signin` }, form)
      .then(res => {
        const {
          statusText,
          data: { data },
        } = res;
        if (!statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        if (res === 'warning') {
          setHeader('Account Pending');
          setFeedback(approval);
          handleReset();
          onOpen();
          return;
        }
        sessionStorage.setItem('token', data.token);
        setUser(data);
        navigate('/');
      })
      .catch(err => {
        switch (err) {
          case 400:
            setMsg('No Account found.');
            break;
          case 401:
            setMsg('Your account not approved yet.');
            break;
          case 403:
            setMsg('Email or password incorrect!');
            break;
          case 404:
            setMsg('No Record found.');
            break;
          default:
            setMsg('Please try again later.');
            break;
        }
      });
    setLoading(false);
  };

  const handleNavigateToRegister = e => {
    e.preventDefault();
    navigate('/register');
  };

  const handleNavigateToRecovery = e => {
    e.preventDefault();
    navigate('/account-recovery');
  };

  return (
    <>
      <Feedback
        isOpen={isOpen}
        onClose={onClose}
        header={header}
        feedback={feedback}
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
                  <AuthHeader title="Sign In" />
                  <Text
                    color={'darkred'}
                    fontWeight={500}
                    fontSize={15}
                    textAlign="center"
                    mt={10}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems="center"
                    columnGap={3}
                  >
                    {feedbackDescription === '' ? null : (
                      <Box
                        color="white"
                        display="flex"
                        columnGap={2}
                        bg="red"
                        opacity={0.8}
                        p={2}
                        borderRadius={15}
                        alignItems="center"
                      >
                        <IoMdSad fontSize={20} />
                        <Box maxWidth={'200px'} textAlign="start">
                          <Text fontWeight={700}>Email or password.</Text>
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
                    )}
                  </Text>
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={feedbackDescription === '' ? '2rem' : '1.1rem'}
                  >
                    <CustomFormController
                      isSignup={false}
                      type={'text'}
                      title={''}
                      value={name}
                      setValue={setName}
                      placeholder={'Username'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={5}
                      children={
                        <Box
                          w={8}
                          h={4}
                          mt={6}
                          mb={6}
                          borderRight={'1px solid rgba(0,0,0,0.2)'}
                        >
                          <Center>
                            <FaUserAlt color="teal" size={15} />
                          </Center>
                        </Box>
                      }
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={false}
                      type={'password'}
                      title={''}
                      value={password}
                      setValue={setPassword}
                      placeholder={'Password'}
                      errorMessage={passExc}
                      isError={false}
                      mt={3}
                      children={
                        <Box
                          w={8}
                          h={4}
                          mt={6}
                          mb={6}
                          borderRight={'1px solid rgba(0,0,0,0.2)'}
                        >
                          <Center>
                            <FaLock color="teal" size={15} />
                          </Center>
                        </Box>
                      }
                      isRequired={false}
                    />
                    <Button
                      color={'blackAlpha.500'}
                      bg="transparent"
                      mt={8}
                      _hover={{
                        bg: 'transparent',
                        color: 'blackAlpha.700',
                      }}
                      _active={{ bg: 'white', color: 'gray' }}
                      onClick={e => handleNavigateToRecovery(e)}
                    >
                      <Text fontWeight={400} fontSize={14}>
                        Forgot password?
                      </Text>
                    </Button>
                    <Button
                      isLoading={loading}
                      loadingText={'Signing In'}
                      mt={8}
                      bg={'teal'}
                      color={'white'}
                      _hover={{ bg: 'teal' }}
                      onClick={e => handleSignin(e)}
                    >
                      <Text>Login</Text>
                    </Button>
                    <Button
                      bg={'gray'}
                      color={'white'}
                      mt={3}
                      _hover={{
                        bg: 'darkorange',
                      }}
                      onClick={e => handleNavigateToRegister(e)}
                    >
                      <Text>Create account?</Text>
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

export default Login;
