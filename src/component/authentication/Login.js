import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LoginHeader, CustomFormController } from "./customs.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext.js";
import "../../App.css";
import {
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";

import {
  CustomSelection,
  toastposition,
  toastvariant,
} from "../dashboard/Packages.js";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    authException,
    setAuthException,
    email,
    setEmail,
    password,
    setPassword,
    vpassword,
    setVPassword,
    doctors_FirstName,
    setDoctors_FirstName,
    doctors_LastName,
    setDoctors_LastName,
    name,
    setName,
    isErrorFN,
    setIsErrorFN,
    isErrorL,
    setIsErrorLN,
    isErrorEmail,
    setIsErrorEmail,
    isErrorPassword,
    setIsErrorPassword,
    isErrorVP,
    setIsErrorVP,
    user,
    FK_hospital_ID,
    setFK_hospital_ID,
    FK_specializations_ID,
    setFK_specializations_ID,
    login,
    register,
    hospitals,
    specializations,
    resetState,
  } = useAuth();

  const [isSignup, setIsSignup] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res = await login();

    if (res === "warning") {
      toast({
        title: "Please wait for account approval.",
        position: toastposition,
        variant: toastvariant,
        status: "warning",
        isClosable: true,
      });
      resetState();
    }
    if (res === "success") {
      navigate("/");
    }

    setAuthException(res);
    setLoading(false);
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await register();
    if (res === "success") {
      toast({
        title: "Please wait for approval!",
        position: toastposition,
        variant: toastvariant,
        status: "success",
        isClosable: true,
      });
      setIsSignup(false);
      resetState();
    }

    setLoading(false);
  };

  return (
    <>
      <Flex
        h={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        bg={"#f7f5f9"}
        rounded={8}
      >
        <Box
          w={isSignup ? "40rem" : "27rem"}
          h={isSignup ? "" : "32rem"}
          overflow="hidden"
          className="authbox"
          m={"auto"}
          bg={"white"}
        >
          <LoginHeader isSignup={isSignup} />
          {authException === "" ? (
            <Text color={"red"}>{authException}</Text>
          ) : null}
          <form
            class="form-container"
            onSubmit={(e) =>
              isSignup ? handleSubmitRegistration(e) : handleSubmitLogin(e)
            }
          >
            <Grid
              templateRows={`repeat(${isSignup ? 2 : 3}, 1fr)`}
              templateColumns={`repeat(${isSignup ? 2 : 1}, 1fr)`}
              gap={2}
              overflow={"hidden"}
            >
              <GridItem rowSpan={isSignup ? 2 : 4} colSpan={[2, 1]}>
                <CustomFormController
                  isSignup={isSignup}
                  title={isSignup ? "First name" : "Username"}
                  type={"Text"}
                  value={isSignup ? doctors_FirstName : name}
                  placeholder={`Enter ${isSignup ? "First Name" : "username"}`}
                  setValue={isSignup ? setDoctors_FirstName : setName}
                  errorMessage={`${
                    isSignup ? "First name" : "Email"
                  } is required.`}
                  isError={isSignup ? isErrorFN : isErrorEmail}
                  children={
                    <Box
                      w={8}
                      h={4}
                      mt={6}
                      mb={6}
                      borderRight={"1px solid #e0e0e0"}
                    >
                      <Center>
                        <FaUserAlt color="#1f894c" size={15} />
                      </Center>
                    </Box>
                  }
                />
                <CustomFormController
                  isSignup={isSignup}
                  title={isSignup ? "Last name" : "Password"}
                  type={isSignup ? "Text" : "password"}
                  value={isSignup ? doctors_LastName : password}
                  placeholder={`Enter ${isSignup ? "Last name" : "password"}`}
                  setValue={isSignup ? setDoctors_LastName : setPassword}
                  errorMessage={`${
                    isSignup ? "Last name" : "Password"
                  } is required.`}
                  isError={isErrorPassword}
                  children={
                    isSignup ? (
                      <FaUserAlt color={"#1f894c"} />
                    ) : (
                      <Box
                        w={8}
                        h={4}
                        mt={6}
                        mb={6}
                        borderRight={"1px solid #e0e0e0"}
                      >
                        <Center>
                          <FaLock color="#1f894c" size={15} />
                        </Center>
                      </Box>
                    )
                  }
                />
                {isSignup ? (
                  <CustomSelection
                    title={"Hospital"}
                    value={FK_hospital_ID}
                    setValue={setFK_hospital_ID}
                    mt={"1.14rem"}
                  />
                ) : null}
                {isSignup ? (
                  <CustomSelection
                    title={"Specialization"}
                    value={FK_specializations_ID}
                    setValue={setFK_specializations_ID}
                    mt={5}
                  />
                ) : null}
              </GridItem>
              {isSignup ? (
                <GridItem rowSpan={isSignup ? 4 : 2} colSpan={[2, 1]}>
                  <CustomFormController
                    isSignup={isSignup}
                    title={"Email"}
                    type={"email"}
                    value={email}
                    placeholder={"Enter email"}
                    setValue={setEmail}
                    errorMessage={"Email is required."}
                    isError={isErrorEmail}
                    children={<MdEmail color="#1f894c" />}
                  />
                  <CustomFormController
                    isSignup={isSignup}
                    title={"Username"}
                    type={"text"}
                    value={name}
                    placeholder={"Enter username"}
                    setValue={setName}
                    errorMessage={"Username is required."}
                    isError={isErrorEmail}
                    children={<FaUserAlt color="#1f894c" />}
                  />
                  <CustomFormController
                    isSignup={isSignup}
                    title={"Password"}
                    type={"password"}
                    value={password}
                    placeholder={"Enter password"}
                    setValue={setPassword}
                    errorMessage={"Password is required."}
                    isError={isErrorPassword}
                    children={<FaLock color="#1f894c" />}
                  />
                  {isSignup ? (
                    <CustomFormController
                      isSignup={isSignup}
                      title={"Confirm Password"}
                      type={"password"}
                      value={vpassword}
                      placeholder={"Type password again"}
                      setValue={setVPassword}
                      errorMessage={"Confirm password is required."}
                      isError={isErrorPassword}
                      children={<FaLock color="primary.900" />}
                    />
                  ) : null}
                </GridItem>
              ) : null}
            </Grid>
            <Grid
              templateRows={`repeat(${isSignup ? 1 : 3}, 1fr)`}
              templateColumns={`repeat(${isSignup ? 2 : 1}, 1fr)`}
              gap={2}
              mt={"5"}
              overflow={"hidden"}
            >
              {isSignup ? null : (
                <GridItem rowSpan={1}>
                  <Button
                    width={"100%"}
                    bg={"white"}
                    _hover={{
                      bg: "white",
                    }}
                    color="grey"
                    onClick={(e) => null}
                    fontWeight={"400"}
                  >
                    {"forgot password ?"}
                  </Button>
                </GridItem>
              )}
              <GridItem rowSpan={1}>
                <Button
                  isLoading={isSignup ? null : loading}
                  loadingText={isSignup ? null : "Submitting"}
                  type={isSignup ? null : "submit"}
                  value={!isSignup ? null : "Submit"}
                  marginTop="0px"
                  width={"100%"}
                  bg={isSignup ? "grey" : "rgb(28, 180, 93)"}
                  _hover={{
                    bg: isSignup ? "grey" : "primary.800",
                  }}
                  color="white"
                  onClick={(e) => (isSignup ? setIsSignup(!isSignup) : null)}
                >
                  {"Sign In"}
                </Button>
              </GridItem>
              <GridItem rowSpan={1}>
                <Button
                  isLoading={isSignup ? loading : null}
                  loadingText={isSignup ? "Submitting" : null}
                  type={isSignup ? "submit" : null}
                  value={!isSignup ? "Submit" : null}
                  marginTop={isSignup ? "0px" : "5px"}
                  width={"100%"}
                  bg={isSignup ? "rgb(28, 180, 93)" : "grey"}
                  _hover={{
                    bg: isSignup ? "rgb(28, 180, 93)" : "grey",
                  }}
                  color="white"
                  onClick={(e) => (isSignup ? null : setIsSignup(!isSignup))}
                >
                  {isSignup ? "Submit" : "Create Account"}
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
