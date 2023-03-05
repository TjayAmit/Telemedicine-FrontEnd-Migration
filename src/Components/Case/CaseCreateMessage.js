import { Box, Button, Input } from '@chakra-ui/react';
import { IoMdAddCircle, IoMdSend } from 'react-icons/io';

const CaseCreateMessage = () => {
  return (
    <Box w="100%" h="5rem" m={4}>
      <Box
        w="37%"
        h="4rem"
        bg="white"
        p={2}
        mr={5}
        mb={5}
        bottom="0%"
        position="fixed"
        display="flex"
        columnGap={5}
        rounded={8}
        boxShadow="lg"
        alignItems="center"
      >
        <Button
          leftIcon={<IoMdAddCircle size={40} />}
          bg="transparent"
          color="orange"
          _hover={{ bg: 'white', color: 'skyblue' }}
          rounded={100}
        />
        <Input
          focusBorderColor="white"
          bg="white"
          minW={200}
          maxW={500}
          placeholder="Follow up here."
          rounded={100}
        />
        <Button
          leftIcon={<IoMdSend size={30} />}
          bg="transparent"
          color="gray"
          _hover={{ bg: 'transparent', color: 'green' }}
          rounded={100}
          pr={5}
        />
      </Box>
    </Box>
  );
};

export default CaseCreateMessage;
