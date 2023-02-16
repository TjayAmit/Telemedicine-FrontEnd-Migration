import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Flex,
  Text,
  Avatar,
  Box,
  Stack,
  Heading,
  Center,
  MenuItem,
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineCheckCircle } from 'react-icons/ai';
import useAuth from '../Hooks/AuthContext';

function ProfileDrawer(props) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <MenuItem onClick={onOpen}>
        <Text
          ref={btnRef}
          variant={'unstyled'}
          fontSize={14}
          color={'gray.600'}
          fontWeight={'normal'}
        >
          <Flex>
            <AiOutlineUser style={{ marginRight: '10px' }} /> View Profile
          </Flex>
        </Text>
      </MenuItem>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt={10}>
            <Flex>
              <Avatar
                size="lg"
                name={user.name}
                src={
                  user.url === 'NONE'
                    ? require('../Assets/default_profile.png')
                    : user.url
                }
              />
              <Box ml={4}>
                <Stack>
                  <Text fontWeight={'bold'} fontSize={16}>
                    <Flex>
                      {user.name}{' '}
                      <AiOutlineCheckCircle
                        style={{
                          marginLeft: '4px',
                          color: '#48BB78',
                          fontSize: '17px',
                          marginTop: '2px',
                        }}
                      />
                    </Flex>

                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 'normal',
                      }}
                    >
                      Internal Medicine
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                      }}
                    >
                      Zamboanga city medical center
                    </span>
                  </Text>
                </Stack>
              </Box>
            </Flex>
            <div
              style={{ borderBottom: '1px solid #CBD5E0', marginTop: '10px' }}
            ></div>
            <Center
              mt={10}
              color={'blackAlpha.600'}
              textTransform={'uppercase'}
            >
              <Stack spacing="40px">
                <Box>
                  <Text fontWeight={'bold'}>Total Patients</Text>
                  <Heading
                    bg={'green.100'}
                    p={2}
                    borderRadius={5}
                    fontWeight={'bold'}
                    color={'gray.500'}
                    textAlign={'center'}
                  >
                    0
                  </Heading>
                </Box>

                <Box>
                  <Text fontWeight={'bold'}>Total Cases</Text>
                  <Heading
                    bg={'green.100'}
                    p={2}
                    borderRadius={5}
                    fontWeight={'bold'}
                    color={'gray.500'}
                    textAlign={'center'}
                  >
                    0
                  </Heading>
                </Box>
              </Stack>
            </Center>
          </DrawerBody>

          <DrawerFooter>
            <Button
              size={'sm'}
              variant="outline"
              mr={3}
              colorScheme={'green'}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProfileDrawer;
