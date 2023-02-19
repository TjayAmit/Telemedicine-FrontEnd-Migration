import { VscCircleFilled } from "react-icons/vsc";
import {
  TableContainer,
  Thead,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import CaseMainView from './CaseMainView'

const CaseTable = ({ datas }) => {
  return (
    <TableContainer mt={3}>
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th color={"gray.600"} fontSize={13}>
              Case ID
            </Th>
            <Th color={"gray.600"} fontSize={13}>
              Patients
            </Th>
            <Th color={"gray.600"} fontSize={13}>
              Service
            </Th>
            <Th color={"gray.600"} fontSize={13}>
              Date
            </Th>
            <Th color={"gray.600"} fontSize={13}>
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={14}>
          {datas.map((data) => {
            return (
              <Tr className="table-data" color={"gray.500"}>
                <Td className="bdhover">
                  <Box
                    color={"red.400"}
                    mb={2}
                    position={"relative"}
                    top={"-20px"}
                    left={"-20px"}
                  >
                    <VscCircleFilled fontSize={20} />
                  </Box>
                  <Flex>
                    <Stack>
                      <Box ml={2}>
                        <Text
                          color={"#2D82D7"}
                          fontWeight={"bold"}
                          className={"doctorname"}
                        >
                          {data.id}
                        </Text>
                        <Text color={"gray.500"} fontSize={12}>
                          Follow Ups : {data.followup}
                        </Text>
                      </Box>
                    </Stack>
                  </Flex>
                </Td>
                <Td>
                  <Stack>
                    <CaseMainView data={data} />
                    <Text color={"blackAlpha.700"} fontSize={13}>
                      <span>
                        Gender : {data.patientGender}
                        <br />
                        Age : {data.patientAge} yrs old
                        <br />
                        Civil status : {data.patientCivilStatus}
                        <br />
                      </span>
                    </Text>
                  </Stack>
                </Td>
                <Td>{data.specialization}</Td>
                <Td>{data.date}</Td>
                <Td>
                  <Badge ml="1" fontSize="13px" colorScheme="green">
                    {data.status}
                  </Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CaseTable;
