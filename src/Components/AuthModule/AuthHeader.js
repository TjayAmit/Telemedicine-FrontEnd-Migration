import { Box, Image, Flex, Text, Heading } from '@chakra-ui/react';

const AuthHeader = ({ title }) => {
  return (
    <Box mt={5}>
      <Flex columnGap={5}>
        <Box>
          <Image
            w="60px"
            h={'80px'}
            src={require('../../assets/zcmc_logo.png')}
          />
        </Box>
        <Box mt={4}>
          <Flex direction={'column'} justifyContent={'end'}>
            <Heading fontSize="26px" color="teal">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray">
              Enter your credentials to continue.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthHeader;
