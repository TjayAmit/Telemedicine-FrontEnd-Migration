import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import CustomModal from '../CustomModal';
import { SelectionSpecialization } from '../CustomSelection';
import { SpecializationCase } from '../../API/Paths';
import { PutRequest } from '../../API/api';
import { toastposition, toastvariant } from '../../Pages/Packages';

const AddSpecialization = ({ isOpen, onClose, caseID }) => {
  const title = 'ADD Specialization';
  const [FK_specializations_ID, setFK_specializations_ID] = useState('');
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await PutRequest(
      { url: SpecializationCase },
      {
        FK_specializations_ID: FK_specializations_ID,
        FK_cases_ID: caseID,
      }
    );

    if (res.data.status === 200) {
      onClose();

      toast({
        title: 'Added Successfully!',
        position: toastposition,
        variant: toastvariant,
        status: 'success',
        isClosable: true,
      });
    }

    if (res.data.status !== 200) {
      toast({
        title: 'Failed to add specialization!',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    }
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

export default AddSpecialization;
