import {
  Badge,
  Box,
  Button,
  IconButton,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoArrowBackOutline } from 'react-icons/io5';
import '../../Style/Consult.css';
import { FaHospital, FaBriefcaseMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GiSkills } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { PutRequest } from '../../API/api';
import { Case } from '../../API/Paths';
import useAuth from '../../Hooks/AuthContext';

const ConsultHeader = props => {
  const { user } = useAuth();

  const [isPending, setIsPending] = useState(props.status === 0 ? true : false);
  const [status, setStatus] = useState(props.status);
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const handleBack = e => {
    e.preventDefault();
    navigate(-1);
  };

  const handleUpdate = value => {
    PutRequest(
      { url: `${Case}/status` },
      {
        cases_status: value,
        PK_cases_ID: props.id,
      }
    )
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setStatus(value);
      })
      .catch(err => {
        const { status, message } = err;

        switch (status) {
          case 400:
            setFeedback(message);
            break;
          case 404:
            setFeedback(message);
            break;
          default:
            setFeedback(message);
            break;
        }
      });
  };

  const handleShowModal = e => {};

  useEffect(() => {
    if (isPending) {
      handleUpdate(1);
    }

    return () => setIsPending(false);
  }, []);

  return (
    <Box
      w="inherit"
      h="4rem"
      bg="white"
      pl={5}
      pr={5}
      pt={1}
      zIndex={99}
      display="flex"
      columnGap={5}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={'md'}
    >
      <IconButton
        size="lg"
        bg="white"
        icon={<IoArrowBackOutline fontSize={25} />}
        rounded={25}
        _hover={{ color: 'green', boxShadow: 'lg' }}
        onClick={e => handleBack(e)}
      />
      {user.user_role === 'External Doctor' ? (
        <Box />
      ) : (
        <Box fontWeight={800} display="flex" columnGap={5} alignItems="center">
          <Box className="selection-header">
            <Badge
              colorScheme={
                status === 1 ? 'green' : status === 2 ? 'blue' : 'gray'
              }
              fontSize={20}
            >
              <Text
                color={
                  status === 1 ? 'green' : status === 2 ? 'darkblue' : 'grey'
                }
                fontSize={18}
              >
                {status === 1 ? 'ACTIVE' : status === 2 ? 'DONE' : 'PENDING'}
              </Text>
            </Badge>
          </Box>
          <Box className="selection-list">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontSize={14}
              >
                ACTIONS
              </MenuButton>
              <MenuList fontSize={14}>
                {status === 2 || status === 0 ? (
                  <MenuItem onClick={_ => handleUpdate(1)}>ACTIVE</MenuItem>
                ) : (
                  <MenuItem onClick={_ => handleUpdate(2)}>DONE</MenuItem>
                )}
                <MenuItem onClick={e => handleShowModal(e)}>
                  Add Specialization
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ConsultHeader;
