import React from 'react';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { AiOutlineInfoCircle, AiOutlineDelete } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { PutRequest } from '../API/api';
import { Case } from '../API/Paths';
import { StatusHandler } from '../Utils/StatusHandler';
import {
  Box,
  Text,
  Heading,
  Flex,
  Spacer,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';

const ConsultClientInfo = ({ userinfo, addinfo, caseinfo, onOpen }) => {
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    let msg = '';
    let formData = new FormData();
    formData.append('cases_status', caseinfo[0].cases_status === 1 ? 2 : 1);
    formData.append('PK_cases_ID', caseinfo[0].PK_cases_ID);

    PutRequest({ url: `${Case}/status` }, formData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        navigate('/h/case', { replace: true });
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
  };

  return (
    <Stack>
      <Flex mt={4}>
        <Button
          fontWeight={'normal'}
          fontSize={14}
          color={'gray.600'}
          size={'sm'}
          variant={'outline'}
          mb={1}
          onClick={() => {
            navigate('/h/case');
          }}
        >
          Back
        </Button>
        <Spacer />
        <Menu>
          <MenuButton
            fontWeight={'normal'}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            fontSize="14px"
            size={'sm'}
            variant={'outline'}
            borderColor={'gray.300'}
          >
            Actions
          </MenuButton>
          <MenuList color={'blackAlpha.700'} fontSize={14}>
            <MenuItem icon={<AddIcon w={'0.7rem'} />} onClick={onOpen}>
              Add Sub-Service
            </MenuItem>
            <MenuItem
              icon={<VscActivateBreakpoints w={'0.7rem'} />}
              onClick={e => handleSubmit(e)}
            >
              {caseinfo[0].cases_status === 1 ? 'Deactivate' : 'Activate'}
            </MenuItem>
            <MenuItem icon={<BsDownload w={'0.7rem'} />}>
              Download File
            </MenuItem>
            <MenuItem color={'red.400'} icon={<AiOutlineDelete w={'0.7rem'} />}>
              Delete Case
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box
        border={'1px'}
        borderColor={'gray.300'}
        borderRadius={10}
        p={5}
        shadow={'md'}
        transition={'all ease-in 1s'}
      >
        {/*      */}

        {caseinfo.map(x => {
          return (
            <>
              <Flex>
                <Heading fontSize={18} textTransform={'uppercase'}>
                  {x.patient}
                  <br />
                  <span
                    key={x.in}
                    style={{
                      fontWeight: 'normal',
                      fontSize: '13px',
                      color: 'gray',
                    }}
                  >
                    Case ID # {x.cases_No}
                  </span>
                </Heading>
                <Spacer />
                <Box mr={[0, 0, 20]}>
                  <Flex>
                    <Text fontSize={14}>Status : </Text>
                    <Badge
                      ml={[1, 1, 2]}
                      variant="subtle"
                      colorScheme={
                        x.cases_status === 1
                          ? 'green'
                          : x.cases_status === 0
                          ? 'red'
                          : 'blue'
                      }
                    >
                      {x.cases_status === 1
                        ? 'ACTIVE'
                        : x.cases_status === 0
                        ? 'PENDING'
                        : 'DONE'}
                    </Badge>
                  </Flex>
                </Box>
              </Flex>

              <Accordion allowToggle>
                <AccordionItem mt={4}>
                  <h2>
                    <AccordionButton>
                      <Box textAlign="left" fontSize={14} color={'gray.600'}>
                        <Flex>
                          <AiOutlineInfoCircle
                            style={{ marginRight: '5px', marginTop: '3px' }}
                          />
                          Additional Information
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={5}>
                      <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
                        {addinfo.map(e => {
                          return (
                            e.grid == 1 && (
                              <>
                                {Object.keys(x).map(dt => {
                                  if (dt == Object.keys(e)[3]) {
                                    return (
                                      <>
                                        <Flex mb={4}>
                                          <Text
                                            color={'grey'}
                                            fontSize={14}
                                            fontStyle={'italic'}
                                          >
                                            {e.type}
                                          </Text>
                                          <Text
                                            color={'gray.600'}
                                            fontSize={14}
                                            ml={10}
                                          >
                                            {x[dt]}
                                          </Text>
                                        </Flex>
                                      </>
                                    );
                                  }
                                })}
                              </>
                            )
                          );
                        })}
                      </GridItem>

                      <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
                        {addinfo.map(e => {
                          return (
                            //Missing Guardian , Relation
                            e.grid == 2 && (
                              <>
                                {Object.keys(x).map(dt => {
                                  if (dt == Object.keys(e)[3]) {
                                    return (
                                      <>
                                        <Flex mb={4}>
                                          <Text
                                            color={'grey'}
                                            fontSize={14}
                                            fontStyle={'italic'}
                                          >
                                            {e.type}
                                          </Text>
                                          <Text
                                            color={'gray.600'}
                                            fontSize={14}
                                            ml={10}
                                          >
                                            {x[dt]}
                                          </Text>
                                        </Flex>
                                      </>
                                    );
                                  }
                                })}
                              </>
                            )
                          );
                        })}
                      </GridItem>
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ConsultClientInfo;
