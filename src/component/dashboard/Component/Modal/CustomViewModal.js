import React from "react";
import {
  Text,
  IconButton,
  Flex,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import CustomModal from "../CustomModal";
import { CgDetailsMore } from "react-icons/cg";

export const CustomViewButton = ({ title, data, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton color={"blue.400"} onClick={onOpen}>
        <CgDetailsMore />
      </IconButton>

      <CustomModal
        /*   title={"Patient Information"} */
        isOpen={isOpen}
        onClose={onClose}
        //  onSave={}
        hasProfile={false}
        isNew={false}
        isView={true}
      >
        {data
          .filter((e) => e.PK_patients_ID == id[0].PK_patients_ID)
          .map((row) => {
            return (
              <>
                <Stack p={5} fontSize={15}>
                  <Flex key={1}>
                    <Text
                      mb={5}
                      fontSize={20}
                      textTransform={"uppercase"}
                      fontWeight={"bold"}
                    >
                      {row.patients_FirstName +
                        " " +
                        row.patients_MiddleName +
                        " " +
                        row.patients_LastName}
                    </Text>
                    <Spacer />
                    <Text fontSize={12} color={"gray.500"}>
                      {moment().format("@hh:mm a MM-DD-YYYY")}
                    </Text>
                  </Flex>

                  <Flex key={2}>
                    <Text fontSize={15}>Gender:</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_Gender}</Text>
                  </Flex>
                  <Flex key={3}>
                    <Text fontSize={15}>Civil Status :</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_CivilStatus}</Text>
                  </Flex>

                  <Flex key={4}>
                    <Text fontSize={15}>Birthday:</Text>
                    <Spacer />
                    <Text mr={5}>
                      {moment(row.patients_Birthday).format("MMM DD ,YYYY")}
                    </Text>
                  </Flex>

                  <Flex key={5} mt={2}>
                    <Text fontSize={15}>BirthPlace:</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_BirthPlace}</Text>
                  </Flex>
                  <Flex key={6} mt={2}>
                    <Text fontSize={15}>Dialect:</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_Dialect}</Text>
                  </Flex>

                  <Flex key={7} mt={2}>
                    <Text fontSize={15}>Ethnicity :</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_Ethnicity}</Text>
                  </Flex>
                  <Flex key={8} mt={2}>
                    <Text fontSize={15}>Religion :</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_Religion}</Text>
                  </Flex>
                </Stack>
                <Stack p={5} key={9} fontSize={15}>
                  <Text textTransform={"uppercase"} color={"blue.800"}>
                    Contact Information
                  </Text>
                  <Flex>
                    <Text fontSize={15}>Contact No :</Text>
                    <Spacer />
                    <Text mr={5}>{row.patients_Religion}</Text>
                  </Flex>
                  <Text>Address :</Text>
                  <Text>
                    {row.patients_Street +
                      " " +
                      row.patients_Barangay +
                      " , " +
                      row.patients_City}
                  </Text>
                </Stack>
              </>
            );
          })}
      </CustomModal>
    </>
  );
};
