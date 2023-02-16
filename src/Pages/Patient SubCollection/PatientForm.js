import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TitleColor } from '../Packages';
import TextFormController from '../Components/TextFormController';
import usePatient from './PatientContext';
import moment from 'moment';
import {
  Text,
  Flex,
  Container,
  Box,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

const CustomGrid = ({ title, row, column, children }) => {
  return (
    <>
      <Text mt={10} fontSize={17} color={'grey'} fontWeight={'500'}>
        {title}
      </Text>
      <Grid
        mt={3}
        templateRows={`repeat(${row}, 1fr)`}
        templateColumns={`repeat(${column}, 1fr)`}
        gap={2}
        overflow={'hidden'}
      >
        {children}
      </Grid>
    </>
  );
};

const RowGridItem = ({
  title,
  value,
  setValue,
  colSpan,
  textArea,
  DateOnly,
  isType,
  max,
}) => {
  return (
    <GridItem rowSpan={1} colSpan={colSpan}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        isRequired={true}
        DateOnly={true}
        isType={isType}
        max={max}
      />
    </GridItem>
  );
};

const ColumnGridItem = ({ title, value, setValue, colSpan, textArea }) => {
  return (
    <GridItem colSpan={colSpan}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        isRequired={true}
        textArea={textArea}
      />
    </GridItem>
  );
};

const PersonalInformation = () => {
  const {
    patients_FirstName,
    setPatients_FirstName,
    patients_MiddleName,
    setPatients_MiddleName,
    patients_LastName,
    setPatients_LastName,
    patients_Contact,
    setPatients_Contact,
    patients_Gender,
    setPatients_Gender,
    patients_Birthday,
    setPatients_Birthday,
    patients_CivilStatus,
    setPatients_CivilStatus,
  } = usePatient();

  return (
    <CustomGrid title={'Personal Information'} column={3}>
      <RowGridItem
        title={'First name'}
        value={patients_FirstName}
        setValue={setPatients_FirstName}
        colSpan={[3, 3, 3, 3, 1]}
        textArea={false}
      />

      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 1]}
        title={'Middle name'}
        value={patients_MiddleName}
        setValue={setPatients_MiddleName}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 1]}
        title={'Last name'}
        value={patients_LastName}
        setValue={setPatients_LastName}
        textArea={false}
      />
      <GridItem colSpan={[3, 3, 3, 3, 1]}>
        <FormControl isRequired>
          <FormLabel>Sex</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            placeholder="- Please Select -"
            bg={'gray.100'}
            onChange={e => setPatients_Gender(e.target.value)}
            value={patients_Gender}
            required
          >
            <option>MALE</option>
            <option>FEMALE</option>
          </Select>
        </FormControl>
      </GridItem>
      <RowGridItem
        title={'Date of Birth'}
        colSpan={[3, 3, 3, 3, 2]}
        value={patients_Birthday}
        setValue={setPatients_Birthday}
        DateOnly={true}
        isType="birthday"
        textArea={false}
        max={moment().format('m-d-Y')}
      />
      <GridItem colSpan={[3, 3, 3, 3, 1]}>
        <FormControl isRequired>
          <FormLabel>Civil Status</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            placeholder="- Please Select -"
            required
            bg={'gray.100'}
            onChange={e => setPatients_CivilStatus(e.target.value)}
            value={patients_CivilStatus}
          >
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </Select>
        </FormControl>
      </GridItem>
      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 2]}
        title={'Contact no.'}
        value={patients_Contact}
        setValue={setPatients_Contact}
        textArea={false}
      />
    </CustomGrid>
  );
};

const GurdianInformation = () => {
  const {
    guardians_Name,
    setGuardians_Name,
    guardians_Relationship,
    setGuardians_Relationship,
    guardians_ContactNo,
    setGuardians_ContactNo,
  } = usePatient();

  return (
    <CustomGrid title={'Guardian'} row={1} column={1}>
      <RowGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'Guardian name'}
        value={guardians_Name}
        setValue={setGuardians_Name}
        textArea={false}
      />
      <GridItem colSpan={[4, 4, 4, 2, 1]}>
        <FormControl isRequired>
          <FormLabel>Relation</FormLabel>
          <Select
            fontSize={14}
            marginLeft={''}
            focusBorderColor={'gray.400'}
            placeholder="- Please Select -"
            bg={'gray.100'}
            required
            onChange={e => setGuardians_Relationship(e.target.value)}
            value={guardians_Relationship}
          >
            <option>Mother</option>
            <option>Father</option>
            <option>GrandMother</option>
            <option>GrandFather</option>
            <option>Aunt</option>
            <option>Uncle</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Other</option>
          </Select>
        </FormControl>
      </GridItem>
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'Contact'}
        value={guardians_ContactNo}
        setValue={setGuardians_ContactNo}
        textArea={false}
      />
    </CustomGrid>
  );
};

