import { useState } from 'react';
import { LoginHeader, CustomFormController } from './customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext.js';
import '../../App.css';
import {
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react';

import {
  CustomSelection,
  toastposition,
  toastvariant,
} from '../dashboard/Packages.js';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    authException,
    setAuthException,
    email,
    setEmail,
    password,
    setPassword,
    vpassword,
    setVPassword,
    doctors_FirstName,
    setDoctors_FirstName,
    doctors_LastName,
    setDoctors_LastName,
    name,
    setName,
    isErrorFN,
    setIsErrorFN,
    isErrorL,
    setIsErrorLN,
    isErrorEmail,
    setIsErrorEmail,
    isErrorPassword,
    setIsErrorPassword,
    isErrorVP,
    setIsErrorVP,
    user,
    FK_hospital_ID,
    setFK_hospital_ID,
    FK_specializations_ID,
    setFK_specializations_ID,
    login,
    register,
    hospitals,
    specializations,
    resetState,
  } = useAuth();

  const [isSignup, setIsSignup] = useState(false);

  const handleNavigateToLogin = e => {
    e.preventDefault();

    navigate('/login');
  };

  const handleSubmitRegistration = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await register();

    if (res === 'success') {
      toast({
        title: 'Please wait for approval!',
        position: toastposition,
        variant: toastvariant,
        status: 'success',
        isClosable: true,
      });
      resetState();
    }

    setLoading(false);
  };

  return (
    <>
      <Flex
        h={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        bg={'#f7f5f9'}
        rounded={8}
      >
        <Box
          w={'40rem'}
          h={'38rem'}
          overflow="hidden"
          className="authbox"
          m={'auto'}
          bg={'white'}
        >
          <LoginHeader isSignup={isSignup} />
          {authException === '' ? (
            <Text color={'red'}>{authException}</Text>
          ) : null}
          <form
            class="form-container"
            onSubmit={e => handleSubmitRegistration(e)}
          >
            <Grid
              templateRows={`repeat( 2, 1fr)`}
              templateColumns={`repeat( 2, 1fr)`}
              gap={2}
              overflow={'hidden'}
            >
              <GridItem rowSpan={2} colSpan={[2, 1]}>
                <CustomFormController
                  isSignup={true}
                  title={'First name'}
                  type={'Text'}
                  value={doctors_FirstName}
                  placeholder={`Enter First Name`}
                  setValue={setDoctors_FirstName}
                  errorMessage={`First name is required.`}
                  isError={isErrorFN}
                  children={null}
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
                />
                {
                  <CustomSelection
                    title={'Hospital'}
                    value={FK_hospital_ID}
                    setValue={setFK_hospital_ID}
                    mt={'1.14rem'}
                  />
                }
                {FK_hospital_ID === '1' ? (
                  <CustomSelection
                    title={'Specialization'}
                    value={FK_specializations_ID}
                    setValue={setFK_specializations_ID}
                    mt={5}
                  />
                ) : null}
              </GridItem>
              {
                <GridItem rowSpan={4} colSpan={[2, 1]}>
                  <CustomFormController
                    isSignup={true}
                    title={'Email'}
                    type={'email'}
                    value={email}
                    placeholder={'Enter email'}
                    setValue={setEmail}
                    errorMessage={'Email is required.'}
                    isError={isErrorEmail}
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
                  />
                  {
                    <CustomFormController
                      isSignup={true}
                      title={'Confirm Password'}
                      type={'password'}
                      value={vpassword}
                      placeholder={'Type password again'}
                      setValue={setVPassword}
                      errorMessage={'Confirm password is required.'}
                      isError={isErrorPassword}
                    />
                  }
                </GridItem>
              }
            </Grid>
            <Grid
              templateRows={`repeat( 1 , 1fr)`}
              templateColumns={`repeat( 2 , 1fr)`}
              gap={2}
              mt={'5'}
              overflow={'hidden'}
            >
              <GridItem rowSpan={1}>
                <Button
                  marginTop="0px"
                  width={'100%'}
                  bg={'grey'}
                  _hover={{
                    bg: 'grey',
                  }}
                  color="white"
                  onClick={e => handleNavigateToLogin(e)}
                >
                  {'Sign In'}
                </Button>
              </GridItem>
              <GridItem rowSpan={1}>
                <Button
                  isLoading={loading}
                  loadingText={loading ? 'Submitting' : null}
                  type={'submit'}
                  value={'Submit'}
                  marginTop={'0px'}
                  width={'100%'}
                  bg={'rgb(28, 180, 93)'}
                  _hover={{
                    bg: 'rgb(28, 180, 93)',
                  }}
                  color="white"
                >
                  {'Submit'}
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
