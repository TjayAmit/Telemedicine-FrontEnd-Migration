import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  Flex,
  Spacer,
  Center,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SpecializationPutRequest } from "../../../api/Specialization_Request";
import {
  toastposition,
  toastvariant,
  CustomModal,
  TextFormController,
} from "../../Packages";

export const SpecializationModal = ({
  title,
  isOpen,
  onClose,
  data,
  fetch,
}) => {
  const toast = useToast();

  const [specialization, setSpecialization] = useState(
    data === null ? "" : data.specializations_Title
  );
  const [description, setDescription] = useState(
    data === null ? "" : data.specializations_Description
  );

  const onSave = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("PK_specializations_ID", data.PK_specializations_ID);
    bodyFormData.append("specializations_Title", specialization);
    bodyFormData.append("specializations_Description", description);

    SpecializationPutRequest({
      data: bodyFormData,
    }).then(() => {
      fetch(true);
      onClose();

      toast({
        title: "Updated Successfully!",
        position: toastposition,
        variant: toastvariant,
        status: "success",
        isClosable: true,
      });
    });
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onSave}
        hasProfile={false}
        isNew={false}
        btntitle={"Update"}
      >
        <TextFormController
          title={"Specialization"}
          value={specialization}
          setValue={setSpecialization}
          isRequired={true}
        />

        <TextFormController
          title={"Description"}
          value={description}
          setValue={setDescription}
          isRequired={true}
          textArea={true}
        />
      </CustomModal>
    </>
  );
};
