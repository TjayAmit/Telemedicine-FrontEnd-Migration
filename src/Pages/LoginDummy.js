import { Box, Flex, Image } from '@chakra-ui/react';

const LoginDummy = () => {
  return (
    <Box w="100%" h="100vh">
      <Flex>
        <Box w="inherit" p={5}>
          <Box h={'94vh'} backgroundSize="contain" overflow={'hidden'}>
            <Image src={require('../assets/zcmc-bg1.png')} />
          </Box>
        </Box>
        <Box bg="red"></Box>
      </Flex>
    </Box>
  );
};

export default LoginDummy;
