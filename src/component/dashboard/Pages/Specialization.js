import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Text, Container, useDisclosure, Flex } from "@chakra-ui/react";
import {
  CustomModal,
  TextFormController,
  CustomTablePaginate,
  TitleColor,
  toastposition,
  toastvariant,
} from "../Packages";
import {
  SpecializationPostRequest,
  SpecializationGetRequest,
} from "../../api/Specialization_Request";
import { DoctorGetRequest } from "../../api/Doctor_Request";
import { useToast } from "@chakra-ui/react";
import { GiSkills } from "react-icons/gi";

const AddModal = ({ isOpen, onClose, fetch }) => {
  const title = "New Specialization";
  const [tittle, setSpecialization] = useState("");
  const [des, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await SpecializationPostRequest({
      specializations_Title: tittle,
      specializations_Description: des,
    });

    if (res.data.status !== 200) {
      toast({
        title: "Failed to add specialization!",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    }

    if (res.data.status === 200) {
      onClose();
      setSpecialization("");
      setDescription("");
      fetch(true);

      toast({
        title: "Added Successfully!",
        position: toastposition,
        variant: toastvariant,
        status: "success",
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
        btntitle={"Save"}
      >
        <TextFormController
          title={"Specialization"}
          value={tittle}
          setValue={setSpecialization}
          isRequired={true}
        />

        <TextFormController
          title={"Description"}
          value={des}
          setValue={setDescription}
          isRequired={true}
          textArea={true}
        />
      </CustomModal>
    </>
  );
};

const Specialization = () => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doctors, setDoctors] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const handleFetchSpecialization = async () => {
    const res = await SpecializationGetRequest();

    if (res.data.status === 200) {
      setSpecializations(res.data.data);
    }
  };

  const displayData = async () => {
    const jsonDoctors = await DoctorGetRequest({ params: {} });
    if (jsonDoctors === null) {
      return;
    }

    setDoctors(jsonDoctors.data.data);
  };

  //SearchFilter
  const FilteredItems = specializations.filter((filter) =>
    filter.specializations_Title.toLowerCase().includes(search.toLowerCase())
  );

  //check if theres a changes. then update the data
  useEffect(() => {
    handleFetchSpecialization();
    displayData();
    setFetch(false);
  }, [fetch]);

  const Title = "Specialization";

  const columns = [
    {
      Header: "ID",
      accessor: "PK_specializations_ID",
    },
    {
      Header: "SPECIALIZATION",
      accessor: "specializations_Title",
    },
    {
      Header: "DESCRIPTION",
      accessor: "specializations_Description",
    },
    {
      Header: "DOCTORS",
      accessor: "doctors",
    },
    {
      Header: "DATE CREATED",
      accessor: "created_at",
    },
    {
      Header: "LAST MODIFIED",
      accessor: "updated_at",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <GiSkills fontSize={40} fontWeight={"900"} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>
          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              fetch={setFetch}
              data={FilteredItems}
              doctors={doctors}
              search={search}
              setSearch={setSearch}
              isModal={true}
              onOpen={onOpen}
            />
          </Box>
        </Box>
      </Container>
      <AddModal isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Specialization;
