import {
  Box,
  Button,
  Flex,
  Text,
  Grid,
  GridItem,
  IconButton,
  Heading,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
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
import { useLocation } from 'react-router-dom';
import { CustomFormController } from '../Components/customs';
import { IoClose } from 'react-icons/io5';
import { HiEmojiSad } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';

const AccountRegistration = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState('');

  const message = '';

  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [hospital, setHospital] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [position, setPosition] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToLogin = e => {
    e.preventDefault();
    navigate('/login', { replace: true });
  };

  const resetState = () => {
    setFname('');
    setMname('');
    setLname('');
  };

  const handleUserInformation = async e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    let bodyForm = new FormData();
    bodyForm.append('id', state.id);
    bodyForm.append('firstname', fname);
    bodyForm.append('middlename', mname);
    bodyForm.append('lastname', lname);
    bodyForm.append('hospital', hospital);
    bodyForm.append('position', position);
    bodyForm.append('specialization', specialization);
    bodyForm.append('password', state.password);

    PostRequest({ url: `${Auth}/account` }, bodyForm)
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        resetState();
        setSuccess(true);
        setFeedback('Registered successfully, Wait for approval.');
        setLoading(false);
      })
      .catch(err => {
        const {
          response: {
            data: { message },
            status,
          },
        } = err;

        switch (status) {
          case 400:
            setFeedback(message);
            break;
          default:
            setFeedback(message);
            break;
        }

        setSuccess(false);
        setLoading(false);
      });
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
            ZCMC REGIONAL TELEMEDICINE CENTER
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
                  pt={[2, 2, 2, 8]}
                  pr={10}
                  pb={3}
                  h={['70vh', '70vh', '50vh', '70vh']}
                >
                  <AuthHeader title={'User information'} />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={message === '' ? '2rem' : '0'}
                  >
                    <Box
                      bg={success ? 'green' : 'red'}
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
                          {success ? (
                            <BsCheckCircleFill size={25} />
                          ) : (
                            <HiEmojiSad size={25} />
                          )}
                          <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                        </Flex>
                        <IconButton
                          bg={success ? 'green' : 'red'}
                          icon={<IoClose size={30} />}
                          onClick={() => setFeedback('')}
                        />
                      </Flex>
                    </Box>
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={fname}
                      setValue={setFname}
                      placeholder={'First name'}
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
                      mt={3}
                      isRequired={false}
                    />
                    <Select
                      mt={5}
                      bg="white"
                      focusBorderColor="rgba(0, 128, 128,0.5)"
                      placeholder="Position"
                      onChange={e => {
                        setPosition(e.target.value);
                      }}
                    >
                      <option>Doctor</option>
                      <option>Nurse</option>
                      <option>Physical Therapist</option>
                    </Select>
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
                    {success ? (
                      <Button
                        mt={14}
                        bg={'teal'}
                        color={'white'}
                        _hover={{ bg: 'teal' }}
                        onClick={e => navigateToLogin(e)}
                      >
                        <Text>{success ? 'Go to Login' : 'Save'}</Text>
                      </Button>
                    ) : (
                      <Button
                        isLoading={loading}
                        loadingText={'Saving'}
                        mt={14}
                        bg={'teal'}
                        color={'white'}
                        _hover={{ bg: 'teal' }}
                        isDisabled={
                          fname === '' ||
                          mname === '' ||
                          lname === '' ||
                          hospital === ''
                        }
                        onClick={e => handleUserInformation(e)}
                      >
                        <Text>{success ? 'Go to Login' : 'Save'}</Text>
                      </Button>
                    )}
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
