import { useEffect, useState, useRef } from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { GetRequest } from '../../API/api';
import { Message } from '../../API/Paths';
import moment from 'moment/moment';
import { BsImageFill } from 'react-icons/bs';
import { MdVideoLibrary } from 'react-icons/md';
import { RiFolderMusicFill } from 'react-icons/ri';
import useCase from '../../Pages/Case SubCollection/CaseContext';
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from 'react-icons/ai';

const MessageFile = props => {
  let ext = props.filename.split('.')[1] ?? 'unknown';

  return (
    <Box w={30} bg="transparent" pl={3} pr={3} rounded={5}>
      <a href={`http://${props.file}`} target="_blank" rel="noreferrer">
        {ext.includes('png') || ext.includes('jpg') ? (
          <BsImageFill size={20} color="gray" />
        ) : ext.includes('mp4') ? (
          <MdVideoLibrary size={20} color="gray" />
        ) : ext.includes('mp3') ? (
          <RiFolderMusicFill size={20} color="gray" />
        ) : ext.includes('docx') ? (
          <AiFillFileWord size={20} color="gray" />
        ) : ext.includes('ppt') ? (
          <AiFillFilePpt size={20} color="gray" />
        ) : ext.includes('pdf') ? (
          <AiFillFilePdf size={20} color="gray" />
        ) : ext.includes('pdf') ? (
          <AiFillFileExcel size={20} color="gray" />
        ) : ext.includes('unknown') ? null : (
          <AiFillFileUnknown size={20} color="gray" />
        )}
      </a>
    </Box>
  );
};

const MessageComponent = ({
  value: {
    data: { PK_hospital_ID, hospital_Name, comment, name, created_at, profile },
    files,
  },
}) => {
  return (
    <Box
      w="100%"
      float={PK_hospital_ID === 1 ? 'right' : 'left'}
      display="flex"
      flexDirection={PK_hospital_ID === 1 ? 'row-reverse' : 'row'}
      alignItems="center"
      p={3}
      columnGap={5}
      mb={5}
    >
      <Avatar src={profile} name={name} size="sm" />
      <Box>
        <Box>
          <Box dir={PK_hospital_ID === 1 ? 'rtl' : 'none'}>
            <Text fontSize={12}>
              {hospital_Name} - {name}
            </Text>
            <Text
              w={'auto'}
              bg="white"
              p={3}
              rounded={10}
              boxShadow="md"
              dir="ltr"
            >
              {comment}
            </Text>
          </Box>
          <Text dir="none" float="right" fontSize={11} color="gray">
            {moment(created_at).startOf('hour').fromNow()}
          </Text>
        </Box>
        <Box w="inherit" mt={2} display="flex" flexWrap="wrap" columnGap={3}>
          {files.map(file => {
            let desctuctureFileURL = file.file_url.split('/');
            return (
              <MessageFile
                file={file.file_url}
                filename={
                  file.file_url === null
                    ? 'File Missing.'
                    : desctuctureFileURL[desctuctureFileURL.length - 1]
                }
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const CaseMessage = props => {
  const [messages, setMessages] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [init, setInit] = useState(true);
  const messageRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  const { fetchMessage } = useCase();

  const handleInitialization = () => {
    GetRequest({ url: `${Message}/${props.id}` })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const { data } = res;
        if (data.length === messages.length) {
          return;
        }
        if (data.length === messages.length) {
          return;
        }
        setMessages(data);
      })
      .catch(err => {
        const { status } = err;
        switch (status) {
          case 400:
            setFeedback("Can't complete request right now. try again later.");
            break;
          case 404:
            setFeedback('No record found.');
            break;
          default:
            setFeedback("Can't process request right now. Try again later");
            break;
        }
      });
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (init) {
          setInit(false);
        }
        if (fetchMessage) {
          props.setFetchMessage(false);
        }
        handleInitialization();
      },
      init ? 0 : 6000
    );

    return () => clearInterval(intervalId);
  }, [init, props.fetchMessage]);

  useEffect(() => {
    if (fetch) {
      messageRef.current?.scrollIntoView();
    }

    return () => setFetch(false);
  }, [messages]);

  return (
    <Box
      w="inherit"
      h={['35vh', '50vh', '90vh', '90vh']}
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Text mt={5} textAlign="center" color="gray">
          {moment(props.date).format('MMMM DD, YYYY')}
        </Text>
      </Box>
      <Box mt="3rem" scrollBehavior="smooth">
        {messages.map(value => {
          return <MessageComponent value={value} />;
        })}
      </Box>
      <Box h={0} ref={messageRef} />
    </Box>
  );
};

export default CaseMessage;
