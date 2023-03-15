import { Badge, Box, IconButton, Select, Text } from '@chakra-ui/react';
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
  console.log(props);
  const { user } = useAuth();
  const selectionList = [
    {
      key: 0,
      name: 'PENDING',
      value: 0,
      action: 'update',
    },
    {
      key: 1,
      name: 'ACTIVE',
      value: 1,
      action: 'activate',
    },
    {
      key: 2,
      name: 'DONE',
      value: 2,
      action: 'deactivate',
    },
  ];

  const [selected, setSelected] = useState(selectionList[props.status]);
  const [feedback, setFeedback] = useState('');
  const [update, setUpdate] = useState(true);

  const navigate = useNavigate();

  const handleSelection = e => {
    e.preventDefault();
    setSelected(selectionList[e.target.value]);
    handleUpdate(selectionList[e.target.value].key);
  };

  const handleBack = e => {
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
        console.log('success');
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

  useEffect(() => {
    if (update) {
      setUpdate(false);
    }

    if (props.status === 0) {
      handleUpdate(1);
    }

    return () => setUpdate(false);
  }, [update]);

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
      <Box display="flex" columnGap={10}>
        <Text
          size="md"
          fontWeight={600}
          color="green"
          display="flex"
          alignItem="center"
          columnGap={2}
        >
          <FaBriefcaseMedical /> CASE #{props.casenumber}
        </Text>
        <Text color="gray" display="flex" columnGap={2} alignItems="center">
          <GiSkills />
          {props.specialization.toLocaleUpperCase()}
        </Text>
        <Text color="gray" display="flex" columnGap={2}>
          <FaHospital />
          {props.hospital.toLocaleUpperCase()}
        </Text>
      </Box>
      {user.user_role === 'External Doctor' ? (
        <Box />
      ) : (
        <Box fontWeight={800} className="selection-main">
          <Box className="selection-header">
            <Badge
              colorScheme={
                selected.value === 1
                  ? 'green'
                  : selected.value === 2
                  ? 'blue'
                  : 'gray'
              }
              fontSize={20}
            >
              <Text
                color={
                  selected.value === 1
                    ? 'green'
                    : selected.value === 2
                    ? 'darkblue'
                    : 'grey'
                }
              >
                {selected.name}
              </Text>
            </Badge>
          </Box>
          <Box className="selection-list">
            <Select
              placeholder={selected.name}
              onChange={e => handleSelection(e)}
            >
              {selectionList.map(data =>
                data.name === selected.name ||
                data.name === 'PENDING' ? null : (
                  <option key={data.key} value={data.value}>
                    {data.name}
                  </option>
                )
              )}
            </Select>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ConsultHeader;
