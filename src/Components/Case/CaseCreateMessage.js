import { useState, useEffect } from 'react';
import { Box, Button, Input, useToast, Flex } from '@chakra-ui/react';
import { IoMdAddCircle, IoMdSend } from 'react-icons/io';
import { toastposition, toastvariant } from '../../Pages/Packages';
import { PostRequest } from '../../API/api';
import { Message } from '../../API/Paths';
import { TiAttachment } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import '../../Style/Consult.css';

const CaseCreateMessage = props => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [message, setMessage] = useState('');
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
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      setValidate(false);
      if (message == '' || message == null) {
        setMessage('File Attacthments');
      }
    }
  };

  const handleFileEvent = e => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  const HandleSendMessage = async () => {
    if (!!message && selectedFiles.length === 0) {
      return;
    }

    setStatus(true);
    let bodyform = new FormData();

    selectedFiles.forEach((element, key) => {
      bodyform.append('attachments[]', element, key);
    });

    bodyform.append('message', message);
    bodyform.append('FK_cases_ID', props.id);

    PostRequest({ url: Message }, bodyform)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        toast({
          title: 'Response Sent Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        setSelectedFiles([]);
        setMessage('');
      })
      .catch(err => {
        let messageErr = '';
        switch (err) {
          case 400:
            messageErr = "Can't complete process. Try again later.";
            break;
          default:
            messageErr = "Can't upload rigth now. try again later.";
            break;
        }
        toast({
          title: messageErr,
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
      });

    setStatus(false);
  };

  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    selectedFiles.splice(index, 1);
  };

  useEffect(() => {}, [selectedFiles]);

  return (
    <Box w="100%" h="7.8rem" m={4} display="flex" flexDirection="column">
      <Box h="2rem" bg="transparent" display="flex" columnGap={3}>
        {Array.prototype.slice.call(selectedFiles).map((e, index) => {
          return (
            <Box
              w="6.5rem"
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
              <Flex columnGap={2}>
                <TiAttachment
                  style={{
                    fontSize: '22px',
                    marginRight: '2px',
                  }}
                />
                {e.name.split('.')[1] === 'jpg' ||
                e.name.split('.')[1] === 'png' ||
                e.name.split('.')[1] === 'jpeg'
                  ? 'IMAGE'
                  : e.name.split('.')[1] === 'mp4'
                  ? 'VIDEO'
                  : 'FILE'}
                <Box onClick={e => handleRemoveFile(e, index)}>
                  <IoCloseSharp fontSize={20} />
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Box>
      <Box
        w="37%"
        h="4rem"
        bg="white"
        p={2}
        mr={5}
        mb={5}
        mt={2}
        bottom="0%"
        position="fixed"
        display="flex"
        columnGap={5}
        rounded={8}
        boxShadow="lg"
        alignItems="center"
        className="message"
      >
        <Button
          leftIcon={<IoMdAddCircle size={40} />}
          bg="transparent"
          color="gray"
          rounded={100}
          className="message-button-plus"
          onClick={() => {
            document.getElementById('file').click();
          }}
        />
        <input
          type={'file'}
          id="file"
          name="image"
          style={{ display: 'none' }}
          multiple={true}
          onChange={handleFileEvent}
        />
        <Input
          focusBorderColor="white"
          bg="white"
          minW={200}
          maxW={500}
          placeholder="Follow up here."
          rounded={100}
          className="message-input"
        />
        <Button
          leftIcon={<IoMdSend size={30} />}
          bg="transparent"
          color="gray"
          rounded={100}
          pr={5}
          className="message-button-send"
        />
      </Box>
    </Box>
  );
};

export default CaseCreateMessage;
