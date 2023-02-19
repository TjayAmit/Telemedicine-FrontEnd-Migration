import React, { useState } from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import {
  toastposition,
  toastvariant,
} from '../../Pages/Packages';
import TextFormController from '../TextFormController';
import CustomModal from '../CustomModal';
import { PutRequest } from '../../API/api';
import { StatusHandler } from '../../Utils/StatusHandler';

function DoctorEditModal({ isOpen, onClose, data, fetch, rawData, row }) {
  const doctorData = rawData.filter(e => e.PK_doctors_ID == data.PK_doctors_ID);
  const toast = useToast();

  const [email, SetEmail] = useState(
    doctorData === null ? '' : doctorData[0].email
  );

  const [verify, setVerify] = useState(
    data.status === 1 ? 'Active' : 'Dissabled'
  );

  const [hospital, SetHospital] = useState(
    doctorData === null ? '' : data.hospital_Name
  );

  const [username, SetUsername] = useState(
    doctorData === null ? '' : doctorData[0].name
  );

  const [exist, setExist] = useState(false);

  const onSave = async e => {
    e.preventDefault();

    const type = parseFloat(verify);

    if (typeof type === 'string') {
      toast({
        title: 'Please select account status',
        position: toastposition,
        variant: toastvariant,
        status: 'warning',
        isClosable: true,
      });
      return;
    }

    let msg = '';
    let formData = new FormData();
    formData.append('PK_user_ID', row.id);
    formData.append('Account_status', verify);

    PutRequest({ url: `approved/user` }, formData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        onClose();
        fetch(true);

        toast({
          title: 'Updated Successfully!',
          position: toastposition,
          variant: toastvariant,
          status: 'success',
          isClosable: true,
        });
      })
      .catch(err => {
        msg = StatusHandler(err);
        toast({
          title: 'Something went wrong',
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
        title={'Update Doctor'}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onSave}
        hasProfile={false}
        isNew={false}
        btntitle={'Update'}
      >
        <form>
          <FormControl mt={2}>
            <TextFormController
              title={'Username'}
              value={username}
              setValue={SetUsername}
              isRequired={true}
              isDisabled={true}
            />
          </FormControl>

          <FormControl mt={2}>
            <TextFormController
              title={'Email'}
              value={email}
              setValue={SetEmail}
              setexist={setExist}
              isRequired={false}
              isDisabled={true}
            />
            {exist && (
              <span
                style={{
                  color: '#D7777A',
                  fontSize: '13px',
                  fontWeight: 'normal',
                }}
              >
                Email Already Exist!
              </span>
            )}
          </FormControl>

          <FormControl mt={2}>
            <TextFormController
              title={'Hospital'}
              value={hospital}
              setValue={SetEmail}
              setexist={setExist}
              isRequired={false}
              isDisabled={true}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel fontSize={14}>Account Status</FormLabel>
            <Select
              fontSize={14}
              focusBorderColor={'gray.400'}
              bg={'gray.100'}
              placeholder={'- Please Select -'}
              onChange={e => {
                setVerify(e.target.value);
              }}
              value={verify}
              required
            >
              <option value={1}>Active</option>
              <option value={2}>Dissabled</option>
            </Select>
          </FormControl>
        </form>
      </CustomModal>
    </>
  );
}

export default DoctorEditModal;
