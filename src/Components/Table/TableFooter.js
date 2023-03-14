import { Box, Text, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';

const TableFooter = props => {
  return (
    <Flex justifyContent={'end'} mt={5}>
      <Box id="">
        <Tooltip label="First Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={() => props.gotoPage(0)}
            isDisabled={!props.canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={props.previousPage}
            isDisabled={!props.canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Box>

      <Box bg={'white.200'} p={2} borderRadius={5}>
        <Flex>
          <Box fontSize={13}>Page</Box>
          <Text fontWeight="bold" fontSize={13} ml={2} as="span">
            {props.pageIndex + 1}
          </Text>
          <Box ml={2} fontSize={13} w={'2rem'}>
            of
          </Box>

          <Text fontSize={13} fontWeight="bold" as="span">
            {props.pageOptions.length}
          </Text>
        </Flex>
      </Box>

      <Box id="">
        <Tooltip label="Next Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={props.nextPage}
            isDisabled={!props.canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={() => props.gotoPage(props.pageCount - 1)}
            isDisabled={!props.canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default TableFooter;
