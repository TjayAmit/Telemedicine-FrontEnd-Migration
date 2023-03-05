import {
  Badge,
  Box,
  Heading,
  IconButton,
  Select,
  Text,
} from '@chakra-ui/react';
import { IoArrowBackOutline } from 'react-icons/io5';
import '../../Style/Consult.css';
import { FaHospital, FaBriefcaseMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GiSkills } from 'react-icons/gi';

const ConsultHeader = props => {
  const navigate = useNavigate();

  const handleBack = e => {
    navigate('/case');
  };

  return (
    <Box
      w="inherit"
      h="4rem"
      bg="white"
      pl={5}
      pr={5}
      zIndex={99}
      display="flex"
      columnGap={5}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={'md'}
    >
      <IconButton
        size="lg"
        icon={<IoArrowBackOutline fontSize={25} />}
        rounded={25}
        _hover={{ bg: 'green', color: 'white', boxShadow: 'lg' }}
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
          <FaBriefcaseMedical /> CASE #{props.id}
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
      <Box fontWeight={800} className="selection-main">
        <Box className="selection-header">
          <Badge
            colorScheme={props.status === 2 ? 'blue' : 'green'}
            fontSize={20}
          >
            <Text color={props.status === 2 ? 'darkblue' : 'green'}>
              {props.status === 2 ? 'DONE' : 'ACTIVE'}
            </Text>
          </Badge>
        </Box>
        <Box className="selection-list">
          <Select placeholder="ACTIVE">
            <option value="option2">DONE</option>
            <option value="option2">ADD SPECIALIZATION</option>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultHeader;
