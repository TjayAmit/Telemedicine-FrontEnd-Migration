import React from "react";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

const ConsultInfoMain = ({ maininfo, caseinfo }) => {
  const dData = [];
  return (
    <div>
      <Box
        mt={5}
        border={"1px"}
        borderColor={"gray.300"}
        borderRadius={10}
        p={5}
        shadow={"md"}
        transition={"all ease-in 1s"}
      >
        <Text fontWeight={"bold"}>Case Information - Main</Text>

        {caseinfo.map((x, key, t) => {
          return (
            <>
              <Grid templateColumns="repeat(8, 1fr)" gap={6} mt={4}>
                <GridItem w="100%" colSpan={[8, 8, 8, 8, 6]}>
                  {maininfo.map((e) => {
                    return (
                      e.grid === 1 && (
                        <>
                          {Object.keys(x).map((dt) => {
                            if (dt == Object.keys(e)[4]) {
                              return (
                                <>
                                  <Text fontSize={14} mb={1} color={"gray.600"}>
                                    {e.type}
                                  </Text>

                                  {e.custom === 1 ? (
                                    <Box p={5} mb={3}>
                                      <Text fontSize={13}>
                                        No attached file
                                      </Text>
                                    </Box>
                                  ) : (
                                    <Box
                                      p={5}
                                      border={"1px"}
                                      borderColor={"gray.300"}
                                      borderRadius={10}
                                      mb={3}
                                    >
                                      <Text fontSize={13}>{x[dt]}</Text>
                                    </Box>
                                  )}
                                </>
                              );
                            }
                          })}
                        </>
                      )
                    );
                  })}
                </GridItem>
                <GridItem w="100%" colSpan={[8, 8, 8, 8, 2]}>
                  {maininfo.map((e) => {
                    return (
                      e.grid === 2 && (
                        <>
                          {Object.keys(x).map((dt) => {
                            if (dt == Object.keys(e)[4]) {
                              return (
                                <>
                                  <Text fontSize={14} mb={1} color={"gray.600"}>
                                    {e.type}
                                  </Text>

                                  {e.custom === 1 ? (
                                    <Box p={5} mb={3}>
                                      <Text fontSize={13}>{x[dt]}</Text>
                                    </Box>
                                  ) : (
                                    <Box
                                      p={5}
                                      border={"1px"}
                                      borderColor={"gray.300"}
                                      borderRadius={10}
                                      mb={3}
                                    >
                                      <Text fontSize={13}>{x[dt]}</Text>
                                    </Box>
                                  )}
                                </>
                              );
                            }
                          })}
                        </>
                      )
                    );
                  })}
                </GridItem>
              </Grid>
            </>
          );
        })}
      </Box>
    </div>
  );
};

export default ConsultInfoMain;
