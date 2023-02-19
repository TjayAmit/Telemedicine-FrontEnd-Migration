import { Flex, Text, Heading, Image, Grid, GridItem } from "@chakra-ui/react";

function LoginHeader({ isSignup }) {
  return (
    <>
      <Grid
        h="80px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={2}
        overflow={"hidden"}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Image
            w="60px"
            h={"80px"}
            src={require("../../../assets/zcmc_logo.png")}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={2}>
          <Flex direction={"column"} verticalAlign={"space-between"}>
            <Heading fontSize="26px">{isSignup ? "Signup" : "Sign In"}</Heading>
            <Text fontSize="sm">Enter your credentials to continue</Text>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default LoginHeader;
