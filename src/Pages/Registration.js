import {
  Box,
  Button,
  IconButton,
  Center,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import CustomFormController from '../Components/customs/CustomFormController';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostRequest } from '../API/api';
import { Auth } from '../API/Paths';
import AuthHeader from '../Components/AuthModule/AuthHeader';
import AuthBackground from '../Components/AuthModule/AuthBackground';
import AuthFooter from '../Components/AuthModule/AuthFooter';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HiEmojiSad } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const Registration = () => {
  const navigate = useNavigate();

  const defaultProfileURL = `${window.location.origin}/default_profile.png`;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedback, setFeedback] = useState('');

  const emailExc = useState('');
  const passExc = useState('');

  const [loading, setLoading] = useState(false);

  const validatePasword = () => password === confirmPassword;

  const reset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignup = e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (validatePasword) {
      let bodyForm = new FormData();
      bodyForm.append('name', username);
      bodyForm.append('email', email);
      bodyForm.append('password', password);
      bodyForm.append('url', defaultProfileURL);

      PostRequest({ url: `${Auth}/signup` }, bodyForm)
        .then(res => res.data)
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response', { cause: res });
          }

          navigate('/account', {
            replace: true,
            state: { id: res.data, password: password, message: '' },
          });
          reset();
          setLoading(false);
        })
        .catch(err => {
          const {
            response: {
              status,
              data: { message },
            },
          } = err;

          switch (status) {
            case 400:
              setFeedback(message);
              break;
            case 409:
              setFeedback(message);
              break;
            default:
              setFeedback(message);
              break;
          }
          setLoading(false);
        });
    }
  };

  const handleNavigate = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <>
      <Box
        w={'100%'}
        h={'100vh'}
        bg={'rgba(0,0,0,0.1)'}
        position={'absolute'}
        backgroundImage={'linear-gradient(#B0F3F1,#FFCFDF)'}
      >
        <Box
          display={['block', 'block', 'none', 'none']}
          textAlign="center"
          pt={3}
          pb={2}
          letterSpacing={4}
        >
          <Heading size={'lg'} color="teal">
            ZCMC TELEMEDICINE
          </Heading>
        </Box>
        <Box
          w={['100%', '100%', '70%', '60%']}
          h={['80%', '80%', '70%', '70%']}
          left={'50%'}
          top={'50%'}
          transform="translate(-50%, -50%)"
          position={'absolute'}
          boxShadow={['none', 'none', '2xl', '2xl']}
          rounded={15}
          overflow={'hidden'}
        >
          <Grid
            templateRows={'repeat(1, 1fr)'}
            templateColumns="repeat(12, 1fr)"
          >
            <GridItem rowSpan={1} colSpan={[12, 12, 12, 7]}>
              <AuthBackground />
            </GridItem>
            <GridItem rowSpan={[1, 1, 1, 0]} colSpan={[12, 12, 12, 5]}>
              <Box
                w={'100%'}
                h={'100%'}
                bg={[
                  'transparent',
                  'transparent',
                  'whiteAlpha.900',
                  'whiteAlpha.600',
                ]}
              >
                <Flex
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  pl={10}
                  pt={[2, 2, 0, 8]}
                  pr={10}
                  pb={3}
                  h={['70vh', '70vh', '50vh', '70vh']}
                >
                  <AuthHeader title={'Sign up'} />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={'1rem'}
                  >
                    <Box
                      bg="red"
                      pl={2}
                      pr={2}
                      rounded={5}
                      color="white"
                      display={feedback === '' ? 'none' : 'block'}
                    >
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        columnGap={2}
                      >
                        <Flex alignItems="center" columnGap={2}>
                          <HiEmojiSad size={25} />
                          <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                        </Flex>
                        <IconButton
                          bg="red"
                          _hover={{ bg: 'red' }}
                          _active={{ bg: 'red' }}
                          icon={<IoClose size={30} />}
                          onClick={() => setFeedback('')}
                        />
                      </Flex>
                    </Box>
                    <CustomFormController
                      isSignup={false}
                      type={'text'}
                      title={''}
                      value={username}
                      setValue={setUsername}
                      placeholder={'Username'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={5}
                      isRequired={false}
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
                    />
                    <CustomFormController
                      isSignup={false}
                      type={'text'}
                      title={''}
                      value={email}
                      setValue={setEmail}
                      placeholder={'Email'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                      children={
                        <Box
                          w={8}
                          h={4}
                          mt={6}
                          mb={6}
                          borderRight={'1px solid rgba(0,0,0,0.2)'}
                        >
                          <Center>
                            <MdEmail color="teal" size={15} />
                          </Center>
                        </Box>
                      }
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
                      isRequired={false}
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
                    />
                    <CustomFormController
                      isSignup={false}
                      type={'password'}
                      title={''}
                      value={confirmPassword}
                      setValue={setConfirmPassword}
                      placeholder={'Confirm password'}
                      errorMessage={passExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
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
                    />
                    <Flex
                      w="100%"
                      columnGap={5}
                      rowGap={3}
                      mt={[10, 10, 12, 14]}
                      flexDirection={[
                        'column',
                        'column',
                        'row-reverse',
                        'column',
                      ]}
                    >
                      <Button
                        w="inherit"
                        isLoading={loading}
                        loadingText={'Signing In'}
                        bg={'teal'}
                        color={'white'}
                        _hover={{ bg: 'teal' }}
                        onClick={e => handleSignup(e)}
                        disabled={
                          username === '' ||
                          email === '' ||
                          password === '' ||
                          password !== confirmPassword
                        }
                      >
                        <Text fontSize={[12, 12, 14, 14]}>Register</Text>
                      </Button>
                      <Button
                        w="inherit"
                        bg={'gray'}
                        color={'white'}
                        _hover={{
                          bg: 'darkorange',
                        }}
                        onClick={e => handleNavigate(e)}
                      >
                        <Text fontSize={[12, 12, 14, 14]}>Sign In</Text>
                      </Button>
                    </Flex>
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

export default Registration;
