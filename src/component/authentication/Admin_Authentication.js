import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { LoginHeader, CustomFormController } from './customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext.js';
import '../../App.css';
import { Flex, Box, Button, Grid, GridItem, Center } from '@chakra-ui/react';
import { LoginSadminRequest } from '../api/Authentication_Request.js';

const AdminAuthentication = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    name,
    setName,
    password,
    setPassword,
    isErrorEmail,
    isErrorPassword,
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    let res = await LoginSadminRequest({
      name: name,
      password: password,
    });

    if (res.data.status === 200) {
      const userProfileData = res.data.data;

      setUser(userProfileData);
      sessionStorage.setItem('token', userProfileData['token']);

      return 'success';
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
          w={'27rem'}
          h={'27rem'}
          overflow="hidden"
          className="authbox"
          m={'auto'}
          bg={'white'}
        >
          <LoginHeader isSignup={false} />
          <form class="form-container" onSubmit={e => handleSubmit(e)}>
            <Grid
              templateRows={`repeat(2, 1fr)`}
              templateColumns={`repeat(1, 1fr)`}
              gap={2}
              overflow={'hidden'}
            >
              <GridItem rowSpan={3} colSpan={[2, 1]}>
                <CustomFormController
                  title={'Username'}
                  type={'Text'}
                  value={name}
                  placeholder={`Enter username`}
                  setValue={setName}
                  errorMessage={` Email is required.`}
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
            <Button
              isLoading={loading}
              loadingText={'Submitting'}
              type={'submit'}
              value={'Submit'}
              marginTop="30px"
              width={'100%'}
              bg={'rgb(28, 180, 93)'}
              _hover={{
                bg: 'primary.800',
              }}
              color="white"
            >
              {'Sign Ins'}
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AdminAuthentication;
