import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, useToast, Flex } from '@chakra-ui/react';
import { IoMdAddCircle, IoMdSend } from 'react-icons/io';
import { toastposition, toastvariant } from '../../Pages/Packages';
import { PostRequest } from '../../API/api';
import { Message } from '../../API/Paths';
import { IoCloseSharp } from 'react-icons/io5';
import { BsImageFill } from 'react-icons/bs';
import { MdVideoLibrary } from 'react-icons/md';
import { RiFolderMusicFill } from 'react-icons/ri';
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from 'react-icons/ai';
import '../../Style/Consult.css';

const Files = props => {
  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    props.selectedFiles.splice(index, 1);
  };

  return (
    <Box h="2rem" bg="transparent" display="flex" columnGap={3}>
      {Array.prototype.slice.call(props.selectedFiles).map((e, index) => {
        let ext = e.name.split('.')[1];
        return (
          <Box
            w="3.5rem"
            bg={'blackAlpha.200'}
            p={0.5}
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
              {ext.toLowerCase().includes('png') ||
              ext.toLowerCase().includes('jpg') ? (
                <BsImageFill size={25} color="gray" />
              ) : ext.toLowerCase().includes('mp4') ? (
                <MdVideoLibrary size={20} color="gray" />
              ) : ext.toLowerCase().includes('mp3') ? (
                <RiFolderMusicFill size={20} color="gray" />
              ) : ext.toLowerCase().includes('docx') ? (
                <AiFillFileWord size={20} color="gray" />
              ) : ext.toLowerCase().includes('ppt') ? (
                <AiFillFilePpt size={20} color="gray" />
              ) : ext.toLowerCase().includes('pdf') ? (
                <AiFillFilePdf size={20} color="gray" />
              ) : ext.toLowerCase().includes('pdf') ? (
                <AiFillFileExcel size={20} color="gray" />
              ) : (
                <AiFillFileUnknown size={25} color="gray" />
              )}
              <Box onClick={e => handleRemoveFile(e, index)}>
                <IoCloseSharp fontSize={15} />
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

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
      if (message === '' || message == null) {
        setMessage('File Attacthments');
      }
    }
  };

  const handleFileEvent = e => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  const handleSendMessage = async e => {
    e.preventDefault();
    if (message === '' && selectedFiles.length === 0) {
      console.log('exit early');
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
        props.setFetchMessage(true);
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

  return (
    <Box w="100%" h="7.8rem" m={4} display="flex" flexDirection="column">
      <Files selectedFiles={selectedFiles} />
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
        overflow="hidden"
      >
        <Button
          leftIcon={<IoMdAddCircle size={40} />}
          bg="transparent"
          color="gray"
          rounded={100}
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
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
        <Box
          h={message.includes('\n') ? '3rem' : '2rem'}
          className="message-input-container"
        >
          <Textarea
            size="sm"
            variant="flushed"
            placeholder="Type here."
            focusBorderColor="white"
            className="message-input"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </Box>
        <Button
          leftIcon={<IoMdSend size={30} />}
          bg="transparent"
          color={!!message || selectedFiles.length !== 0 ? 'green' : 'gray'}
          rounded={100}
          pr={5}
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          className="message-button-send"
          onClick={e => handleSendMessage(e)}
        />
      </Box>
    </Box>
  );
};

export default CaseCreateMessage;
