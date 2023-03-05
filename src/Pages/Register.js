import { useState } from 'react';
import { LoginHeader, CustomFormController } from '../Components/customs.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/AuthContext.js';
import '../Style/App.css';
import {
  Box,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import {
  SelectionHospital,
  SelectionSpecialization,
} from '../Components/CustomSelection.js';
import { PostRequest } from '../API/api.js';
import { Auth, User } from '../API/Paths.js';

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [badRequest, setBadRequest] = useState('');
  const [emailEx, setEmailEx] = useState(false);
  const [nameEx, setNameEx] = useState(false);
  const [passwordEx, setPasswordEx] = useState(false);
  const [passwordVEx, setPasswordVEx] = useState(false);
  const [fnameEx, setFnameEx] = useState(false);
  const [lnameEx, setLnameEx] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [profile, setProfile] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [FK_specializations_ID, setFK_specializations_ID] = useState('');
  const [FK_hospital_ID, setFK_hospital_ID] = useState('');

  const successFeedBack =
    'Your account is pending for approval. Please wait patiently or contact ZCMC Telemedicine doctors and request for approval to activate your account. Thank You!';

  const accountExist =
    'Email Already been use. use another email in order to create an account.';

  const badFeedBack =
    'A problem occure on Registering your account please check for internet connection, and if problem persist please report to ZCMC Telemedicine. Thank You!';

  const [header, setHeader] = useState('Registration Success');
  const [feedback, setFeedback] = useState(successFeedBack);

  const { setUser } = useAuth();

  const handleNavigateToLogin = e => {
    e.preventDefault();

    navigate('/login');
  };

  const resetStates = () => {
    setEmail('');
    setName('');
    setProfile('');
    setFirstname('');
    setLastname('');
    setFK_hospital_ID('');
    setFK_specializations_ID('');
    setPassword('');
    setPasswordV('');
  };

  const handleSubmitRegistration = async e => {
    e.preventDefault();
    setLoading(true);

    let formdata = new FormData();

    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('profile', profile);
    formdata.append('profile_FirstName', firstname);
    formdata.append('profile_LastName', lastname);
    formdata.append('FK_hospital_ID', FK_hospital_ID);
    formdata.append(
      'FK_specializations_ID',
      FK_hospital_ID === '1' ? FK_specializations_ID : null
    );

    PostRequest({ url: `${Auth}/signup` }, formdata)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad resposne.', { cause: res });
        }
        setHeader('Register Successfully');
        setFeedback(successFeedBack);
        onOpen();
        resetStates();
      })
      .catch(err => {
        const {
          response: {
            data: { message },
            status,
          },
        } = err;
        console.log(status);
        switch (status) {
          case 400:
            setHeader('Registration Failed.');
            setFeedback(badFeedBack);
            break;
          case 409:
            setHeader('Already Exist');
            setFeedback(message);
            break;
          default:
            setHeader('Registration Failed.');
            setFeedback(badFeedBack);
            break;
        }
        onOpen();
      });

    setLoading(false);
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
        w="100%"
        h="100vh"
        display={'flex'}
        justifyContent={'center'}
        bg={'#f7f5f9'}
      >
        <Box
          w="40rem"
          h={['58rem', '54rem', '38rem', '38rem']}
          overflow="hidden"
          m={'auto'}
          bg={'white'}
          pt={10}
          pr={8}
          pl={8}
          rounded={15}
          boxShadow="lg"
        >
          <LoginHeader title={'Sign Up'} />
          {badRequest === '' ? <Text color={'red'}>{badRequest}</Text> : null}
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
                  value={firstname}
                  placeholder={`Enter First Name`}
                  setValue={setFirstname}
                  errorMessage={`First name is required.`}
                  isError={fnameEx}
                  children={null}
                />
                <CustomFormController
                  isSignup={true}
                  title={'Last name'}
                  type={'Text'}
                  value={lastname}
                  placeholder={`Enter Last name`}
                  setValue={setLastname}
                  errorMessage={`Last name is required.`}
                  isError={lnameEx}
                />
                {
                  <SelectionHospital
                    value={FK_hospital_ID}
                    setValue={setFK_hospital_ID}
                    mt={'1.14rem'}
                  />
                }
                {FK_hospital_ID === '1' ? (
                  <SelectionSpecialization
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
                    isError={emailEx}
                  />
                  <CustomFormController
                    isSignup={true}
                    title={'Username'}
                    type={'text'}
                    value={name}
                    placeholder={'Enter username'}
                    setValue={setName}
                    errorMessage={'Username is required.'}
                    isError={nameEx}
                  />
                  <CustomFormController
                    isSignup={true}
                    title={'Password'}
                    type={'password'}
                    value={password}
                    placeholder={'Enter password'}
                    setValue={setPassword}
                    errorMessage={'Password is required.'}
                    isError={passwordEx}
                  />
                  {
                    <CustomFormController
                      isSignup={true}
                      title={'Confirm Password'}
                      type={'password'}
                      value={passwordV}
                      placeholder={'Type password again'}
                      setValue={setPasswordV}
                      errorMessage={'Confirm password is required.'}
                      isError={passwordVEx}
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
      </Box>
    </>
  );
};

export default Register;
