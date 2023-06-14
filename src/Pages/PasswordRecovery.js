import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
} from '@chakra-ui/react';
import AuthBackground from '../Components/AuthModule/AuthBackground';
import AuthHeader from '../Components/AuthModule/AuthHeader';
import AuthFooter from '../Components/AuthModule/AuthFooter';
import { CustomFormController } from '../Components/customs';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { PostRequest } from '../API/api';
import { Auth } from '../API/Paths';
import { HiEmojiSad } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

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

const FormController = ({
  isSignup,
  title,
  type,
  value,
  placeholder,
  setValue,
  errorMessage,
  isError,
  children,
  mt,
  isRequired,
}) => {
  const [show, setShow] = useState(false);

  const handleOnChange = e => {
    let textInput = e.target.value;
    setValue(textInput.trim());
  };

  return (
    <>
      <FormControl
        marginTop={mt}
        isInvalid={isError}
        border={'red'}
        isRequired={isRequired}
      >
        <FormLabel fontSize={'14'} fontWeight="500" color={'#272727'}>
          {title}
        </FormLabel>
        <InputGroup>
          {isSignup ? null : (
            <InputLeftElement pointerEvents="none" children={children} />
          )}
          <Input
            onPaste={e => (type === 'password' ? e.preventDefault() : null)}
            type={type !== 'password' ? type : show ? 'text' : type}
            value={value}
            placeholder={placeholder}
            fontSize={13}
            bg="white"
            boxShadow="sm"
            focusBorderColor={'rgba(0, 128, 128,0.5)'}
            onChange={e => handleOnChange(e)}
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [feedback, setFeedback] = useState('');

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');

  const [emailExc, setEmailExc] = useState('');
  const [passExc, setPassExc] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setLoading(true);

    PostRequest({ url: `${Auth}/recovery` }, { email: email })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }

        setSuccess(res.data);
        console.log(res.data);
      })
      .catch(err => {
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
          default:
            setFeedback(message);
            break;
        }
      });
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
                  pt={[2, 2, 0, 8]}
                  pr={10}
                  pb={3}
                  h={['70vh', '70vh', '50vh', '70vh']}
                >
                  <AuthHeader title="Recover Account" />
                  <Box
                    w={'inherit'}
                    h={'inherit'}
                    display={'flex'}
                    flexDirection={'column'}
                    mt={'4rem'}
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
                          <HiEmojiSad size={25} />
                          <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                        </Flex>
                        <IconButton
                          bg="red"
                          _hover={{ bg: 'red' }}
                          _active={{ bg: 'red' }}
                          icon={<IoClose size={30} />}
                          onClick={() => setFeedback('')}
                        />
                      </Flex>
                    </Box>
                    <Text fontSize={12} color={'grey'}>
                      A recovery link will be sent to your email that is binded
                      with your account. Upon submitting open your Gmail app on
                      your phone or signin you Gmail account in Google chome and
                      check your inbox for recovery Link. Click the link and it
                      will redirect to a change password to update your account
                      password.
                    </Text>
                    {success ? (
                      <CustomFormController
                        isSignup={false}
                        type={'text'}
                        title={''}
                        value={code}
                        setValue={setCode}
                        placeholder={'Enter code'}
                        errorMessage={emailExc}
                        isError={false}
                        mt={5}
                        children={
                          <Box
                            w="3rem"
                            bg="teal"
                            p="0.64rem"
                            mt={0.49}
                            ml={2.5}
                            borderRight={'1px solid rgba(0,0,0,0.1)'}
                            borderTopLeftRadius={5}
                            borderBottomLeftRadius={5}
                          >
                            <Center>
                              <Text
                                color="white"
                                fontSize={12}
                                fontWeight={600}
                              >
                                CODE
                              </Text>
                            </Center>
                          </Box>
                        }
                      />
                    ) : (
                      <CustomFormController
                        isSignup={false}
                        type={'text'}
                        title={''}
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
                              <MdEmail color="teal" size={15} />
                            </Center>
                          </Box>
                        }
                      />
                    )}

                    <Button
                      isLoading={loading}
                      loadingText={'Signing In'}
                      mt={14}
                      bg={'teal'}
                      color={'white'}
                      _hover={{ bg: 'teal' }}
                      onClick={e => handleClick(e)}
                    >
                      <Text>Send Code</Text>
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
