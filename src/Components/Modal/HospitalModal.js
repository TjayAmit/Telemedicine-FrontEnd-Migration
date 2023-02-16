import React, { useState } from 'react';
import { Text, Grid, GridItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../../Pages/Packages';
import { TextFormController, CustomModal } from '../../Packages';
import { HospitalPutRequest } from '../../api/Hospital_Request';
import { StatusHandler } from '../../Utils/StatusHandler';
import { PutRequest } from '../../API/api';
import { Hospital } from '../../API/Paths';

export const HospitalModal = ({ title, isOpen, onClose, data, fetch }) => {
  const toast = useToast();
  const PK_hospital_ID = data === null ? '' : data.PK_hospital_ID;
  const hospital_url = data === null ? '' : data.hospital_url;

  const [hospital_Name, setHospital_Name] = useState(
    data === null ? '' : data.hospital_Name
  );
  const [hospital_Street, setHospital_Street] = useState(
    data === null ? '' : data.hospital_Street
  );
  const [hospital_Barangay, setHospital_Barangay] = useState(
    data === null ? '' : data.hospital_Barangay
  );
  const [hospital_City, setHospital_City] = useState(
    data === null ? '' : data.hospital_City
  );

  const handleSubmit = async e => {
    e.preventDefault();
    let msg = '';
    let bodyFormData = new FormData();
    bodyFormData.append('PK_hospital_ID', PK_hospital_ID);
    bodyFormData.append('hospital_Name', hospital_Name);
    bodyFormData.append('hospital_Street', hospital_Street);
    bodyFormData.append('hospital_Barangay', hospital_Barangay);
    bodyFormData.append('hospital_City', hospital_City);

    PutRequest({ url: Hospital }, bodyFormData)
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
      });
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={true}
        isNew={false}
        btntitle={'Update'}
      >
        <TextFormController
          title={'Hospital name'}
          value={hospital_Name}
          setValue={setHospital_Name}
        />

        <Text fontWeight={'bold'} mt={5}>
          Address
        </Text>

        <TextFormController
          title={'Street'}
          value={hospital_Street}
          setValue={setHospital_Street}
        />

        <Grid templateColumns="repeat(2, 1fr)" mt={3} gap={5}>
          <GridItem w="100%">
            <TextFormController
              title={'Barangay'}
              value={hospital_Barangay}
              setValue={setHospital_Barangay}
            />
          </GridItem>
          <GridItem w="100%">
            <TextFormController
              title={'City / Municipality'}
              value={hospital_City}
              setValue={setHospital_City}
            />
          </GridItem>
        </Grid>

        <Text fontWeight={'bold'} mt={10}>
          Hospital Picture
        </Text>
      </CustomModal>
    </>
  );
};
