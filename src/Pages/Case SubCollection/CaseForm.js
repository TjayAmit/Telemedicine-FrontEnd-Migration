import { useNavigate } from 'react-router-dom';
import { TitleColor } from '../Packages';
import useCase from './CaseContext';
import TextFormController from '../../Components/TextFormController';
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
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { TiAttachment } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { GetRequest } from '../../API/api';
import { Patient, Specialization } from '../../API/Paths';
import { StatusHandler } from '../../Utils/StatusHandler';
import { CustomPatient } from './CustomPatient';
import { useLocation } from 'react-router-dom';

const CustomGrid = ({ title, row, column, children }) => {
  return (
    <>
      <Text mt={10} fontSize={18} color={'grey'} fontWeight={'500'}>
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

const RowGridItem = ({ title, value, setValue, textArea, isRequired }) => {
  return (
    <GridItem rowSpan={1} colSpan={[4, 4, 2, 1]}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        textArea={textArea}
        isRequired={isRequired}
      />
    </GridItem>
  );
};

const ColumnGridItem = ({ title, value, setValue, textArea, isRequired }) => {
  return (
    <GridItem colSpan={[4, 4, 2, 1]}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        textArea={textArea}
        isRequired={isRequired}
      />
    </GridItem>
  );
};

const CustomSelect = ({ title, json, isRow, defval, setValue, isRequired }) => {
  const handleSelect = value => setValue(value);

  if (isRow) {
    return (
      <GridItem rowSpan={1} colSpan={[4, 4, 2, 1]}>
        <FormControl>
          <FormLabel>{title}</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder="- Please Select -"
            onChange={e => handleSelect(e.target.value)}
            required={isRequired}
            value={defval}
          >
            {json.map(value => {
              return (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
    );
  }
  return (
    <GridItem colSpan={[4, 4, 2, 1]}>
      <FormControl>
        <FormLabel>{title}</FormLabel>
        <Select
          fontSize={14}
          focusBorderColor={'gray.400'}
          bg={'gray.100'}
          placeholder="- Please Select -"
          onChange={e => handleSelect(e.target.value)}
          required={isRequired}
          value={defval}
        >
          {json.map(value => {
            return (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </GridItem>
  );
};

const PatientInformation = ({ isUpdate, patientID }) => {
  const [patientData, setPatientData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [allpatient, setallpatient] = useState([]);

  const {
    setFK_patients_ID,
    setFK_specializations_ID,
    FK_specializations_ID,
    cases_Temperature,
    setCases_Temperature,
    cases_Respiratory,
    setCases_Respiratory,
    cases_Heart,
    setCases_Heart,
    cases_Blood,
    setCases_Blood,
    cases_Oxygen,
    setCases_Oxygen,
    cases_Weight,
    setCases_Weight,
    cases_Height,
    setCases_Height,
    patients,
    specializations,
  } = useCase();

  const handleFetch = async () => {
    let msg = '';
    GetRequest({ url: `${Patient}s` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        setPatientData(res.data.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    GetRequest({ url: `${Specialization}s` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        setServiceData(res.data.data);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    GetRequest({ url: `${Patient}/hospital` }).then(res => {
      if (!res.statusText === 'OK') {
        throw new Error('Bad response.', { cause: res });
      }

      setallpatient(res.data.data);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <CustomGrid title={'Personal Information'} column={1}>
      <Box>
        <CustomPatient
          isUpdate={isUpdate}
          patientID={patientID}
          patientdata={allpatient}
        />
      </Box>
      <Box mt={3}>
        <CustomSelect
          title="Service Type"
          json={specializations}
          isRow={false}
          setValue={setFK_specializations_ID}
          isRequired={true}
          defval={FK_specializations_ID}
        />
        <ColumnGridItem
          title={'Temperature(°C)'}
          value={cases_Temperature}
          setValue={setCases_Temperature}
          isRequired={true}
        />
        <RowGridItem
          title={'Respiratory Rate'}
          value={cases_Respiratory}
          setValue={setCases_Respiratory}
          isRequired={true}
        />
        <ColumnGridItem
          title={'Heart Rate'}
          value={cases_Heart}
          setValue={setCases_Heart}
          isRequired={true}
        />
        <ColumnGridItem
          title={'Blood Pressure'}
          value={cases_Blood}
          setValue={setCases_Blood}
          isRequired={true}
        />
        <ColumnGridItem
          title={'Oxygen Saturation'}
          value={cases_Oxygen}
          setValue={setCases_Oxygen}
          isRequired={true}
        />
        <RowGridItem
          title={'Weight (KG)'}
          value={cases_Weight}
          setValue={setCases_Weight}
          isRequired={true}
        />
        <ColumnGridItem
          title={'Height (CM)'}
          value={cases_Height}
          setValue={setCases_Height}
          isRequired={true}
        />
      </Box>
    </CustomGrid>
  );
};

const PatientOtherInformation = () => {
  const {
    cases_CC,
    setCases_CC,
    cases_HPI,
    setCases_HPI,
    cases_PMH,
    setCases_PMH,
    cases_ROS,
    setCases_ROS,
    cases_PE,
    setCases_PE,
    cases_WI,
    setCases_WI,
    cases_IMD,
    setCases_IMD,
    cases_Reason,
    setCases_Reason,
    cases_Remarks,
    setCases_Remarks,
    fileLimit,
    setFileLimit,
    selectedFiles,
    setSelectedFiles,
    sms,
    SetSms,
  } = useCase();

  const [validate, setValidate] = useState(false);

  const Max_Count = 5;
  const handleFileUpload = files => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === Max_Count) setFileLimit(true);
        if (uploaded.length > Max_Count) {
          console.log(`you can only add maximum file of ${Max_Count} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      setValidate(false);
      if (sms == '' || sms == null) {
        SetSms('File Attacthments');
      }
    }
  };

  const handleFileEvent = e => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  return (
    <CustomGrid title={'Details'} row={2} column={1}>
      <RowGridItem
        title={'Chief Complaint'}
        value={cases_CC}
        setValue={setCases_CC}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Pertinent History of Present Illness'}
        value={cases_HPI}
        setValue={setCases_HPI}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Pertinent Past Medical History'}
        value={cases_PMH}
        setValue={setCases_PMH}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Pertinent Review of Systems'}
        value={cases_ROS}
        setValue={setCases_ROS}
        textArea={true}
        isRequired={true}
      />
      <RowGridItem
        title={'Pertinent PE Findings'}
        value={cases_PE}
        setValue={setCases_PE}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Working Impression'}
        value={cases_WI}
        setValue={setCases_WI}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Initial Management Done'}
        value={cases_IMD}
        setValue={setCases_IMD}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Reason for Referral'}
        value={cases_Reason}
        setValue={setCases_Reason}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={'Paraclinical'}
        value={cases_Remarks}
        setValue={setCases_Remarks}
        textArea={true}
        isRequired={true}
      />
      <Box>
        <Box>
          <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={4}>
            {Array.prototype.slice.call(selectedFiles).map((e, key) => {
              return (
                <GridItem w="100%" key={key} colSpan={[5, 5, 2, 1]}>
                  <Box
                    bg={'blackAlpha.200'}
                    p={1}
                    fontSize={13}
                    color={'blue.900'}
                    textAlign={'center'}
                    borderRadius={'5'}
                    cursor={'pointer'}
                    border={'1px solid'}
                    borderColor={'gray.400'}
                    className={'attacheditems'}
                  >
                    <Flex>
                      <TiAttachment
                        style={{
                          fontSize: '22px',
                          marginRight: '2px',
                        }}
                      />
                      {e.name}
                    </Flex>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        <Stack direction={'row'} mt={10}>
          <Spacer />
          <Box>
            <Stack direction={['column', 'row']}>
              {selectedFiles.length >= 1 ? (
                <>
                  <Button
                    variant={'outline'}
                    size="sm"
                    fontWeight={'normal'}
                    color={'red.300'}
                    onClick={() => {
                      setSelectedFiles([]);
                    }}
                  >
                    Cancel{' '}
                    <MdCancel style={{ marginLeft: '3px', fontSize: '20px' }} />
                  </Button>
                </>
              ) : (
                <Button
                  variant={'outline'}
                  size="sm"
                  bg={'gray.200'}
                  color={'gray.600'}
                  fontWeight={'normal'}
                  onClick={() => {
                    document.getElementById('file').click();
                  }}
                >
                  <IoDocumentAttachOutline
                    style={{ fontSize: '20px', marginRight: '3px' }}
                  />
                  Attach File{' '}
                </Button>
              )}

              <input
                type={'file'}
                id="file"
                name="image"
                style={{ display: 'none' }}
                multiple={true}
                onChange={handleFileEvent}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </CustomGrid>
  );
};

const CaseForm = () => {
  const location = useLocation();
  const [fetch, setFetch] = useState(true);

  const CasesData = location.state ? location.state.data : [];

  const [EditCase, setEditCase] = useState(CasesData);
  const Title = 'Case Form';
  const navigate = useNavigate();

  const {
    setFK_patients_ID,
    setFK_specializations_ID,
    setCases_Temperature,
    setCases_Respiratory,
    setCases_Heart,
    setCases_Blood,
    setCases_Oxygen,
    setCases_Weight,
    setCases_Height,
    setCases_CC,
    setCases_HPI,
    setCases_PMH,
    setCases_ROS,
    setCases_PE,
    setCases_WI,
    setCases_IMD,
    setCases_Reason,
    setCases_Remarks,
    FK_patients_ID,
    setPK_cases_ID,
  } = useCase();

  const initStates = props => {
    try {
      setPK_cases_ID(props[0].PK_cases_ID);
      setFK_patients_ID(props[0].PK_patients_ID);
      setFK_specializations_ID(props[0].FK_specializations_ID);
      setCases_Temperature(props[0].cases_Temperature);
      setCases_Respiratory(props[0].cases_Respiratory);
      setCases_Heart(props[0].cases_Heart);
      setCases_Blood(props[0].cases_Blood);
      setCases_Oxygen(props[0].cases_Oxygen);
      setCases_Weight(props[0].cases_Weight);
      setCases_Height(props[0].cases_Height);
      setCases_CC(props[0].cases_CC);
      setCases_HPI(props[0].cases_HPI);
      setCases_PMH(props[0].cases_PMH);
      setCases_ROS(props[0].cases_ROS);
      setCases_PE(props[0].cases_PE);
      setCases_WI(props[0].cases_WI);
      setCases_IMD(props[0].cases_IMD);
      setCases_Reason(props[0].cases_Reason);
      setCases_Remarks(props[0].cases_Remarks);
    } catch (e) {
      // console.log(e);
    }
  };

  const { registerCase, updateCase } = useCase();

  useEffect(() => {
    try {
      if (fetch) {
        setFetch(false);
        if (CasesData !== null) {
          initStates(EditCase);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [fetch]);

  const handleClick = () => {
    navigate('/h/case');
  };

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={10} p={[0, 0, 5, 10]}>
          <Box className="table-head">
            <Text fontSize={20} color={TitleColor} fontWeight={'900'}>
              {Title}
            </Text>
          </Box>
          <Box mt={2}>
            <form onSubmit={CasesData.length >= 1 ? updateCase : registerCase}>
              <Grid templateColumns="repeat(8, 1fr)" gap={4}>
                <GridItem w="100%" colSpan={[8, 8, 4, 3]}>
                  <PatientInformation
                    isUpdate={CasesData.length >= 1 ? true : false}
                    patientID={
                      CasesData.length >= 1 ? EditCase[0].PK_patients_ID : ''
                    }
                  />
                </GridItem>
                <GridItem w="100%" colSpan={[8, 8, 4, 5]}>
                  <PatientOtherInformation />
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
                    variant={'solid'}
                    fontSize={14}
                    fontWeight={'normal'}
                    colorScheme={'green'}
                    type="submit"
                  >
                    <Text>Save</Text>
                  </Button>
                </Flex>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CaseForm;
