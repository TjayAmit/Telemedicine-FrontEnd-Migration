import React, { useState } from 'react';
import {
  Box,
  Text,
  Container,
  Flex,
  Grid,
  GridItem,
  Avatar,
  Stack,
  Badge,
  Editable,
  EditableInput,
  EditablePreview,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  useToast,
  Center,
} from '@chakra-ui/react';
import useAuth from '../Hooks/AuthContext';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IoKeySharp } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
import { CustomFormController } from '../Components/customs';
import { toastposition, toastvariant } from '../Pages/Packages';
import { FaLock } from 'react-icons/fa';
import { PostRequest } from '../API/api';
import { User } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler'

function MyAccount(props) {
  const toast = useToast();
  const { user } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setConfirmPassword('');
      setPassword('');
      toast({
        title: "Password doesn't match!",
        position: toastposition,
        variant: toastvariant,
        status: 'warning',
        isClosable: true,
      });
      return;
    }

    let msg = '';

    PostRequest({ url: `${User}/change` }, { password: password })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        toast({
          title: 'Password updated!.',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
      })
      .catch(err => {
        msg = StatusHandler(err);
        toast({
          title: msg,
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
      });
  };

  const handleOpenFile = () => {
    document.getElementById('file').click();
  };

  return (
    <div>
      <Container maxW={'container.xl'} mt={20}>
        <Box mt={2} p={[0, 0, 5, 10]}>
          <Flex>
            <Box>
              <Avatar
                size="xl"
                name={user.name}
                src={
                  user.url === 'NONE'
                    ? require('../assets/default_profile.png')
                    : user.url
                }
              />
            </Box>

            <Box ml={4} mt={4}>
              <Stack>
                <Text fontWeight={'bold'} fontSize={16}>
                  {user.name}{' '}
                  <Badge colorScheme="green">
                    <Flex>
                      Verified
                      <AiOutlineCheckCircle
                        style={{ fontSize: '15px', marginTop: '1px' }}
                      />
                    </Flex>
                  </Badge>
                  <br />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 'normal',
                    }}
                  >
                    {user.email}
                  </span>
                  <br />
                </Text>
              </Stack>
              <Button
                fontSize={11}
                fontWeight="normal"
                color={'blue.500'}
                variant={'unstyled'}
                size={'sm'}
                onClick={handleOpenFile}
              >
                <Flex>
                  <MdOutlineFileUpload style={{ fontSize: '13px' }} /> Change
                  Profile Picture
                </Flex>
              </Button>
            </Box>
          </Flex>
          <input
            type={'file'}
            id="file"
            name="image"
            style={{ display: 'none' }}
          />
          <Box p={5} mt={4}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" colSpan={[5, 5, 5, 2]}>
                <Text fontSize={13} color={'gray.500'} mb={2}>
                  Display Name
                </Text>

                <Editable
                  mr={2}
                  defaultValue={user.name}
                  fontSize={15}
                  color={'gray.700'}
                  cursor={'pointer'}
                  mb={4}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                <Text fontSize={13} color={'gray.500'}>
                  Email
                </Text>

                <Editable
                  mr={2}
                  defaultValue={user.email}
                  fontSize={15}
                  color={'gray.700'}
                  cursor={'pointer'}
                  mb={4}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                <Accordion allowMultiple mt={4}>
                  <AccordionItem bg={'blackAlpha.100'} borderRadius={5}>
                    <h5>
                      <AccordionButton>
                        <Box
                          flex="1"
                          textAlign="left"
                          fontSize={14}
                          color={'gray.600'}
                        >
                          <Flex>
                            <IoKeySharp
                              style={{
                                fontSize: '16px',
                                marginTop: '2px',
                                marginRight: '2px',
                              }}
                            />
                            Change Password
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h5>
                    <AccordionPanel pb={4}>
                      <form onSubmit={handleSubmit}>
                        <Box>
                          <CustomFormController
                            isSignup={false}
                            title={'Password'}
                            type={'password'}
                            value={password}
                            placeholder={`Enter new password`}
                            setValue={setPassword}
                            errorMessage={`Password is required.`}
                            isError={null}
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
                          <CustomFormController
                            isSignup={false}
                            title={'Password'}
                            type={'password'}
                            value={confirmPassword}
                            placeholder={`Enter confirm password`}
                            setValue={setConfirmPassword}
                            errorMessage={`Password is required.`}
                            isError={null}
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
                          <Button
                            type="Submit"
                            colorScheme={'blue'}
                            fontWeight={'normal'}
                            bg={'primary.900'}
                            _hover={{
                              bg: 'primary.900',
                            }}
                            _active={{
                              bg: 'primary.900',
                            }}
                            variant={'solid'}
                            size={'sm'}
                            mt={4}
                          >
                            Update password
                          </Button>
                        </Box>
                      </form>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Box mt={5}>
                  <Text fontSize={13} color={'gray.500'}>
                    Hospital
                  </Text>
                  <Text mb={5} fontSize={15}>
                    {user.hospital ?? 'ZCMC'}
                  </Text>
                  {user.skill === null ? null : (
                    <>
                      <Text fontSize={13} color={'gray.500'}>
                        Specialization
                      </Text>
                      <Text fontSize={15}>{user.skill}</Text>
                    </>
                  )}
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default MyAccount;
