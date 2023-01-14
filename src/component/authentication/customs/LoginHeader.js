import {
  Flex,
  Text,
  Heading,
  Image,
  Grid,
  GridItem,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import { Login } from '../Login';

const LoginHeader = ({ title }) => {
  // single media query with no options
  const [isLargerThan720] = useMediaQuery('(min-width: 393px)');

  return (
    <>
      <Grid
        h={'80px'}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={2}
        overflow={'hidden'}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Image
            w={isLargerThan720 ? '50px' : '50px'}
            h={'66px'}
            src={require('../../../assets/zcmc_logo.png')}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={2} columnGap={5}>
          <Flex direction={'column'} verticalAlign={'space-between'}>
            <Box h={'8'} mt={1}>
              <Heading fontSize="26px" fontWeight={'600'}>
                {title}
              </Heading>
            </Box>
            <Box h={'10'} mt={1}>
              <Text fontSize="15" color={'#505050'}>
                Enter your credentials to continue
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default LoginHeader;
