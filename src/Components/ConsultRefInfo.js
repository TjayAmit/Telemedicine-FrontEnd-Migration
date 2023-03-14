import React from "react";
import { Box, Text, Heading, Container } from "@chakra-ui/react";
import moment from "moment";

const ConsultRefInfo = ({ refinfo, caseinfo }) => {
  return (
    <div>
      {caseinfo.map((x) => {
        return (
          <>
            <Box
              mt={10}
              border={"1px"}
              borderColor={"gray.300"}
              borderRadius={10}
              bg={"green.200"}
              p={5}
              shadow={"lg"}
              transition={"all ease-in 1s"}
            >
              {" "}
              <Heading fontSize={15} color={"green.700"}>
                Service Type
              </Heading>
              <Container color={"green.700"} p={5}>
                <li>{x.specializations_Title}</li>
              </Container>
            </Box>

            <Box
              mt={5}
              border={"1px"}
              borderColor={"gray.300"}
              borderRadius={10}
              bg={"green.200"}
              p={5}
              shadow={"lg"}
              transition={"all ease-in 1s"}
            >
              <Heading fontSize={15} color={"green.700"}>
                Referring Hospital
              </Heading>
              <Container color={"green.700"} p={5}>
                {refinfo.map((e) => {
                  return (
                    <>
                      {Object.keys(x).map((dt) => {
                        if (dt == Object.keys(e)[2]) {
                          return (
                            <>
                              <Box mb={3}>
                                <Text
                                  fontStyle={"italic"}
                                  color={"green.500"}
                                  fontSize={14}
                                >
                                  {e.type}
                                </Text>
                                <Text fontSize={14}>
                                  {dt == "doctor_name" ? (
                                    <>Dr. {x[dt]}</>
                                  ) : dt == "created_at" ? (
                                    moment(x[dt]).format("h:mm a MMMM Do YYYY")
                                  ) : dt == "updated_at" ? (
                                    moment(x[dt]).format("h:mm a MMMM Do YYYY")
                                  ) : (
                                    x[dt]
                                  )}
                                </Text>
                              </Box>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                })}
              </Container>
            </Box>
          </>
        );
      })}
    </div>
  );
};

export default ConsultRefInfo;
