import useCase from './CaseContext'
import {
  Text,
  Flex,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Stack,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import moment from "moment";
import { RiEmotionSadLine } from "react-icons/ri";

export const CustomPatient = ({ patientdata, isUpdate, patientID }) => {
  const { setFK_patients_ID, patients } = useCase();
  const [selected, setSelected] = useState();
  const [loader, setloader] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearcValue] = useState("");

  const filtered = patients.filter((x) =>
    x.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, [isUpdate]);

  return (
    <Box
      border={"1px solid"}
      borderColor={isUpdate ? "green.50" : "gray.300"}
      mt={2}
      p={2}
      backgroundColor={"blackAlpha.200"}
      borderRadius={5}
      cursor={"pointer"}
      onClick={() => {
        setSearch(true);
      }}
    >
      {selected && (
        <Button
          color={"red.400"}
          float={"right"}
          onClick={() => {
            setSelected("");
            setFK_patients_ID("");
            setSearcValue("");
          }}
        >
          <FaTimes />
        </Button>
      )}

      {isUpdate ? (
        <>
          {loader ? (
            <>
              <Box>
                <Skeleton>
                  <div>contents wrapped</div>
                  <div>won't be visible</div>
                </Skeleton>

                <Stack mt={5}>
                  <Skeleton height="20px" width={60} />
                  <Skeleton height="20px" width={70} />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" width={10} />
                  <Skeleton height="20px" width={60} />
                </Stack>
                <Stack mt={10}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" width={60} />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" width={60} />
                  <Skeleton height="20px" width={40} />
                </Stack>
              </Box>
            </>
          ) : (
            <Box borderRadius={5}>
              {patientdata
                .filter((filter) => filter.PK_patients_ID == patientID)
                .map((row) => {
                  return (
                    <>
                      <Text fontSize={11} color={"gray.400"}>
                        Patient Information
                      </Text>
                      <Stack p={4} fontSize={15}>
                        <Flex>
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

                        <Flex>
                          <Text fontSize={15}>Gender:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Gender}</Text>
                        </Flex>
                        <Flex>
                          <Text fontSize={15}>Civil Status :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_CivilStatus}</Text>
                        </Flex>

                        <Flex>
                          <Text fontSize={15}>Birthday:</Text>
                          <Spacer />
                          <Text mr={5}>
                            {moment(row.patients_Birthday).format(
                              "MMM DD ,YYYY"
                            )}
                          </Text>
                        </Flex>

                        <Flex mt={2}>
                          <Text fontSize={15}>BirthPlace:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_BirthPlace}</Text>
                        </Flex>
                        <Flex mt={2}>
                          <Text fontSize={15}>Dialect:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Dialect}</Text>
                        </Flex>

                        <Flex mt={2}>
                          <Text fontSize={15}>Ethnicity :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Ethnicity}</Text>
                        </Flex>
                        <Flex mt={2}>
                          <Text fontSize={15}>Religion :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Religion}</Text>
                        </Flex>
                      </Stack>
                      <Stack p={5} fontSize={15}>
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
            </Box>
          )}
        </>
      ) : search ? (
        <>
          {selected ? (
            <>
              {patientdata
                .filter((filter) => filter.PK_patients_ID == selected)
                .map((row) => {
                  return (
                    <>
                      <Text fontSize={11} color={"gray.400"}>
                        Patient Information
                      </Text>
                      <Stack p={4} fontSize={15}>
                        <Flex>
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

                        <Flex>
                          <Text fontSize={15}>Gender:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Gender}</Text>
                        </Flex>
                        <Flex>
                          <Text fontSize={15}>Civil Status :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_CivilStatus}</Text>
                        </Flex>

                        <Flex>
                          <Text fontSize={15}>Birthday:</Text>
                          <Spacer />
                          <Text mr={5}>
                            {moment(row.patients_Birthday).format(
                              "MMM DD ,YYYY"
                            )}
                          </Text>
                        </Flex>

                        <Flex mt={2}>
                          <Text fontSize={15}>BirthPlace:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_BirthPlace}</Text>
                        </Flex>
                        <Flex mt={2}>
                          <Text fontSize={15}>Dialect:</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Dialect}</Text>
                        </Flex>

                        <Flex mt={2}>
                          <Text fontSize={15}>Ethnicity :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Ethnicity}</Text>
                        </Flex>
                        <Flex mt={2}>
                          <Text fontSize={15}>Religion :</Text>
                          <Spacer />
                          <Text mr={5}>{row.patients_Religion}</Text>
                        </Flex>
                      </Stack>
                      <Stack p={5} fontSize={15}>
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
            </>
          ) : (
            <Box>
              <InputGroup>
                <InputLeftAddon children={<AiOutlineSearch />} />
                <Input
                  variant={"unstyled"}
                  fontSize={14}
                  placeholder={"Search Patient"}
                  value={searchValue}
                  onChange={(e) => {
                    setSearcValue(e.target.value);
                  }}
                  autoFocus
                />
              </InputGroup>

              <Box height={400} overflowY={"scroll"}>
                {filtered.length >= 1 ? (
                  filtered.map((row) => {
                    return (
                      <>
                        <Box
                          border={"1px solid"}
                          p={2}
                          fontSize={14}
                          borderColor={"gray.200"}
                          backgroundColor={"blue.50"}
                        >
                          <Flex>
                            <Box p={2}>{row.name}</Box>
                            <Spacer />
                            <Button
                              variant={"solid"}
                              colorScheme={"green"}
                              backgroundColor={"green.400"}
                              color={"green.50"}
                              size={"sm"}
                              fontWeight={"normal"}
                              onClick={() => {
                                setSelected(row.id);
                                setFK_patients_ID(row.id);
                              }}
                            >
                              Select
                            </Button>
                          </Flex>
                        </Box>
                      </>
                    );
                  })
                ) : (
                  <>
                    <Center p={20}>
                      <Stack>
                        <Center>
                          <Text textAlign={"center"}>
                            <RiEmotionSadLine
                              style={{ fontSize: "70px", color: "#d65f5f" }}
                            />
                          </Text>
                        </Center>

                        <Text fontSize={15}>Patient not Found..</Text>
                      </Stack>
                    </Center>
                  </>
                )}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Text fontSize={14} textAlign={"center"}>
          -- Select Patient --
        </Text>
      )}
    </Box>
  );
};
