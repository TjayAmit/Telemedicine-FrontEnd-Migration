import React from 'react';

import {
  Box,
  Text,
  Stack,
  Flex,
  Spacer,
  Avatar,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';
import { TiAttachment } from 'react-icons/ti';
import 'react-awesome-slider/dist/styles.css';
import moment from 'moment';

const ConsultMessages = props => {
  if (props.messages.data.length === 0 || props.messages.data === undefined) {
    return (
      <Box w={'100%'} h={'100%'} display={'flex'} justifyContent={'center'}>
        <Center>
          <Text fontWeight={'600'} color={'grey'}>
            {'NO MESSAGES AT THE MOMENT'}
          </Text>
        </Center>
      </Box>
    );
  }

  const fetch = () => {
    if (props.decending === false) {
      return props.messages.data.sort(
        (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
      );
    }

    return props.messages.data.sort(
      (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
    );
  };

  return fetch().map(e => (
    <>
      <Box borderTop={'1px solid #CBD5E0'} borderRadius={5}>
        <Flex mt={4}>
          <Avatar name="Dan Abrahmov" src={e.profile} />
          <Text ml={3} fontSize={15} color={'gray.600'} fontWeight={'bold'}>
            <Stack direction={'column'} spacing={-1}>
              <Flex>{e.name}</Flex>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                }}
              >
                {e.specialization_name}
                <br />
                {e.hospital_Name}
              </span>
            </Stack>
          </Text>
          <Spacer />
          <Text float={'right'} fontSize={12} color={'gray.600'}>
            {moment(e.created_at).fromNow()}
          </Text>
        </Flex>

        <Box p={5}>
          <Text fontSize={15}>{e.comment}</Text>
          {/* File Attachments */}

          {/* {props.messages.files.length === 0 ? null : <HundleCouresel />} */}
          {props.messages.files.length === 0 ? null : (
            <Box bg={'gray.200'} mt={2} p={3} overflow={'hidden'}>
              <Text color={'gray.500'} fontSize={13} fontWeight={'normal'}>
                Attached Files
              </Text>

              <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={4}>
                {props.messages.files.map(value => {
                  const fileName = value.file_url.split('/');
                  return value.FK_message_ID === e.PK_message_ID ? (
                    <GridItem w="100%">
                      <Box
                        bg={'blackAlpha.200'}
                        p={1}
                        fontSize={13}
                        color={'blue.900'}
                        textAlign={'center'}
                        borderRadius={'5'}
                        cursor={'pointer'}
                        border={'1px solid'}
                        borderColor={'gray.400'}
                      >
                        <a
                          href={
                            value.file_url[1] === 't'
                              ? value.file_url
                              : value.file_url.substring(
                                  1,
                                  value.file_url.length - 1
                                )
                          }
                          rel="noreferrer"
                          download={
                            value.file_url[1] === 't'
                              ? value.file_url
                              : value.file_url.substring(
                                  1,
                                  value.file_url.length - 1
                                )
                          }
                          target="_blank"
                        >
                          <Flex>
                            <TiAttachment
                              style={{
                                fontSize: '20px',
                                marginRight: '5px',
                              }}
                            />
                            {fileName[fileName.length - 1].split('.')[1] ===
                              'jpg' ||
                            fileName[fileName.length - 1].split('.')[1] ===
                              'png' ||
                            fileName[fileName.length - 1].split('.')[1] ===
                              'jpeg'
                              ? 'Image'
                              : 'File'}
                          </Flex>
                        </a>
                      </Box>
                    </GridItem>
                  ) : null;
                })}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </>
  ));
};

export default ConsultMessages;
