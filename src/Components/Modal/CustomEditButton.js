import { useNavigate } from 'react-router-dom';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';
import { HospitalModal } from './HospitalModal';
import { ReportModal } from './ReportModal';
import { SpecializationModal } from './SpecializationModal';
import { UserModal } from './UserModal';
import DoctorEditModal from './DoctorEditModal';

export const CustomEditButton = ({
  title,
  data,
  fetch,
  rawData,
  hospitalData,
  SpecializationData,
  row,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === 'Patient') {
      navigate('/patients/form', {
        state: {
          data: rawData.filter(
            value => value.PK_patients_ID === data.PK_patients_ID
          ),
        },
      });
      return;
    }

    navigate('/case/form', {
      state: { data: rawData.filter(x => x.PK_cases_ID == data.PK_cases_ID) },
    });
  };

  return (
    <>
      <IconButton
        color={'green.400'}
        onClick={title === 'Patient' || title === 'Case' ? handleClick : onOpen}
      >
        <MdOutlineEdit />
      </IconButton>
      {title === 'Hospital' ? (
        <HospitalModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
        />
      ) : title === 'Report' ? (
        <ReportModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
          rawData={rawData}
          hospitalData={hospitalData}
          SpecializationData={SpecializationData}
        />
      ) : title === 'Navigator' ? (
        <DoctorEditModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
          rawData={rawData}
          hospitalData={hospitalData}
          SpecializationData={SpecializationData}
          row={row}
        />
      ) : title === 'Specialization' ? (
        <SpecializationModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
        />
      ) : (
        <UserModal
          title={title}
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          fetch={fetch}
        />
      )}
    </>
  );
};
