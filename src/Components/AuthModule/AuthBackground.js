import { Box, Heading } from '@chakra-ui/react';

const AuthBackground = () => {
  return (
    <Box
      w={'100%'}
      h={['30vh', '30vh', '20vh', '80vh']}
      backgroundImage={require('../../assets/zcmc-bg1.png')}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      display={['none', 'none', 'block', 'block']}
    >
      <Box w={'100%'} h={'100vh'} bg={'rgba(0,0,0,0.2)'}>
        <Box p={[1, 1, 1, 5]} color={'white'} textAlign={'center'}>
          <Heading mt={10} size={'lg'} letterSpacing={'0.34rem'}>
            ZCMC TELEMEDICINE
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthBackground;
