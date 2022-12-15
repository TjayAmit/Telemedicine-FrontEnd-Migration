import {
  Text,
  Box,
  Container,
  useDisclosure,
  useToast,
  Flex,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import "../../../App.css";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  CustomTablePaginate,
  TitleColor,
  CustomModal,
  toastposition,
  toastvariant,
} from "../Packages";

import { FaUserMd } from "react-icons/fa";
import { SpecializationGetRequest } from "../../api/Specialization_Request";
import { CustomFormController } from "../../authentication/customs";
import { DoctorGetRequest } from "../../api/Doctor_Request";
import useAuth from "../../context/AuthContext";

const AddModal = ({ isOpen, onClose, fetch, users }) => {
  const title = "New Doctor";
  const toast = useToast();
  const filetag = useRef();
  const [exist, setExist] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    doctors_FirstName,
    setDoctors_FirstName,
    doctors_LastName,
    setDoctors_LastName,
    name,
    setName,
    isErrorFN,
    isErrorEmail,
    isErrorPassword,
    resetState,
    registerStaff,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = users.filter((x) => x.email === email);

    if (validate.length >= 1) {
      setExist(true);
      toast({
        title: "Email Already Exist!",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    } else {
      setLoader(true);

      const res = await registerStaff();

      if (res !== "successs") {
        toast({
          title: "Something went wrong!",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
      }

      if (res === "success") {
        onClose();
        toast({
          title: "Navigator registered!.",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
        resetState();
        fetch(true);
      }
      setLoader(false);
    }
  };

  return (
    <>
      <CustomModal
        title={"New Navigator"}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={"Save"}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 5 , 1fr)`}
          templateColumns={`repeat( 1 , 1fr)`}
          gap={2}
          overflow={"hidden"}
        >
          <GridItem rowSpan={5} colSpan={[2, 1]}>
            <CustomFormController
              isSignup={true}
              title={"First name"}
              type={"Text"}
              value={doctors_FirstName}
              placeholder={`Enter First Name `}
              setValue={setDoctors_FirstName}
              errorMessage={`First name is required.`}
              isError={isErrorFN}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={"1px solid #e0e0e0"}
                >
                  <Center>
                    <FaUserAlt color="#1f894c" size={15} />
                  </Center>
                </Box>
              }
            />
            <CustomFormController
              isSignup={true}
              title={"Last name"}
              type={"Text"}
              value={doctors_LastName}
              placeholder={`Enter Last name`}
              setValue={setDoctors_LastName}
              errorMessage={`Last name is required.`}
              isError={isErrorPassword}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={"1px solid #e0e0e0"}
                >
                  <Center>
                    <FaLock color="#1f894c" size={15} />
                  </Center>
                </Box>
              }
            />
            <CustomFormController
              isSignup={true}
              title={"Email"}
              type={"email"}
              value={email}
              placeholder={"Enter email"}
              setValue={setEmail}
              errorMessage={"Email is required."}
              isError={isErrorEmail}
              children={<MdEmail color="#1f894c" />}
            />
            <CustomFormController
              isSignup={true}
              title={"Username"}
              type={"text"}
              value={name}
              placeholder={"Enter username"}
              setValue={setName}
              errorMessage={"Username is required."}
              isError={isErrorEmail}
              children={<FaUserAlt color="#1f894c" />}
            />
            <CustomFormController
              isSignup={true}
              title={"Password"}
              type={"password"}
              value={password}
              placeholder={"Enter password"}
              setValue={setPassword}
              errorMessage={"Password is required."}
              isError={isErrorPassword}
              children={<FaLock color="#1f894c" />}
            />
          </GridItem>
        </Grid>
      </CustomModal>
    </>
  );
};

const Doctor = () => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(false);

  const [SpecializationData, setSpecializationData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctor, setDoctor] = useState([]);

  const handleFetchDoctor = async () => {
    const res = await DoctorGetRequest();

    if (res.data.status == 200) {
      setDoctor(res.data.data);
    }
  };

  const serviceTypeData = async () => {
    const json = await SpecializationGetRequest({ params: {} });
    if (json === null) {
      return;
    }
    setSpecializationData(json.data.data);
  };

  const Doctors = doctor.filter(
    (filter) =>
      filter.profile_LastName.toLowerCase().includes(search.toLowerCase()) ||
      filter.profile_FirstName.toLowerCase().includes(search.toLowerCase()) ||
      filter.email.toLowerCase().includes(search.toLowerCase()) ||
      filter.hospital_Name.toLowerCase().includes(search.toLowerCase())
  );

  //check if theres a changes. then update the data
  useEffect(() => {
    serviceTypeData();
    handleFetchDoctor();
    setFetch(false);
  }, [fetch]);

  const Title = "Doctors";

  const column = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "PROFILE",
        accessor: "profile",
      },
      {
        Header: "FIRST NAME",
        accessor: "profile_FirstName",
      },
      {
        Header: "LAST NAME",
        accessor: "profile_LastName",
      },
      {
        Header: "POSITION",
        accessor: "profile_position",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "HOSPITAL",
        accessor: "hospital_Name",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={5} p={[0, 0, 5, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <FaUserMd fontSize={35} fontWeight={"900"} ml={5} />
              <Text fontSize={30} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={"Navigator"}
              columns={column}
              data={Doctors}
              SpecializationData={SpecializationData}
              hospitalData={hospitalData}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
      <AddModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        fetch={setFetch}
        users={users}
        isModal={true}
      />
    </>
  );
};

export default Doctor;
