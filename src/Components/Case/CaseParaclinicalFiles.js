import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GetRequest } from '../../API/api';
import { Case } from '../../API/Paths';

const CaseParaclinicalFiles = ({ id }) => {
  const [files, setFiles] = useState([]);
  const [feedback, setFeedback] = useState('');

  // useEffect(() => {
  //   GetRequest({ url: `${Case}/f/${id}` })
  //     .then(res => res.data)
  //     .then(res => {
  //       if (!res.statusText === 'OK') {
  //         throw new Error('Bad response.', { cause: res });
  //       }

  //       setFiles(res.data);
  //     })
  //     .catch(err => {
  //       const { status, message } = err;

  //       switch (status) {
  //         case 400:
  //           setFeedback(message);
  //           break;
  //         case 404:
  //           setFeedback('No record found.');
  //           break;
  //         default:
  //           setFeedback(message);
  //           break;
  //       }
  //     });
  // }, []);

  return (
    <Box w="inherit" h="6rem">
      {files.map(data => {
        if (data.file_url === 'NULL') {
          return;
        }
        return (
          <Box>
            <Text key={data.PK_file_ID}>
              {data.file_url.includes('jpg') ? 'IMAGE' : data.file_url}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default CaseParaclinicalFiles;
