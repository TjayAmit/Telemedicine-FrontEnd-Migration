import { Box, Button, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { CustomFormController } from '../../authentication/customs';
import { FaUserAlt } from 'react-icons/fa';
import LoginHeader from '../../authentication/customs/LoginHeader';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState('');
  const [loading, setLoading] = useState('');

  return (
    <>
      <Box
        w={'100%'}
        h={'100vh'}
        display={'flex'}
        flexDirection={'center'}
        justifyContent={'center'}
      >
        <Center>
          <Box
            w={'400px'}
            h={'40vh'}
            boxShadow={'dark-lg'}
            bg={'white'}
            p={10}
            rounded={5}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <LoginHeader title={'Password Recovery'} />
            <CustomFormController
              isSignup={false}
              title={'Email'}
              type={'Text'}
              value={name}
              placeholder={`Enter email`}
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
            <Box>
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
                mt={10}
              >
                {'Send Recovery'}
              </Button>
              <Button
                width={'100%'}
                bg={'gray'}
                _hover={{
                  bg: 'primary.800',
                }}
                color="white"
                mt={5}
                onClick={() => navigate('/login')}
              >
                {'Back'}
              </Button>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Recovery;
