import { useEffect, useState } from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { GetRequest } from '../../API/api';
import { Message } from '../../API/Paths';
import moment from 'moment/moment';

const MessageFile = props => {
  return (
    <Box w={props.filename.length * 12} bg="gray.200" pl={3} pr={3} rounded={5}>
      <Text>{props.filename}</Text>
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
      <Avatar src={profile} name="Tristan" size="sm" />
      <Box>
        <Box>
          <Box dir={PK_hospital_ID === 1 ? 'rtl' : 'none'}>
            <Text fontSize={12}>
              {hospital_Name} - {name}
            </Text>
            <Box
              w={600}
              maxW={1000}
              bg="white"
              p={3}
              rounded={10}
              boxShadow="md"
            >
              <Text>{comment}</Text>
            </Box>
          </Box>
          <Text dir="none" float="right" fontSize={11} color="gray">
            {moment(created_at).startOf('hour').fromNow()}
          </Text>
        </Box>
        <Box w="inherit" mt={2} display="flex" flexWrap="wrap" columnGap={3}>
          {files.map(file => {
            let desctuctureFileURL = file.file_url.split('/');
            // console.log(desctuctureFileURL[desctuctureFileURL.length - 1]);
            return (
              <MessageFile
                filename={
                  !!file.file_url
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
  const [init, setInit] = useState(true);

  const handleInitialization = () => {
    GetRequest({ url: `${Message}/${props.id}` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const {
          data: { data },
        } = res;
        setMessages(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (init) {
      setInit(false);
    }

    handleInitialization();

    return () => setInit(false);
  }, [init]);

  return (
    <Box
      w="inherit"
      h="90vh"
      overflow="auto"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Text mt={5} textAlign="center" color="gray">
          {moment(props.date).format('MMMM DD, YYYY')}
        </Text>
      </Box>
      <Box mt="12rem">
        {messages.map(value => {
          return <MessageComponent value={value} />;
        })}
      </Box>
    </Box>
  );
};

export default CaseMessage;
