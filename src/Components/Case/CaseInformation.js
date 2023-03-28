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
import { FaHospital, FaBriefcaseMedical } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { BsPersonCircle } from 'react-icons/bs';

const PatientMedicalBodyInformation = props => {
  return (
    <Box
      w={['25rem', '25rem', '15rem', '15rem']}
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
        maxW={[250, 250, 350, 350]}
        pl={2}
        pt={1}
        bg="gray"
        color="white"
        borderTopLeftRadius={8}
        borderTopRightRadius={30}
      >
        <Text fontSize={[12, 12, 18, 18]}>
          {props.header.toLocaleUpperCase()}
        </Text>
      </Box>
      <Box
        border="1px solid gray"
        p={2}
        borderBottomRadius={8}
        borderRightRadius={8}
      >
        <Text fontSize={[12, 12, 18, 18]}>{props.data}</Text>
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

const CaseReferrerInformation = ({ data, caseinfo }) => {
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'row', 'row']}
      mb={2}
      justifyContent="start"
      columnGap={5}
      rowGap={5}
      p={5}
      border="1px solid rgba(0,0,0,0.2)"
      rounded={10}
      mr={5}
    >
      <Box display="flex" columnGap={3}>
        <BsPersonCircle color="green" size="25" />
        <Text fontSize={18} fontWeight={600} color="green">
          {`${caseinfo.profile_FirstName} ${caseinfo.profile_LastName}`}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <FaBriefcaseMedical color="green" size="23" />
        <Text fontSize={18} fontWeight={600} color="green">
          CASE #{data.case_number}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <GiSkills color="gray" size="25" />
        <Text fontSize={18} fontWeight={500} color="gray">
          {data.specialization}
        </Text>
      </Box>
      <Box display="flex" columnGap={3}>
        <FaHospital color="gray" size="25" />
        <Text fontSize={18} fontWeight={500} color="gray">
          {data.hospital_Name}
        </Text>
      </Box>
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
    // https://zcmc-telemedserver.online/api/case/c/673
    handleFetch();

    return () => setFetch(false);
  }, [fetch]);

  return (
    <Box w="inherit" pl={5}>
      <Box
        h={['45vh', '50vh', '94vh', '94vh']}
        overflow={'auto'}
        pt={10}
        pb={[0, 0, 10, 10]}
      >
        <CaseReferrerInformation data={props.data} caseinfo={caseinformation} />
        <PatientProfile id={props.id} />
        <Box pt={5} pr={5}>
          <BodyInformation case={caseinformation} />
          <CaseMainInformation case={caseinformation} />
          <CaseParaclinicalFiles id={props.id} />
        </Box>
      </Box>
    </Box>
  );
};

export default CaseInformation;
