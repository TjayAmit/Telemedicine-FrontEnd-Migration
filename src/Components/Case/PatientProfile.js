import { Avatar, Text, Heading, Box, Image } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GetRequest } from '../../API/api';
import { Patient } from '../../API/Paths';

const TextDisplay = props => {
  return (
    <Box>
      <Text fontSize={14}>{props.title}:</Text>
      <Heading size="sm">{props.value}</Heading>
    </Box>
  );
};

const PatientProfile = props => {
  const [patient, setPatient] = useState([]);
  const [fetch, setFetch] = useState(true);

  const handleFetchInformation = () => {
    GetRequest({ url: `${Patient}/${props.id}` })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const { data } = res;

        setPatient(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (fetch) {
      setFetch(false);
    }

    handleFetchInformation();

    return () => setFetch(false);
  }, [fetch]);

  return (
    <Box
      h="inheirt"
      display="flex"
      flexDirection={['column', 'column', 'row', 'row']}
      columnGap={8}
      alignItems="start"
      p={2}
    >
      <Box
        w={'100%'}
        display="flex"
        justifyContent={['center', 'center', 'start', 'start']}
        p={[2, 2, 0, 0]}
      >
        <Box w="10rem">
          <Image
            src={
              patient.patients_Gender === 'FEMALE'
                ? require('../../assets/female_default_profile.jpg')
                : require('../../assets/male_default_profile.jpg')
            }
          />
        </Box>
      </Box>
      <Box
        display="flex"
        columnGap={12}
        rowGap={5}
        flexWrap="wrap"
        alignItems="end"
        pt="2"
        pr={3}
      >
        <TextDisplay
          title="Name (Last, First Mi)"
          value={`${patient.patients_LastName}, ${patient.patients_FirstName}  ${patient.patients_MiddleName}.`}
        />
        <TextDisplay
          title="Age"
          value={`${
            new Date().getFullYear() -
            new Date(patient.patients_Birthday).getFullYear()
          }yrs (${moment(patient.patients_Birthday).format('L')})`}
        />
        <TextDisplay title="Sex" value={`${patient.patients_Gender}`} />
        <TextDisplay
          title="Civil Status"
          value={`${patient.patients_CivilStatus}`}
        />
        <TextDisplay title="Contact" value={`${patient.patients_Contact}`} />
        <TextDisplay
          title="Birth place"
          value={`${patient.patients_BirthPlace}`}
        />
        <TextDisplay
          title="Ethnicity"
          value={`${patient.patients_Ethnicity}`}
        />
        <TextDisplay title="Dialect" value={`${patient.patients_Dialect}`} />
        <TextDisplay
          title="Address (Street, Barangay, City)"
          value={`${patient.patients_Street}, ${patient.patients_Barangay}, ${patient.patients_City}`}
        />
      </Box>
    </Box>
  );
};

export default PatientProfile;
