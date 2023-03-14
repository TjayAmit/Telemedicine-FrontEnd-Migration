import { useRef } from "react";
import { BsUpload } from "react-icons/bs";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Text,
  Progress,
} from "@chakra-ui/react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  handleSubmit,
  hasProfile,
  isNew,
  btntitle,
  isView,
  logo,
  setLogo,
  loader,
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const hiddenFileInput = useRef(null);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          {loader ? <Progress size="xs" isIndeterminate /> : ""}
          <ModalHeader>{title}</ModalHeader>

          <ModalCloseButton />
          <form method={"post"} onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              {children}
              <Box mt={2}>
                {hasProfile ? (
                  <Flex>
                    <Box
                      p={"4px"}
                      fontSize={50}
                      border={"1px solid"}
                      borderColor={"gray.400"}
                      borderRadius={5}
                      bg={"gray.200"}
                    >
                      <img height={"auto"} width={"100px"} src={logo} />
                    </Box>
                    <input
                      input
                      type="file"
                      onChange={setLogo}
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                      ref={hiddenFileInput}
                    />
                    <Box ml={3} mt={6}>
                      <Button
                        fontWeight={"normal"}
                        fontSize={14}
                        onClick={() => {
                          hiddenFileInput.current.click();
                        }}
                      >
                        <BsUpload style={{ marginRight: "10px" }} /> Upload
                        Picture
                      </Button>
                    </Box>
                  </Flex>
                ) : null}
              </Box>
              <Text
                color={"gray.400"}
                fontSize="12px"
                position={"absolute"}
                bottom={"2"}
              >
                TELEMEDICINE &middot; 2022
              </Text>
            </ModalBody>

            <ModalFooter>
              {isView ? (
                <Button
                  fontSize={"14px"}
                  borderRadius={"4"}
                  fontWeight={"normal"}
                  onClick={onClose}
                  size="sm"
                  mr={4}
                >
                  Close
                </Button>
              ) : (
                <>
                  <Button
                    fontSize={"14px"}
                    borderRadius={"4"}
                    fontWeight={"normal"}
                    onClick={onClose}
                    size="sm"
                    mr={4}
                  >
                    Cancel
                  </Button>

                  <Button
                    isLoading={loader}
                    loadingText={"Saving"}
                    type={"submit"}
                    fontSize={"14px"}
                    borderRadius={"4"}
                    fontWeight={"normal"}
                    colorScheme="green"
                    mr={3}
                    size="sm"
                    bg={loader ? "gray" : "#1CB45D"}
                  >
                    {btntitle}
                  </Button>
                </>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
