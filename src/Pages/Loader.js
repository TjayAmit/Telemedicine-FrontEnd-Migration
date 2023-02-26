import React from 'react';
import { Center, Box, Flex, Image } from '@chakra-ui/react';
import loaderlogo from '../assets/zcmc_logo.png';
import '../Style/loader.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Box w={'100%'} h={'100vh'}>
      <Center>
        <Flex
          h={'100vh'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={10}
        >
          <Box w={'100px'} h={'100px'}>
            <Image src={loaderlogo} id="imgloader" />
          </Box>
          <Box w={'100px'} mt={'1'}>
            <Center>
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#34e15e"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </Center>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default Loader;
