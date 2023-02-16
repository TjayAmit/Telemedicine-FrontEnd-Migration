import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../../context/AuthContext.js";

const CustomModalDelete = ({ title, isOpen, onClose }) => {
  const [dissable, setDissable] = useState(true);
  const { user } = useAuth();

  const onChange = (value) => {
    if (user.name !== value) {
      setDissable(true);
      return;
    }
    setDissable(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel display="flex" columnGap={2}>
              To delete type <Text fontWeight={"700"}>Jose Marie Chan</Text>
            </FormLabel>
            <Input
              type="email"
              onChange={(e) => onChange(e.target.value)}
              onPaste={(e) => onChange(e.target.value)}
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
            bg={"red"}
            color={"white"}
            _hover={{ bg: "red" }}
            disabled={dissable}
            onClick={onClose}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModalDelete;
