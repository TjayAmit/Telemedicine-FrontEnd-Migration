import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  Spacer,
} from '@chakra-ui/react';

function CustomeSkeletonLoader(props) {
  return (
    <div>
      <Grid templateColumns={['repeat(8, 1fr)']} gap={5}>
        <GridItem w="100%" colSpan={[8, 8, 8, 8, 6]}>
          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Flex>
                <Skeleton height="20px" w={'30%'} />
                <Spacer />
                <Skeleton height="20px" w={'20%'} />
              </Flex>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Box>

          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Skeleton height="20px" w={'30%'} />

              <Grid templateColumns={['repeat(8, 1fr)']} gap={5}>
                <GridItem colSpan={6}>
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />

                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="60px" w={'100%'} mb={4} />
                </GridItem>
                <GridItem colSpan={2}>
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                  <Skeleton height="20px" mb={2} w={'40%'} />
                  <Skeleton height="20px" w={'50%'} mb={5} />
                </GridItem>
              </Grid>
            </Stack>
          </Box>

          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Skeleton height="80px" w={'100%'} mb={4} />
              <Flex mb={50}>
                <Skeleton height="20px" mb={2} w={'30%'} />
                <Spacer />
                <Skeleton height="20px" mb={2} w={'10%'} />
                <Skeleton height="20px" mb={2} w={'10%'} ml={2} />
              </Flex>
              <Box mt={10}>
                <Flex>
                  <Box>
                    <Skeleton
                      height="50px"
                      mb={2}
                      w={'50px'}
                      borderRadius={200}
                    />
                  </Box>

                  <Box w={'100%'} ml={2}>
                    <Stack>
                      <Skeleton height="20px" w={'10%'} />
                      <Skeleton height="20px" w={'10%'} />
                    </Stack>
                  </Box>
                </Flex>
                <Skeleton height="50px" mb={2} w={'100%'} />
              </Box>

              <Box mt={10}>
                <Flex>
                  <Box>
                    <Skeleton
                      height="50px"
                      mb={2}
                      w={'50px'}
                      borderRadius={200}
                    />
                  </Box>

                  <Box w={'100%'} ml={2}>
                    <Stack>
                      <Skeleton height="20px" w={'10%'} />
                      <Skeleton height="20px" w={'10%'} />
                    </Stack>
                  </Box>
                </Flex>
                <Skeleton height="50px" mb={2} w={'100%'} />
              </Box>
              <Box mt={10}>
                <Flex>
                  <Box>
                    <Skeleton
                      height="50px"
                      mb={2}
                      w={'50px'}
                      borderRadius={200}
                    />
                  </Box>

                  <Box w={'100%'} ml={2}>
                    <Stack>
                      <Skeleton height="20px" w={'10%'} />
                      <Skeleton height="20px" w={'10%'} />
                    </Stack>
                  </Box>
                </Flex>
                <Skeleton height="50px" mb={2} w={'100%'} />
              </Box>
            </Stack>
          </Box>
        </GridItem>
        <GridItem w="100%" colSpan={[8, 8, 8, 8, 2]}>
          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
            </Stack>
          </Box>

          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="60px" mb={5} />
            </Stack>
          </Box>

          <Box
            mt={5}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={10}
            p={5}
            shadow={'md'}
            transition={'all ease-in 1s'}
          >
            <Stack>
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="20px" width={'40%'} />
              <Skeleton height="20px" mb={5} />
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default CustomeSkeletonLoader;
