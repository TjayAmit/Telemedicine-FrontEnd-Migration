import { Box, Button, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GetRequest } from '../../API/api';
import { Case } from '../../API/Paths';
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from 'react-icons/ai';
import { BsImageFill } from 'react-icons/bs';
import { MdVideoLibrary } from 'react-icons/md';
import { RiFolderMusicFill } from 'react-icons/ri';

const CaseParaclinicalFiles = ({ id }) => {
  const [files, setFiles] = useState([]);
  const [feedback, setFeedback] = useState('');

  function retrieveExtension(value, isIcon) {
    const splitString = value.split('/');
    const fileName = splitString[splitString.length - 1];
    const extension = fileName.split('.');

    if (
      extension[1] === 'png' ||
      extension[1] === 'jpg' ||
      extension[1] === 'jpeg'
    ) {
      if (isIcon) {
        return <BsImageFill color="gray" />;
      }
      return 'IMAGE';
    }

    if (extension[1] === 'mp4') {
      if (isIcon) {
        return <MdVideoLibrary color="gray" />;
      }
      return 'VIDEO';
    }

    if (extension[1] === 'docx') {
      if (isIcon) {
        return <AiFillFileWord color="gray" />;
      }
      return 'WORD';
    }

    if (extension[1] === 'ppt') {
      if (isIcon) {
        return <AiFillFilePpt color="gray" />;
      }
      return 'PowerPoint';
    }

    if (extension[1] === 'xls') {
      if (isIcon) {
        return <AiFillFileExcel color="gray" />;
      }
      return 'EXCEL';
    }

    if (extension[1] === 'pdf') {
      if (isIcon) {
        return <AiFillFilePdf color="gray" />;
      }
      return 'PDF';
    }

    if (isIcon) {
      return <AiFillFileUnknown color="gray" />;
    }

    return value === 'NULL' ? 'MISSING' : 'FILE';
  }

  useEffect(() => {
    GetRequest({ url: `${Case}/f/${id}` })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setFiles(res.data);
      })
      .catch(err => {
        const { status, message } = err;

        switch (status) {
          case 400:
            setFeedback(message);
            break;
          case 404:
            setFeedback('No record found.');
            break;
          default:
            setFeedback(message);
            break;
        }
      });
  }, []);

  return (
    <Box w="inherit" h="6rem" mt={5} display="flex" columnGap={5}>
      {files.map(data => {
        if (data.file_url === 'NULL') {
          return;
        }
        return (
          <Box>
            <a href={data.file_url} target="_blank" rel="">
              <Box
                w="8rem"
                pl={5}
                pr={5}
                pt={2}
                pb={2}
                rounded={5}
                boxShadow="sm"
                bg="rgba(0,0,0,0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                columnGap={3}
              >
                {retrieveExtension(data.file_url, true)}
                {retrieveExtension(data.file_url, false)}
              </Box>
            </a>
          </Box>
        );
      })}
    </Box>
  );
};

export default CaseParaclinicalFiles;
