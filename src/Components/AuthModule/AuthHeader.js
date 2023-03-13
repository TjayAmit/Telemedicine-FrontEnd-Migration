import { Box, Image, Flex, Text, Heading } from '@chakra-ui/react';

const AuthHeader = ({ title }) => {
  return (
    <Box mt={5}>
      <Flex columnGap={5}>
        <Box>
          <Image
            w={['50px', '50px', '60px', '60px']}
            h={['70px', '70px', '80px', '80px']}
            src={require('../../assets/zcmc_logo.png')}
          />
        </Box>
        <Box mt={[3, 3, 4, 4]}>
          <Flex direction={'column'} justifyContent={'end'}>
            <Heading
              size={['md', 'md', 'lg', 'lg']}
              fontSize="26px"
              color="teal"
            >
              {title}
            </Heading>
            <Text fontSize={[13, 13, 14, 14]} color="gray">
              Enter your credentials to continue.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthHeader;
