import React from "react";
import {
  Text,
  Flex,
  Box,
  Container,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineLink } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoEllipsisVerticalCircle } from "react-icons/io5";

const PendingRegistration = (props) => {
  return (
    <div>
      <Container maxW={"container.xxl"} mt={5}>
        <Box
          bg={"gray.50"}
          p={10}
          border={"1px"}
          borderColor={"blackAlpha.200"}
          borderRadius={10}
          shadow={"md"}
        >
          <Text fontWeight={"bold"}>Pending Registration</Text>

          {/* Pending Registration */}

          <Flex p={5}>
            <Box>
              <Avatar src="https://bit.ly/broken-link" size={"sm"} />
            </Box>
            <Box ml={3}>
              <Text fontSize={14}>
                Ben Jason
                <br />
                <span style={{ fontSize: "11px", color: "grey" }}>
                  caranaypedia23@gmail.com
                </span>
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Menu>
                <MenuButton>
                  <Button
                    variant={"ghost"}
                    fontWeight={"bold"}
                    fontSize={25}
                    color={"gray.700"}
                  >
                    <IoEllipsisVerticalCircle />
                  </Button>
                </MenuButton>
                <MenuList fontSize={13}>
                  <MenuItem
                    color={"gray.500"}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2D3748";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#718096";
                    }}
                  >
                    <AiOutlineUser />{" "}
                    <span style={{ marginLeft: "10px" }}>View Profile</span>
                  </MenuItem>
                  <MenuItem
                    color={"gray.500"}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2D3748";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#718096";
                    }}
                  >
                    <AiOutlineLink />{" "}
                    <span style={{ marginLeft: "10px" }}>
                      Send Verification Link
                    </span>
                  </MenuItem>
                  <MenuItem color={"red.400"}>
                    <RiDeleteBinLine />{" "}
                    <span style={{ marginLeft: "10px" }}> Delete Request</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
      </Container>
    </div>
  );
};

export default PendingRegistration;