const AddressInformation = () => {
  const {
    patients_Street,
    setPatients_Street,
    patients_Barangay,
    setPatients_Barangay,
    patients_City,
    setPatients_City,
    patients_Ethnicity,
    setPatients_Ethnicity,
    patients_Dialect,
    setPatients_Dialect,
    patients_BirthPlace,
    setPatients_BirthPlace,
  } = usePatient();

  return (
    <CustomGrid title={'Address'} row={2} column={2}>
      <RowGridItem
        title={'Street'}
        value={patients_Street}
        setValue={setPatients_Street}
        colSpan={[4, 4, 4, 2, 2]}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'Barangay'}
        value={patients_Barangay}
        setValue={setPatients_Barangay}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'City'}
        value={patients_City}
        setValue={setPatients_City}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 2]}
        title={'Place of Birth'}
        value={patients_BirthPlace}
        setValue={setPatients_BirthPlace}
        textArea={true}
      />
      <RowGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'Ethnicity'}
        value={patients_Ethnicity}
        setValue={setPatients_Ethnicity}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={'Dialect'}
        value={patients_Dialect}
        setValue={setPatients_Dialect}
        textArea={false}
      />
    </CustomGrid>
  );
};

const PatientForm = () => {
  const location = useLocation();
  const json = location.state;
  const [fetch, setFetch] = useState(true);
  // const Title = "Patient Form";
  const { registerPatient, updatePatient } = usePatient();
  const navigate = useNavigate();

  const {
    setPK_patients_ID,
    setPatients_FirstName,
    setPatients_MiddleName,
    setPatients_LastName,
    setPatients_Contact,
    setPatients_Gender,
    setPatients_Birthday,
    setPatients_CivilStatus,
    setGuardians_Name,
    setGuardians_Relationship,
    setGuardians_ContactNo,
    setPatients_Street,
    setPatients_Barangay,
    setPatients_City,
    setPatients_Ethnicity,
    setPatients_Dialect,
    setPatients_BirthPlace,
    registerStatus,
    updateStatus,
  } = usePatient();

  const handleClick = () => {
    navigate('/h/patients');
  };

  const initPatientdata = props => {
    try {
      setPK_patients_ID(props[0].PK_patients_ID);
      setPatients_FirstName(props[0].patients_FirstName);
      setPatients_LastName(props[0].patients_LastName);
      setPatients_MiddleName(props[0].patients_MiddleName);
      setPatients_Contact(props[0].patients_Contact);
      setPatients_Gender(props[0].patients_Gender);
      setPatients_Birthday(props[0].patients_Birthday);
      setPatients_CivilStatus(props[0].patients_CivilStatus);
      setGuardians_Name(props[0].guardians_Name);
      setGuardians_Relationship(props[0].guardians_Relationship);
      setGuardians_ContactNo(props[0].guardians_ContactNo);
      setPatients_Street(props[0].patients_Street);
      setPatients_Barangay(props[0].patients_Barangay);
      setPatients_City(props[0].patients_City);
      setPatients_Ethnicity(props[0].patients_Ethnicity);
      setPatients_Dialect(props[0].patients_Dialect);
      setPatients_BirthPlace(props[0].patients_BirthPlace);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (fetch) {
      setFetch(false);
      if (json !== null) {
        initPatientdata(json.data);
      }
    }
  }, [fetch]);

  return (
    <Container maxW={'container.xxl'}>
      <Box mt={10} p={[0, 0, 5, 10]}>
        <Box className="table-head">
          <Text fontSize={18} color={TitleColor} fontWeight={'900'}>
            {'Register Patient'}
          </Text>
        </Box>
        <Box>
          <form onSubmit={json === null ? registerPatient : updatePatient}>
            <Grid templateColumns="repeat(8, 1fr)" gap={6}>
              <GridItem w="100%" colSpan={[8, 8, 8, 4]}>
                <PersonalInformation />
                <AddressInformation />
              </GridItem>
              <GridItem w="100%" colSpan={[8, 8, 8, 4]}>
                <GurdianInformation />
              </GridItem>
            </Grid>

            <Box w={'100%'} mt={10}>
              <Flex columnGap={5} justifyContent={'end'}>
                <Button
                  variant={'solid'}
                  colorScheme={'gray'}
                  color={'gray.700'}
                  fontSize={14}
                  fontWeight={'normal'}
                  onClick={handleClick}
                >
                  <Text>Back</Text>
                </Button>

                <Button
                  isLoading={json === null ? registerStatus : updateStatus}
                  loadingText={json === null ? 'Saving' : 'Updating'}
                  type={'submit'}
                  variant={'solid'}
                  fontSize={14}
                  fontWeight={'normal'}
                  colorScheme={'green'}
                >
                  <Text>{'Save'}</Text>
                </Button>
              </Flex>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientForm;
