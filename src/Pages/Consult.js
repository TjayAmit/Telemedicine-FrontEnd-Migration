import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import ConsultClientInfo from '../Components/ConsultClientInfo';
import ConsultSendMessage from '../Components/ConsultSendMessage';
import {
  UserInfo,
  AddInfo,
  MainInfo,
  refInfo,
  followups,
} from './ComponentData/ConsultData';
import { TitleColor, toastposition, toastvariant } from '../Pages/Packages';
import ConsultInfoMain from '../Components/ConsultInfoMain';
import ConsultMessages from '../Components/ConsultMessages';
import ConsultRefInfo from '../Components/ConsultRefInfo';
import ConsultFollowUpInfo from '../Components/ConsultFollowUpInfo';
import CustomModal from '../Components/CustomModal';
import {CustomSelectionS} from '../Components/CustomSelection'
import CustomeSkeletonLoader from '../Components/CustomeSkeletonLoader';
import { useLocation } from 'react-router-dom';
import { Specialization, Case, Message } from '../API/Paths';
import { GetRequest, PutRequest } from '../API/api';
import StatusHandler from '../Utils/StatusHandler';

const AddModal = ({ isOpen, onClose, fetch, caseID }) => {
  const title = 'ADD Specialization';
  const [FK_specializations_ID, setFK_specializations_ID] = useState('');
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    let msg = '';
    let formData = new FormData();
    formData.append('FK_specializations_ID', FK_specializations_ID);
    formData.append('FK_cases_ID', caseID);

    PutRequest({ url: `${Specialization}case/add` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        fetch(true);

        toast({
          title: 'Added Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
      })
      .catch(err => {
        msg = StatusHandler(err);
        toast({
          title: 'Failed to add specialization!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={'Save'}
      >
        <CustomSelectionS
          title={'Specialization'}
          value={FK_specializations_ID}
          setValue={setFK_specializations_ID}
          mt={5}
        />
      </CustomModal>
    </>
  );
};

const Consult = props => {
  const [sort, setSort] = useState('Newest');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [decending, setDecending] = useState(true);
  const location = useLocation();
  const json = location.state;

  const [caseinfo, setCaseInfo] = useState(location.state.rawData);

  const [load, setLoad] = useState(true);

  const [fetch, setFetch] = useState(true);
  const [messages, setMessages] = useState([]);

  const handleSort = e => {
    setSort(e.target.value);
    setDecending(!decending);
  };

  const handleUpdateCase = async () => {
    if (caseinfo[0].cases_status === 0) {
      let msg = '';
      let formData = new FormData();
      formData.append('PK_cases_ID', caseinfo[0].PK_cases_ID);
      formData.append('cases_status', 1);

      PutRequest({ url: `${Case}/status` }, formData)
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response.', { cause: res });
          }

          caseinfo[0].cases_status = 1;
          console.log(res.data.data);
        })
        .catch(err => {
          msg = StatusHandler(err);
        });
    }
  };

  const requestMessages = async () => {
    let msg = '';
    GetRequest(
      { url: `${Message}s` },
      {
        id: caseinfo[0].PK_cases_ID,
      }
    )
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setMessages(res.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
        setMessages([]);
      });
  };

  useEffect(() => {
    setFetch(false);
    requestMessages();
  }, [fetch]);

  useEffect(() => {
    handleUpdateCase();
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [load]);

  return (
    <>
      <Container maxW={'container.xxl'} pt={[1, 5, 10]}>
        <Box mt={2} p={[0, 0, 5, 3]}>
          <Flex gap={3}>
            <Center w={'60px'} h={'60px'} bg={'#92e3a9'} borderRadius={'10'}>
              <svg
                color="#0f531e"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="70%"
                width="70%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="448"
                  height="352"
                  x="32"
                  y="112"
                  fill="none"
                  stroke-linejoin="round"
                  stroke-width="32"
                  rx="48"
                  ry="48"
                ></rect>
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M144 112V80a32 32 0 0132-32h160a32 32 0 0132 32v32m-112 96v160m80-80H176"
                ></path>
              </svg>
            </Center>
            <Flex w={'100%'} h={'60px'} alignItems={'center'}>
              <Text fontWeight={'bold'} fontSize={20} color={TitleColor}>
                Consultations
              </Text>
            </Flex>
          </Flex>

          {load ? (
            <CustomeSkeletonLoader />
          ) : (
            <Grid templateColumns={['repeat(8, 1fr)']} gap={5}>
              <GridItem w="100%" colSpan={[8, 8, 8, 8, 6]}>
                <ConsultClientInfo
                  userinfo={UserInfo}
                  addinfo={AddInfo}
                  caseinfo={caseinfo}
                  onOpen={onOpen}
                />
                <ConsultInfoMain maininfo={MainInfo} caseinfo={caseinfo} />

                <Box
                  mt={5}
                  border={'1px'}
                  borderColor={'gray.300'}
                  borderRadius={10}
                  p={[2, 2, 5, 5]}
                  shadow={'md'}
                  transition={'all ease-in 1s'}
                >
                  <ConsultSendMessage
                    responses={messages}
                    case={json}
                    handleSort={handleSort}
                    sort={sort}
                    setFetch={setFetch}
                    decending={decending}
                  />

                  <Box
                    p={5}
                    mt={5}
                    height={['700px', '700px', '600px', 'auto']}
                    overflowY={['scroll', 'none', 'none', 'auto']}
                  >
                    <ConsultMessages
                      messages={messages}
                      decending={decending}
                    />
                  </Box>
                </Box>
              </GridItem>
              <GridItem w="100%" colSpan={[8, 8, 8, 8, 2]}>
                <ConsultRefInfo
                  serviceType={'Internal Medicine'}
                  refinfo={refInfo}
                  caseinfo={caseinfo}
                />
                <ConsultFollowUpInfo followups={followups} />
              </GridItem>
            </Grid>
          )}
        </Box>
      </Container>
      <AddModal
        isOpen={isOpen}
        onClose={onClose}
        fetch={fetch}
        caseID={caseinfo[0].PK_cases_ID}
      />
    </>
  );
};

export default Consult;
