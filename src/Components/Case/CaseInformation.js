import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import {
  FaTemperatureLow,
  FaHeartbeat,
  FaLungs,
  FaWeight,
} from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { SiOxygen } from 'react-icons/si';
import { GiBodyHeight } from 'react-icons/gi';
import PatientProfile from './PatientProfile';
import { GetRequest } from '../../API/api';
import { Case } from '../../API/Paths';
import CaseParaclinicalFiles from './CaseParaclinicalFiles';

const PatientMedicalBodyInformation = props => {
  return (
    <Box
      w={'15rem'}
      boxShadow={'md'}
      rounded={5}
      bg="white"
      p={3}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Heading>{props.value}</Heading>
        <Text> {props.title}</Text>
      </Box>
      {props.icon}
    </Box>
  );
};

const BodyInformation = ({
  case: {
    cases_Temperature,
    cases_Respiratory,
    cases_Heart,
    cases_Blood,
    cases_Oxygen,
    cases_Weight,
    cases_Height,
  },
}) => {
  return (
    <Box w="inherit" display="flex" flexWrap="wrap" columnGap={5} rowGap={5}>
      <PatientMedicalBodyInformation
        title="Temperature"
        value={cases_Temperature}
        icon={<FaTemperatureLow size="24" color="skyblue" />}
      />
      <PatientMedicalBodyInformation
        title="Respiratory Rate"
        value={cases_Respiratory}
        icon={<FaLungs size="24" color="green" />}
      />
      <PatientMedicalBodyInformation
        title="Heart Rate"
        value={cases_Heart}
        icon={<FaHeartbeat size="24" color="red" />}
      />
      <PatientMedicalBodyInformation
        title="Blood Pressure"
        value={cases_Blood}
        icon={<MdBloodtype size="24" color="darkred" />}
      />
      <PatientMedicalBodyInformation
        title="Oxygen Saturation"
        value={cases_Oxygen}
        icon={<SiOxygen size="24" color="darkgreen" />}
      />
      <PatientMedicalBodyInformation
        title="Weight"
        value={cases_Weight}
        icon={<FaWeight size="24" color="gray" />}
      />
      <PatientMedicalBodyInformation
        title="Height"
        value={cases_Height}
        icon={<GiBodyHeight size="24" color="gray" />}
      />
    </Box>
  );
};

const CaseMainInformationComponent = props => {
  return (
    <Box mt={5}>
      <Box
        maxW={350}
        pl={2}
        pt={1}
        bg="gray"
        color="white"
        borderTopLeftRadius={8}
        borderTopRightRadius={30}
      >
        <Text>{props.header.toLocaleUpperCase()}</Text>
      </Box>
      <Box
        border="1px solid gray"
        p={2}
        borderBottomRadius={8}
        borderRightRadius={8}
      >
        <Text>{props.data}</Text>
      </Box>
    </Box>
  );
};

const CaseMainInformation = ({
  case: {
    cases_CC,
    cases_HPI,
    cases_PMH,
    cases_PE,
    cases_WI,
    cases_IMD,
    cases_Reason,
  },
}) => {
  return (
    <Box>
      <CaseMainInformationComponent
        header={'Chief Complaint'}
        data={cases_CC}
      />
      <CaseMainInformationComponent
        header={'Pertinent History of Present Illness'}
        data={cases_HPI}
      />
      <CaseMainInformationComponent
        header={'Pertinent Past Medical History'}
        data={cases_PMH}
      />
      <CaseMainInformationComponent
        header={'Pertinent PE Findings'}
        data={cases_PE}
      />
      <CaseMainInformationComponent
        header={'Working Impression'}
        data={cases_WI}
      />
      <CaseMainInformationComponent
        header={'Initial Management Done'}
        data={cases_IMD}
      />
      <CaseMainInformationComponent
        header={'Reason for Referral'}
        data={cases_Reason}
      />
    </Box>
  );
};

const CaseInformation = props => {
  const [caseinformation, setCaseInformation] = useState([]);
  const [fetch, setFetch] = useState(false);

  const handleFetch = () => {
    GetRequest({ url: `${Case}/c/${props.id}` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const {
          data: { data },
        } = res;
        setCaseInformation(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (fetch) {
      setFetch(false);
    }

    handleFetch();

    return () => setFetch(false);
  }, [fetch]);

  return (
    <Box w="inherit" pl={5}>
      <Box h="94vh" overflow={'auto'} pt={5} pb={10}>
        <PatientProfile id={props.id} />
        <Box pt={5} pr={5}>
          <BodyInformation case={caseinformation} />
          <CaseMainInformation case={caseinformation} />
          {/* <CaseParaclinicalFiles id={props.id} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CaseInformation;
