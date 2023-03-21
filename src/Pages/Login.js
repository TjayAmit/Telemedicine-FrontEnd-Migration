import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { CustomFormController } from '../Components/customs.js';
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
  Heading,
  IconButton,
} from '@chakra-ui/react';
import AuthBackground from '../Components/AuthModule/AuthBackground.js';
import AuthHeader from '../Components/AuthModule/AuthHeader.js';
import AuthFooter from '../Components/AuthModule/AuthFooter.js';
import { Auth } from '../API/Paths.js';
import { PostRequest } from '../API/api';
import '../Style/auth.css';
import { IoMdSad, IoMdClose } from 'react-icons/io';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { setUser } = useAuth();

  const handleReset = () => {
    setName('');
    setPassword('');
  };

  const handleSignin = async e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    let form = new FormData();
    form.append('name', name.trim());
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

        sessionStorage.setItem('token', data.token);
        setUser(data);
        navigate('/');
        handleReset();
      })
      .catch(err => {
        console.log(err);
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
          case 401:
            setFeedback(message);
            break;
          case 403:
            setFeedback(message);
            break;
          case 404:
            setFeedback(message);
            break;
          default:
            setFeedback('Please try again later.');
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
          h={['80%', '80%', '60%', '70%']}
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
                  h={['70vh', '70vh', '40vh', '70vh']}
                >
                  <AuthHeader title="Sign In" />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={feedback === '' ? '2rem' : '1.1rem'}
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
                          <IoMdSad size={25} />
                          <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                        </Flex>
                        <IconButton
                          bg="red"
                          _hover={{ bg: 'red' }}
                          _active={{ bg: 'red' }}
                          icon={<IoMdClose size={30} />}
                          onClick={() => setFeedback('')}
                        />
                      </Flex>
                    </Box>
                    <CustomFormController
                      isSignup={false}
                      type={'text'}
                      title={''}
                      value={name}
                      setValue={setName}
                      placeholder={'Username'}
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
                      mt={[4, 4, 6, 8]}
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
                    <Flex
                      w="100%"
                      columnGap={5}
                      rowGap={3}
                      mt={[4, 4, 4, 8]}
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
                        onClick={e => handleSignin(e)}
                        disabled={name === '' || password === ''}
                      >
                        <Text fontSize={[12, 12, 14, 14]}>Login</Text>
                      </Button>
                      <Button
                        w="inherit"
                        bg={'gray'}
                        color={'white'}
                        _hover={{
                          bg: 'darkorange',
                        }}
                        onClick={e => handleNavigateToRegister(e)}
                      >
                        <Text fontSize={[12, 12, 14, 14]}>Create account?</Text>
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

export default Login;
