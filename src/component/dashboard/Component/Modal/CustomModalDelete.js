import React, { useState } from "react";
import {
  Text,
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
} from "@chakra-ui/react";

import useAuth from "../../../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { HospitalDeleteRequest } from "../../../api/Hospital_Request";
import { ReportDeleteRequest } from "../../../api/Report_Request";
import { PatientDeleteRequest } from "../../../api/Patient_Request";
import { SpecializationDeleteRequest } from "../../../api/Specialization_Request";
import { DoctorDeleteRequest } from "../../../api/Doctor_Request";
import { toastvariant, toastposition } from "../../Packages";
import { CaseDeleteRequest } from "../../../api/Case_Request";

export const CustomModalDelete = ({ title, isOpen, onClose, id, fetch }) => {
  const [dissable, setDissable] = useState(true);
  let result = [];
  let statusResult = "";
  const { user } = useAuth();
  const toast = useToast();

  const onChange = (value) => {
    if (user.name !== value) {
      setDissable(true);
      return;
    }
    setDissable(false);
  };

  const handleStatusCode = ({ statusCode, responseMessage }) => {
    if (statusCode === 401) {
      toast({
        title: responseMessage,
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
      return true;
    }

    toast({
      title: responseMessage,
      position: toastposition,
      variant: toastvariant,
      status: "success",
      isClosable: true,
    });

    return false;
  };

  const handleDelete = async () => {
    switch (title) {
      case "Specialization":
        result = await SpecializationDeleteRequest({
          id: id[0].PK_specializations_ID,
        });
        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }
        break;
      case "Hospital":
        result = await HospitalDeleteRequest({ id: id[0].PK_hospital_ID });
        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }

        break;
      case "Report":
        result = await ReportDeleteRequest({ id: id[0].report_No });
        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }

        break;

      case "Patient":
        result = await PatientDeleteRequest({ id: id[0].PK_patients_ID });

        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }

        //statusResult =  handleStatusCode({statusCode: 202, responseMessage: "AWWwwww"});
        break;

      case "Navigator":
        result = await DoctorDeleteRequest({ id: id[0].id });

        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }

        break;

      case "Case":
        result = await CaseDeleteRequest({ id: id[0].PK_cases_ID });

        statusResult = handleStatusCode({
          statusCode: result.data.status,
          responseMessage: result.data.message,
        });

        if (statusResult) {
          return;
        }

        break;
    }

    onClose();
    fetch(true);
    setDissable(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title === "Navigator" ? "Doctor" : title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel display="flex" columnGap={2}>
              To delete type <Text fontWeight={"700"}>{user.name}</Text>
            </FormLabel>

            <Input
              type="text"
              onChange={(e) => onChange(e.target.value)}
              onPaste={(e) => onChange(e.target.value)}
              autoFocus
            />
            <FormHelperText display="flex" columnGap={2}>
              <Text color={"orange"}>Warning</Text> data will be delete
              permanently!
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button bg={"lightwhite"} color="black" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg={"red.500"}
            color={"white"}
            _hover={{ bg: "red.600" }}
            disabled={dissable}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
