import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, useToast, useDisclosure } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../Pages/Packages';
import CustomModal from '../Components/CustomModal';
import { SelectionSpecialization } from '../Components/CustomSelection';
import { useLocation } from 'react-router-dom';
import { Specialization, Case } from '../API/Paths';
import { PutRequest } from '../API/api';
import StatusHandler from '../Utils/StatusHandler';
import ConsultHeader from '../Components/Case/ConsultHeader';
import CaseInformation from '../Components/Case/CaseInformation';
import CaseCreateMessage from '../Components/Case/CaseCreateMessage';
import CaseMessage from '../Components/Case/CaseMessage';
import useAuth from '../Hooks/AuthContext';

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
        <SelectionSpecialization
          title={'Specialization'}
          value={FK_specializations_ID}
          setValue={setFK_specializations_ID}
          mt={5}
        />
      </CustomModal>
    </>
  );
};

const MessageComponentHeader = () => {
  return (
    <Box
      w="inheirt"
      h={['3rem', '3rem', '4rem', '4rem']}
      bg="#edeff3"
      boxShadow="lg"
      p={5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading size={['sm', 'sm', 'md', 'md']} color="green">
        {'Case Chat'.toLocaleUpperCase()}
      </Heading>
    </Box>
  );
};

const Consult = () => {
  const { user } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [fetchMessage, setFetchMessage] = useState(true);
  const [msg, setMsg] = useState('');
  const [sort, setSort] = useState('Newest');
  const [decending, setDecending] = useState(true);
  const location = useLocation();
  const json = location.state;

  const [caseinfo, setCaseInfo] = useState(location.state);
  const [load, setLoad] = useState(true);

  const handleUpdateCase = async () => {
    if (caseinfo.cases_status === 0) {
      let msg = '';
      let formData = new FormData();
      formData.append('PK_cases_ID', caseinfo[0].PK_cases_ID);
      formData.append('cases_status', 1);

      PutRequest({ url: `${Case}/status` }, formData)
        .then(res => {
          if (!res.statusText === 'OK') {
            throw new Error('Bad response.', { cause: res });
          }

          caseinfo.cases_status = 1;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (user.user_role !== 'External Doctor') {
      handleUpdateCase();
    }

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [load]);

  return (
    <>
      <Flex
        w="inherit"
        overflow={['visible', 'visible', 'hidden', 'hidden']}
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <Box w="inherit" flex={8}>
          <ConsultHeader
            id={caseinfo.id}
            casenumber={caseinfo.case_number}
            specialization={caseinfo.specialization}
            hospital={caseinfo.hospital_Name}
            status={caseinfo.case_status}
          />
          <CaseInformation id={caseinfo.id} data={caseinfo} />
        </Box>
        <Box
          w="inherit"
          flex={5}
          bg="#edf0f6"
          h={['35vh', '35vh', '90vh', '100vh']}
          overflow={['visible', 'visible', 'hidden', 'hidden']}
          display="flex"
          flexDirection="column"
        >
          <MessageComponentHeader />
          <CaseMessage
            id={caseinfo.id}
            date={caseinfo.date}
            fetchMessage={fetchMessage}
            setFetchMessage={setFetchMessage}
          />
          <CaseCreateMessage
            id={caseinfo.id}
            setFetchMessage={setFetchMessage}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Consult;
