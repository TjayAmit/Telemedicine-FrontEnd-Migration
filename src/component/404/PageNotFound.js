import {
  Button,
  Text,
  Flex,
  Box,
  Image,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdOutlineArrowForward } from "react-icons/md";

const PageNotFound = () => {
  const [isLargerThan375] = useMediaQuery("(max-width: 375px)");
  return (
    <>
      <Flex w={"100%"} h={"100vh"} display={"flex"} justifyContent={"center"}>
        <Box display={"flex"} h={300}>
          <Image
            src={
              "https://zcmc.vercel.app/static/media/broken.f9e96ca205d38c50fd1715fc80d8ebae.svg"
            }
            width={"30vh"}
            transform={"translateY(100%)"}
          />
          <Box
            h={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            transform={isLargerThan375 ? "translateY(20%)" : "translateY(0%)"}
          >
            <Heading color={"#75b687"} size={isLargerThan375 ? "3xl" : "4xl"}>
              404
            </Heading>
            <Heading size={"sm,md"}>LOOKS LIKE YOU'RE LOST</Heading>
            <Text fontSize={isLargerThan375 ? "12px" : "20px"} color={"grey"}>
              Page not found
            </Text>
            <Button
              w={isLargerThan375 ? 200 : 300}
              columnGap={2}
              color={"#75b687"}
              bg={"white"}
            >
              Back to home <MdOutlineArrowForward />
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default PageNotFound;
