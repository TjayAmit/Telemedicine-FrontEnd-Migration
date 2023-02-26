import React, { useState } from 'react';
import {
  Text,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../../Pages/Packages';
import TextFormController from '../TextFormController';
import CustomModal from '../CustomModal';
import moment from 'moment';
import { Reports } from '../../API/Paths';
import { StatusHandler } from '../../Utils/StatusHandler';
import { PutRequest } from '../../API/api';

export const ReportModal = ({
  title,
  isOpen,
  onClose,
  data,
  fetch,
  rawData,
  hospitalData,
  SpecializationData,
}) => {
  const reportData = rawData.filter(e => e.report_No == data.report_No);
  const toast = useToast();
  const [fromdate, setFromdate] = useState(
    reportData === null ? '' : reportData[0].report_DateFrom
  );
  const [todate, setTodate] = useState(
    reportData === null ? '' : reportData[0].report_DateTo
  );
  const [fromage, setFromage] = useState(
    reportData === null ? '' : reportData[0].report_AgeFrom
  );
  const [toage, setToage] = useState(
    reportData === null ? '' : reportData[0].report_AgeTo
  );
  const [sex, setSex] = useState(
    reportData === null ? '' : reportData[0].report_Sex
  );
  const [referringHospital, setreferringHospital] = useState(
    reportData === null ? '' : reportData[0].FK_hospital_ID
  );
  const [servicetype, setServiceType] = useState(
    reportData === null ? '' : reportData[0].FK_specializations_ID
  );
  const [closeModal, setCloseModal] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (Number(fromage) >= Number(toage)) {
      toast({
        title:
          'To-Attribute on Age Range should be Greater than the From-Attribute  Example: 20 - 26',
        position: toastposition,
        variant: toastvariant,
        status: 'error',
        isClosable: true,
      });
    } else {
      let msg = '';
      let bodyFormData = new FormData();
      bodyFormData.append('PK_report_ID', reportData[0].PK_report_ID);
      bodyFormData.append('FK_hospital_ID', referringHospital);
      bodyFormData.append('FK_specializations_ID', servicetype);
      bodyFormData.append('FK_user_ID', 1);
      bodyFormData.append('report_AgeFrom', fromage);
      bodyFormData.append('report_AgeTo', toage);
      bodyFormData.append('report_DateFrom', fromdate);
      bodyFormData.append('report_DateTo', todate);
      bodyFormData.append('report_Sex', sex);

      PutRequest({ url: Reports }, bodyFormData)
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
    }
  };

  return (
    <>
      <CustomModal
        title={'Update Report'}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={'Update'}
      >
        <Text
          mb={2}
          fontWeight={'bold'}
          float={'right'}
          color={'gray.600'}
          fontSize={15}
        >
          No : {reportData[0].report_No}
        </Text>
        <Text fontWeight={'bold'} color={'blue.700'} mb={2} fontSize={'15px'}>
          Date Range
        </Text>

        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={'red.400'}>
              From :{' '}
              <Text color={'blue.400'}>
                {moment(fromdate).format('DD-MM-YYYY')}
              </Text>
            </Text>
            <TextFormController
              title={'From Date'}
              value={fromdate}
              setValue={setFromdate}
              isRequired={false}
              isType="fromdate"
              compare={moment().format('YYYY-MM-DD')}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={'red.400'}>
              To :{' '}
              <Text color={'blue.400'}>
                {moment(todate).format('DD-MM-YYYY')}
              </Text>
            </Text>
            <TextFormController
              title={'To Date'}
              value={todate}
              setValue={setTodate}
              isRequired={false}
              isType="todate"
              compare={fromdate}
            />
          </GridItem>
        </Grid>

        <Text
          fontWeight={'bold'}
          color={'blue.700'}
          fontSize={'15px'}
          mb={2}
          mt={2}
        >
          Age Range (0 - 0 Yrs Old)
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={'From'}
              value={fromage}
              setValue={setFromage}
              isRequired={true}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={'To'}
              value={toage}
              setValue={setToage}
              isRequired={true}
            />
          </GridItem>
        </Grid>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Sex</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder={'- Please Select -'}
            value={sex}
            onChange={e => {
              setSex(e.target.value);
            }}
          >
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Referring Hospital</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder="- Please Select -"
            value={referringHospital}
            onChange={e => {
              setreferringHospital(e.target.value);
            }}
          >
            {hospitalData.map(hospital => {
              return (
                <option value={hospital.PK_hospital_ID}>
                  {hospital.hospital_Name}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Service Type</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={'gray.400'}
            bg={'gray.100'}
            placeholder="- Please Select -"
            value={servicetype}
            onChange={e => {
              setServiceType(e.target.value);
            }}
          >
            {SpecializationData.map(row => {
              return (
                <option value={row.PK_specializations_ID}>
                  {row.specializations_Title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </CustomModal>
    </>
  );
};
