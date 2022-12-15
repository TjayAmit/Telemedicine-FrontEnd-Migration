import React, { useState } from "react";
import {
  Box,
  Text,
  Container,
  Flex,
  Grid,
  GridItem,
  Avatar,
  Stack,
  Badge,
  Editable,
  EditableInput,
  EditablePreview,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../../context/AuthContext";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoKeySharp } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { UserChangePassword } from "../../api/User_Request";
import { toastposition, toastvariant } from "../Packages";

function MyAccount(props) {
  const toast = useToast();
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (confirmPassword !== newPassword) {
        setConfirmPassword("");
        setNewPassword("");
        toast({
          title: "Password doesn't match!",
          position: toastposition,
          variant: toastvariant,
          status: "warning",
          isClosable: true,
        });
        return;
      }

      const res = await UserChangePassword({
        password: password,
        newPassword: newPassword,
      });

      if (res.data.status !== 200) {
        toast({
          title: res.data.message,
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
      }

      if (res.data.status === 200) {
        toast({
          title: "Password updated!.",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenFile = () => {
    document.getElementById("file").click();
  };

  return (
    <div>
      <Container maxW={"container.xl"} mt={20}>
        <Box mt={2} p={[0, 0, 5, 10]}>
          <Flex>
            <Box>
              <Avatar
                size="xl"
                name={user.name}
                src={
                  user.url === "NONE"
                    ? require("../../../assets/default_profile.png")
                    : user.url
                }
              />
            </Box>

            <Box ml={4} mt={4}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={16}>
                  {user.name}{" "}
                  <Badge colorScheme="green">
                    <Flex>
                      Verified
                      <AiOutlineCheckCircle
                        style={{ fontSize: "15px", marginTop: "1px" }}
                      />
                    </Flex>
                  </Badge>
                  <br />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "normal",
                    }}
                  >
                    {user.email}
                  </span>
                  <br />
                </Text>
              </Stack>
              <Button
                fontSize={11}
                fontWeight="normal"
                color={"blue.500"}
                variant={"unstyled"}
                size={"sm"}
                onClick={handleOpenFile}
              >
                <Flex>
                  <MdOutlineFileUpload style={{ fontSize: "13px" }} /> Change
                  Profile Picture
                </Flex>
              </Button>
            </Box>
          </Flex>
          <input
            type={"file"}
            id="file"
            name="image"
            style={{ display: "none" }}
          />
          <Box p={5} mt={4}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" colSpan={[5, 5, 5, 2]}>
                <Text fontSize={13} color={"gray.500"} mb={2}>
                  Display Name
                </Text>

                <Editable
                  mr={2}
                  defaultValue={user.name}
                  fontSize={15}
                  color={"gray.700"}
                  cursor={"pointer"}
                  mb={4}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                <Text fontSize={13} color={"gray.500"}>
                  Email
                </Text>

                <Editable
                  mr={2}
                  defaultValue={user.email}
                  fontSize={15}
                  color={"gray.700"}
                  cursor={"pointer"}
                  mb={4}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                <Accordion allowMultiple mt={4}>
                  <AccordionItem bg={"blackAlpha.100"} borderRadius={5}>
                    <h5>
                      <AccordionButton>
                        <Box
                          flex="1"
                          textAlign="left"
                          fontSize={14}
                          color={"gray.600"}
                        >
                          <Flex>
                            <IoKeySharp
                              style={{
                                fontSize: "16px",
                                marginTop: "2px",
                                marginRight: "2px",
                              }}
                            />
                            Change Password
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h5>
                    <AccordionPanel pb={4}>
                      <form onSubmit={handleSubmit}>
                        <Box>
                          <FormControl isRequired>
                            <FormLabel fontSize={13}>
                              Current Password
                            </FormLabel>
                            <Input
                              type="password"
                              size={"sm"}
                              border={"1px"}
                              borderColor={"gray.300"}
                              borderRadius={5}
                              focusBorderColor={"green.100"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />

                            <FormHelperText></FormHelperText>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel fontSize={13}>New Password</FormLabel>
                            <Input
                              type="password"
                              size={"sm"}
                              border={"1px"}
                              borderColor={"gray.300"}
                              borderRadius={5}
                              focusBorderColor={"green.100"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <FormHelperText></FormHelperText>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel fontSize={13}>
                              Reenter New Password
                            </FormLabel>
                            <Input
                              type="password"
                              size={"sm"}
                              border={"1px"}
                              borderColor={"gray.300"}
                              borderRadius={5}
                              focusBorderColor={"green.100"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            <FormHelperText></FormHelperText>
                          </FormControl>
                          <Button
                            type="Submit"
                            colorScheme={"blue"}
                            fontWeight={"normal"}
                            variant={"solid"}
                            size={"sm"}
                            mt={2}
                          >
                            Save
                          </Button>
                        </Box>
                      </form>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Box mt={5}>
                  <Text fontSize={13} color={"gray.500"}>
                    Hospital
                  </Text>
                  <Text mb={5} fontSize={15}>
                    Zamboanga City Medical Center
                  </Text>
                  <Text fontSize={13} color={"gray.500"}>
                    Specialization
                  </Text>
                  <Text fontSize={15}>Internal Medicine</Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default MyAccount;
