import { CiBellOn } from 'react-icons/ci';
import { IconButton, Box, Center, Text } from '@chakra-ui/react';
import useAuth from '../Hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate = useNavigate();
  const { cases } = useAuth();

  const handleClick = e => {
    e.preventDefault();
    navigate('case');
  };

  const filtered = cases.filter(filter =>
    filter.cases_status === 2 ? null : filter
  );

  return (
    <IconButton
      mt={-1}
      rounded={100}
      _hover={{ bg: 'green.100' }}
      bg={'white'}
      onClick={e => handleClick(e)}
    >
      <Center>
        <Box w={4} h={4} rounded={10} bg={'green'} ml={4} mb={3} zIndex={'99'}>
          <Text color={'white'} mt={'2px'} fontSize={10}>
            {filtered.length}
          </Text>
        </Box>
        <Box position={'absolute'} zIndex="1">
          <CiBellOn size={30} />
        </Box>
      </Center>
    </IconButton>
  );
};

export default Notification;
