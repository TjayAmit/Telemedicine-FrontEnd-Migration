import React from 'react';
import {
  Box,
  Text,
  Stack,
  Flex,
  Spacer,
  Button,
  Grid,
  GridItem,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { BiChevronDown } from 'react-icons/bi';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { TiAttachment } from 'react-icons/ti';
import { BiPaperPlane } from 'react-icons/bi';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../Packages';
import { CaseSaveMessageAndPostFileRequest } from '../../api/Case_Request';

const ConsultSendMessage = props => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [sms, SetSms] = useState(null);
  const [validate, setValidate] = useState(false);
  const toast = useToast();
  const [status, setStatus] = useState(false);

  const Max_Count = 5;

  const handleFileUpload = files => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === Max_Count) setFileLimit(true);
        if (uploaded.length > Max_Count) {
          console.log(`you can only add maximum file of ${Max_Count} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      setValidate(false);
      if (sms == '' || sms == null) {
        SetSms('File Attacthments');
      }
    }
  };

  const handleFileEvent = e => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  const HandleSend = async () => {
    if (sms == '' || sms == null) {
      setValidate(true);

      toast({
        title: 'Please Type your Response!',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    } else {
      setStatus(true);
      let bodyform = new FormData();

      selectedFiles.forEach((element, key) => {
        bodyform.append('attachments[]', element, key);
      });

      bodyform.append('message', sms);
      bodyform.append('FK_cases_ID', props.case.data.PK_cases_ID);

      const json = await CaseSaveMessageAndPostFileRequest(bodyform);

      console.log(json);

      if (json.status === 200) {
        toast({
          title: 'Response Sent Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        setSelectedFiles([]);
        SetSms('');
        props.setFetch(true);
      }
      setStatus(false);
    }
  };

  return (
    <div>
      <Text mb={4} fontWeight={'bold'}>
        {props.responses.data.length}
        {props.responses.data.length === 1 ? ' reponse' : ' responses'}
      </Text>
      <Box>
        <Textarea
          placeholder="Type here to response..."
          border={'1px solid'}
          borderColor={'gray.300'}
          focusBorderColor={'unstyled'}
          className={'chatbox'}
          fontSize={14}
          value={sms}
          onChange={e => {
            SetSms(e.target.value);
            e.target.value == '' ? setValidate(true) : setValidate(false);
          }}
        />

        <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={4}>
          {Array.prototype.slice.call(selectedFiles).map((e, key) => {
            return (
              <GridItem w="100%" key={key} colSpan={[5, 5, 2, 1]}>
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
                  className={'attacheditems'}
                >
                  <Flex>
                    <TiAttachment
                      style={{
                        fontSize: '22px',
                        marginRight: '2px',
                      }}
                    />
                    {e.name}
                  </Flex>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Box>

      <Stack direction={'row'} mt={10}>
        <Box>
          <Menu>
            <MenuButton
              fontWeight={'normal'}
              fontSize={'14px'}
              as={Button}
              color={'green.500'}
              rightIcon={<BiChevronDown />}
              size={'sm'}
            >
              Sort by : {props.sort}
            </MenuButton>
            <MenuList fontSize={'14px'} onClick={props.handleSort}>
              <MenuItem value={'Newest'}>Newest</MenuItem>
              <MenuItem value={'Oldest'}>Oldest</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        <Box>
          <Stack direction={['column', 'row']}>
            {selectedFiles.length >= 1 ? (
              <>
                <Button
                  variant={'outline'}
                  size="sm"
                  fontWeight={'normal'}
                  color={'red.300'}
                  onClick={() => {
                    setSelectedFiles([]);
                  }}
                >
                  Cancel{' '}
                  <MdCancel style={{ marginLeft: '3px', fontSize: '20px' }} />
                </Button>
              </>
            ) : (
              <Button
                variant={'outline'}
                size="sm"
                bg={'gray.200'}
                color={'gray.600'}
                fontWeight={'normal'}
                onClick={() => {
                  document.getElementById('file').click();
                }}
              >
                <IoDocumentAttachOutline
                  style={{ fontSize: '20px', marginRight: '3px' }}
                />
                Attach File{' '}
              </Button>
            )}

            <input
              type={'file'}
              id="file"
              name="image"
              style={{ display: 'none' }}
              multiple={true}
              onChange={handleFileEvent}
            />
            <Button
              isLoading={status}
              loadingText={'Submiting'}
              variant="solid"
              size={'sm'}
              colorScheme="green"
              fontWeight={'normal'}
              disabled={validate ? true : false}
              onClick={HandleSend}
            >
              {'Submit'}
              <BiPaperPlane style={{ fontSize: '20px', marginLeft: '5px' }} />
            </Button>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default ConsultSendMessage;
