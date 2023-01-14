import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { LoginHeader, CustomFormController } from './customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext.js';
import {
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';
import './auth.css';

import { toastposition, toastvariant } from '../dashboard/Packages.js';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      toast({
        title: 'Please wait for account approval.',
        position: toastposition,
        variant: toastvariant,
        status: 'warning',
        isClosable: true,
      });
      resetState();
    }
    if (res === 'success') {
      navigate('/');
    }

    setAuthException(res);
    setLoading(false);
  };

  const handleNavigateToRegister = e => {
    navigate('/register');
  };

  return (
    <>
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
