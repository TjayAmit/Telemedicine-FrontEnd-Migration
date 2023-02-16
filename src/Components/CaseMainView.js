import {
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Box,
  Flex,
  Grid,
  GridItem,
  Divider,
  useDisclosure,
  ModalContent,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";

const CaseMainView = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        className="patient__Name"
        color={"#2D82D7"}
        textTransform={"uppercase"}
        onClick={onOpen}
      >
        {data.name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent h="auto" w={["100vw", "100vw", "50vw", "50vw"]}>
          <ModalHeader fontSize={"2rem"}>Patient Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack p={"30px"} rowGap={"10px"}>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Flex>
                  <Text fontSize={"md"} fontWeight={"bold"} pr={"2px"}>
                    Personal Information
                  </Text>
                  <TbEdit />
                </Flex>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Last name</Text>
                    <Text fontWeight={"bold"}>{data.lname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>First name</Text>
                    <Text fontWeight={"bold"}>{data.fname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Middle name</Text>
                    <Text fontWeight={"bold"}>{data.mname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Sex</Text>
                    <Text fontWeight={"bold"}>{data.sex}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BIRTHDAY</Text>
                    <Text fontWeight={"bold"}>{data.birthday}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>AGE</Text>
                    <Text fontWeight={"bold"}>{data.age}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>CIVIL STATUS</Text>
                    <Text fontWeight={"bold"}>{data.civilstatus}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>RELIGION</Text>
                    <Text fontWeight={"bold"}>{data.religion}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>GUARDIAN</Text>
                    <Text fontWeight={"bold"}>{data.guardian}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>RELATION</Text>
                    <Text fontWeight={"bold"}>{data.relation}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Address
                </Text>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>STREET</Text>
                    <Text fontWeight={"bold"}>{data.street}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BARANGAY</Text>
                    <Text fontWeight={"bold"}>{data.barangay}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>CITY/MUNICIPALITY</Text>
                    <Text fontWeight={"bold"}>{data.city}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BIRTH PLACE</Text>
                    <Text fontWeight={"bold"}>{data.birthplace}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>ETHNICITY</Text>
                    <Text fontWeight={"bold"}>{data.ethnicity}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>DIALECT</Text>
                    <Text fontWeight={"bold"}>{data.dialect}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Address
                </Text>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>{data.contactno}</Text>
                    <Text fontWeight={"bold"}>+639758519398</Text>
                  </GridItem>
                </Grid>
              </Box>
            </Stack>
            <Divider />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CaseMainView;
