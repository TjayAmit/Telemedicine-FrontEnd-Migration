import React, { useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import useAuth from '../../Hooks/AuthContext';
import { useToast } from '@chakra-ui/react';
import { toastvariant, toastposition } from '../../Pages/Packages';
import { StatusHandler } from '../../Utils/StatusHandler';
import { DeleteRequest } from '../../API/api';
import {
  Hospital,
  Report,
  Patient,
  Doctor,
  Case,
  Specialization
} from '../../API/Paths';

export const CustomModalDelete = ({ title, isOpen, onClose, id, fetch }) => {
  const [dissable, setDissable] = useState(true);
  let result = [];
  let statusResult = '';
  const { user } = useAuth();
  const toast = useToast();

  const onChange = value => {
    if (user.name !== value) {
      setDissable(true);
      return;
    }
    setDissable(false);
  };

  const handleDelete = async () => {
    switch (title) {
      case 'Specialization':
        DeleteRequest(
          { url: Specialization },
          {
            id: id[0].PK_specializations_ID,
          }
        )
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;
      case 'Hospital':
        DeleteRequest({ url: Hospital }, { id: id[0].PK_hospital_ID })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;
      case 'Report':
        DeleteRequest({ url: Report }, { id: id[0].report_No })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;

      case 'Patient':
        DeleteRequest({ url: Patient }, { id: id[0].PK_patients_ID }).
          then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          }).catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;
      case 'Navigator':
        DeleteRequest({ url: Doctor }, { id: id[0].id })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;

      case 'Case':
        DeleteRequest({ url: Case }, { id: id[0].PK_cases_ID })
          .then(res => {
            if (!res.statusText === 'OK') {
              throw new Error('Bad response.', { cause: res });
            }
          })
          .catch(err => {
            const responseMessage = StatusHandler(err);
            toast({
              title: responseMessage,
              position: toastposition,
              variant: toastvariant,
              status: 'error',
              isClosable: true,
            });
          });
        break;
    }

    onClose();
    fetch(true);
    setDissable(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title === 'Navigator' ? 'Doctor' : title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel display="flex" columnGap={2}>
              To delete type <Text fontWeight={'700'}>{user.name}</Text>
            </FormLabel>

            <Input
              type="text"
              onChange={e => onChange(e.target.value)}
              onPaste={e => onChange(e.target.value)}
              autoFocus
            />
            <FormHelperText display="flex" columnGap={2}>
              <Text color={'orange'}>Warning</Text> data will be delete
              permanently!
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button bg={'lightwhite'} color="black" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg={'red.500'}
            color={'white'}
            _hover={{ bg: 'red.600' }}
            disabled={dissable}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
