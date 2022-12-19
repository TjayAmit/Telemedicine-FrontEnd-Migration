import { MdMenu, MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BiCodeBlock } from 'react-icons/bi';
import '../../../App.css';
import '../../Sidebar.css';
import {
  Box,
  Heading,
  Avatar,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Grid,
  GridItem,
  Text,
  Stack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';

import useAuth from '../../context/AuthContext';
import { useProSidebar } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import ProfileDrawer from './ProfileDrawer';
import { useState } from 'react';
import { toastposition, toastvariant, CustomModal } from '../Packages';

const UpdateProfile = ({ isOpen, onClose }) => {
  const title = 'Change Profile Picture';
  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const { resetState, registerStaff } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    setLoader(true);

    const res = await registerStaff();

    if (res !== 'successs') {
      toast({
        title: 'Something went wrong!',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    }

    if (res === 'success') {
      onClose();
      toast({
        title: 'Navigator registered!.',
        position: toastposition,
        variant: toastvariant,
        status: 'success',
        isClosable: true,
      });
      resetState();
      fetch(true);
    }
    setLoader(false);
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={'Save'}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 1 , 1fr)`}
          templateColumns={`repeat( 2 , 1fr)`}
          gap={2}
          overflow={'hidden'}
        >
          <GridItem rowSpan={1} colSpan={1}></GridItem>
        </Grid>
      </CustomModal>
    </>
  );
};

const Homeheader = ({ flip, setflip }) => {
  const { user, setUser } = useAuth();
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const { isOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = () => {
    setflip(!flip);
    toggleSidebar();
    collapseSidebar();
  };

  const signOutUser = e => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    setUser({
      loggedIn: false,
    });
  };

  return (
    <>
      <Box
        w={'100%'}
        h={'50px'}
        p={2}
        display={'flex'}
        justifyContent={'space-between'}
        boxShadow={'lg'}
        className={'header'}
      >
        <Box
          transform={'translateY(20%)'}
          cursor={'pointer'}
          onClick={() => handleClick()}
        >
          <Flex>
            <Box id="btnflip" style={{ marginLeft: flip ? '70px' : '' }}>
              {flip ? <MdClose size={28} /> : <MdMenu size={28} />}
            </Box>
            <Box ml={2}>
              {!flip ? (
                <Heading
                  fontSize={17}
                  mt={1}
                  fontWeight={'bolder'}
                  color={'#0F531E'}
                  display={['block', 'block', 'none']}
                >
                  TeleMedicine
                </Heading>
              ) : (
                ''
              )}
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex mr={0} p={1} columnGap={3}>
            <Heading
              transform={'translateY(20%)'}
              size={'sm'}
              fontWeight={'normal'}
              fontSize={'15'}
              mr={1}
            >
              {user.name}
            </Heading>
            <Box>
              <Menu>
                <MenuButton className="">
                  <button id="">
                    <Avatar
                      size="sm"
                      src={
                        user.url === 'NONE'
                          ? require('../../../assets/default_profile.png')
                          : user.url
                      }
                      name={user.name}
                    />
                  </button>
                </MenuButton>

                <MenuList shadow={'lg'}>
                  <Box p={7} bg={'green.50'}>
                    <Flex>
                      <Box>
                        <Avatar
                          size="lg"
                          src={
                            user.url === 'NONE'
                              ? require('../../../assets/default_profile.png')
                              : user.url
                          }
                          name={user.name}
                        />
                      </Box>
                      <Box ml={4}>
                        <Stack>
                          <Text fontWeight={'bold'} fontSize={13}>
                            {user.name}

                            {user.skill === null ? null : (
                              <>
                                <br />
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 'normal',
                                  }}
                                >
                                  {user.skill}
                                </span>
                              </>
                            )}
                            <br />
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 'normal',
                                textTransform: 'uppercase',
                              }}
                            >
                              {user.hospital ?? 'ZCMC'}
                            </span>
                          </Text>
                        </Stack>
                      </Box>
                    </Flex>
                  </Box>
                  <div style={{ border: '1px solid #d1eae5' }}></div>

                  <ProfileDrawer />

                  <MenuItem
                    onClick={() => {
                      navigate('MyAccount');
                    }}
                    fontSize={14}
                    color={'gray.600'}
                  >
                    <FiSettings style={{ marginRight: '10px' }} />
                    Account Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate('/credits');
                    }}
                    fontSize={14}
                    color={'gray.600'}
                  >
                    <BiCodeBlock style={{ marginRight: '10px' }} />
                    Credits
                  </MenuItem>

                  <MenuItem
                    bg={'gray.50'}
                    fontSize={14}
                    color={'red.400'}
                    onClick={e => signOutUser(e)}
                  >
                    <AiOutlineLogout style={{ marginRight: '10px' }} />
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
      </Box>
      <UpdateProfile isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Homeheader;
