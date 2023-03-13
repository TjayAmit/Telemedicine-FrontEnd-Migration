import { Box, Heading, Text } from '@chakra-ui/react';
import { GiAutoRepair } from 'react-icons/gi';
import './style.css';

const Maintainance = () => {
  return (
    <Box w="100%" h="100vh">
      <Box className="main" columnGap={5}>
        <GiAutoRepair size={'20rem'} color="orange" />
        <Box textAlign={'start'} color="gray">
          <Text fontSize={30}>Zamboanga City Medical Center Telemedicine</Text>
          <Text fontSize={100} fontWeight={600} letterSpacing={2}>
            System Maintainance
          </Text>
          <Text fontSize={30}>Have a time with Family.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Maintainance;
