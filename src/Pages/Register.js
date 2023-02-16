import { useState } from 'react';
import { LoginHeader, CustomFormController } from '../Components/customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/AuthContext.js';
import '../Style/App.css';
import {
  Flex,
  Box,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
  useToast,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CustomSelection,
  CustomSelectionS,
} from '../Components/CustomSelection.js';

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

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const successFeedBack =
    'Your account is pending for approval. Please wait patiently or contact ZCMC Telemedicine doctors and request for approval to activate your account. Thank You!';

  const accountExist =
    'Email Already been use. use another email in order to create an account.';

  const badFeedBack =
    'A problem occure on Registering your account please check for internet connection, and if problem persist please report to ZCMC Telemedicine. Thank You!';

  const [header, setHeader] = useState('Registration Success');
  const [feedback, setFeedback] = useState(successFeedBack);

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

  const handleNavigateToLogin = e => {
    e.preventDefault();

    navigate('/login');
  };

  const handleSubmitRegistration = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await register();

    if (res === 'success') {
      setHeader('Register Successfully');
      setFeedback(successFeedBack);
      onOpen();
      resetState();
    } else if (res === 'already exist') {
      setHeader('Opps! Something went wrong.');
      setFeedback(accountExist);
      onOpen();
    } else {
      setHeader('Opps! Something went wrong.');
      setFeedback(badFeedBack);
      onOpen();
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
        <Feedback
          isOpen={isOpen}
          onClose={onClose}
          header={header}
          feedback={feedback}
        />
        <Box
          w={'40rem'}
          h={['58rem', '54rem', '38rem', '38rem']}
          overflow="hidden"
          className="authbox"
          m={'auto'}
          bg={'white'}
        >
          <LoginHeader title={'Sign Up'} />
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
                    value={FK_hospital_ID}
                    setValue={setFK_hospital_ID}
                    mt={'1.14rem'}
                  />
                }
                {FK_hospital_ID === '1' ? (
                  <CustomSelectionS
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
