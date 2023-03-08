import {
  Box,
  Button,
  Center,
  Heading,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import AuthBackground from '../Components/AuthModule/AuthBackground';
import AuthHeader from '../Components/AuthModule/AuthHeader';
import AuthFooter from '../Components/AuthModule/AuthFooter';
import { CustomFormController } from '../Components/customs';
import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Feedback = props => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>
          <Text>{props.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>
            <Text>Close</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [feedbackTitle, setFeedBackTitle] = useState('');
  const [feedbackDescription, setFeedBackDescription] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailExc, setEmailExc] = useState('');
  const [passExc, setPassExc] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Called');
      onOpen();
      setFeedBackTitle('Account Registered');
      setFeedBackDescription('Please wait for approval of your account.');
    }, [1000]);
  };

  const handleNavigateToLogin = e => {
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
            templateRows={'repeat(2, 1fr)'}
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
                  <AuthHeader title="Recover Account" />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={'4rem'}
                  >
                    <Text fontSize={12} color={'grey'}>
                      A recovery link will be sent to your email that is binded
                      with your account. Upon submitting open your Gmail app on
                      your phone or signin you Gmail account in Google chome and
                      check your inbox for recovery Link. Click the link and it
                      will redirect to a change password to update your account
                      password.
                    </Text>
                    <CustomFormController
                      isSignup={false}
                      type={'text'}
                      title={'Email'}
                      value={email}
                      setValue={setEmail}
                      placeholder={'Email'}
                      errorMessage={emailExc}
                      isError={false}
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
                    />
                    <Button
                      isLoading={loading}
                      loadingText={'Signing In'}
                      mt={14}
                      bg={'teal'}
                      color={'white'}
                      _hover={{ bg: 'teal' }}
                      onClick={e => handleClick(e)}
                    >
                      <Text>Send Recovery Link</Text>
                    </Button>
                    <Button
                      bg={'gray'}
                      color={'white'}
                      mt={3}
                      _hover={{
                        bg: 'darkorange',
                      }}
                      onClick={e => handleNavigateToLogin(e)}
                    >
                      <Text>Back</Text>
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

export default PasswordRecovery;
