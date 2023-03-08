import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import CustomFormController from '../Components/customs/CustomFormController';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostRequest } from '../API/api';
import { Auth } from '../API/Paths';
import AuthHeader from '../Components/AuthModule/AuthHeader';
import AuthBackground from '../Components/AuthModule/AuthBackground';
import AuthFooter from '../Components/AuthModule/AuthFooter';

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

const Registration = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultProfileURL = `${window.location.origin}/default_profile.png`;
  const [feedbackTitle, setFeedBackTitle] = useState('');
  const [feedbackDescription, setFeedBackDescription] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedback, setFeedback] = useState('');

  const [emailExc, setEmailExc] = useState('');
  const [passExc, setPassExc] = useState('');

  const [loading, setLoading] = useState(false);

  const validatePasword = () => password === confirmPassword;

  const resultFeedBack = () => {
    setTimeout(() => {
      setLoading(false);
      onOpen();
    }, [200]);
  };

  const reset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignup = e => {
    e.preventDefault();
    setLoading(true);

    if (validatePasword) {
      let bodyForm = new FormData();
      bodyForm.append('name', username);
      bodyForm.append('email', email);
      bodyForm.append('password', password);
      bodyForm.append('url', defaultProfileURL);

      PostRequest({ url: `${Auth}/signup` }, bodyForm)
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response', { cause: res });
          }

          navigate('/account', {
            replace: true,
            state: { id: res.data.data, password: password, message: '' },
          });
          reset();
        })
        .catch(err => {
          switch (err) {
            case 400:
              setFeedBackTitle('A problem encounter. Try again later.');
              setFeedBackDescription(err.response.data.message);
              break;
            case 409:
              setFeedBackTitle('Account Found.');
              setFeedBackDescription(
                'It seems that there is already an registered account with the given email or username.' +
                  '\nUsername must be unique and email must only be use to one account.'
              );
              break;
            default:
              setFeedBackTitle("Can't register account. Try again later.");
              setFeedBackDescription(err.response.data.message);
              break;
          }
          resultFeedBack();
        });
      setLoading(false);
    }
  };

  const handleNavigate = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <>
      <Feedback
        title={feedbackTitle}
        description={feedbackDescription}
        onClose={onClose}
        isOpen={isOpen}
      />
      <Box
        w={'100%'}
        h={'100vh'}
        bg={'rgba(0,0,0,0.1)'}
        position={'absolute'}
        backgroundImage={'linear-gradient(#B0F3F1,#FFCFDF)'}
      >
        <Box
          w={'60%'}
          h={'70%'}
          left={'50%'}
          top={'50%'}
          transform="translate(-50%, -50%)"
          position={'absolute'}
          boxShadow={'2xl'}
          rounded={15}
          overflow={'hidden'}
        >
          <Grid
            templateRows={'repeat(1, 1fr)'}
            templateColumns="repeat(12, 1fr)"
          >
            <GridItem rowSpan={1} colSpan={7}>
              <AuthBackground />
            </GridItem>
            <GridItem colSpan={5}>
              <Box w={'100%'} h={'100%'} bg={'whiteAlpha.600'}>
                <Flex
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  pl={10}
                  pt={8}
                  pr={10}
                  pb={3}
                  h={'70vh'}
                >
                  <AuthHeader title={'Sign up'} />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={'2rem'}
                  >
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={username}
                      setValue={setUsername}
                      placeholder={'Username'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={5}
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={true}
                      type={'text'}
                      title={''}
                      value={email}
                      setValue={setEmail}
                      placeholder={'Email'}
                      errorMessage={emailExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={true}
                      type={'password'}
                      title={''}
                      value={password}
                      setValue={setPassword}
                      placeholder={'Password'}
                      errorMessage={passExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <CustomFormController
                      isSignup={true}
                      type={'password'}
                      title={''}
                      value={confirmPassword}
                      setValue={setConfirmPassword}
                      placeholder={'Confirm password'}
                      errorMessage={passExc}
                      isError={false}
                      mt={3}
                      isRequired={false}
                    />
                    <Button
                      isLoading={loading}
                      loadingText={'Signing In'}
                      mt={14}
                      bg={'teal'}
                      color={'white'}
                      _hover={{ bg: 'teal' }}
                      onClick={e => handleSignup(e)}
                    >
                      <Text>Register</Text>
                    </Button>
                    <Button
                      bg={'gray'}
                      color={'white'}
                      mt={3}
                      _hover={{
                        bg: 'darkorange',
                      }}
                      onClick={e => handleNavigate(e)}
                    >
                      <Text>Sign In</Text>
                    </Button>
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
