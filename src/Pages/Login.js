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
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import '../Style/auth.css';

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

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const approval =
    'Your account still pending. You can contact ZCMC Telemedicine Doctors to request of account approval.';

  const [header, setHeader] = useState('');
  const [feedback, setFeedback] = useState('');

  const {
    authException,
    setAuthException,
    password,
    setPassword,
    name,
    setName,
    isErrorEmail,
    isErrorPassword,
    login,
    resetState,
  } = useAuth();

  const handleSubmitLogin = async e => {
    e.preventDefault();
    setLoading(true);

    let res = await login();

    if (res === 'warning') {
      setHeader('Account Pending');
      setFeedback(approval);
      resetState();
      onOpen();
    }

    if (res === 'success') {
      navigate('/');
    }

    if (res === 'E-P error') {
      setHeader('Invalid');
      setFeedback('Email or password incorrect');
      resetState();
      onOpen();
    }

    setAuthException(res);
    setLoading(false);
  };

  const handleNavigateToRegister = e => {
    navigate('/register');
  };

  return (
    <>
      <Feedback
        isOpen={isOpen}
        onClose={onClose}
        header={header}
        feedback={feedback}
      />
      <Flex
        h={['90vh', '100vh', '100vh', '100vh']}
        display={'flex'}
        justifyContent={'center'}
        bg={['white', '#f7f5f9', '#f7f5f9', '#f7f5f9']}
        rounded={8}
      >
        <Button
          position={'absolute'}
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          bg={'transparent'}
          onClick={e => navigate('/admin')}
        ></Button>
        <Box
          w={['27rem', '27rem', '27rem', '27rem']}
          h={'32rem'}
          overflow="hidden"
          boxShadow={['none', 'none', '2xl', '2xl']}
          m={'auto'}
          bg={'white'}
          padding={['25px', '25px', '40px', '40px']}
        >
          <LoginHeader title={'Sign In'} />
          {authException === '' ? (
            <Text color={'red'}>{authException}</Text>
          ) : null}
          <form className="form-container" onSubmit={e => handleSubmitLogin(e)}>
            <Grid
              templateRows={`repeat( 3, 1fr)`}
              templateColumns={`repeat( 1, 1fr)`}
              gap={2}
              overflow={'hidden'}
            >
              <GridItem rowSpan={4} colSpan={[2, 1]}>
                <CustomFormController
                  isSignup={false}
                  title={'Username'}
                  type={'Text'}
                  value={name}
                  placeholder={`Enter username`}
                  setValue={setName}
                  errorMessage={` 'Email'
                   is required.`}
                  isError={isErrorEmail}
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
                  isSignup={false}
                  title={'Password'}
                  type={'password'}
                  value={password}
                  placeholder={`Enter password`}
                  setValue={setPassword}
                  errorMessage={`Password is required.`}
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
              </GridItem>
            </Grid>
            <Grid
              templateRows={`repeat( 3, 1fr)`}
              templateColumns={`repeat(1, 1fr)`}
              gap={2}
              mt={'5'}
              overflow={'hidden'}
            >
              {
                <GridItem rowSpan={1}>
                  <Button
                    width={'100%'}
                    bg={'white'}
                    _hover={{
                      bg: 'white',
                    }}
                    _active={{
                      bg: 'white',
                    }}
                    color="grey"
                    onClick={e => navigate('/recovery')}
                    fontWeight={'400'}
                  >
                    {'forgot password ?'}
                  </Button>
                </GridItem>
              }
              <GridItem rowSpan={1}>
                <Button
                  isLoading={loading}
                  loadingText={'Submitting'}
                  type={'submit'}
                  value={'Submit'}
                  marginTop="0px"
                  width={'100%'}
                  bg={'rgb(28, 180, 93)'}
                  _hover={{
                    bg: 'primary.800',
                  }}
                  color="white"
                >
                  {'Sign In'}
                </Button>
              </GridItem>
              <GridItem rowSpan={1}>
                <Button
                  marginTop={'5px'}
                  width={'100%'}
                  bg={'grey'}
                  _hover={{
                    bg: 'grey',
                  }}
                  color="white"
                  onClick={e => handleNavigateToRegister(e)}
                >
                  {'Create Account'}
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
