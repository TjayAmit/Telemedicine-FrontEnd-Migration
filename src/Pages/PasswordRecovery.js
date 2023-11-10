import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import AuthHeader from "../Components/AuthModule/AuthHeader";
import AuthFooter from "../Components/AuthModule/AuthFooter";
import CustomFormController from "../Components/customs/CustomFormController";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RecoveryCode from "./Authentication/RecoveryCode";
import NewPassword from "./Authentication/NewPassword";
import useUser from "../Hooks/useUserHook";
import "../Style/App.css";

const PasswordRecovery = () => {
  const { sendRecoveryCode, validateOTP, newPassword } = useUser();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");

  const [email, setEmail] = useState("");
  const [code, setRecoveryCode] = useState("");
  const [password, setPassword] = useState("");

  const [btnLabel, setBtnLabel] = useState("Send Code");
  const [success, setSuccess] = useState(false);
  const [validate, setValidate] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    if (btnLabel !== "Send Code") {
      return;
    }

    let form = new FormData();
    form.append("email", email.trim());

    sendRecoveryCode(form, (status, feedback) => {
      switch (status) {
        case 200:
          setValidate(true);
          setBtnLabel("Validate Code");
          break;
        default:
          setFeedback(feedback);
      }
      setLoading(false);
    });
  };

  const handleValidateResetCode = (e) => {
    e.preventDefault();
    if (btnLabel !== "Validate Code") {
      return;
    }
    setLoading(true);

    let form = new FormData();
    form.append("email", email.trim());
    form.append("code", code);

    validateOTP(form, (status, feedback) => {
      switch (status) {
        case 200:
          setSuccess(true);
          setBtnLabel("Submit");
          break;
        default:
          console.log(feedback);
          break;
      }
      setLoading(false);
    });
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();

    setLoading(true);
    if (btnLabel !== "Submit") {
      return;
    }
    const trimConfirmPassword = confirmPassword;
    const trimPassword = password;

    if (trimConfirmPassword !== trimPassword) {
      return;
    }

    let form = new FormData();
    form.append("email", email.trim());
    form.append("password", password.trim());

    newPassword(form, (status, feedback) => {
      switch (status) {
        case 200:
          setBtnLabel("Success");
          setResetSuccess(true);
          break;
        default:
          setFeedback(feedback);
          break;
      }

      setLoading(false);
    });
  };

  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <Box
        w={"100%"}
        h={"100vh"}
        bg={["white", "white", "rgba(0,0,0,0.04)", "rgba(0,0,0,0.04)"]}
      >
        <Center h="100vh">
          <Box
            w={"30rem"}
            h={"35rem"}
            bg={["transparent", "transparent", "white", "white"]}
            rounded={10}
            boxShadow={["none", "none", "lg", "lg"]}
            overflow="hidden"
          >
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              pl={10}
              pt={[2, 2, 0, 8]}
              pr={10}
              pb={3}
              h={["70vh", "70vh", "50vh", "70vh"]}
            >
              <AuthHeader title="Recover Account" />{" "}
              {feedback === "" ? null : (
                <Box
                  h={"10%"}
                  pl={2}
                  pr={2}
                  rounded={5}
                  color="red"
                  display={feedback === "2" ? "none" : "block"}
                >
                  <Center h="100%">
                    <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                  </Center>
                </Box>
              )}
              <Box
                w={"inherit"}
                h={"inherit"}
                display={"flex"}
                flexDirection={"column"}
                mt={"4rem"}
              >
                <Text fontSize={12} color={"grey"}>
                  {validate === false && success === false
                    ? `A recovery link will be sent to your email that is binded
                      with your account. Upon submitting open your Gmail app on
                      your phone or signin you Gmail account in Google chome and
                      check your inbox for recovery Link. Click the link and it
                      will redirect to a change password to update your account
                      password.`
                    : `A code has been sent to your email  ${email}. 
                        Enter the code to validate.`}
                </Text>
                {validate && success & resetSuccess ? null : validate &&
                  success === false ? (
                  <RecoveryCode setCode={setRecoveryCode} />
                ) : validate === false && success === false ? (
                  <CustomFormController
                    isSignup={false}
                    type={"text"}
                    title={""}
                    value={email}
                    setValue={setEmail}
                    placeholder={"Email"}
                    errorMessage={""}
                    isError={false}
                    mt={5}
                  >
                    <Box
                      w={8}
                      h={4}
                      mt={6}
                      mb={6}
                      borderRight={"1px solid rgba(0,0,0,0.2)"}
                    >
                      <Center>
                        <MdEmail color="teal" size={15} />
                      </Center>
                    </Box>
                  </CustomFormController>
                ) : (
                  <NewPassword
                    newPassword={password}
                    setNewPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                  />
                )}

                {resetSuccess ? null : (
                  <Button
                    isLoading={loading}
                    loadingText={"Signing In"}
                    mt={14}
                    bg={"teal"}
                    color={"white"}
                    _hover={{ bg: "teal" }}
                    onClick={(e) => {
                      if (validate && success) {
                        handleSubmitNewPassword(e);
                        return;
                      }

                      if (validate) {
                        handleValidateResetCode(e);
                        return;
                      }

                      handleClick(e);
                    }}
                  >
                    <Text>{btnLabel}</Text>
                  </Button>
                )}
                <Button
                  bg={resetSuccess ? "teal" : "gray"}
                  color={"white"}
                  mt={3}
                  _hover={{
                    bg: "darkorange",
                  }}
                  onClick={(e) => handleNavigateToLogin(e)}
                >
                  <Text>{resetSuccess ? "Go to Login" : "Back"}</Text>
                </Button>
              </Box>
              <AuthFooter />
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default PasswordRecovery;