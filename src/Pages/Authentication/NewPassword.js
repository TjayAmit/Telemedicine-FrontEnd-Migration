import { Box, Center } from "@chakra-ui/react";
import CustomFormController from "../../Components/customs/CustomFormController";
import { FaLock } from "react-icons/fa";
import PropTypes from "prop-types";
import "../../Style/App.css";

const NewPassword = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <>
      <CustomFormController
        isSignup={false}
        type={"password"}
        title={""}
        value={newPassword}
        setValue={setNewPassword}
        placeholder={"New Password"}
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
            <FaLock color="teal" size={15} />
          </Center>
        </Box>
      </CustomFormController>
      <CustomFormController
        isSignup={false}
        type={"password"}
        title={""}
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder={"Confirm password"}
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
            <FaLock color="teal" size={15} />
          </Center>
        </Box>
      </CustomFormController>
    </>
  );
};

NewPassword.propTypes = {
  newPassword: PropTypes.string,
  setNewPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  setConfirmPassword: PropTypes.string,
};

export default NewPassword;