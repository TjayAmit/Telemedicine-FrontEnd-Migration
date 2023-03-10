import {
  Text,
  Box,
  Grid,
  GridItem,
  Container,
  useDisclosure,
  Flex,
  useToast,
  Center,
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../../App.css";
import React, { useState, useEffect } from "react";
import {
  CustomModal,
  CustomTablePaginate,
  TitleColor,
  toastposition,
  toastvariant,
} from "../Packages";
import { CustomFormController } from "../../authentication/customs";
import { UserGetRequest } from "../../api/User_Request";
import { FaUsers } from "react-icons/fa";
import useAuth from "../../context/AuthContext";
import { CustomSelection } from "../Packages";
import { SpecializationGetRequest } from "../../api/Specialization_Request";

const AddModal = ({ isOpen, onClose, fetch, users }) => {
  const title = "New Doctor";
  const toast = useToast();
  const [exist, setExist] = useState(false);
  const [loader, setLoader] = useState(false);

  console.log(users);
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
    registerAdminDoctor,
    FK_specializations_ID,
    setFK_specializations_ID,
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
      const res = await registerAdminDoctor();

      if (res !== "success") {
        toast({
          title: "Something went wrong",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
      }

      if (res === "success") {
        onClose();
        toast({
          title: "New admin created",
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
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={"Save"}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 2 , 1fr)`}
          templateColumns={`repeat( 2 , 1fr)`}
          gap={2}
          overflow={"hidden"}
        >
          <GridItem rowSpan={2} colSpan={[2, 1]}>
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
            <CustomSelection
              title={"Specialization"}
              value={FK_specializations_ID}
              setValue={setFK_specializations_ID}
              mt={5}
            />
          </GridItem>
          <GridItem rowSpan={3} colSpan={[2, 1]}>
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

const User = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SpecializationData, setSpecializationData] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(false);
  const Title = "User";

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "PROFILE",
      accessor: "profile",
    },
    {
      Header: "NAME",
      accessor: "fullname",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "ROLE",
      accessor: "role",
    },
    {
      Header: "STATUS",
      accessor: "status",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const handleFetchUser = async () => {
    const res = await UserGetRequest();

    if (res.data.status === 200) {
      setUsers(res.data.data);
    }
  };

  const serviceTypeData = async () => {
    const json = await SpecializationGetRequest({ params: {} });
    if (json === null) {
      return;
    }
    setSpecializationData(json.data.data);
  };

  const userJSONData = users.filter((filter) =>
    filter.fullname.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    serviceTypeData();
    handleFetchUser();
    setFetch(false);
  }, [fetch]);

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={5} p={10}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <FaUsers fontSize={40} fontWeight={"900"} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={"Admin Doctor"}
              columns={columns}
              data={userJSONData}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>

      <AddModal
        users={user}
        fetch={fetch}
        SpecializationData={SpecializationData}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default User;
