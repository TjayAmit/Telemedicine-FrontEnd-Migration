import React, { useEffect } from 'react';
import { useState } from 'react';
import { Box, Container, useDisclosure, Flex } from '@chakra-ui/react';
import { toastposition, toastvariant } from './Packages';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import TextFormController from '../Components/TextFormController';
import CustomModal from '../Components/CustomModal';
import { useToast } from '@chakra-ui/react';
import { GetRequest, PostRequest } from '../API/api';
import { Doctor, Specialization } from '../API/Paths';
import StatusHandler from '../Utils/StatusHandler';
import useAuth from '../Hooks/AuthContext';

const AddModal = ({ isOpen, onClose, fetch }) => {
  const title = 'New Specialization';
  const [tittle, setSpecialization] = useState('');
  const [des, setDescription] = useState('');
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    let msg = '';

    let formData = new FormData();
    formData.append('specialiations_Title', tittle);
    formData.append('specialiations_Description', des);

    PostRequest(
      { url: Specialization },
      {
        specializations_Title: tittle,
        specializations_Description: des,
      }
    )
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        setSpecialization('');
        setDescription('');
        fetch(true);

        toast({
          title: 'Added Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
        msg = 'success';
      })
      .catch(err => {
        toast({
          title: 'Failed to add specialization!',
          position: toastposition,
          variant: toastvariant,
          status: 'error',
          isClosable: true,
        });
        msg = StatusHandler(err);
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
        <TextFormController
          title={'Specialization'}
          value={tittle}
          setValue={setSpecialization}
          isRequired={true}
        />

        <TextFormController
          title={'Description'}
          value={des}
          setValue={setDescription}
          isRequired={true}
          textArea={true}
        />
      </CustomModal>
    </>
  );
};

const Specializations = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const { search, setSearch } = useAuth();
  const [feedback, setFeedback] = useState('');

  const handleFetchSpecialization = async () => {
    GetRequest({ url: Specialization })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const { data } = res;

        if (data.length === specializations.length) {
          return;
        }
        setSpecializations(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //SearchFilter
  const filtered = specializations.filter(
    filter =>
      filter.title.toLowerCase().includes(search.toLowerCase()) ||
      filter.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fetch) {
        setFetch(false);
      }
      handleFetchSpecialization();
    }, [fetch ? 0 : 40000]);

    return () => clearInterval(intervalId);
  }, [fetch]);

  const Title = 'Specialization';

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'SPECIALIZATION',
      accessor: 'title',
    },
    {
      Header: 'DOCTORS',
      accessor: 'doctors',
    },
    {
      Header: 'ACTIVE',
      accessor: 'spestatus',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            fetch={setFetch}
            data={filtered}
            search={search}
            setSearch={setSearch}
            isModal={true}
            onOpen={onOpen}
          />
        </Box>
      </Container>
      <AddModal isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Specializations;
